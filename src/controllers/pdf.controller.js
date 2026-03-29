import fs from "fs";
import path from "path";

import PDF from "../models/PDF.js";
import Chunk from "../models/Chunk.js";
import User from "../models/User.js";

import { parsePDFWithPages } from "../services/pdf.service.js";
import { chunkText } from "../utils/chunkText.js";
import { createEmbedding } from "../services/embedding.service.js";


// =======================
// 📄 UPLOAD PDF
// =======================
export const uploadPDF = async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // 📄 Save metadata
    const pdf = await PDF.create({
      filename: file.filename,
      originalName: file.originalname,
      uploadedBy: req.user._id
    });

    // 🧠 Parse PDF (page-wise)
    const pages = await parsePDFWithPages(file.path);

    let chunkDocs = [];
    let globalIndex = 0;

    for (let page of pages) {
      const chunks = chunkText(page.text);

      for (let i = 0; i < chunks.length; i++) {
        const chunk = chunks[i];

        const embedding = await createEmbedding(chunk);

        chunkDocs.push({
          text: chunk,
          embedding,
          pdfId: pdf._id,

          // 🎯 Highlight metadata
          page: page.pageNumber,
          startIndex: globalIndex,
          endIndex: globalIndex + chunk.length
        });

        globalIndex += chunk.length;
      }
    }

    console.log("📄 Total chunks:", chunkDocs.length);

    // ⚡ Bulk insert
    await Chunk.insertMany(chunkDocs);

    // 📊 Update user analytics
    await User.findByIdAndUpdate(req.user._id, {
      $inc: { "usage.pdfsUploaded": 1 },
      $push: { uploadedPdfs: pdf._id }
    });

    res.json({
      message: "PDF uploaded, embedded & highlight-ready",
      chunks: chunkDocs.length,
      pdfId: pdf._id
    });

  } catch (err) {
    console.error("Upload Error:", err);

    res.status(500).json({
      error: "Failed to process PDF"
    });
  }
};



// =======================
// 🗑️ DELETE PDF (ADMIN)
// =======================
export const deletePDF = async (req, res) => {
  try {
    const { id } = req.params;

    const pdf = await PDF.findById(id);

    if (!pdf) {
      return res.status(404).json({ message: "PDF not found" });
    }

    // 🧹 Delete file from uploads
    const filePath = path.resolve("uploads", pdf.filename);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // 🧠 Delete chunks
    await Chunk.deleteMany({ pdfId: id });

    // 📄 Delete PDF record
    await PDF.findByIdAndDelete(id);

    res.json({
      message: "PDF and associated chunks deleted successfully"
    });

  } catch (err) {
    console.error("Delete Error:", err);

    res.status(500).json({
      error: "Failed to delete PDF"
    });
  }
};



// =======================
// 🎯 GET HIGHLIGHT DATA
// =======================
export const getHighlightData = async (req, res) => {
  try {
    const { chunkId } = req.params;

    const chunk = await Chunk.findById(chunkId).populate("pdfId");

    if (!chunk) {
      return res.status(404).json({ message: "Chunk not found" });
    }

    res.json({
      pdfId: chunk.pdfId._id,
      filename: chunk.pdfId.filename,

      page: chunk.page,
      text: chunk.text,

      startIndex: chunk.startIndex,
      endIndex: chunk.endIndex
    });

  } catch (err) {
    console.error("Highlight Error:", err);

    res.status(500).json({
      error: "Failed to fetch highlight data"
    });
  }
};
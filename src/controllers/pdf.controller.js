import PDF from "../models/PDF.js";
import Chunk from "../models/Chunk.js";
import { parsePDF } from "../services/pdf.service.js";
import { chunkText } from "../utils/chunkText.js";
import { createEmbedding } from "../services/embedding.service.js";

export const uploadPDF = async (req, res) => {
  try {
    const file = req.file;

    if (!file) return res.status(400).json({ message: "No file uploaded" });

    const pdf = await PDF.create({
      filename: file.filename,
      originalName: file.originalname,
      uploadedBy: req.user._id
    });

    const text = await parsePDF(file.path);

    const chunks = chunkText(text);

    console.log("📄 Total chunks:", chunks.length);

    // 🔥 CREATE EMBEDDINGS + STORE
    for (let chunk of chunks) {
      const embedding = await createEmbedding(chunk);

      await Chunk.create({
        text: chunk,
        embedding,
        pdfId: pdf._id
      });
    }

    res.json({
      message: "PDF uploaded, embedded & stored successfully",
      chunks: chunks.length
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
import PDF from "../models/PDF.js";
import { parsePDF } from "../services/pdf.service.js";
import { chunkText } from "../utils/chunkText.js";

export const uploadPDF = async (req, res) => {
  try {
    const file = req.file;

    if (!file) return res.status(400).json({ message: "No file uploaded" });

    // Save PDF metadata
    const pdf = await PDF.create({
      filename: file.filename,
      originalName: file.originalname,
      uploadedBy: req.user._id
    });

    // Parse PDF
    const text = await parsePDF(file.path);

    // Chunk text
    const chunks = chunkText(text);

    console.log("📄 Total chunks:", chunks.length);

    res.json({
      message: "PDF uploaded & parsed successfully",
      chunks: chunks.length
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
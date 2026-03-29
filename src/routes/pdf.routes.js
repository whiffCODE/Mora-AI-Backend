import express from "express";

import { 
  uploadPDF, 
  deletePDF, 
  getHighlightData 
} from "../controllers/pdf.controller.js";

import { upload } from "../middleware/upload.middleware.js";
import { protect, isAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

// 📄 Upload PDF
router.post("/upload", protect, upload.single("file"), uploadPDF);

// 🗑️ Delete PDF (Admin only)
router.delete("/:id", protect, isAdmin, deletePDF);

// 🎯 Highlight API
router.get("/highlight/:chunkId", protect, getHighlightData);

export default router;
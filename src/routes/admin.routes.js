import express from "express";
import { protect, isAdmin } from "../middleware/auth.middleware.js";
import User from "../models/User.js";
import PDF from "../models/PDF.js";
import Chat from "../models/Chat.js";

const router = express.Router();

router.get("/analytics", protect, isAdmin, async (req, res) => {
  const totalUsers = await User.countDocuments();
  const totalPDFs = await PDF.countDocuments();
  const totalChats = await Chat.countDocuments();

  res.json({
    totalUsers,
    totalPDFs,
    totalChats
  });
});

export default router;
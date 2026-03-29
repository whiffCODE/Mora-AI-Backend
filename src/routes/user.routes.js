import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import User from "../models/User.js";
import PDF from "../models/PDF.js";
import Chat from "../models/Chat.js";

const router = express.Router();

router.get("/dashboard", protect, async (req, res) => {
  const user = await User.findById(req.user._id);

  const pdfCount = await PDF.countDocuments({ uploadedBy: user._id });
  const chatCount = await Chat.countDocuments({ userId: user._id });

  res.json({
    name: user.firstName,
    email: user.email,
    usage: user.usage,
    pdfCount,
    chatCount
  });
});

export default router;
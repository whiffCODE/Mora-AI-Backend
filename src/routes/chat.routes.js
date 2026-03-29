import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import Chat from "../models/Chat.js";

const router = express.Router();

// Get chat history
router.get("/history", protect, async (req, res) => {
  const chats = await Chat.find({ userId: req.user._id }).sort({ createdAt: -1 });

  res.json(chats);
});

export default router;
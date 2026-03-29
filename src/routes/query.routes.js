import express from "express";
import { askQuery } from "../controllers/query.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/ask", protect, askQuery);

export default router;
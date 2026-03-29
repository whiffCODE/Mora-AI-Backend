import { searchSimilarChunks } from "../services/query.service.js";
import { askGemini, askGroq } from "../services/llm.service.js";

import Chat from "../models/Chat.js";
import User from "../models/User.js";

// =======================
// 🧠 NORMAL QUERY
// =======================
export const askQuery = async (req, res) => {
  try {
    const { question, model } = req.body;

    if (!question) {
      return res.status(400).json({ message: "Question required" });
    }

    // 🔍 Step 1: Retrieve context
    const chunks = await searchSimilarChunks(question);

    // ❌ No data → safe fallback
    if (!chunks.length) {
      return res.json({
        answer: "I don't know.",
        sources: []
      });
    }

    // 🤖 Step 2: Choose LLM
    let answer;

    try {
      if (model === "groq") {
        answer = await askGroq(chunks, question);
      } else {
        answer = await askGemini(chunks, question);
      }
    } catch (llmError) {
      console.error("LLM Error:", llmError);

      return res.status(500).json({
        error: "LLM failed to generate response"
      });
    }

    // 📚 Step 3: Format sources (with PDF linkage)
    const sources = chunks.map((c, i) => ({
  id: i + 1,
  text: c.text.slice(0, 200),
  chunkId: c._id,
  pdfId: c.pdfId
}));

    // 💾 Step 4: Save chat history
    await Chat.create({
      userId: req.user._id,
      question,
      answer,
      sources,
      modelUsed: model || "gemini"
    });

    // 📊 Step 5: Update usage analytics
    await User.findByIdAndUpdate(req.user._id, {
      $inc: { "usage.questionsAsked": 1 }
    });

    // 🚀 Final response
    res.json({
      answer,
      sources
    });

  } catch (err) {
    console.error("Query Error:", err);
    res.status(500).json({ error: err.message });
  }
};



// =======================
// 🌊 STREAMING QUERY (SSE)
// =======================
export const askQueryStream = async (req, res) => {
  try {
    const { question, model } = req.body;

    if (!question) {
      return res.status(400).json({ message: "Question required" });
    }

    // 🔥 SSE HEADERS
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    // 🔍 Retrieve chunks
    const chunks = await searchSimilarChunks(question);

    if (!chunks.length) {
      res.write(`data: I don't know.\n\n`);
      return res.end();
    }

    // 🤖 Generate full answer first (we simulate streaming)
    let answer;

    if (model === "groq") {
      answer = await askGroq(chunks, question);
    } else {
      answer = await askGemini(chunks, question);
    }

    // ✨ Stream character-by-character
    for (let char of answer) {
      res.write(`data: ${char}\n\n`);
      await new Promise((r) => setTimeout(r, 10)); // typing effect
    }

    // 📚 Send sources at end
    const sources = chunks.map((c, i) => ({
      id: i + 1,
      text: c.text.slice(0, 200),
      pdfId: c.pdfId || null
    }));

    res.write(`event: sources\n`);
    res.write(`data: ${JSON.stringify(sources)}\n\n`);

    // 💾 Save chat
    await Chat.create({
      userId: req.user._id,
      question,
      answer,
      sources,
      modelUsed: model || "gemini"
    });

    // 📊 Update usage
    await User.findByIdAndUpdate(req.user._id, {
      $inc: { "usage.questionsAsked": 1 }
    });

    res.end();

  } catch (err) {
    console.error("Streaming Error:", err);

    res.write(`data: Error occurred\n\n`);
    res.end();
  }
};
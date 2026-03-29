import { searchSimilarChunks } from "../services/query.service.js";
import { askGemini, askGroq } from "../services/llm.service.js";

export const askQuery = async (req, res) => {
  try {
    const { question, model } = req.body;

    if (!question) {
      return res.status(400).json({ message: "Question required" });
    }

    // 🔍 Step 1: Retrieve context
    const chunks = await searchSimilarChunks(question);

    if (!chunks.length) {
      return res.json({ answer: "I don't know.", sources: [] });
    }

    // 🤖 Step 2: Choose LLM
    let answer;

    if (model === "groq") {
      answer = await askGroq(chunks, question);
    } else {
      answer = await askGemini(chunks, question);
    }

    // 📚 Step 3: Format sources
    const sources = chunks.map((c, i) => ({
      id: i + 1,
      text: c.text.slice(0, 200)
    }));

    res.json({
      answer,
      sources
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};



export const askQueryStream = async (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");

  const answer = "Streaming coming soon...";

  for (let char of answer) {
    res.write(`data: ${char}\n\n`);
  }

  res.end();
};
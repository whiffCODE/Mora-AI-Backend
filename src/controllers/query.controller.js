import { searchSimilarChunks } from "../services/query.service.js";

export const askQuery = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ message: "Question is required" });
    }

    const chunks = await searchSimilarChunks(question);

    res.json({
      message: "Relevant chunks fetched",
      results: chunks
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
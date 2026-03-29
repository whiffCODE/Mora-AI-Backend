import Chunk from "../models/Chunk.js";
import { createEmbedding } from "./embedding.service.js";

export async function searchSimilarChunks(query) {
  // 🔥 Convert query → embedding
  const queryEmbedding = await createEmbedding(query);

  // 🔍 Vector search
  const results = await Chunk.aggregate([
    {
      $vectorSearch: {
        index: "vector_index",
        path: "embedding",
        queryVector: queryEmbedding,
        numCandidates: 100,
        limit: 5
      }
    }
  ]);

  return results;
}
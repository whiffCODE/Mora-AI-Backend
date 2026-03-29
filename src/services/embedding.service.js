import { pipeline } from "@xenova/transformers";

let embedder;

// Load model only once (VERY IMPORTANT)
export async function getEmbedder() {
  if (!embedder) {
    console.log("⏳ Loading embedding model...");
    embedder = await pipeline(
      "feature-extraction",
      "Xenova/all-MiniLM-L6-v2"
    );
    console.log("✅ Embedding model loaded");
  }
  return embedder;
}

// Generate embedding
export async function createEmbedding(text) {
  const model = await getEmbedder();

  const result = await model(text, {
    pooling: "mean",
    normalize: true
  });

  return Array.from(result.data);
}
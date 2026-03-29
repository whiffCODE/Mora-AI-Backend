export function chunkText(text, chunkSize = 1000, overlap = 100) {
  let chunks = [];

  for (let i = 0; i < text.length; i += chunkSize - overlap) {
    chunks.push(text.slice(i, i + chunkSize));
  }

  return chunks;
}
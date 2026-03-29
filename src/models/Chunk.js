import mongoose from "mongoose";

const chunkSchema = new mongoose.Schema({
  text: String,

  // 🔥 VECTOR (IMPORTANT)
  embedding: {
    type: [Number],
    required: true
  },

  pdfId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PDF"
  },

  page: Number
});

export default mongoose.model("Chunk", chunkSchema);
import mongoose from "mongoose";

const chunkSchema = new mongoose.Schema({
  text: String,

  embedding: {
    type: [Number],
    required: true
  },

  pdfId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PDF"
  },

  // 🔥 NEW FIELDS FOR HIGHLIGHT
  page: Number,
  startIndex: Number,
  endIndex: Number
});

export default mongoose.model("Chunk", chunkSchema);
import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    question: String,
    answer: String,

    sources: [
      {
        text: String,
        pdfId: mongoose.Schema.Types.ObjectId
      }
    ],

    modelUsed: String
  },
  { timestamps: true }
);

export default mongoose.model("Chat", chatSchema);
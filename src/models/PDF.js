import mongoose from "mongoose";

const pdfSchema = new mongoose.Schema(
  {
    filename: String,
    originalName: String,
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
);

export default mongoose.model("PDF", pdfSchema);
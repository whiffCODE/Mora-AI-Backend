import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // 🔹 BASIC INFO
    firstName: {
      type: String,
      required: true,
      trim: true
    },
    lastName: {
      type: String,
      trim: true
    },

    // 🔹 AUTH
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true
    },
    isVerified: {
      type: Boolean,
      default: false
    },

    // 🔹 ROLE SYSTEM
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user"
    },

    // 🔹 USAGE ANALYTICS (VERY IMPORTANT FOR DASHBOARD)
    usage: {
      questionsAsked: {
        type: Number,
        default: 0
      },
      pdfsUploaded: {
        type: Number,
        default: 0
      }
    },

    // 🔹 PDF REFERENCES (optional but useful)
    uploadedPdfs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PDF"
      }
    ],

    // 🔹 CHAT HISTORY REFERENCES
    chats: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat"
      }
    ],

    // 🔹 SUBSCRIPTION READY (for Stripe later)
    subscription: {
      type: String,
      enum: ["free", "pro"],
      default: "free"
    }
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
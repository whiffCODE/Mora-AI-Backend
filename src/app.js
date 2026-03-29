import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import pdfRoutes from "./routes/pdf.routes.js";
import queryRoutes from "./routes/query.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Mora AI Backend Running 🚀");
});

app.use("/api/auth", authRoutes);
app.use("/api/pdf", pdfRoutes);
app.use("/api/query", queryRoutes);

export default app;
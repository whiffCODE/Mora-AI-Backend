import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) return res.status(401).json({ message: "No token" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");

    req.user = user;
    next();

  } catch (err) {
    res.status(401).json({ message: "Unauthorized" });
  }
};

// 🔹 ROLE CHECK
export const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin" && req.user.email !== process.env.SUPER_ADMIN_EMAIL) {
    return res.status(403).json({ message: "Admin only" });
  }
  next();
};
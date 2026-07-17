import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import { connectDB } from "./config/db.js";
import userRoutes from "./routes/user.routes.js";
import blogRoutes from "./routes/blog.routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load local .env when present; Render injects env vars directly
dotenv.config({ path: path.join(__dirname, "../.env") });

const uploadsDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("/uploads", express.static(uploadsDir));
app.use("/images", express.static(uploadsDir));

app.get("/", (req, res) => {
  res.send("hello world");
});

app.get("/health", (req, res) => {
  res.status(200).json({ ok: true });
});

app.use("/user", userRoutes);
app.use("/blog", blogRoutes);

const PORT = process.env.PORT || 4000;

const start = async () => {
  try {
    await connectDB();
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server is Running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

start();

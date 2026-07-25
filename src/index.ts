import express from "express";
import "dotenv/config";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// Route imports
import authRoutes from "./routes/authRoutes.js";
import itemRoutes from "./routes/itemRoutes.js";
import authMiddleware from "./middleware/authMiddleware.js";

// Initial config
const app = express();
const PORT = process.env.PORT || 3000;

// Path stuff
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares
app.use(
  cors({
    origin: "http://localhost:3000",
  }),
);
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/items", authMiddleware, itemRoutes);

app.listen(PORT, () => {
  console.log(`server is running at port ${PORT}`);
});

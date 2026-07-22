import express from "express";
import "dotenv/config";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/authRoutes.js";

// Initial config
const app = express();
const PORT = process.env.PORT || 3000;

// Path stuff
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

// Routes
app.use("/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`server is running at port ${PORT}`);
});

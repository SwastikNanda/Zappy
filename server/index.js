import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { initGameSockets } from "./src/sockets/game.js";
import authRoutes from "./src/routes/auth.js"
import quizRoutes from "./src/routes/quizzes.js"
import sessionRoutes from "./src/routes/session.js"
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_ORIGIN,
    credentials: true
  }
});

app.use(cors({
  origin: process.env.CLIENT_ORIGIN ,
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

mongoose.set("strictQuery", true);

app.use("/api/auth", authRoutes);
app.use("/api/quizzes", quizRoutes);
app.use("/api/sessions", sessionRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected client origin:", process.env.CLIENT_ORIGIN))
  .catch(err => console.error("❌ Mongo error:", err.message));

app.get("/", (req, res) => res.json({ status: "ok", service: "kahoot-clone-server" }));

initGameSockets(io);

const PORT = process.env.PORT || 5100;
server.listen(PORT, () => console.log("🚀 Server listening on port", PORT));
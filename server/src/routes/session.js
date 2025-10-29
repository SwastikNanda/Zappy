import express from "express";
import GameSession from "../models/GameSession.js";
import Quiz from "../models/Quiz.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();
router.post("/", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "host" && req.user.role !== "admin") {
      return res.status(403).json({ message: "Only host/admin can start sessions" });
    }

    const { quizId } = req.body;
    const quiz = await Quiz.findById(quizId);
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    const session = await GameSession.create({
      quiz: quizId,
      host: req.user.id,
      players: []
    });

    res.status(201).json(session);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const session = await GameSession.findById(req.params.id)
      .populate("quiz")
      .populate("players.user", "username");
    if (!session) return res.status(404).json({ message: "Session not found" });
    res.json(session);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
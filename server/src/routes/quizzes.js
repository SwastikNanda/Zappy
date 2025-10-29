import express from "express";
import Quiz from "../models/Quiz.js";
import Question from "../models/Question.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();
router.post("/", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "host" && req.user.role !== "admin") {
      return res.status(403).json({ message: "Only host/admin can create quizzes" });
    }

    const { title, description, questions } = req.body;

    const createdQuestions = await Question.insertMany(questions);

    const quiz = await Quiz.create({
      title,
      description,
      host: req.user.id,
      questions: createdQuestions.map(q => q._id)
    });

    res.status(201).json(quiz);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.get("/", async (req, res) => {
  try {
    const quizzes = await Quiz.find().populate("host", "username");
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id).populate("questions");
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });
    res.json(quiz);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    if (req.user.role !== "admin" && quiz.host.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not allowed" });
    }

    await Question.deleteMany({ _id: { $in: quiz.questions } });
    await quiz.deleteOne();

    res.json({ message: "Quiz deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

// import express from "express";
// import Quiz from "../models/Quiz.js";
// import Question from "../models/Question.js";
// import { authMiddleware } from "../middleware/auth.js";

// const router = express.Router();
// router.post("/", authMiddleware, async (req, res) => {
//   try {
//     if (req.user.role !== "host" && req.user.role !== "admin") {
//       return res.status(403).json({ message: "Only host/admin can create quizzes" });
//     }

//     const { title, description, questions } = req.body;

//     const createdQuestions = await Question.insertMany(questions);

//     const quiz = await Quiz.create({
//       title,
//       description,
//       host: req.user.id,
//       questions: createdQuestions.map(q => q._id)
//     });

//     res.status(201).json(quiz);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });
// router.get("/", async (req, res) => {
//   try {
//     const quizzes = await Quiz.find().populate("host", "username");
//     res.json(quizzes);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });
// router.get("/:id", async (req, res) => {
//   try {
//     const quiz = await Quiz.findById(req.params.id).populate("questions");
//     if (!quiz) return res.status(404).json({ message: "Quiz not found" });
//     res.json(quiz);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });
// router.delete("/:id", authMiddleware, async (req, res) => {
//   try {
//     const quiz = await Quiz.findById(req.params.id);
//     if (!quiz) return res.status(404).json({ message: "Quiz not found" });

//     if (req.user.role !== "admin" && quiz.host.toString() !== req.user.id) {
//       return res.status(403).json({ message: "Not allowed" });
//     }

//     await Question.deleteMany({ _id: { $in: quiz.questions } });
//     await quiz.deleteOne();

//     res.json({ message: "Quiz deleted" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// export default router;


import express from "express";
import Quiz from "../models/Quiz.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

/**
 * CREATE QUIZ
 */
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, description, questions } = req.body;

    if (!questions || !questions.length) {
      return res.status(400).json({ message: "Quiz must have questions" });
    }

    const quiz = await Quiz.create({
      title,
      description,
      ownerId: req.user.id,
      questions, // ✅ embedded questions
    });

    res.status(201).json(quiz);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

/**
 * GET ALL QUIZZES FOR LOGGED-IN HOST
 */
router.get("/", authMiddleware, async (req, res) => {
  try {
    const quizzes = await Quiz.find({ ownerId: req.user.id }).sort({ createdAt: -1 });
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * GET SINGLE QUIZ BY ID
 */
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const quiz = await Quiz.findOne({
      _id: req.params.id,
      ownerId: req.user.id,
    });

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    res.json(quiz);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * UPDATE QUIZ
 */
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { title, description, questions } = req.body;

    const quiz = await Quiz.findOne({
      _id: req.params.id,
      ownerId: req.user.id,
    });

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    if (title !== undefined) quiz.title = title;
    if (description !== undefined) quiz.description = description;
    if (questions !== undefined) {
      if (!questions.length) {
        return res.status(400).json({ message: "Quiz must have questions" });
      }
      quiz.questions = questions;
    }

    await quiz.save();
    res.json(quiz);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

/**
 * DELETE QUIZ
 */
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const quiz = await Quiz.findOne({
      _id: req.params.id,
      ownerId: req.user.id,
    });

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    await quiz.deleteOne();
    res.json({ message: "Quiz deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;


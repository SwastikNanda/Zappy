import mongoose from "mongoose";
import dotenv from "dotenv";

import User from "./src/models/User.js";
import Quiz from "./src/models/Quiz.js";
import Question from "./src/models/Question.js";
import GameSession from "./src/models/GameSession.js";

dotenv.config();

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log("MongoDB connected ✅");

    await User.deleteMany();
    await Quiz.deleteMany();
    await Question.deleteMany();
    await GameSession.deleteMany();

    const admin = await User.create({
      username: "admin",
      email: "admin@example.com",
      password: "admin123",
      role: "admin"
    });

    const host = await User.create({
      username: "quiz_master",
      email: "host@example.com",
      password: "host123",
      role: "host"
    });

    const player1 = await User.create({
      username: "alice",
      email: "alice@example.com",
      password: "player123",
      role: "player"
    });

    const player2 = await User.create({
      username: "bob",
      email: "bob@example.com",
      password: "player123",
      role: "player"
    });

    const q1 = await Question.create({
      text: "What is the capital of France?",
      options: ["Paris", "Berlin", "Rome", "Madrid"],
      correctIndex: 0,
      timeLimit: 20
    });

    const q2 = await Question.create({
      text: "2 + 2 = ?",
      options: ["3", "4", "5", "6"],
      correctIndex: 1,
      timeLimit: 15
    });

    const q3 = await Question.create({
      text: "Which planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Venus", "Jupiter"],
      correctIndex: 1,
      timeLimit: 20
    });

    const quiz = await Quiz.create({
      title: "General Knowledge",
      description: "Test your trivia skills!",
      host: host._id,
      questions: [q1._id, q2._id, q3._id]
    });

    const session = await GameSession.create({
      quiz: quiz._id,
      host: host._id,
      players: [
        { user: player1._id, score: 0 },
        { user: player2._id, score: 0 }
      ],
      currentQ: 0,
      isActive: true
    });

    console.log("✅ Seed data inserted successfully!");
    console.log({ admin, host, player1, player2, quiz, session });

    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seed();

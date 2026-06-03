import mongoose from "mongoose";
import dotenv from "dotenv";

import User from "./src/models/User.js";
import Quiz from "./src/models/Quiz.js";
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
    await GameSession.deleteMany();

    const admin = await User.create({
      name: "admin",
      email: "admin@example.com",
      password: "admin123",
      role: "admin"
    });

    const host = await User.create({
      name: "quiz_master",
      email: "host@example.com",
      password: "host123",
      role: "host"
    });

    const player1 = await User.create({
      name: "alice",
      email: "alice@example.com",
      password: "player123",
      role: "player"
    });

    const player2 = await User.create({
      name: "bob",
      email: "bob@example.com",
      password: "player123",
      role: "player"
    });

    const quiz = await Quiz.create({
      title: "General Knowledge",
      description: "Test your trivia skills!",
      ownerId: host._id,
      questions: [
        {
          text: "What is the capital of France?",
          choices: ["Paris", "Berlin", "Rome", "Madrid"],
          correctIndices: [0],
          timeLimitSec: 20
        },
        {
          text: "2 + 2 = ?",
          choices: ["3", "4", "5", "6"],
          correctIndices: [1],
          timeLimitSec: 15
        },
        {
          text: "Which planet is known as the Red Planet?",
          choices: ["Earth", "Mars", "Venus", "Jupiter"],
          correctIndices: [1],
          timeLimitSec: 20
        }
      ]
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

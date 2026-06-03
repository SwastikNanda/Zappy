import { randomUUID } from "crypto";
import Quiz from "../models/Quiz.js";
const rooms = new Map();

// Sanitize player name to prevent XSS
function sanitizeName(name) {
  if (typeof name !== "string") return "Player";
  return name.replace(/[<>"'&]/g, "").trim().slice(0, 30) || "Player";
}

// Generate a unique room code that doesn't collide with existing rooms
function generateUniqueRoomCode() {
  let code;
  let attempts = 0;
  do {
    code = Math.random().toString(36).slice(2, 8).toUpperCase();
    attempts++;
  } while (rooms.has(code) && attempts < 100);
  return code;
}

export function initGameSockets(io) {
  io.on("connection", (socket) => {
    console.log("✅ Socket connected:", socket.id);

socket.on("host:create_room", async ({ quizId }) => {
  try {
    if (!quizId || typeof quizId !== "string") {
      return socket.emit("error", {
        message: "Invalid quiz id received"
      });
    }

    const quiz = await Quiz.findById(quizId);

    if (!quiz || !quiz.questions.length) {
      return socket.emit("error", {
        message: "Quiz not found or has no questions"
      });
    }

    const roomCode = generateUniqueRoomCode();

    rooms.set(roomCode, {
      hostId: socket.id,
      quiz,
      players: new Map(),
      currentQ: -1,
      endsAt: null
    });

    socket.join(roomCode);
    socket.emit("host:room_created", { roomCode });

  } catch (err) {
    console.error("Create room failed:", err);
    socket.emit("error", { message: "Failed to create room" });
  }
});



    socket.on("player:join", ({ roomCode, name }) => {
      const room = rooms.get(roomCode);
      if (!room) return io.to(socket.id).emit("error", { message: "Room not found" });
      const safeName = sanitizeName(name);
      room.players.set(socket.id, { name: safeName, score: 0, answered: false });
      socket.join(roomCode);
      io.to(roomCode).emit("host:players_update", { players: Array.from(room.players.values()) });
      io.to(roomCode).emit("lobby:update", { count: room.players.size });
    });

    socket.on("host:next_question", ({ roomCode }) => {
      const room = rooms.get(roomCode);
      if (!room || socket.id !== room.hostId) return;
      room.currentQ += 1;
      if (room.currentQ >= room.quiz.questions.length) {
        const leaderboard = makeLeaderboard(room);
        io.to(roomCode).emit("game:over", { leaderboard });
        // Clean up room after game ends
        rooms.delete(roomCode);
        return;
      }
      const q = room.quiz.questions[room.currentQ];
      for (const p of room.players.values()) p.answered = false;
      const now = Date.now();
      room.endsAt = now + (q.timeLimitSec || 20) * 1000;
      
      // Determine if it's a multiple-answer question
      const hasMultipleAnswers = q.correctIndices && q.correctIndices.length > 1; 

      io.to(roomCode).emit("question:start", {
        index: room.currentQ,
        text: q.text,
        choices: q.choices,
        endsAt: room.endsAt,
        hasMultipleAnswers
      });
      setTimeout(() => endQuestion(io, roomCode), (q.timeLimitSec || 20) * 1000 + 200);
    });

    socket.on("player:answer", ({ roomCode, choiceIndices }) => {
      const room = rooms.get(roomCode);
      if (!room) return;
      const q = room.quiz.questions[room.currentQ];
      const player = room.players.get(socket.id);
      if (!player || player.answered) return;
      player.answered = true;
      const timeLeftMs = Math.max(0, room.endsAt - Date.now());

      // Ensure choiceIndices is always an array of numbers
      const playerAnswers = Array.isArray(choiceIndices) 
        ? choiceIndices.map(Number).sort((a, b) => a - b)
        : [Number(choiceIndices)];

      let correct = false;
      let scoreEarned = 0;

      if (q.correctIndices && q.correctIndices.length > 0) {
        // Calculate correct and incorrect answers
        const correctChoices = playerAnswers.filter(idx => q.correctIndices.includes(idx));
        const incorrectChoices = playerAnswers.filter(idx => !q.correctIndices.includes(idx));
        
        // Full score if all correct answers are chosen and no incorrect ones
        const isFullyCorrect = correctChoices.length === q.correctIndices.length && incorrectChoices.length === 0;

        if (isFullyCorrect) {
          correct = true;
          const bonus = Math.floor(timeLeftMs / 50);
          scoreEarned = 1000 + bonus;
        } else if (correctChoices.length > 0) {
          // Partial scoring for some correct answers
          const pointsPerCorrect = 1000 / q.correctIndices.length;
          scoreEarned = pointsPerCorrect * correctChoices.length;
        }
      }
      
      player.score += scoreEarned;

      io.to(socket.id).emit("player:answer_result", { correct: scoreEarned > 0 });

// Send live leaderboard to everyone (host + players)
const leaderboard = makeLeaderboard(room);
io.to(roomCode).emit("leaderboard:update", { leaderboard });

    });

    socket.on("disconnect", () => {
      for (const [code, room] of rooms.entries()) {
        if (room.hostId === socket.id) {
          rooms.delete(code);
          io.to(code).emit("game:closed");
        } else if (room.players.has(socket.id)) {
          room.players.delete(socket.id);
          io.to(code).emit("host:players_update", { players: Array.from(room.players.values()) });
        }
      }
    });
  });
}

function endQuestion(io, roomCode) {
  const room = rooms.get(roomCode);
  if (!room) return;
  const q = room.quiz.questions[room.currentQ];
  io.to(roomCode).emit("question:end", { correctIndices: q.correctIndices, leaderboard: makeLeaderboard(room) });
}

function makeLeaderboard(room) {
  return Array.from(room.players.values())
    .map(p => ({ name: p.name, score: p.score }))
    .sort((a, b) => b.score - a.score);
}
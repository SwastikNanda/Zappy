import { randomUUID } from "crypto";
import jwt from "jsonwebtoken";

const rooms = new Map();

export function initGameSockets(io) {
  io.on("connection", (socket) => {
    console.log("✅ Socket connected:", socket.id);

    // 🎮 Host creates a room (must be logged in)
    socket.on("host:create_room", ({ quiz, token }) => {
      try {
        // ✅ Verify JWT
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.role !== "host") {
          io.to(socket.id).emit("error", { message: "Unauthorized: Only hosts can create rooms." });
          return;
        }

        // ✅ Generate a room code
        const roomCode = (Math.random().toString(36).slice(2, 6)).toUpperCase();

        rooms.set(roomCode, {
          hostId: socket.id,
          hostUserId: decoded.id,
          quiz,
          players: new Map(),
          currentQ: -1,
          endsAt: null
        });

        socket.join(roomCode);
        io.to(socket.id).emit("host:room_created", { roomCode });
        console.log(`🎯 Room created by ${decoded.id}: ${roomCode}`);
      } catch (err) {
        console.error("❌ Room creation error:", err.message);
        io.to(socket.id).emit("error", { message: "Invalid or expired token." });
      }
    });

    // 👥 Player joins room (no login needed)
    socket.on("player:join", ({ roomCode, name }) => {
      const room = rooms.get(roomCode);
      if (!room) {
        io.to(socket.id).emit("error", { message: "Room not found" });
        return;
      }

      room.players.set(socket.id, { name, score: 0, answered: false });
      socket.join(roomCode);

      io.to(roomCode).emit("host:players_update", { players: Array.from(room.players.values()) });
      io.to(roomCode).emit("lobby:update", { count: room.players.size });

      console.log(`👤 Player joined: ${name} (${socket.id}) Room: ${roomCode}`);
    });

    // ⏭ Host moves to next question
    socket.on("host:next_question", ({ roomCode }) => {
      const room = rooms.get(roomCode);
      if (!room || socket.id !== room.hostId) return;

      room.currentQ += 1;
      if (room.currentQ >= room.quiz.questions.length) {
        const leaderboard = makeLeaderboard(room);
        io.to(roomCode).emit("game:over", { leaderboard });
        return;
      }

      const q = room.quiz.questions[room.currentQ];
      for (const p of room.players.values()) p.answered = false;

      const now = Date.now();
      room.endsAt = now + (q.timeLimitSec || 20) * 1000;

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

    // ✅ Player submits answer
    socket.on("player:answer", ({ roomCode, choiceIndices }) => {
      const room = rooms.get(roomCode);
      if (!room) return;

      const q = room.quiz.questions[room.currentQ];
      const player = room.players.get(socket.id);
      if (!player || player.answered) return;

      player.answered = true;
      const timeLeftMs = Math.max(0, room.endsAt - Date.now());

      const playerAnswers = Array.isArray(choiceIndices)
        ? choiceIndices.map(Number).sort((a, b) => a - b)
        : [Number(choiceIndices)];

      let scoreEarned = 0;

      if (q.correctIndices && q.correctIndices.length > 0) {
        const correctChoices = playerAnswers.filter(idx => q.correctIndices.includes(idx));
        const incorrectChoices = playerAnswers.filter(idx => !q.correctIndices.includes(idx));

        const isFullyCorrect =
          correctChoices.length === q.correctIndices.length && incorrectChoices.length === 0;

        if (isFullyCorrect) {
          const bonus = Math.floor(timeLeftMs / 50);
          scoreEarned = 1000 + bonus;
        } else if (correctChoices.length > 0) {
          const pointsPerCorrect = 1000 / q.correctIndices.length;
          scoreEarned = pointsPerCorrect * correctChoices.length;
        }
      }

      player.score += scoreEarned;

      io.to(socket.id).emit("player:answer_result", { correct: scoreEarned > 0 });
      io.to(room.hostId).emit("host:leaderboard", makeLeaderboard(room));
    });

    // ❌ Disconnect handling
    socket.on("disconnect", () => {
      for (const [code, room] of rooms.entries()) {
        if (room.hostId === socket.id) {
          rooms.delete(code);
          io.to(code).emit("game:closed");
          console.log(`⚠️ Room ${code} closed (host disconnected)`);
        } else if (room.players.has(socket.id)) {
          room.players.delete(socket.id);
          io.to(code).emit("host:players_update", { players: Array.from(room.players.values()) });
          console.log(`👋 Player left (${socket.id}) from room ${code}`);
        }
      }
    });
  });
}

function endQuestion(io, roomCode) {
  const room = rooms.get(roomCode);
  if (!room) return;

  const q = room.quiz.questions[room.currentQ];
  io.to(roomCode).emit("question:end", {
    correctIndices: q.correctIndices,
    leaderboard: makeLeaderboard(room)
  });
  console.log("✅ Question ended:", q.text);
}

function makeLeaderboard(room) {
  return Array.from(room.players.values())
    .map(p => ({ name: p.name, score: p.score }))
    .sort((a, b) => b.score - a.score);
}
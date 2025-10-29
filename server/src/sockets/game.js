// import { randomUUID } from "crypto";

// const rooms = new Map();

// export function initGameSockets(io) {
//   io.on("connection", (socket) => {
//     console.log("✅ Socket connected:", socket.id);

//     socket.on("host:create_room", ({ quiz }) => {
//       const roomCode = (Math.random().toString(36).slice(2, 6)).toUpperCase();
//       rooms.set(roomCode, {
//         hostId: socket.id,
//         quiz,
//         players: new Map(),
//         currentQ: -1,
//         endsAt: null
//       });
//       socket.join(roomCode);
//       io.to(socket.id).emit("host:room_created", { roomCode });
//       console.log("Room created", roomCode);
//     });

//     socket.on("player:join", ({ roomCode, name }) => {
//       const room = rooms.get(roomCode);
//       if (!room) return io.to(socket.id).emit("error", { message: "Room not found" });
//       room.players.set(socket.id, { name, score: 0, answered: false });
//       socket.join(roomCode);
//       io.to(roomCode).emit("host:players_update", { players: Array.from(room.players.values()) });
//       io.to(roomCode).emit("lobby:update", { count: room.players.size });
//     });

//     socket.on("host:next_question", ({ roomCode }) => {
//       const room = rooms.get(roomCode);
//       if (!room || socket.id !== room.hostId) return;
//       room.currentQ += 1;
//       if (room.currentQ >= room.quiz.questions.length) {
//         const leaderboard = makeLeaderboard(room);
//         io.to(roomCode).emit("game:over", { leaderboard });
//         return;
//       }
//       const q = room.quiz.questions[room.currentQ];
//       for (const p of room.players.values()) p.answered = false;
//       const now = Date.now();
//       room.endsAt = now + (q.timeLimitSec || 20) * 1000;
//       io.to(roomCode).emit("question:start", {
//         index: room.currentQ,
//         text: q.text,
//         choices: q.choices,
//         endsAt: room.endsAt
//       });
//       setTimeout(() => endQuestion(io, roomCode), (q.timeLimitSec || 20) * 1000 + 200);
//     });

//     // socket.on("player:answer", ({ roomCode, choiceIndex }) => {
//     //   const room = rooms.get(roomCode);
//     //   if (!room) return;
//     //   const q = room.quiz.questions[room.currentQ];
//     //   const player = room.players.get(socket.id);
//     //   if (!player || player.answered) return;
//     //   player.answered = true;
//     //   const timeLeftMs = Math.max(0, room.endsAt - Date.now());
//     //   const correct = choiceIndex === q.correctIndex;
//     //   if (correct) {
//     //     const bonus = Math.floor(timeLeftMs / 50);
//     //     player.score += 1000 + bonus;
//     //   }
//     //   io.to(socket.id).emit("player:answer_result", { correct });
//     //   io.to(room.hostId).emit("host:leaderboard", makeLeaderboard(room));
//     // });


//     socket.on("player:answer", ({ roomCode, choiceIndex }) => {
//   const room = rooms.get(roomCode);
//   if (!room) return;
//   const q = room.quiz.questions[room.currentQ];
//   const player = room.players.get(socket.id);
//   if (!player || player.answered) return;
//   player.answered = true;
//   const timeLeftMs = Math.max(0, room.endsAt - Date.now());

//   // FIX: Check if the player's choiceIndex is included in the array of correctIndices
//   // This logic now supports multiple correct answers
//   const correct = q.correctIndices.includes(Number(choiceIndex));

//   if (correct) {
//     const bonus = Math.floor(timeLeftMs / 50);
//     player.score += 1000 + bonus;
//   }
//   io.to(socket.id).emit("player:answer_result", { correct });
//   io.to(room.hostId).emit("host:leaderboard", makeLeaderboard(room));
// });

//     socket.on("disconnect", () => {
//       for (const [code, room] of rooms.entries()) {
//         if (room.hostId === socket.id) {
//           rooms.delete(code);
//           io.to(code).emit("game:closed");
//         } else if (room.players.has(socket.id)) {
//           room.players.delete(socket.id);
//           io.to(code).emit("host:players_update", { players: Array.from(room.players.values()) });
//         }
//       }
//     });
//   });
// }

// // function endQuestion(io, roomCode) {
// //   const room = rooms.get(roomCode);
// //   if (!room) return;
// //   const q = room.quiz.questions[room.currentQ];
// //   io.to(roomCode).emit("question:end", { correctIndex: q.correctIndex, leaderboard: makeLeaderboard(room) });
// // }

// function endQuestion(io, roomCode) {
//     const room = rooms.get(roomCode);
//     if (!room) return;
//     const q = room.quiz.questions[room.currentQ];
//     // Send the entire array of correct indices to the client for display
//     io.to(roomCode).emit("question:end", { correctIndices: q.correctIndices, leaderboard: makeLeaderboard(room) });
//     console.log("correctIndices = ",q.correctIndices);
// }

// function makeLeaderboard(room) {
//   return Array.from(room.players.values())
//     .map(p => ({ name: p.name, score: p.score }))
//     .sort((a,b)=>b.score-a.score);
// }



import { randomUUID } from "crypto";

const rooms = new Map();

export function initGameSockets(io) {
  io.on("connection", (socket) => {
    console.log("✅ Socket connected:", socket.id);

    socket.on("host:create_room", ({ quiz }) => {
      const roomCode = (Math.random().toString(36).slice(2, 6)).toUpperCase();
      rooms.set(roomCode, {
        hostId: socket.id,
        quiz,
        players: new Map(),
        currentQ: -1,
        endsAt: null
      });
      socket.join(roomCode);
      io.to(socket.id).emit("host:room_created", { roomCode });
      console.log("Room created", roomCode);
    });

    socket.on("player:join", ({ roomCode, name }) => {
      const room = rooms.get(roomCode);
      if (!room) return io.to(socket.id).emit("error", { message: "Room not found" });
      room.players.set(socket.id, { name, score: 0, answered: false });
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
        hasMultipleAnswers // Send this flag to the players
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
      io.to(room.hostId).emit("host:leaderboard", makeLeaderboard(room));
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
  console.log("correctIndices = ", q.correctIndices);
}

function makeLeaderboard(room) {
  return Array.from(room.players.values())
    .map(p => ({ name: p.name, score: p.score }))
    .sort((a, b) => b.score - a.score);
}
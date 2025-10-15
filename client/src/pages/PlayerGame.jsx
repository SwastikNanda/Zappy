import React, { useEffect, useState } from "react";
import { useSocket } from "../components/useSocket";
import { useSearchParams, useParams } from "react-router-dom";
export default function PlayerGame({ roomCode: propRoomCode, playerName: propPlayerName }) {
  const socket = useSocket();
  const [params] = useSearchParams();
  const { code: paramCode } = useParams();
  const roomCode = propRoomCode || paramCode;
  const playerName = propPlayerName || params.get("name") || "Player";
  const [question, setQuestion] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [result, setResult] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [timer, setTimer] = useState(0);
  useEffect(() => {
    if (!socket) return;
    socket.emit("player:join", { roomCode, name: playerName });
    socket.on("question:start", (q) => { setQuestion(q); setAnswered(false); setResult(null); const ms = q.endsAt - Date.now(); setTimer(Math.ceil(ms / 1000)); });
    socket.on("player:answer_result", ({ correct }) => { setResult(correct ? "✅ Correct!" : "❌ Wrong"); setAnswered(true); });
    socket.on("question:end", ({ correctIndex, leaderboard }) => { setResult(`⏳ Time's up! Correct answer: ${correctIndex}`); setLeaderboard(leaderboard || []); setAnswered(true); });
    socket.on("game:over", ({ leaderboard }) => { setQuestion(null); setResult("🎉 Game Over!"); setLeaderboard(leaderboard || []); });
    const tick = setInterval(() => setTimer(t => Math.max(0, t - 1)), 1000);
    return () => {
      clearInterval(tick);
      socket.off("question:start");
      socket.off("player:answer_result");
      socket.off("question:end");
      socket.off("game:over");
    };
  }, [socket, roomCode, playerName]);
  function sendAnswer(i) { if (!socket || answered) return; socket.emit("player:answer", { roomCode, choiceIndex: i }); setAnswered(true); }
  return (
    <div>
      <h2>Game Room: {roomCode}</h2>
      <h3>Player: {playerName}</h3>
      {question ? (
        <div>
          <h3>{question.text}</h3>
          <p>Time left: {timer}s</p>
          <ul>{question.choices.map((c, i) => (<li key={i}><button disabled={answered} onClick={() => sendAnswer(i)}>{c}</button></li>))}</ul>
        </div>
      ) : (<p>Waiting for host to start...</p>)}
      {result && <h3>{result}</h3>}
      {leaderboard.length > 0 && (<div><h3>📊 Leaderboard</h3><ol>{leaderboard.map((p, i) => (<li key={i}>{p.name} — {p.score}</li>))}</ol></div>)}
    </div>
  );
}
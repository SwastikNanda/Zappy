import React, { useEffect, useState } from "react";
import { useSocket } from "../components/useSocket";
import { Link } from "react-router-dom";
export default function HostPage({ roomCode }) {
  const socket = useSocket();
  const [players, setPlayers] = useState([]);
  const [lobbyCount, setLobbyCount] = useState(0);
  const [quiz, setQuiz] = useState(null);
  useEffect(() => {
    if (!socket) return;
    socket.emit('host:create_room', { quiz });
    socket.on('host:room_created', ({ roomCode: rc }) => { console.log('Room created server-side:', rc); });
    socket.on("host:players_update", ({ players }) => setPlayers(players));
    socket.on("host:leaderboard", (board) => setPlayers(board));
    socket.on("lobby:update", ({ count }) => setLobbyCount(count));
    socket.on("game:closed", () => { setPlayers([]); setLobbyCount(0); });
    return () => {
      socket.off('host:room_created');
      socket.off("host:players_update");
      socket.off("host:leaderboard");
      socket.off("lobby:update");
      socket.off("game:closed");
    };
  }, [socket]);
  function startGame() { if (!socket) return; socket.emit("host:next_question", { roomCode }); }
  return (
    <div>
      <h2>Hosting Room: {roomCode}</h2>
      <p>Share this code with players: <b>{roomCode}</b></p>
      <p>Players in lobby: {lobbyCount}</p>
      <button onClick={startGame}>Start Game</button>
      <h3>Players</h3>
      {players.length === 0 ? <p>No players yet...</p> : (<ul>{players.map((p, i) => (<li key={i}>{p.name} — {p.score}</li>))}</ul>)}
      <p><Link to="/">Back</Link></p>
    </div>
  );
}
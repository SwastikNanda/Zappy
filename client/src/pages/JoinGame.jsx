import React, { useEffect, useState } from "react";
import { useSocket } from "../components/useSocket";
import { useNavigate } from "react-router-dom";
export default function JoinPage({ roomCode, playerName }) {
  const socket = useSocket();
  const [lobbyCount, setLobbyCount] = useState(1);
  const navigate = useNavigate();
  useEffect(() => {
    if (!socket) return;
    socket.emit("player:join", { roomCode, name: playerName });
    socket.on("lobby:update", ({ count }) => setLobbyCount(count));
    socket.on("question:start", (q) => {
      navigate(`/game/${roomCode}?name=${encodeURIComponent(playerName)}`);
    });
    return () => {
      socket.off("lobby:update");
      socket.off("question:start");
    };
  }, [socket, roomCode, playerName, navigate]);
  return (
    <div>
      <h2>Room Code: {roomCode}</h2>
      <p>Welcome, {playerName}!</p>
      <p>Players in Lobby: {lobbyCount}</p>
      <p>Waiting for host to start...</p>
    </div>
  );
}
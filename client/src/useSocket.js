import { useEffect, useRef } from "react";
import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_API_URL || "http://localhost:5100";

export function useSocket() {
  const socketRef = useRef(null);
  if (!socketRef.current) {
    socketRef.current = io(SOCKET_URL, { withCredentials: true });
  }
  useEffect(() => {
    const s = socketRef.current;
    s.on("connect", () => console.log("✅ Socket connected:", s.id));
    s.on("disconnect", () => console.log("❌ Socket disconnected"));
    return () => { s.off("connect"); s.off("disconnect"); };
  }, []);
  return socketRef.current;
}
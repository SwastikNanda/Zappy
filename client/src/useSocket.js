import { useEffect, useRef } from "react";
import { io } from "socket.io-client";

export function useSocket() {
  const socketRef = useRef(null);
  if (!socketRef.current) {
    socketRef.current = io("http://localhost:5100", { withCredentials: true });
  }
  useEffect(() => {
    const s = socketRef.current;
    s.on("connect", () => console.log("✅ Socket connected:", s.id));
    s.on("disconnect", () => console.log("❌ Socket disconnected"));
    return () => { s.off("connect"); s.off("disconnect"); };
  }, []);
  return socketRef.current;
}
import { io } from "socket.io-client";
import { useEffect, useRef } from "react";
const URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:5100";
let socketSingleton = null;
export function useSocket() {
  const ref = useRef(null);
  if (!socketSingleton) {
    socketSingleton = io(URL, { transports: ["websocket"] });
  }
  ref.current = socketSingleton;
  useEffect(() => {
    const s = ref.current;
    if (!s) return;
    s.on("connect", () => console.log("✅ Socket connected:", s.id));
    s.on("disconnect", () => console.log("❌ Socket disconnected"));
    s.on("connect_error", (err) => console.error("Socket connect error:", err.message));
    return () => {
      s.off("connect"); s.off("disconnect"); s.off("connect_error");
    };
  }, []);
  return ref.current;
}

import { useState } from "react";
import { motion } from "framer-motion";
import {
  startLobbyMusic,
  stopMusic,
  isMusicMuted,
  toggleMusicMuted,
} from "../utils/musicEngine";

export default function BackgroundMusic() {
  const [muted, setMuted] = useState(true);

  const toggle = () => {
    if (muted) {
      startLobbyMusic();
    } else {
      stopMusic();
    }
    toggleMusicMuted();
    setMuted(!muted);
  };

  return (
    <motion.button
      onClick={toggle}
      className="fixed bottom-6 right-6 z-50 bg-white/20 backdrop-blur-md border border-white/30 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:bg-white/30 transition-colors"
      whileTap={{ scale: 0.9 }}
      title={muted ? "Unmute" : "Mute"}
    >
      {muted ? (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707A1 1 0 0112 5v14a1 1 0 01-1.707.707L5.586 15z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707A1 1 0 0112 5v14a1 1 0 01-1.707.707L5.586 15z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072M18.364 5.636a9 9 0 010 12.728" />
        </svg>
      )}
    </motion.button>
  );
}

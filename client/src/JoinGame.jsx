// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function JoinGame() {
//   const [code, setCode] = useState("");
//   const [name, setName] = useState("");
//   const navigate = useNavigate();

//   function join() {
//     if (code && name) {
//       navigate(`/play/${code}?name=${encodeURIComponent(name)}`);
//     }
//   }

//   return (
//     <div>
//       <h2>Join Game</h2>
//       <input placeholder="Room code" value={code} onChange={e=>setCode(e.target.value)} /><br />
//       <input placeholder="Your name" value={name} onChange={e=>setName(e.target.value)} /><br />
//       <button onClick={join}>Join</button>
//     </div>
//   );
// }

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Box, Card, TextField, Button, Typography } from "@mui/material";
// import { Login } from "@mui/icons-material";
// import GameLayout from "./components/GameLayout";

// export default function JoinGame() {
//   const [code, setCode] = useState("");
//   const [name, setName] = useState("");
//   const navigate = useNavigate();

//   function join() {
//     if (code && name) {
//       navigate(`/play/${code}?name=${encodeURIComponent(name)}`);
//     }
//   }

//   return (
//      <GameLayout title="Join a Game">
//     <Box className="flex flex-col items-center justify-center min-h-screen p-6">
//       <Card className="p-8 w-full max-w-md bg-[#F8FAFC]/95 backdrop-blur-sm shadow-xl border border-[#BCCCDC]/40">
//         <Typography variant="h5" className="text-[#64748B] font-semibold mb-6 text-center">
//           Join a Game
//         </Typography>
//         <TextField
//           label="Room Code"
//           value={code}
//           onChange={(e) => setCode(e.target.value.toUpperCase())}
//           fullWidth
//           margin="normal"
//           InputProps={{ style: { borderRadius: 8 } }}
//         />
//         <TextField
//           label="Your Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           fullWidth
//           margin="normal"
//           InputProps={{ style: { borderRadius: 8 } }}
//         />
//         <Button
//           fullWidth
//           variant="contained"
//           startIcon={<Login />}
//           onClick={join}
//           sx={{ mt: 3, backgroundColor: "#64748B", "&:hover": { backgroundColor: "#475569" } }}
//         >
//           Join Game
//         </Button>
//       </Card>
//     </Box>
//     </GameLayout>
//   );
// }

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Card, TextField, Button, Typography } from "@mui/material";
import { Login } from "@mui/icons-material";
import { motion } from "framer-motion";

export default function JoinGame() {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const join = () => {
    if (code && name) {
      navigate(`/play/${code}?name=${encodeURIComponent(name)}`);
    }
  };

  // Random floating emojis (you can customize them)
  const emojis = ["⚡", "🎯", "🎉", "🔥", "💡", "🧠", "🎵", "⭐", "🎮", "🥳","⚡", "🎯", "🎉", "🔥", "💡", "🧠", "🎵", "⭐", "🎮", "🥳"];

  return (
    <Box
      className="flex flex-col items-center justify-center min-h-screen relative overflow-hidden"
      sx={{
        background: "radial-gradient(circle at 30% 20%, #7E22CE, #4C1D95, #1E1B4B)",
      }}
    >
      {/* Floating emoji background */}
      {emojis.map((emoji, i) => (
        <motion.div
          key={i}
          className="absolute text-5xl select-none"
          style={{
            top: `${Math.random() * 90}vh`,
            left: `${Math.random() * 90}vw`,
            opacity: 0.15 + Math.random() * 0.3,
          }}
          animate={{
            y: [0, -25, 0],
            x: [0, 10, 0],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 5 + Math.random() * 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 2,
          }}
        >
          {emoji}
        </motion.div>
      ))}

      {/* Central animated card */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="z-10 w-full max-w-md px-4"
        style={{ marginTop: "80px" }}
      >
        <Card
          elevation={10}
          className="p-8 bg-white/10 backdrop-blur-lg border border-white/20 shadow-[0_0_25px_rgba(255,255,255,0.15)] text-center"
          sx={{ borderRadius: "22px" }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              mb: 2,
              background: "linear-gradient(90deg,#FDE68A,#F9A8D4,#C084FC)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Join the Zappy Challenge ⚡
          </Typography>

          <Typography
            variant="body1"
            sx={{ color: "rgba(15, 15, 15, 0.8)", mb: 4 }}
          >
            Enter your code and name — the quiz arena awaits you!
          </Typography>

          <TextField
            label="Room Code"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            fullWidth
            margin="normal"
            variant="outlined"
            InputProps={{
              style: {
                borderRadius: 12,
                color: "#0c0c0cff",
                background: "rgba(255,255,255,0.15)",
              },
            }}
            InputLabelProps={{ style: { color: "#ddd" } }}
          />

          <TextField
            label="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
            InputProps={{
              style: {
                borderRadius: 12,
                color: "#0f0f0fff",
                background: "rgba(255,255,255,0.15)",
              },
            }}
            InputLabelProps={{ style: { color: "#ddd" } }}
          />

          <Button
            fullWidth
            variant="contained"
            startIcon={<Login />}
            onClick={join}
            sx={{
              mt: 3,
              py: 1.4,
              fontWeight: 600,
              fontSize: "1.1rem",
              borderRadius: "12px",
              textTransform: "none",
              background: "linear-gradient(90deg,#FDE68A,#F9A8D4,#C084FC)",
              color: "#333",
              boxShadow: "0 0 25px rgba(255,215,0,0.3)",
              "&:hover": {
                boxShadow: "0 0 35px rgba(255,215,0,0.6)",
                transform: "scale(1.05)",
              },
              transition: "all 0.3s ease",
            }}
          >
            Join Game
          </Button>
        </Card>
      </motion.div>
    </Box>
  );
}

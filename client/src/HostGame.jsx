// import { useState } from "react";
// import { useSocket } from "./useSocket";
// import { useNavigate } from "react-router-dom";

// export default function HostGame() {
//   const socket = useSocket();
//   const [roomCode, setRoomCode] = useState(null);
//   const [players, setPlayers] = useState([]);
//   const navigate = useNavigate();

//   function createRoom() {
//     const quiz = {
//       questions: [
//         { text: "2+2?", choices: ["3","4","5"], correctIndex: 1, timeLimitSec: 10 },
//         { text: "Capital of France?", choices: ["London","Paris","Rome"], correctIndex: 1, timeLimitSec: 10 }
//       ]
//     };
//     socket.emit("host:create_room", { quiz });
//     socket.on("host:room_created", ({ roomCode }) => {
//       setRoomCode(roomCode);
//       navigate("/host?room=" + roomCode);
//     });
//     socket.on("host:players_update", ({ players }) => setPlayers(players));
//   }

//   function nextQuestion() {
//     socket.emit("host:next_question", { roomCode });
//   }

//   return (
//     <div>
//       {!roomCode ? (
//         <button onClick={createRoom}>Create Room</button>
//       ) : (
//         <div>
//           <h2>Room Code: {roomCode}</h2>
//           <h3>Players</h3>
//           <ul>{players.map((p,i)=><li key={i}>{p.name}</li>)}</ul>
//           <button onClick={nextQuestion}>Start / Next Question</button>
//         </div>
//       )}
//     </div>
//   );
// }


// import { useState } from "react";
// import { useSocket } from "./useSocket";
// import { useNavigate } from "react-router-dom";
// import QuizEditor from "./QuizEditor"; // Import the new component

// export default function HostGame() {
//   const socket = useSocket();
//   const [roomCode, setRoomCode] = useState(null);
//   const [players, setPlayers] = useState([]);
//   const [quizCreated, setQuizCreated] = useState(false);
//   const navigate = useNavigate();

//   // Function to create a room with a specific quiz object
//   function createRoom(quiz) {
//     socket.emit("host:create_room", { quiz });
//     socket.on("host:room_created", ({ roomCode }) => {
//       setRoomCode(roomCode);
//       setQuizCreated(true);
//       navigate("/host?room=" + roomCode);
//     });
//     socket.on("host:players_update", ({ players }) => setPlayers(players));
//   }

//   // Use the pre-defined sample quiz
//   function useSampleQuiz() {
//     const sampleQuiz = {
//       questions: [
//         { text: "2+2?", choices: ["3", "4", "5"], correctIndex: 1, timeLimitSec: 10 },
//         { text: "Capital of France?", choices: ["London", "Paris", "Rome"], correctIndex: 1, timeLimitSec: 10 },
//       ],
//     };
//     createRoom(sampleQuiz);
//   }

//   function nextQuestion() {
//     socket.emit("host:next_question", { roomCode });
//   }

//   if (roomCode) {
//     // Already in a room
//     return (
//       <div>
//         <h2>Room Code: {roomCode}</h2>
//         <h3>Players</h3>
//         <ul>
//           {players.map((p, i) => (
//             <li key={i}>{p.name}</li>
//           ))}
//         </ul>
//         <button onClick={nextQuestion}>Start / Next Question</button>
//       </div>
//     );
//   }

//   // Not in a room, show options to create one
//   return (
//     <div>
//       {!quizCreated ? (
//         <>
//           {/* <h2>Create or Use Sample Quiz</h2>
//           <button onClick={useSampleQuiz}>Use Sample Quiz</button>
//           <hr /> */}
//           <QuizEditor onSave={createRoom} />
//         </>
//       ) : (
//         <p>Creating room...</p> // This state is short-lived as navigation happens quickly
//       )}
//     </div>
//   );
// }



// import { useState } from "react";
// import { useSocket } from "./useSocket";
// import { useNavigate } from "react-router-dom";
// import QuizEditor from "./QuizEditor";
// import { Button, Card, Typography, Box, List, ListItem, Divider } from "@mui/material";
// import { CopyAll, PlayArrow } from "@mui/icons-material";
// import GameLayout from "./components/GameLayout";

// export default function HostGame() {
//   const socket = useSocket();
//   const [roomCode, setRoomCode] = useState(null);
//   const [players, setPlayers] = useState([]);
//   const [quizCreated, setQuizCreated] = useState(false);
//   const navigate = useNavigate();

//   function createRoom(quiz) {
//     socket.emit("host:create_room", { quiz });
//     socket.on("host:room_created", ({ roomCode }) => {
//       setRoomCode(roomCode);
//       setQuizCreated(true);
//     });
//     socket.on("host:players_update", ({ players }) => setPlayers(players));
//   }

//   function useSampleQuiz() {
//     const sampleQuiz = {
//       questions: [
//         { text: "2 + 2 ?", choices: ["3", "4", "5", "6"], correctIndex: 1, timeLimitSec: 10 },
//         { text: "Capital of France?", choices: ["Paris", "London", "Rome", "Berlin"], correctIndex: 0, timeLimitSec: 10 },
//       ],
//     };
//     createRoom(sampleQuiz);
//   }

//   function nextQuestion() {
//     socket.emit("host:next_question", { roomCode });
//   }

//   if (roomCode) {
//     return (
//         <GameLayout title={`Room Code: ${roomCode}`}>
//       <Box className="flex flex-col items-center p-6 space-y-6">
//         <Card className="p-6 w-full max-w-lg bg-[#F8FAFC]/95 backdrop-blur-sm shadow-xl border border-[#BCCCDC]/40 text-center">
//           <Typography variant="h5" className="text-[#64748B] font-semibold mb-4">
//             Room Code
//           </Typography>
//           <Typography variant="h3" className="font-bold text-[#334155] tracking-widest mb-4">
//             {roomCode}
//           </Typography>
//           <Button
//             variant="outlined"
//             onClick={() => navigator.clipboard.writeText(roomCode)}
//             startIcon={<CopyAll />}
//             className="border-[#64748B] text-[#64748B] hover:bg-[#D9EAFD]"
//           >
//             Copy Code
//           </Button>

//           <Divider className="my-4" />

//           <Typography variant="h6" className="text-[#64748B] mb-2">Players Joined</Typography>
//           {players.length === 0 ? (
//             <Typography variant="body2" color="text.secondary">Waiting for players...</Typography>
//           ) : (
//             <List>
//               {players.map((p, i) => (
//                 <ListItem key={i} sx={{ justifyContent: "center" }}>
//                   {p.name}
//                 </ListItem>
//               ))}
//             </List>
//           )}

//           <Button
//             variant="contained"
//             startIcon={<PlayArrow />}
//             onClick={nextQuestion}
//             sx={{ mt: 2, backgroundColor: "#64748B", "&:hover": { backgroundColor: "#475569" } }}
//           >
//             Start / Next Question
//           </Button>
//         </Card>
//       </Box>
//       </GameLayout>
//     );
//   }

//   return (
//     <GameLayout title="Host a Game">
//     <Box className="flex flex-col items-center p-6 space-y-6">
//       {!quizCreated ? (
//         <>
//           <QuizEditor onSave={createRoom} />
//         </>
//       ) : (
//         <Typography variant="h6" color="text.secondary">Creating room...</Typography>
//       )}
//     </Box>
//     </GameLayout>
//   );
// }



// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useSocket } from "./useSocket";
// import { Card, Typography, Button, Box } from "@mui/material";
// import { motion } from "framer-motion";
// import QuizEditor from "./QuizEditor";

// export default function HostGame() {
//   const socket = useSocket();
//   const [roomCode, setRoomCode] = useState(null);
//   const [players, setPlayers] = useState([]);
//   const navigate = useNavigate();

//   const emojis = ["⚡", "🎯", "🎉", "🔥", "💡", "🧠", "🎵", "⭐", "🎮", "🥳",];

//   function createRoom(quiz) {
//     socket.emit("host:create_room", { quiz });
//     socket.on("host:room_created", ({ roomCode }) => setRoomCode(roomCode));
//     socket.on("host:players_update", ({ players }) => setPlayers(players));
//   }

//   function nextQuestion() {
//     socket.emit("host:next_question", { roomCode });
//   }

//   if (roomCode) {
//     return (
//       <Box
//         className="flex flex-col items-center justify-center min-h-screen relative overflow-hidden"
//         sx={{
//           background:
//             "radial-gradient(circle at 20% 30%, #7E22CE, #4C1D95, #1E1B4B)",
//         }}
//       >
//         {emojis.map((emoji, i) => (
//           <motion.div
//             key={i}
//             className="absolute text-5xl select-none"
//             style={{
//               top: `${Math.random() * 90}vh`,
//               left: `${Math.random() * 90}vw`,
//               opacity: 0.15 + Math.random() * 0.3,
//             }}
//             animate={{
//               y: [0, -25, 0],
//               x: [0, 10, 0],
//               rotate: [0, 10, -10, 0],
//             }}
//             transition={{
//               duration: 6 + Math.random() * 3,
//               repeat: Infinity,
//               ease: "easeInOut",
//               delay: Math.random() * 2,
//             }}
//           >
//             {emoji}
//           </motion.div>
//         ))}

//         <motion.div
//           initial={{ opacity: 0, y: 40 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="z-10 w-full max-w-xl"
//         >
//           <Card
//             className="p-8 bg-white/10 backdrop-blur-lg border border-white/20 shadow-[0_0_25px_rgba(255,255,255,0.15)] text-center"
//             sx={{ borderRadius: "22px" }}
//           >
//             <Typography
//               variant="h3"
//               sx={{
//                 fontWeight: 700,
//                 mb: 2,
//                 background:
//                   "linear-gradient(90deg,#FDE68A,#F9A8D4,#C084FC)",
//                 WebkitBackgroundClip: "text",
//                 WebkitTextFillColor: "transparent",
//               }}
//             >
//               Room Code: {roomCode}
//             </Typography>

//             <Typography
//               variant="body1"
//               sx={{ color: "rgba(20, 23, 65, 0.8)", mb: 3 }}
//             >
//               Share this code with players to join the fun 🎮
//             </Typography>

//             <ul style={{ color: "#020202ff", listStyle: "none", padding: 0 }}>
//               {players.map((p, i) => (
//                 <li key={i}>{p.name}</li>
//               ))}
//             </ul>

//             <Button
//               variant="contained"
//               onClick={nextQuestion}
//               sx={{
//                 mt: 3,
//                 py: 1.4,
//                 borderRadius: "12px",
//                 background:
//                   "linear-gradient(90deg,#FDE68A,#F9A8D4,#C084FC)",
//                 color: "#333",
//                 "&:hover": {
//                   transform: "scale(1.05)",
//                   boxShadow: "0 0 30px rgba(255,215,0,0.4)",
//                 },
//               }}
//             >
//               Start / Next Question
//             </Button>
//           </Card>
//         </motion.div>
//       </Box>
//     );
//   }

//   return (
//     <Box
//       className="flex flex-col items-center justify-center min-h-screen relative overflow-hidden marginTop: '80px'"
//       sx={{
//         background: "radial-gradient(circle at 20% 30%, #7E22CE, #4C1D95, #1E1B4B)",
//       }}
//     >
//       {emojis.map((emoji, i) => (
//         <motion.div
//           key={i}
//           className="absolute text-5xl select-none"
//           style={{
//             top: `${Math.random() * 90}vh`,
//             left: `${Math.random() * 90}vw`,
//             opacity: 0.15 + Math.random() * 0.3,
//           }}
//           animate={{
//             y: [0, -25, 0],
//             x: [0, 10, 0],
//             rotate: [0, 10, -10, 0],
//           }}
//           transition={{
//             duration: 6 + Math.random() * 3,
//             repeat: Infinity,
//             ease: "easeInOut",
//             delay: Math.random() * 2,
//           }}
//         >
//           {emoji}
//         </motion.div>
//       ))}

//       <motion.div
//         initial={{ opacity: 0, y: 50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//         className="z-10 w-full max-w-4xl px-6"
//       >
//         <Card
//           className="p-8 bg-white/10 backdrop-blur-lg border border-white/20 shadow-[0_0_25px_rgba(255,255,255,0.15)] text-center marginTop: '80px'"
//           sx={{ borderRadius: "22px" }}
//         >
//           <Typography
//             variant="h3"
//             sx={{
//               fontWeight: 700,
//               // mb: 3,
//               mt:6,
//               background:
//                 "linear-gradient(90deg,#FDE68A,#F9A8D4,#C084FC)",
//               WebkitBackgroundClip: "text",
//               WebkitTextFillColor: "transparent",
//             }}
//           >
//             Host Your Zappy Quiz ⚡
//           </Typography>

//           <Typography
//             variant="body1"
//             sx={{ color: "rgba(57, 37, 110, 0.8)", mb: 4 }}
//           >
//             Create your questions and start the challenge instantly!
//           </Typography>

//           <QuizEditor onSave={createRoom} />
//         </Card>
//       </motion.div>
//     </Box>
//   );
// }


// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useSocket } from "./useSocket";
// import { Card, Typography, Button, Box } from "@mui/material";
// import { motion } from "framer-motion";
// import QuizEditor from "./QuizEditor";

// export default function HostGame() {
//   const socket = useSocket();
//   const [roomCode, setRoomCode] = useState(null);
//   const [players, setPlayers] = useState([]);
//   const navigate = useNavigate();

//   const emojis = ["⚡", "🎯", "🎉", "🔥", "💡", "🧠", "🎵", "⭐", "🎮", "🥳"];

//   function createRoom(quiz) {
//     socket.emit("host:create_room", { quiz });
//     socket.on("host:room_created", ({ roomCode }) => setRoomCode(roomCode));
//     socket.on("host:players_update", ({ players }) => setPlayers(players));
//   }

//   function nextQuestion() {
//     socket.emit("host:next_question", { roomCode });
//   }

//   // ---------- GAME ROOM UI ----------
//   if (roomCode) {
//     return (
//       <Box
//         className="flex flex-col items-center justify-center min-h-screen relative overflow-hidden"
//         sx={{
//           background:
//             "radial-gradient(circle at 20% 30%, #7E22CE, #4C1D95, #1E1B4B)",
//         }}
//       >
//         {/* Floating Emojis */}
//         {emojis.map((emoji, i) => (
//           <motion.div
//             key={i}
//             className="absolute text-5xl select-none"
//             style={{
//               top: `${Math.random() * 90}vh`,
//               left: `${Math.random() * 90}vw`,
//               opacity: 0.15 + Math.random() * 0.3,
//             }}
//             animate={{
//               y: [0, -25, 0],
//               x: [0, 10, 0],
//               rotate: [0, 10, -10, 0],
//             }}
//             transition={{
//               duration: 6 + Math.random() * 3,
//               repeat: Infinity,
//               ease: "easeInOut",
//               delay: Math.random() * 2,
//             }}
//           >
//             {emoji}
//           </motion.div>
//         ))}

//         {/* Room Display */}
//         <motion.div
//           initial={{ opacity: 0, y: 40 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="z-10 w-full max-w-xl"
//         >
//           <Card
//             className="p-8 bg-white/10 backdrop-blur-lg border border-white/20 shadow-[0_0_25px_rgba(255,255,255,0.15)] text-center"
//             sx={{
//               borderRadius: "22px",
//               mt: "-80px", // centers better vertically
//             }}
//           >
//             <Typography
//               variant="h3"
//               sx={{
//                 fontWeight: 700,
//                 mb: 2,
//                 background:
//                   "linear-gradient(90deg,#FDE68A,#F9A8D4,#C084FC)",
//                 WebkitBackgroundClip: "text",
//                 WebkitTextFillColor: "transparent",
//               }}
//             >
//               Room Code: {roomCode}
//             </Typography>

//             <Typography
//               variant="body1"
//               sx={{ color: "rgba(255,255,255,0.8)", mb: 3 }}
//             >
//               Share this code with your friends to join 🎮
//             </Typography>

//             <ul style={{ color: "#FFF", listStyle: "none", padding: 0 }}>
//               {players.map((p, i) => (
//                 <li key={i} style={{ fontSize: "1.1rem" }}>
//                   {p.name}
//                 </li>
//               ))}
//             </ul>

//             <Button
//               variant="contained"
//               onClick={nextQuestion}
//               sx={{
//                 mt: 4,
//                 py: 1.3,
//                 px: 4,
//                 borderRadius: "12px",
//                 fontWeight: 600,
//                 background:
//                   "linear-gradient(90deg,#FDE68A,#F9A8D4,#C084FC)",
//                 color: "#333",
//                 "&:hover": {
//                   transform: "scale(1.05)",
//                   boxShadow: "0 0 30px rgba(255,215,0,0.4)",
//                 },
//               }}
//             >
//               Start / Next Question
//             </Button>
//           </Card>
//         </motion.div>
//       </Box>
//     );
//   }

//   // ---------- QUIZ CREATION UI ----------
//   return (
//     <Box
//       className="flex flex-col items-center justify-center min-h-screen relative overflow-hidden"
//       sx={{
//         background:
//           "radial-gradient(circle at 20% 30%, #7E22CE, #4C1D95, #1E1B4B)",
//       }}
//     >
//       {emojis.map((emoji, i) => (
//         <motion.div
//           key={i}
//           className="absolute text-5xl select-none"
//           style={{
//             top: `${Math.random() * 90}vh`,
//             left: `${Math.random() * 90}vw`,
//             opacity: 0.15 + Math.random() * 0.3,
//           }}
//           animate={{
//             y: [0, -25, 0],
//             x: [0, 10, 0],
//             rotate: [0, 10, -10, 0],
//           }}
//           transition={{
//             duration: 6 + Math.random() * 3,
//             repeat: Infinity,
//             ease: "easeInOut",
//             delay: Math.random() * 2,
//           }}
//         >
//           {emoji}
//         </motion.div>
//       ))}

//       <motion.div
//         initial={{ opacity: 0, y: 50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//         className="z-10 w-full max-w-4xl px-6"
//       >
//         <Card
//           className="p-8 bg-white/10 backdrop-blur-lg border border-white/20 shadow-[0_0_25px_rgba(255,255,255,0.15)] text-center"
//           sx={{
//             borderRadius: "22px",
//             mt: "-60px", // centers nicely
//           }}
//         >
//           <Typography
//             variant="h3"
//             sx={{
//               fontWeight: 700,
//               mt: 4,
//               mb: 2,
//               background:
//                 "linear-gradient(90deg,#FDE68A,#F9A8D4,#C084FC)",
//               WebkitBackgroundClip: "text",
//               WebkitTextFillColor: "transparent",
//             }}
//           >
//             Host Your Zappy Quiz ⚡
//           </Typography>

//           <Typography
//             variant="body1"
//             sx={{ color: "rgba(255,255,255,0.85)", mb: 4 }}
//           >
//             Create fun questions and invite players instantly!
//           </Typography>

//           <QuizEditor onSave={createRoom} />
//         </Card>
//       </motion.div>
//     </Box>
//   );
// }

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "./useSocket";
import { Card, Typography, Button, Box } from "@mui/material";
import { motion } from "framer-motion";
import QuizEditor from "./QuizEditor";

export default function HostGame() {
  const socket = useSocket();
  const [roomCode, setRoomCode] = useState(null);
  const [players, setPlayers] = useState([]);
  const navigate = useNavigate();

  const emojis = ["⚡", "🎯", "🎉", "🔥", "💡", "🧠", "🎵", "⭐", "🎮", "🥳",];

  function createRoom(quiz) {
    socket.emit("host:create_room", { quiz });
    socket.on("host:room_created", ({ roomCode }) => setRoomCode(roomCode));
    socket.on("host:players_update", ({ players }) => setPlayers(players));
  }

  function nextQuestion() {
    socket.emit("host:next_question", { roomCode });
  }

  if (roomCode) {
    return (
      <Box
        className="flex flex-col items-center justify-center min-h-screen relative overflow-hidden"
        sx={{
          background:
            "radial-gradient(circle at 20% 30%, #7E22CE, #4C1D95, #1E1B4B)",
        }}
      >
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
              duration: 6 + Math.random() * 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          >
            {emoji}
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="z-10 w-full max-w-xl"
        >
          <Card
            className="p-8 bg-white/10 backdrop-blur-lg border border-white/20 shadow-[0_0_25px_rgba(255,255,255,0.15)] text-center mt-20"
            sx={{ borderRadius: "22px"}}
          >
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                mb: 2,
                background:
                  "linear-gradient(90deg,#FDE68A,#F9A8D4,#C084FC)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Room Code: {roomCode}
            </Typography>

            <Typography
              variant="body1"
              sx={{ color: "rgba(20, 23, 65, 0.8)", mb: 3 }}
            >
              Share this code with players to join the fun 🎮
            </Typography>

            <ul style={{ color: "#020202ff", listStyle: "none", padding: 0 }}>
              {players.map((p, i) => (
                <li key={i}>{p.name}</li>
              ))}
            </ul>

            <Button
              variant="contained"
              onClick={nextQuestion}
              sx={{
                mt: 3,
                py: 1.4,
                borderRadius: "12px",
                background:
                  "linear-gradient(90deg,#FDE68A,#F9A8D4,#C084FC)",
                color: "#333",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0 0 30px rgba(255,215,0,0.4)",
                },
              }}
            >
              Start / Next Question
            </Button>
          </Card>
        </motion.div>
      </Box>
    );
  }

  return (
    <Box
      className="flex flex-col items-center justify-center min-h-screen relative overflow-hidden marginTop: '80px'"
      sx={{
        background: "radial-gradient(circle at 20% 30%, #7E22CE, #4C1D95, #1E1B4B)",
      }}
    >
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
            duration: 6 + Math.random() * 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 2,
          }}
        >
          {emoji}
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="z-10 w-full max-w-4xl px-6"
      >
        <Card
          className="p-8 bg-white/10 backdrop-blur-lg border border-white/20 shadow-[0_0_25px_rgba(255,255,255,0.15)] text-center marginTop: '80px'"
          sx={{ borderRadius: "22px" }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              // mb: 3,
              mt:6,
              background:
                "linear-gradient(90deg,#FDE68A,#F9A8D4,#C084FC)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Host Your Zappy Quiz ⚡
          </Typography>

          <Typography
            variant="body1"
            sx={{ color: "rgba(57, 37, 110, 0.8)", mb: 4 }}
          >
            Create your questions and start the challenge instantly!
          </Typography>

          <QuizEditor onSave={createRoom} />
        </Card>
      </motion.div>
    </Box>
  );
}
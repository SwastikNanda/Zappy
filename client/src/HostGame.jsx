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
//             className="p-8 bg-white/10 backdrop-blur-lg border border-white/20 shadow-[0_0_25px_rgba(255,255,255,0.15)] text-center mt-20"
//             sx={{ borderRadius: "22px"}}
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

//   return (
//     <Box
//       className="flex flex-col items-center justify-center min-h-screen relative overflow-hidden"
//       sx={{
//         background:
//           "radial-gradient(circle at 20% 30%, #7E22CE, #4C1D95, #1E1B4B)",
//       }}
//     >
//       <style>
//         {`
//         @keyframes pulseGlow {
//           0% { box-shadow: 0 0 10px rgba(253,230,138,0.3); }
//           50% { box-shadow: 0 0 25px rgba(249,168,212,0.8); }
//           100% { box-shadow: 0 0 10px rgba(253,230,138,0.3); }
//         }
//         `}
//       </style>

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

//       {roomCode ? (
//         <motion.div
//           initial={{ opacity: 0, y: 40 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="z-10 w-full max-w-xl"
          
//         >
//           <Card
//             className="p-8 bg-white/10 backdrop-blur-lg border border-white/20 text-center mt-20"
//             sx={{
//               borderRadius: "22px",
//               animation: "pulseGlow 2.5s infinite ease-in-out",
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
//               sx={{ color: "rgba(23, 21, 53, 0.85)", mb: 3 }}
//             >
//               Share this code with players to join the fun 🎮
//             </Typography>

//             <ul style={{ color: "#1a264fff", listStyle: "none", padding: 0 }}>
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
//       ) : (
//         <motion.div
//           initial={{ opacity: 0, y: 50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="z-10 w-full max-w-4xl px-6"
//         >
//           <Card
//             className="p-8 bg-white/10 backdrop-blur-lg border border-white/20 text-center"
//             sx={{
//               borderRadius: "22px",
//               animation: "pulseGlow 2.5s infinite ease-in-out",
//               marginTop: "60px",
//             }}
//           >
//             <Typography
//               variant="h3"
//               sx={{
//                 fontWeight: 700,
//                 mt: 6,
//                 background:
//                   "linear-gradient(90deg,#FDE68A,#F9A8D4,#C084FC)",
//                 WebkitBackgroundClip: "text",
//                 WebkitTextFillColor: "transparent",
//               }}
//             >
//               Host Your Zappy Quiz ⚡
//             </Typography>

//             <Typography
//               variant="body1"
//               sx={{ color: "rgba(37, 31, 93, 0.8)", mb: 4 }}
//             >
//               Create your questions and start the challenge instantly!
//             </Typography>

//             <QuizEditor onSave={createRoom} />
//           </Card>
//         </motion.div>
//       )}
//     </Box>
//   );
// }


// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useSocket } from "./useSocket";
// import { Card, Typography, Button, Box, Divider } from "@mui/material";
// import { motion } from "framer-motion";
// import { AnimatePresence } from "framer-motion";
// import QuizEditor from "./QuizEditor";
// import SavedQuizzes from "./SavedQuizzes";


// export default function HostGame() {
//   const socket = useSocket();
//   const [roomCode, setRoomCode] = useState(null);
//   const [players, setPlayers] = useState([]);
//   const [leaderboard, setLeaderboard] = useState([]);
//   const navigate = useNavigate();
//   const roomLink = `${window.location.origin}/play/${roomCode}`;

//   const emojis = ["⚡", "🎯", "🎉", "🔥", "💡", "🧠", "🎵", "⭐", "🎮", "🥳"];

//   function createRoom(quiz) {
//     socket.emit("host:create_room", { quiz });
//     socket.on("host:room_created", ({ roomCode }) => setRoomCode(roomCode));
//     socket.on("host:players_update", ({ players }) => setPlayers(players));
//     socket.on("leaderboard:update", ({ leaderboard }) =>
//       setLeaderboard(leaderboard)
//     );
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

//         {/* 🏆 Live Leaderboard */}
//         {leaderboard.length > 0 && (
//           <motion.div
//             initial={{ x: 300, opacity: 0 }}
//             animate={{ x: 0, opacity: 1 }}
//             transition={{ duration: 0.6 }}
//             className="absolute right-6 top-6 z-20"
//             style={{ top: "100px" }} // ✅ offset to avoid navbar
//           >
//             <Card
//               className="p-4 bg-white/20 backdrop-blur-md border border-white/40"
//               sx={{
//                 borderRadius: "16px",
//                 color: "#1E1B4B",
//                 animation: "pulseGlow 3s infinite ease-in-out",
//                 minWidth: "220px",
//               }}
//             >
//               <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
//                 🏆 Live Leaderboard
//               </Typography>
//               <Divider sx={{ mb: 1, borderColor: "rgba(255,255,255,0.3)" }} />
//               <ol style={{ listStyle: "none", padding: 0, margin: 0 }}>
//                 {leaderboard.slice(0, 5).map((p, i) => (
//                   <li
//                     key={i}
//                     style={{
//                       margin: "6px 0",
//                       fontWeight: i === 0 ? 800 : 500,
//                       color: i === 0 ? "#171d35ff" : "#1f1f47ff",
//                     }}
//                   >
//                     {i + 1}. {p.name} — {p.score}
//                   </li>
//                 ))}
//               </ol>
//             </Card>
//           </motion.div>
//         )}

//         {/* Main Host Card */}
//         <motion.div
//           initial={{ opacity: 0, y: 40 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="z-10 w-full max-w-xl"
//         >
//           <Card
//             className="p-8 bg-white/10 backdrop-blur-lg border border-white/20 shadow-[0_0_25px_rgba(255,255,255,0.15)] text-center mt-20"
//             sx={{ borderRadius: "22px" }}
//           >
//             <Typography
//               variant="h3"
//               sx={{
//                 fontWeight: 700,
//                 mb: 2,
//                 background: "linear-gradient(90deg,#FDE68A,#F9A8D4,#C084FC)",
//                 WebkitBackgroundClip: "text",
//                 WebkitTextFillColor: "transparent",
//               }}>
//               Room Code: {roomCode}
//             </Typography>

//             <Typography
//               variant="h5"
//               sx={{
//                 fontWeight:300,
//                 mb: 1,
//                 background: "radial-gradient(circle at 20% 30%, #bbb4c2ff, #8068a5ff, #3d3983ff)",
//                 WebkitBackgroundClip: "text",
//                 WebkitTextFillColor: "transparent",
//               }}
//             >
//               <a href={roomLink} color="linear-gradient(90deg,#FDE68A,#F9A8D4,#C084FC)"> {roomLink}</a>
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

//   // Default Host (Before Room Created)
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
//              sx={{
//               borderRadius: "22px",
//               animation: "pulseGlow 2.5s infinite ease-in-out",
//               marginTop: "60px",
//             }}
//         >
//           <Typography
//             variant="h3"
//             sx={{
//               fontWeight: 700,
//               mt: 6,
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



import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "./useSocket";
import { Card, Typography, Button, Box, Divider } from "@mui/material";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import QuizEditor from "./QuizEditor";
import SavedQuizzes from "./SavedQuizzes";
import { QRCodeCanvas } from "qrcode.react";
import API from "./api";
import Leaderboard from "./components/Leaderboard";
import {
  playJoinSound,
  playQuestionStartSound,
  playTimeUpSound,
  playGameOverSound,
  playRoomCreatedSound,
} from "./utils/sounds";
import {
  startLobbyMusic,
  startQuestionMusic,
  setPanic,
  stopMusic,
  toggleMusicMuted,
  isMusicMuted,
} from "./utils/musicEngine";


export default function HostGame() {
  const socket = useSocket();
  const [roomCode, setRoomCode] = useState(null);
  const [players, setPlayers] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [activeTab, setActiveTab] = useState("create"); // create | saved
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [questionEnded, setQuestionEnded] = useState(false);
  const [answerDistribution, setAnswerDistribution] = useState([]);
  const [correctIndices, setCorrectIndices] = useState([]);
  const [totalAnswered, setTotalAnswered] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [timer, setTimer] = useState(0);
  const [timeLimit, setTimeLimit] = useState(20);
  const navigate = useNavigate();
  const roomLink = `${window.location.origin}/play/${roomCode}`;

  const emojis = ["⚡", "🎯", "🎉", "🔥", "💡", "🧠", "🎵", "⭐", "🎮", "🥳"];

  const [quizCreated, setQuizCreated] = useState(false);
  const [musicMuted, setMusicMuted] = useState(isMusicMuted());
  const [editingQuiz, setEditingQuiz] = useState(null);

  useEffect(() => {
    return () => stopMusic();
  }, []);

  useEffect(() => {
    if (!currentQuestion || questionEnded) return;
    const t = setInterval(() => setTimer((x) => Math.max(0, x - 1)), 1000);
    return () => clearInterval(t);
  }, [currentQuestion, questionEnded]);

  // Persist a quiz (create or update) and return the saved quiz, or null on failure
  async function persistQuiz(quizData) {
    if (editingQuiz && editingQuiz._id) {
      const res = await API.put(`/quizzes/${editingQuiz._id}`, quizData);
      return res.data;
    }
    const res = await API.post("/quizzes", quizData);
    return res.data;
  }

  async function handleCreateQuiz(quizData) {
    try {
      const saved = await persistQuiz(quizData);
      setQuizCreated((v) => !v);
      setEditingQuiz(null);
      createRoom(saved._id);
    } catch (error) {
      console.error("Failed to save quiz:", error);
      alert("Failed to save quiz. Check the browser console for more details.");
    }
  }

  // Save the quiz without starting a game
  async function handleSaveQuiz(quizData) {
    try {
      await persistQuiz(quizData);
      setQuizCreated((v) => !v);
      const wasEditing = !!editingQuiz;
      setEditingQuiz(null);
      alert(wasEditing ? "Quiz updated successfully ✅" : "Quiz saved successfully ✅");
      setActiveTab("saved");
    } catch (error) {
      console.error("Failed to save quiz:", error);
      alert("Failed to save quiz. Check the browser console for more details.");
    }
  }

  // Load a saved quiz into the editor
  async function handleEditQuiz(quizId) {
    try {
      const res = await API.get(`/quizzes/${quizId}`);
      setEditingQuiz(res.data);
      setActiveTab("create");
    } catch (error) {
      console.error("Failed to load quiz:", error);
      alert("Failed to load quiz for editing.");
    }
  }

  function startNewQuiz() {
    setEditingQuiz(null);
    setActiveTab("create");
  }

function createRoom(quizId) {
  // Remove any previously registered listeners to prevent stacking
  socket.off("host:room_created");
  socket.off("host:players_update");
  socket.off("leaderboard:update");
  socket.off("question:start");
  socket.off("question:end");
  socket.off("game:over");

  // Reset any stale state from a previous/abandoned game so re-hosting is clean
  setPlayers([]);
  setLeaderboard([]);
  setCurrentQuestion(null);
  setQuestionEnded(false);
  setAnswerDistribution([]);
  setCorrectIndices([]);
  setTotalAnswered(0);
  setGameOver(false);
  setTimer(0);

  socket.emit("host:create_room", { quizId });
    socket.on("host:room_created", ({ roomCode }) => {
      console.log("Room created:", roomCode);
      playRoomCreatedSound();
      startLobbyMusic();
      setRoomCode(roomCode)
    });
    socket.on("host:players_update", ({ players }) => {
      playJoinSound();
      setPlayers(players);
    });
    socket.on("leaderboard:update", ({ leaderboard }) => {
      setLeaderboard(leaderboard);
    });
    socket.on("question:start", ({ questionNumber, totalQuestions, text, choices, endsAt, timeLimitSec }) => {
      playQuestionStartSound();
      startQuestionMusic();
      setCurrentQuestion({ questionNumber, totalQuestions, text, choices });
      setQuestionEnded(false);
      setAnswerDistribution([]);
      setCorrectIndices([]);
      setTimeLimit(timeLimitSec || 20);
      setTimer(endsAt ? Math.max(0, Math.ceil((endsAt - Date.now()) / 1000)) : (timeLimitSec || 20));
    });
    socket.on("question:end", ({ correctIndices, leaderboard, answerDistribution, totalAnswered }) => {
      playTimeUpSound();
      startLobbyMusic();
      setQuestionEnded(true);
      setTimer(0);
      setAnswerDistribution(answerDistribution || []);
      setCorrectIndices(correctIndices || []);
      setTotalAnswered(totalAnswered || 0);
      if (leaderboard) setLeaderboard(leaderboard);
    });
    socket.on("game:over", ({ leaderboard }) => {
      playGameOverSound();
      stopMusic();
      setLeaderboard(leaderboard);
      setGameOver(true);
      setCurrentQuestion(null);
    });
  }

  function nextQuestion() {
    socket.emit("host:next_question", { roomCode });
  }

  function exitRoom() {
    if (roomCode) socket.emit("host:close_room", { roomCode });
    stopMusic();
    setRoomCode(null);
    setPlayers([]);
    setLeaderboard([]);
    setCurrentQuestion(null);
    setQuestionEnded(false);
    setAnswerDistribution([]);
    setCorrectIndices([]);
    setTotalAnswered(0);
    setGameOver(false);
    setTimer(0);
    setEditingQuiz(null);
    setActiveTab("saved");
  }

  if (roomCode) {
    return (
      <Box
        className="flex flex-col items-center justify-center min-h-screen relative overflow-hidden px-4 md:px-6 pt-20"
        sx={{
          background:
            "radial-gradient(circle at 20% 30%, #7E22CE, #4C1D95, #1E1B4B)",
        }}
      >
        {/* Background-music mute toggle */}
        <Box
          onClick={() => setMusicMuted(toggleMusicMuted())}
          title={musicMuted ? "Unmute music" : "Mute music"}
          sx={{
            position: "fixed",
            top: 16,
            right: 16,
            zIndex: 50,
            cursor: "pointer",
            width: 44,
            height: 44,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "20px",
            background: "rgba(255,255,255,0.15)",
            backdropFilter: "blur(6px)",
            border: "1px solid rgba(255,255,255,0.25)",
            boxShadow: "0 0 12px rgba(255,255,255,0.2)",
            userSelect: "none",
            transition: "transform 0.15s",
            "&:hover": { transform: "scale(1.1)" },
          }}
        >
          {musicMuted ? "🔇" : "🔊"}
        </Box>

        {/* Floating Emojis */}
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

        {/* 🏆 Live Leaderboard */}
        {leaderboard.length > 0 && (
          <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="hidden md:block absolute right-6 top-6 z-20"
            style={{ top: "100px" }}
          >
            <Card
              className="p-4 bg-white/20 backdrop-blur-md border border-white/40"
              sx={{
                borderRadius: "16px",
                color: "#1E1B4B",
                animation: "pulseGlow 3s infinite ease-in-out",
                minWidth: "220px",
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                🏆 Live Leaderboard
              </Typography>
              <Divider sx={{ mb: 1, borderColor: "rgba(255,255,255,0.3)" }} />
              <ol style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {leaderboard.slice(0, 5).map((p, i) => (
                  <li
                    key={i}
                    style={{
                      margin: "6px 0",
                      fontWeight: i === 0 ? 800 : 500,
                      color: i === 0 ? "#171d35ff" : "#1f1f47ff",
                    }}
                  >
                    {i + 1}. {p.name} — {p.score}
                  </li>
                ))}
              </ol>
            </Card>
          </motion.div>
        )}

        {/* Main Host Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="z-10 w-full max-w-xl"
        >
          <Card
            className="p-8 bg-white/10 backdrop-blur-lg border border-white/20 shadow-[0_0_25px_rgba(255,255,255,0.15)] text-center mt-20"
            sx={{ borderRadius: "22px" }}
          >
            {!currentQuestion && !gameOver && (
              <>
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 700,
                    mb: 2,
                    background: "linear-gradient(90deg,#FDE68A,#F9A8D4,#C084FC)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}>
                  Room Code: {roomCode}
                </Typography>

                <Typography
                  variant="h5"
                  sx={{
                    fontWeight:300,
                    mb: 1,
                    background: "radial-gradient(circle at 20% 30%, #bbb4c2ff, #8068a5ff, #3d3983ff)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  <a href={roomLink} color="linear-gradient(90deg,#FDE68A,#F9A8D4,#C084FC)"> {roomLink}</a>
                </Typography>

                {/* QR code for the join link */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    mb: 2,
                  }}
                >
                  <Box
                    sx={{
                      p: 1.5,
                      bgcolor: "#fff",
                      borderRadius: "16px",
                      boxShadow: "0 0 20px rgba(255,255,255,0.25)",
                    }}
                  >
                    <QRCodeCanvas
                      value={roomLink}
                      size={168}
                      level="M"
                      includeMargin={false}
                    />
                  </Box>
                </Box>

                <Typography
                  variant="body2"
                  sx={{ color: "rgba(255,255,255,0.85)", mb: 1 }}
                >
                  📱 Scan to join
                </Typography>

                <Typography
                  variant="body1"
                  sx={{ color: "rgba(20, 23, 65, 0.8)", mb: 3 }}
                >
                  Share this code with players to join the fun 🎮
                </Typography>
              </>
            )}

            {/* Current Question with options + timer */}
            {currentQuestion && (
              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    color: "#FDE68A",
                    mb: 1,
                  }}
                >
                  📋 Question {currentQuestion.questionNumber} of {currentQuestion.totalQuestions}
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    color: "#fff",
                    fontWeight: 700,
                    mb: 2,
                    px: 2,
                    wordBreak: "break-word",
                    overflowWrap: "anywhere",
                  }}
                  dangerouslySetInnerHTML={{ __html: currentQuestion.text }}
                />

                {/* Timer bar with counter overlay */}
                {!questionEnded && (
                  <Box
                    sx={{
                      position: "relative",
                      height: "28px",
                      width: "100%",
                      background: "rgba(255,255,255,0.2)",
                      borderRadius: "10px",
                      overflow: "hidden",
                      boxShadow: "0 0 15px rgba(255,255,255,0.3)",
                      mb: 3,
                    }}
                  >
                    <motion.div
                      animate={{
                        width: `${Math.max(0, Math.min(100, (timer / (timeLimit || 20)) * 100))}%`,
                        background:
                          timer <= 5
                            ? "linear-gradient(90deg,#ef4444,#f97316,#fde68a)"
                            : "linear-gradient(90deg,#fde68a,#f9a8d4,#c084fc)",
                      }}
                      transition={{ duration: 1, ease: "linear" }}
                      style={{ height: "100%", borderRadius: "10px" }}
                    />
                    <Typography
                      sx={{
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 800,
                        fontSize: "0.9rem",
                        color: "#1E1B4B",
                        textShadow: "0 0 6px rgba(255,255,255,0.7)",
                        pointerEvents: "none",
                      }}
                    >
                      ⏳ {timer}s
                    </Typography>
                  </Box>
                )}

                {/* Options */}
                {currentQuestion.choices && (
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
                      gap: 2,
                    }}
                  >
                    {currentQuestion.choices.map((choice, i) => {
                      const isCorrect = questionEnded && correctIndices.includes(i);
                      const img = currentQuestion.choiceImages && currentQuestion.choiceImages[i];
                      return (
                        <Box
                          key={i}
                          sx={{
                            p: 2,
                            borderRadius: "12px",
                            textAlign: "center",
                            fontWeight: 600,
                            color: isCorrect ? "#065f46" : "#22236c",
                            border: isCorrect
                              ? "2px solid #22c55e"
                              : "1px solid rgba(255,255,255,0.3)",
                            background: isCorrect
                              ? "rgba(34,197,94,0.35)"
                              : "rgba(255,255,255,0.15)",
                            boxShadow: isCorrect
                              ? "0 0 18px rgba(34,197,94,0.6)"
                              : "none",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: 1,
                            wordBreak: "break-word",
                            overflowWrap: "anywhere",
                          }}
                        >
                          {img && (
                            <Box
                              component="img"
                              src={img}
                              alt={`Option ${i + 1}`}
                              sx={{
                                maxHeight: 140,
                                maxWidth: "100%",
                                borderRadius: "8px",
                                objectFit: "contain",
                              }}
                            />
                          )}
                          <Box component="span">
                            <Box component="span" sx={{ fontWeight: 800, mr: 0.5 }}>
                              {i + 1}.
                            </Box>
                            {isCorrect ? "✅ " : ""}{choice}
                          </Box>
                        </Box>
                      );
                    })}
                  </Box>
                )}
              </Box>
            )}

            {/* Answer Distribution (shown after question ends) */}
            {questionEnded && answerDistribution.length > 0 && (
              <Box sx={{ mb: 3, textAlign: "left", px: 2 }}>
                <Divider sx={{ mb: 2, borderColor: "rgba(255,255,255,0.2)" }} />
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#F9A8D4", mb: 1 }}>
                  📊 Answer Distribution ({totalAnswered} answered)
                </Typography>
                {answerDistribution.map((item) => {
                  const isCorrect = correctIndices.includes(item.choiceIndex);
                  return (
                    <Box key={item.choiceIndex} sx={{ mb: 1.5 }}>
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 0.5 }}>
                        <Typography
                          variant="body2"
                          sx={{
                            color: isCorrect ? "#4ade80" : "#e0d6f0",
                            fontWeight: isCorrect ? 700 : 400,
                            wordBreak: "break-word",
                            overflowWrap: "anywhere",
                            pr: 1,
                          }}
                        >
                          {isCorrect ? "✅ " : ""}
                          {`Option ${item.choiceIndex + 1}`}
                          {item.choiceText ? `: ${item.choiceText}` : ""}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#C084FC", fontWeight: 600 }}>
                          {item.percentage}% ({item.count})
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          width: "100%",
                          height: "10px",
                          borderRadius: "5px",
                          background: "rgba(255,255,255,0.1)",
                          overflow: "hidden",
                        }}
                      >
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${item.percentage}%` }}
                          transition={{ duration: 0.6, ease: "easeOut" }}
                          style={{
                            height: "100%",
                            borderRadius: "5px",
                            background: isCorrect
                              ? "linear-gradient(90deg, #4ade80, #22c55e)"
                              : "linear-gradient(90deg, #C084FC, #F9A8D4)",
                          }}
                        />
                      </Box>
                    </Box>
                  );
                })}
                <Divider sx={{ mt: 2, borderColor: "rgba(255,255,255,0.2)" }} />
              </Box>
            )}

            {/* Game Over */}
            {gameOver && (
              <Box>
                <Typography variant="h4" sx={{ color: "#FDE68A", fontWeight: 800, mb: 3 }}>
                  🎉 Game Over!
                </Typography>
                <Leaderboard leaderboard={leaderboard} podium />
              </Box>
            )}

            {!currentQuestion && !gameOver && (
              <ul style={{ color: "#020202ff", listStyle: "none", padding: 0 }}>
                {players.map((p, i) => (
                  <li key={i}>{p.name}</li>
                ))}
              </ul>
            )}

            {!gameOver && (
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
                {currentQuestion ? "Next Question ➡️" : "Start Game 🚀"}
              </Button>
            )}

            {/* Exit / host another quiz */}
            <Box sx={{ mt: 2 }}>
              <Button
                variant="outlined"
                onClick={exitRoom}
                sx={{
                  py: 1.1,
                  borderRadius: "12px",
                  color: "#fff",
                  borderColor: "rgba(255,255,255,0.5)",
                  "&:hover": { borderColor: "#fff", background: "rgba(255,255,255,0.1)" },
                }}
              >
                {gameOver ? "🏠 Host Another Quiz" : "🚪 Exit Room"}
              </Button>
            </Box>
          </Card>
        </motion.div>
      </Box>
    );
  }

  // Default Host (Before Room Created)
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
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="z-10 w-full max-w-4xl px-4 md:px-6"
      >
        <Card
          className="p-4 md:p-8 bg-white/10 backdrop-blur-lg border border-white/20 shadow-[0_0_25px_rgba(255,255,255,0.15)] text-center"
             sx={{
              borderRadius: "22px",
              animation: "pulseGlow 2.5s infinite ease-in-out",
              marginTop: "60px",
            }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              mt: 6,
              fontSize: { xs: "2.5rem", md: "3.75rem" },
              background:
                "linear-gradient(90deg,#FDE68A,#F9A8D4,#C084FC)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Host Your Zappy Quiz ⚡
          </Typography>
          

           {/* Quick toggle between creating a new quiz or using a saved one */}

           {/* 🔀 Create / Saved Toggle */}
<Box
  sx={{
    position: "relative",
    display: "flex",
    width: "320px",
    margin: "0 auto 28px",
    background: "rgba(255,255,255,0.15)",
    borderRadius: "999px",
    padding: "6px",
    backdropFilter: "blur(10px)",
  }}
>
  {/* Sliding Indicator */}
  <motion.div
    layout
    transition={{ type: "spring", stiffness: 300, damping: 25 }}
    style={{
      position: "absolute",
      top: 6,
      bottom: 6,
      width: "50%",
      borderRadius: "999px",
      background:
        "linear-gradient(90deg,#FDE68A,#F9A8D4,#C084FC)",
      left: activeTab === "create" ? "6px" : "calc(50% - 6px)",
    }}
  />

  <Button
    fullWidth
    onClick={() => setActiveTab("create")}
    sx={{
      zIndex: 1,
      color: activeTab === "create" ? "#1E1B4B" : "#0f0f0fff",
      fontWeight: 600,
      textTransform: "none",
    }}
  >
    ➕ Create Quiz
  </Button>

  <Button
    fullWidth
    onClick={() => setActiveTab("saved")}
    sx={{
      zIndex: 1,
      color: activeTab === "saved" ? "#1E1B4B" : "#080808ff",
      fontWeight: 600,
      textTransform: "none",
    }}
  >
    💾 Saved Quizzes
  </Button>
</Box>



          <Typography
            variant="body1"
            sx={{ color: "rgba(57, 37, 110, 0.8)", mb: 4, fontSize: { xs: "1rem", md: "1.125rem" } }}
          >
            Create your questions and start the challenge instantly!
          </Typography>

          {/* <QuizEditor onSave={createRoom} /> */}

          <AnimatePresence mode="wait">
  {activeTab === "create" ? (
    <motion.div
      key="create"
      initial={{ x: -40, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 40, opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {editingQuiz && (
        <Box sx={{ mb: 2, display: "flex", justifyContent: "center" }}>
          <Button
            variant="outlined"
            onClick={startNewQuiz}
            sx={{
              borderRadius: "10px",
              color: "#fff",
              borderColor: "rgba(255,255,255,0.5)",
            }}
          >
            ✏️ Editing "{editingQuiz.title}" — Start a new quiz instead
          </Button>
        </Box>
      )}
      <QuizEditor
        key={editingQuiz?._id || "new"}
        onSave={handleCreateQuiz}
        onSaveOnly={handleSaveQuiz}
        initialQuiz={editingQuiz}
      />
    </motion.div>
  ) : (
    <motion.div
      key="saved"
      initial={{ x: 40, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -40, opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <SavedQuizzes
        onHost={createRoom}
        onEdit={handleEditQuiz}
        quizCreated={quizCreated}
      />
    </motion.div>
  )}
</AnimatePresence>

        </Card>
      </motion.div>
    </Box>
  );
}

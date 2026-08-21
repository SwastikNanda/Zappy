//  import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Box, Card, TextField, Button, Typography, MenuItem } from "@mui/material";
// import { motion } from "framer-motion";
// import register from "./Register";
// export default function Login() {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("player");
//   const [loading, setLoading] = useState(false);
//   const emojis = ["⚡", "🎯", "🎉", "🔥", "💡", "⭐", "🎮", "🥳"];

//   async function handleLogin() {
//     if (!email || !password) return alert("Please fill all fields");
//     setLoading(true);
//     try {
//       const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });
//       const data = await res.json();

//       if (!res.ok) throw new Error(data.message || "Login failed");
//       localStorage.setItem("token", data.token);
//       localStorage.setItem("role", data.user.role);
//       localStorage.setItem("username", data.user.username);
//       navigate(data.user.role === "host" ? "/host" : "/join");
//     } catch (err) {
//       alert(err.message);
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <Box
//       className="flex flex-col items-center justify-center min-h-screen relative overflow-hidden"
//       sx={{
//         background: "radial-gradient(circle at 20% 30%, #7E22CE, #4C1D95, #1E1B4B)",
//       }}
//     >
//       {/* Floating emojis */}
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

//       {/* Login Card */}
//       <motion.div
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//         className="z-10 w-full max-w-md"
//       >
//         <Card
//           className="p-8 bg-white/10 backdrop-blur-lg border border-white/30 text-center shadow-[0_0_25px_rgba(255,255,255,0.3)]"
//           sx={{ borderRadius: "22px", animation: "pulseGlow 3s infinite ease-in-out" , marginTop:"50px",
//           }}
//         >
//           <Typography
//             variant="h4"
//             sx={{
//               mb: 2,
//               fontWeight: 700,
//               background: "linear-gradient(90deg,#FDE68A,#F9A8D4,#C084FC)",
//               WebkitBackgroundClip: "text",
//               WebkitTextFillColor: "transparent",
//             }}
//           >
//             Login to Zappy ⚡
//           </Typography>

//           <Typography sx={{ color: "#191947ff", mb: 3 }}>
//             Enter your credentials to host or join a game!
//           </Typography>

//           <TextField
//             fullWidth
//             label="Email"
//             variant="outlined"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             sx={{
//               mb: 2,
//               input: { color: "rgba(23, 21, 91, 0.7)" },
//               label: { color: "rgba(45, 52, 113, 0.7)" },
//               "& .MuiOutlinedInput-root": {
//                 "& fieldset": { borderColor: "rgba(255,255,255,0.3)" },
//                 "&:hover fieldset": { borderColor: "#f9a8d4" },
//               },
//             }}
//           />

//           <TextField
//             fullWidth
//             type="password"
//             label="Password"
//             variant="outlined"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             sx={{
//               mb: 2,
//               input: { color: "rgba(28, 25, 94, 0.7)" },
//               label: { color: "rgba(62, 59, 148, 0.7)" },
//               "& .MuiOutlinedInput-root": {
//                 "& fieldset": { borderColor: "rgba(255,255,255,0.3)" },
//                 "&:hover fieldset": { borderColor: "#f9a8d4" },
//               },
//             }}
//           />

//           <TextField
//             select
//             fullWidth
//             label="Role"
//             value={role}
//             onChange={(e) => setRole(e.target.value)}
//             sx={{
//               mb: 3,
//               color: "white",
//               "& .MuiSelect-icon": { color: "white" },
//               "& .MuiOutlinedInput-root": {
//                 "& fieldset": { borderColor: "rgba(255,255,255,0.3)" },
//                 "&:hover fieldset": { borderColor: "#f9a8d4" },
//               },
//             }}
//           >
//             <MenuItem value="player">Player</MenuItem>
//             <MenuItem value="host">Host</MenuItem>
//             <MenuItem value="admin">Admin</MenuItem>
//           </TextField>

//           <Button
//             fullWidth
//             variant="contained"
//             onClick={handleLogin}
//             disabled={loading}
//             sx={{
//               py: 1.4,
//               mb: 2,
//               borderRadius: "12px",
//               fontWeight: 600,
//               background: "linear-gradient(90deg,#FDE68A,#F9A8D4,#C084FC)",
//               color: "#1E1B4B",
//               "&:hover": {
//                 transform: "scale(1.05)",
//                 boxShadow: "0 0 30px rgba(255,215,0,0.4)",
//               },
//             }}
//           >
//             {loading ? "Logging in..." : "Login"}
//           </Button>

//           <Typography sx={{ color: "#223756ff" }}>
//             Don’t have an account?{" "}
//             <span
//               style={{
//                 color: "#F9A8D4",
//                 cursor: "pointer",
//                 fontWeight: 600,
//               }}
//               onClick={() => navigate("/register")}
//             >
//                 Register
//             </span>
//           </Typography>
//         </Card>
//       </motion.div>
//     </Box>
//   );
// }

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Box, Card, TextField, Button, Typography } from "@mui/material";
// import { motion } from "framer-motion";

// export default function Login() {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   const emojis = ["⚡", "🎯", "🎉", "🔥", "💡", "⭐", "🎮", "🥳"];

//   async function handleLogin() {
//     if (!email || !password) return alert("Please fill all fields");
//     setLoading(true);

//     try {
//       const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || "Login failed");

//       localStorage.setItem("token", data.token);
//       localStorage.setItem("role", data.user.role);
//       localStorage.setItem("name", data.user.name);

//       navigate("/host"); // only hosts can log in
//     } catch (err) {
//       alert(err.message);
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <Box
//       className="flex flex-col items-center justify-center min-h-screen relative overflow-hidden"
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
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//         className="z-10 w-full max-w-md"
//       >
//         <Card
//           className="p-8 bg-white/10 backdrop-blur-lg border border-white/30 text-center shadow-[0_0_25px_rgba(255,255,255,0.3)]"
//           sx={{
//             borderRadius: "22px",
//             animation: "pulseGlow 3s infinite ease-in-out",
//             marginTop: "50px",
//           }}
//         >
//           <Typography
//             variant="h4"
//             sx={{
//               mb: 2,
//               fontWeight: 700,
//               background: "linear-gradient(90deg,#FDE68A,#F9A8D4,#C084FC)",
//               WebkitBackgroundClip: "text",
//               WebkitTextFillColor: "transparent",
//             }}
//           >
//             Login to Zappy ⚡
//           </Typography>

//           <Typography sx={{ color: "#191947ff", mb: 3 }}>
//             Enter your credentials to host a game!
//           </Typography>

//           <TextField
//             fullWidth
//             label="Email"
//             variant="outlined"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             sx={{
//               mb: 2,
//               input: { color: "rgba(23, 21, 91, 0.7)" },
//               label: { color: "rgba(45, 52, 113, 0.7)" },
//               "& .MuiOutlinedInput-root": {
//                 "& fieldset": { borderColor: "rgba(255,255,255,0.3)" },
//                 "&:hover fieldset": { borderColor: "#f9a8d4" },
//               },
//             }}
//           />

//           <TextField
//             fullWidth
//             type="password"
//             label="Password"
//             variant="outlined"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             sx={{
//               mb: 3,
//               input: { color: "rgba(28, 25, 94, 0.7)" },
//               label: { color: "rgba(62, 59, 148, 0.7)" },
//               "& .MuiOutlinedInput-root": {
//                 "& fieldset": { borderColor: "rgba(255,255,255,0.3)" },
//                 "&:hover fieldset": { borderColor: "#f9a8d4" },
//               },
//             }}
//           />

//           <Button
//             fullWidth
//             variant="contained"
//             onClick={handleLogin}
//             disabled={loading}
//             sx={{
//               py: 1.4,
//               mb: 2,
//               borderRadius: "12px",
//               fontWeight: 600,
//               background: "linear-gradient(90deg,#FDE68A,#F9A8D4,#C084FC)",
//               color: "#1E1B4B",
//               "&:hover": {
//                 transform: "scale(1.05)",
//                 boxShadow: "0 0 30px rgba(255,215,0,0.4)",
//               },
//             }}
//           >
//             {loading ? "Logging in..." : "Login"}
//           </Button>

//           <Typography sx={{ color: "#223756ff" }}>
//             Don’t have an account?{" "}
//             <span
//               style={{
//                 color: "#F9A8D4",
//                 cursor: "pointer",
//                 fontWeight: 600,
//               }}
//               onClick={() => navigate("/register")}
//             >
//               Register
//             </span>
//           </Typography>
//         </Card>
//       </motion.div>
//     </Box>
//   );
// }

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Card, TextField, Button, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { setAuthToken } from "./api";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const emojis = ["⚡", "🎯", "🎉", "🔥", "💡"];

  async function handleLogin() {
    if (!email || !password) return alert("Enter all fields");
    setLoading(true);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      setAuthToken(data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/host");
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
        <Box
      className="flex flex-col items-center justify-center min-h-screen relative overflow-hidden"
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
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="z-10 w-full max-w-md"
      >
       <Card
          className="p-8 bg-white/10 backdrop-blur-lg border border-white/30 text-center shadow-[0_0_25px_rgba(255,255,255,0.3)]"
          sx={{
            borderRadius: "22px",
            animation: "pulseGlow 3s infinite ease-in-out",
            marginTop: "50px",
          }}
        >
         <Typography
            variant="h4"
            sx={{
              mb: 2,
              fontWeight: 700,
              background: "linear-gradient(90deg,#FDE68A,#F9A8D4,#C084FC)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Login to Zappy ⚡
          </Typography>

          <Typography sx={{ color: "#191947ff", mb: 3 }}>
            Enter your credentials to host a game!
          </Typography>

        <TextField
            fullWidth
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              mb: 2,
              input: { color: "rgba(23, 21, 91, 0.7)" },
              label: { color: "rgba(45, 52, 113, 0.7)" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "rgba(255,255,255,0.3)" },
                "&:hover fieldset": { borderColor: "#f9a8d4" },
              },
            }}
        />

        <TextField
            fullWidth
            type="password"
            label="Password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              mb: 3,
              input: { color: "rgba(28, 25, 94, 0.7)" },
              label: { color: "rgba(62, 59, 148, 0.7)" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "rgba(255,255,255,0.3)" },
                "&:hover fieldset": { borderColor: "#f9a8d4" },
              },
            }}
        />

        <Button
            fullWidth
            variant="contained"
            onClick={handleLogin}
            disabled={loading}
            sx={{
              py: 1.4,
              mb: 2,
              borderRadius: "12px",
              fontWeight: 600,
              background: "linear-gradient(90deg,#FDE68A,#F9A8D4,#C084FC)",
              color: "#1E1B4B",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: "0 0 30px rgba(255,215,0,0.4)",
              },
            }}
        >
          {loading ? "Loading..." : "Login"}
        </Button>

           <Typography sx={{ color: "#223756ff" }}>
           Don't have an account?{" "}

          <span
            className="text-blue-400 cursor-pointer"
                          style={{
                color: "#F9A8D4",
                cursor: "pointer",
                fontWeight: 600,
              }}
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </Typography>
      </Card>
      </motion.div>
    </Box>
  );
}

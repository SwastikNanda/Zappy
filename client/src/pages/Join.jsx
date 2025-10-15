// // // import React, { useState } from "react";
// // // import { useNavigate } from "react-router-dom";

// // // export default function Join() {
// // //   const [name, setName] = useState("");
// // //   const [room, setRoom] = useState("");
// // //   const nav = useNavigate();

// // //   function go() {
// // //     if (name && room) nav(`/play/${room}?name=${encodeURIComponent(name)}`);
// // //   }

// // //   return (
// // //     <div>
// // //       <h2>Join a game</h2>
// // //       <input placeholder="room code" onChange={e=>setRoom(e.target.value.toUpperCase())} />
// // //       <input placeholder="your name" onChange={e=>setName(e.target.value)} />
// // //       <button onClick={go}>Join</button>
// // //     </div>
// // //   )
// // // }

// // import React, { useState } from "react";
// // import { useNavigate } from "react-router-dom";

// // export default function Join() {
// //   const [code, setCode] = useState("");
// //   const [name, setName] = useState("");
// //   const navigate = useNavigate();

// //   const handleJoin = () => {
// //     if (!code) return alert("Enter room code");
// //     if (!name) return alert("Enter your name");
// //     navigate(`/player/${code}?name=${encodeURIComponent(name)}`);
// //   };

// //   return (
// //     <div>
// //       <h2>Join a Game</h2>
// //       <input
// //         type="text"
// //         placeholder="Room Code"
// //         value={code}
// //         onChange={(e) => setCode(e.target.value.toUpperCase())}
// //       />
// //       <input
// //         type="text"
// //         placeholder="Your Name"
// //         value={name}
// //         onChange={(e) => setName(e.target.value)}
// //       />
// //       <button onClick={handleJoin}>Join</button>
// //     </div>
// //   );
// // }

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function Join() {
//   const navigate = useNavigate();
//   const [name, setName] = useState("");
//   const [roomCode, setRoomCode] = useState("");
//   const [error, setError] = useState("");

//   function handleJoin(e) {
//     e.preventDefault();

//     if (!name.trim() || !roomCode.trim()) {
//       setError("Please enter both name and room code");
//       return;
//     }

//     // Navigate to PlayerGame with name as query param
//     navigate(`/play/${roomCode}?name=${encodeURIComponent(name.trim())}`);
//   }

//   return (
//     <div style={{ maxWidth: 400, margin: "50px auto", textAlign: "center" }}>
//       <h2>Join Game</h2>
//       <form onSubmit={handleJoin}>
//         <div style={{ marginBottom: 12 }}>
//           <input
//             type="text"
//             placeholder="Your Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             style={{ width: "100%", padding: 8 }}
//           />
//         </div>
//         <div style={{ marginBottom: 12 }}>
//           <input
//             type="text"
//             placeholder="Room Code"
//             value={roomCode}
//             onChange={(e) => setRoomCode(e.target.value)}
//             style={{ width: "100%", padding: 8 }}
//           />
//         </div>
//         {error && <p style={{ color: "red" }}>{error}</p>}
//         <button type="submit" style={{ padding: "8px 16px" }}>
//           Join
//         </button>
//       </form>
//     </div>
//   );
// }


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Join() {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim() || !code.trim()) {
      alert("Please enter both name and room code");
      return;
    }
    navigate(`/play/${code.toUpperCase()}?name=${encodeURIComponent(name)}`);
  }

  return (
    <div>
      <h2>Join Game</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Your Name:{" "}
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Room Code:{" "}
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              maxLength={6}
              required
            />
          </label>
        </div>
        <button type="submit">Join</button>
      </form>
    </div>
  );
}



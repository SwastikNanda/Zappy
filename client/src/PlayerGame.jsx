// // import { useEffect, useMemo, useState } from "react";
// // import { useParams, useSearchParams, Link } from "react-router-dom";
// // import { useSocket } from "./useSocket";

// // export default function PlayerGame() {
// //   const { code } = useParams();
// //   const [params] = useSearchParams();
// //   const name = useMemo(()=>params.get("name") || "Player", [params]);
// //   const socket = useSocket();
// //   const [state, setState] = useState({ phase: "lobby" });
// //   const [answerIdx, setAnswerIdx] = useState(null);
// //   const [result, setResult] = useState(null);
// //   const [timer, setTimer] = useState(0);

// //   useEffect(() => {
// //     socket.emit("player:join", { roomCode: code, name });
// //     const onLobby = ({ count }) => setState({ phase: "lobby", count });
// //     const onStart = (q) => {
// //       setState({ phase: "question", q });
// //       setAnswerIdx(null);
// //       setResult(null);
// //       const ms = q.endsAt - Date.now();
// //       setTimer(Math.ceil(ms/1000));
// //     };
// //     const tick = setInterval(() => setTimer(t=>Math.max(0,t-1)), 1000);
// //     const onEnd = ({ correctIndex, leaderboard }) => setState({ phase: "reveal", correctIndex, leaderboard });
// //     const onOver = ({ leaderboard }) => setState({ phase: "over", leaderboard });
// //     const onAnswerRes = ({ correct }) => setResult(correct ? "Correct!" : "Wrong");

// //     socket.on("lobby:update", onLobby);
// //     socket.on("question:start", onStart);
// //     socket.on("question:end", onEnd);
// //     socket.on("game:over", onOver);
// //     socket.on("player:answer_result", onAnswerRes);

// //     return () => {
// //       clearInterval(tick);
// //       socket.off("lobby:update", onLobby);
// //       socket.off("question:start", onStart);
// //       socket.off("question:end", onEnd);
// //       socket.off("game:over", onOver);
// //       socket.off("player:answer_result", onAnswerRes);
// //     }
// //   }, [socket, code, name]);

// //   function answer(i) {
// //     setAnswerIdx(i);
// //     socket.emit("player:answer", { roomCode: code, choiceIndex: i });
// //   }

// //   return (
// //     <div>
// //       <h2>Room: {code}</h2>
// //       {state.phase === "lobby" && <p>Waiting... Players: {state.count || 1}</p>}

// //       {state.phase === "question" && (
// //         <div>
// //           <h3>{state.q.text}</h3>
// //           <p>Time left: {timer}s</p>
// //           {state.q.choices.map((c,i)=>(
// //             <button key={i} disabled={answerIdx!==null} onClick={()=>answer(i)}>{c}</button>
// //           ))}
// //           {result && <p>{result}</p>}
// //         </div>
// //       )}

// //       {state.phase === "reveal" && (
// //         <div>
// //           <h3>Correct answer: {state.correctIndex + 1}</h3>
// //           <h4>Leaderboard</h4>
// //           <ol>{state.leaderboard.map((p,i)=><li key={i}>{p.name} — {p.score}</li>)}</ol>
// //         </div>
// //       )}

// //       {state.phase === "over" && (
// //         <div>
// //           <h3>Game over</h3>
// //           <ol>{state.leaderboard.map((p,i)=><li key={i}>{p.name} — {p.score}</li>)}</ol>
// //           <p><Link to="/join">Join another</Link></p>
// //         </div>
// //       )}
// //     </div>
// //   )
// // }

// // import { useEffect, useMemo, useState } from "react";
// // import { useParams, useSearchParams, Link } from "react-router-dom";
// // import { useSocket } from "./useSocket";

// // export default function PlayerGame() {
// //   const { code } = useParams();
// //   const [params] = useSearchParams();
// //   const name = useMemo(()=>params.get("name") || "Player", [params]);
// //   const socket = useSocket();
// //   const [state, setState] = useState({ phase: "lobby" });
// //   const [answerIdx, setAnswerIdx] = useState(null);
// //   const [result, setResult] = useState(null);
// //   const [timer, setTimer] = useState(0);

// //   useEffect(() => {
// //     socket.emit("player:join", { roomCode: code, name });
// //     const onLobby = ({ count }) => setState({ phase: "lobby", count });
// //     const onStart = (q) => {
// //       setState({ phase: "question", q });
// //       setAnswerIdx(null);
// //       setResult(null);
// //       const ms = q.endsAt - Date.now();
// //       setTimer(Math.ceil(ms/1000));
// //     };
// //     const tick = setInterval(() => setTimer(t=>Math.max(0,t-1)), 1000);
    

// //     // Update to expect correctIndices as an array
// //     const onEnd = ({ correctIndices, leaderboard }) => setState({ phase: "reveal", correctIndices, leaderboard });

// //     const onOver = ({ leaderboard }) => setState({ phase: "over", leaderboard });
// //     const onAnswerRes = ({ correct }) => setResult(correct ? "Correct!" : "Wrong");

// //     socket.on("lobby:update", onLobby);
// //     socket.on("question:start", onStart);
// //     socket.on("question:end", onEnd);
// //     socket.on("game:over", onOver);
// //     socket.on("player:answer_result", onAnswerRes);

// //     return () => {
// //       clearInterval(tick);
// //       socket.off("lobby:update", onLobby);
// //       socket.off("question:start", onStart);
// //       socket.off("question:end", onEnd);
// //       socket.off("game:over", onOver);
// //       socket.off("player:answer_result", onAnswerRes);
// //     }
// //   }, [socket, code, name]);

// //   function answer(i) {
// //     setAnswerIdx(i);
// //     socket.emit("player:answer", { roomCode: code, choiceIndex: i });
// //   }

// //   return (
// //     <div>
// //       <h2>Room: {code}</h2>
// //       {state.phase === "lobby" && <p>Waiting... Players: {state.count || 1}</p>}

// //       {state.phase === "question" && (
// //         <div>
// //           <h3>{state.q.text}</h3>
// //           <p>Time left: {timer}s</p>
// //           {state.q.choices.map((c,i)=>(
// //             <button key={i} disabled={answerIdx!==null} onClick={()=>answer(i)}>{c}</button>
// //           ))}
// //           {result && <p>{result}</p>}
// //         </div>
// //       )}

// //       {state.phase === "reveal" && (
// //         <div>
// //           {/* Update rendering to show all correct answers from the array */}
// //           <h3>Correct answer(s):
// //             {state.correctIndices.map((idx, i) => (
// //               <span key={i}> {idx + 1}</span>
// //             ))}
// //           </h3>
// //           <h4>Leaderboard</h4>
// //           <ol>{state.leaderboard.map((p,i)=><li key={i}>{p.name} — {p.score}</li>)}</ol>
// //         </div>
// //       )}

// //       {state.phase === "over" && (
// //         <div>
// //           <h3>Game over</h3>
// //           <ol>{state.leaderboard.map((p,i)=><li key={i}>{p.name} — {p.score}</li>)}</ol>
// //           <p><Link to="/join">Join another</Link></p>
// //         </div>
// //       )}
// //     </div>
// //   )
// // }

// // import { useEffect, useMemo, useState } from "react";
// // import { useParams, useSearchParams, Link } from "react-router-dom";
// // import { useSocket } from "./useSocket";

// // export default function PlayerGame() {
// //   const { code } = useParams();
// //   const [params] = useSearchParams();
// //   const name = useMemo(()=>params.get("name") || "Player", [params]);
// //   const socket = useSocket();
// //   const [state, setState] = useState({ phase: "lobby" });
// //   const [answerIdx, setAnswerIdx] = useState(null);
// //   const [result, setResult] = useState(null);
// //   const [timer, setTimer] = useState(0);

// //   useEffect(() => {
// //     socket.emit("player:join", { roomCode: code, name });
// //     const onLobby = ({ count }) => setState({ phase: "lobby", count });
// //     const onStart = (q) => {
// //       setState({ phase: "question", q });
// //       setAnswerIdx(null);
// //       setResult(null);
// //       const ms = q.endsAt - Date.now();
// //       setTimer(Math.ceil(ms/1000));
// //     };
// //     const tick = setInterval(() => setTimer(t=>Math.max(0,t-1)), 1000);
    
// //     // Updated onEnd handler to directly set the state from the socket event
// //     const onEnd = ({ correctIndices, leaderboard }) => {
// //       setState(prevState => ({ 
// //         ...prevState, 
// //         phase: "reveal", 
// //         correctIndices, 
// //         leaderboard 
// //       }));
// //     };
    
// //     const onOver = ({ leaderboard }) => setState({ phase: "over", leaderboard });
// //     const onAnswerRes = ({ correct }) => setResult(correct ? "Correct!" : "Wrong");

// //     socket.on("lobby:update", onLobby);
// //     socket.on("question:start", onStart);
// //     socket.on("question:end", onEnd);
// //     socket.on("game:over", onOver);
// //     socket.on("player:answer_result", onAnswerRes);

// //     return () => {
// //       clearInterval(tick);
// //       socket.off("lobby:update", onLobby);
// //       socket.off("question:start", onStart);
// //       socket.off("question:end", onEnd);
// //       socket.off("game:over", onOver);
// //       socket.off("player:answer_result", onAnswerRes);
// //     }
// //   }, [socket, code, name]); // No state.q needed here

// //   function answer(i) {
// //     setAnswerIdx(i);
// //     socket.emit("player:answer", { roomCode: code, choiceIndex: i });
// //   }

// //   // Define a new variable to store the correct answers for rendering
// //   const correctAnswers = useMemo(() => {
// //     if (state.phase === "reveal" && state.q && state.correctIndices) {
// //       return state.correctIndices.map(index => state.q.choices[index]);
// //     }
// //     return [];
// //   }, [state]);

// //   return (
// //     <div>
// //       <h2>Room: {code}</h2>
// //       {state.phase === "lobby" && <p>Waiting... Players: {state.count || 1}</p>}

// //       {state.phase === "question" && (
// //         <div>
// //           <h3>{state.q.text}</h3>
// //           <p>Time left: {timer}s</p>
// //           {state.q.choices.map((c,i)=>(
// //             <button key={i} disabled={answerIdx!==null} onClick={()=>answer(i)}>{c}</button>
// //           ))}
// //           {result && <p>{result}</p>}
// //         </div>
// //       )}

// //       {state.phase === "reveal" && (
// //         <div>
// //           <h3>Correct answer(s):</h3>
// //           <ul>
// //             {correctAnswers.map((answer, i) => (
// //               <li key={i}> {answer}</li>
// //             ))}
// //           </ul>
// //           <h4>Leaderboard</h4>
// //           <ol>{state.leaderboard.map((p,i)=><li key={i}>{p.name} — {p.score}</li>)}</ol>
// //         </div>
// //       )}

// //       {state.phase === "over" && (
// //         <div>
// //           <h3>Game over</h3>
// //           <ol>{state.leaderboard.map((p,i)=><li key={i}>{p.name} — {p.score}</li>)}</ol>
// //           <p><Link to="/join">Join another</Link></p>
// //         </div>
// //       )}
// //     </div>
// //   )
// // }


// import { useEffect, useMemo, useState } from "react";
// import { useParams, useSearchParams, Link } from "react-router-dom";
// import { useSocket } from "./useSocket";

// export default function PlayerGame() {
//   const { code } = useParams();
//   const [params] = useSearchParams();
//   const name = useMemo(()=>params.get("name") || "Player", [params]);
//   const socket = useSocket();
//   const [state, setState] = useState({ phase: "lobby" });
//   const [selectedAnswers, setSelectedAnswers] = useState([]); // Array for checkboxes
//   const [selectedRadioAnswer, setSelectedRadioAnswer] = useState(null); // String/Number for radio buttons
//   const [result, setResult] = useState(null);
//   const [timer, setTimer] = useState(0);

//   useEffect(() => {
//     socket.emit("player:join", { roomCode: code, name });
//     const onLobby = ({ count }) => setState({ phase: "lobby", count });
//     const onStart = (q) => {
//       setState({ phase: "question", q });
//       setSelectedAnswers([]);
//       setSelectedRadioAnswer(null);
//       setResult(null);
//       const ms = q.endsAt - Date.now();
//       setTimer(Math.ceil(ms/1000));
//     };
//     const tick = setInterval(() => setTimer(t=>Math.max(0,t-1)), 1000);
//     const onEnd = ({ correctIndices, leaderboard }) => setState(prevState => ({ ...prevState, phase: "reveal", correctIndices, leaderboard }));
//     const onOver = ({ leaderboard }) => setState({ phase: "over", leaderboard });
//     const onAnswerRes = ({ correct }) => setResult(correct ? "Correct!" : "Wrong");

//     socket.on("lobby:update", onLobby);
//     socket.on("question:start", onStart);
//     socket.on("question:end", onEnd);
//     socket.on("game:over", onOver);
//     socket.on("player:answer_result", onAnswerRes);

//     return () => {
//       clearInterval(tick);
//       socket.off("lobby:update", onLobby);
//       socket.off("question:start", onStart);
//       socket.off("question:end", onEnd);
//       socket.off("game:over", onOver);
//       socket.off("player:answer_result", onAnswerRes);
//     }
//   }, [socket, code, name]);

//   const handleCheckboxChange = (index) => {
//     setSelectedAnswers(prevAnswers => 
//       prevAnswers.includes(index) 
//         ? prevAnswers.filter(i => i !== index) 
//         : [...prevAnswers, index]
//     );
//   };

//   const handleRadioChange = (index) => {
//     setSelectedRadioAnswer(index);
//   };
  
//   const submitAnswers = () => {
//     if (state.q.hasMultipleAnswers) {
//       if (selectedAnswers.length > 0) {
//         const sortedAnswers = selectedAnswers.sort((a, b) => a - b);
//         socket.emit("player:answer", { roomCode: code, choiceIndices: sortedAnswers });
//       }
//     } else {
//       if (selectedRadioAnswer !== null) {
//         socket.emit("player:answer", { roomCode: code, choiceIndices: [selectedRadioAnswer] });
//       }
//     }
//   };

//   const correctAnswersText = useMemo(() => {
//     if (state.phase === "reveal" && state.q && state.correctIndices) {
//       return state.correctIndices.map(index => state.q.choices[index]);
//     }
//     return [];
//   }, [state]);

//   return (
//     <div>
//       <h2>Room: {code}</h2>
//       {state.phase === "lobby" && <p>Waiting... Players: {state.count || 1}</p>}

//       {state.phase === "question" && (
//         <div>
//           <h3>{state.q.text}</h3>
//           <p>Time left: {timer}s</p>
//           {state.q.choices.map((c, i) => (
//             <div key={i}>
//               <label>
//                 {state.q.hasMultipleAnswers ? (
//                   // Render checkboxes for multiple-answer questions
//                   <input
//                     type="checkbox"
//                     checked={selectedAnswers.includes(i)}
//                     onChange={() => handleCheckboxChange(i)}
//                   />
//                 ) : (
//                   // Render radio buttons for single-answer questions
//                   <input
//                     type="radio"
//                     name="answer"
//                     value={i}
//                     checked={selectedRadioAnswer === i}
//                     onChange={() => handleRadioChange(i)}
//                   />
//                 )}
//                 {c}
//               </label>
//             </div>
//           ))}
//           <button 
//             onClick={submitAnswers} 
//             disabled={(state.q.hasMultipleAnswers && selectedAnswers.length === 0) || (!state.q.hasMultipleAnswers && selectedRadioAnswer === null) || result !== null}
//           >
//             Submit Answer
//           </button>
//           {result && <p>{result}</p>}
//         </div>
//       )}

//       {state.phase === "reveal" && (
//         <div>
//           <h3>Correct answer(s):</h3>
//           <ul>
//             {correctAnswersText.map((answer, i) => (
//               <li key={i}> {answer}</li>
//             ))}
//           </ul>
//           <h4>Leaderboard</h4>
//           <ol>{state.leaderboard.map((p,i)=><li key={i}>{p.name} — {p.score}</li>)}</ol>
//         </div>
//       )}

//       {state.phase === "over" && (
//         <div>
//           <h3>Game over</h3>
//           <ol>{state.leaderboard.map((p,i)=><li key={i}>{p.name} — {p.score}</li>)}</ol>
//           <p><Link to="/join">Join another</Link></p>
//         </div>
//       )}
//     </div>
//   )
// }



// import { useEffect, useMemo, useState } from "react";
// import { useParams, useSearchParams, Link } from "react-router-dom";
// import { useSocket } from "./useSocket";

// export default function PlayerGame() {
//   const { code } = useParams();
//   const [params] = useSearchParams();
//   const name = useMemo(()=>params.get("name") || "Player", [params]);
//   const socket = useSocket();
//   const [state, setState] = useState({ phase: "lobby" });
//   const [selectedAnswers, setSelectedAnswers] = useState([]);
//   const [selectedRadioAnswer, setSelectedRadioAnswer] = useState(null);
//   const [result, setResult] = useState(null);
//   const [timer, setTimer] = useState(0);

//   useEffect(() => {
//     if (!socket) return;
//     socket.emit("player:join", { roomCode: code, name });

//     const onLobby = ({ count }) => setState(prevState => ({ ...prevState, phase: "lobby", count }));
    
//     // FIX: Use functional update to ensure you have the latest state
//     const onStart = (q) => {
//       setState(prevState => ({ ...prevState, phase: "question", q }));
//       setSelectedAnswers([]);
//       setSelectedRadioAnswer(null);
//       setResult(null);
//       const ms = q.endsAt - Date.now();
//       setTimer(Math.ceil(ms/1000));
//     };

//     const tick = setInterval(() => setTimer(t => Math.max(0,t-1)), 1000);
    
//     // FIX: Use functional update to ensure you have the latest state
//     const onEnd = ({ correctIndices, leaderboard }) => {
//       setState(prevState => ({ ...prevState, phase: "reveal", correctIndices, leaderboard }));
//     };

//     const onOver = ({ leaderboard }) => setState(prevState => ({ ...prevState, phase: "over", leaderboard }));
//     const onAnswerRes = ({ correct }) => setResult(correct ? "Correct!" : "Wrong");

//     socket.on("lobby:update", onLobby);
//     socket.on("question:start", onStart);
//     socket.on("question:end", onEnd);
//     socket.on("game:over", onOver);
//     socket.on("player:answer_result", onAnswerRes);

//     return () => {
//       clearInterval(tick);
//       socket.off("lobby:update", onLobby);
//       socket.off("question:start", onStart);
//       socket.off("question:end", onEnd);
//       socket.off("game:over", onOver);
//       socket.off("player:answer_result", onAnswerRes);
//     };
//   }, [socket, code, name]);

//   const handleCheckboxChange = (index) => {
//     setSelectedAnswers(prevAnswers => 
//       prevAnswers.includes(index) 
//         ? prevAnswers.filter(i => i !== index) 
//         : [...prevAnswers, index]
//     );
//   };

//   const handleRadioChange = (index) => {
//     setSelectedRadioAnswer(index);
//   };
  
//   const submitAnswers = () => {
//     const q = state.q; // Access the latest question from state
//     if (!q) return;

//     if (q.hasMultipleAnswers) {
//       if (selectedAnswers.length > 0) {
//         const sortedAnswers = selectedAnswers.sort((a, b) => a - b);
//         socket.emit("player:answer", { roomCode: code, choiceIndices: sortedAnswers });
//       }
//     } else {
//       if (selectedRadioAnswer !== null) {
//         socket.emit("player:answer", { roomCode: code, choiceIndices: [selectedRadioAnswer] });
//       }
//     }
//   };

//   const correctAnswersText = useMemo(() => {
//     if (state.phase === "reveal" && state.q && state.correctIndices) {
//       return state.correctIndices.map(index => state.q.choices[index]);
//     }
//     return [];
//   }, [state]);

//   return (
//     <div>
//       <h2>Room: {code}</h2>
//       {state.phase === "lobby" && <p>Waiting... Players: {state.count || 1}</p>}

//       {state.phase === "question" && (
//         <div>
//           <h3>{state.q.text}</h3>
//           <p>Time left: {timer}s</p>
//           {state.q.choices.map((c, i) => (
//             <div key={i}>
//               <label>
//                 {state.q.hasMultipleAnswers ? (
//                   <input
//                     type="checkbox"
//                     checked={selectedAnswers.includes(i)}
//                     onChange={() => handleCheckboxChange(i)}
//                   />
//                 ) : (
//                   <input
//                     type="radio"
//                     name="answer"
//                     value={i}
//                     checked={selectedRadioAnswer === i}
//                     onChange={() => handleRadioChange(i)}
//                   />
//                 )}
//                 {c}
//               </label>
//             </div>
//           ))}
//           <button 
//             onClick={submitAnswers} 
//             disabled={(state.q.hasMultipleAnswers && selectedAnswers.length === 0) || (!state.q.hasMultipleAnswers && selectedRadioAnswer === null) || result !== null}
//           >
//             Submit Answer
//           </button>
//           {result && <p>{result}</p>}
//         </div>
//       )}

//       {state.phase === "reveal" && (
//         <div>
//           <h3>Correct answer(s):</h3>
//           <ul>
//             {correctAnswersText.map((answer, i) => (
//               <li key={i}> {answer}</li>
//             ))}
//           </ul>
//           <h4>Leaderboard</h4>
//           <ol>{state.leaderboard.map((p,i)=><li key={i}>{p.name} — {p.score}</li>)}</ol>
//         </div>
//       )}

//       {state.phase === "over" && (
//         <div>
//           <h3>Game over</h3>
//           <ol>{state.leaderboard.map((p,i)=><li key={i}>{p.name} — {p.score}</li>)}</ol>
//           <p><Link to="/join">Join another</Link></p>
//         </div>
//       )}
//     </div>
//   );
// }

// import { useEffect, useMemo, useState } from "react";
// import { useParams, useSearchParams, Link } from "react-router-dom";
// import { useSocket } from "./useSocket";

// export default function PlayerGame() {
//   const { code } = useParams();
//   const [params] = useSearchParams();
//   const name = useMemo(()=>params.get("name") || "Player", [params]);
//   const socket = useSocket();
//   const [state, setState] = useState({ phase: "lobby" });
//   const [selectedAnswers, setSelectedAnswers] = useState([]);
//   const [selectedRadioAnswer, setSelectedRadioAnswer] = useState(null);
//   const [result, setResult] = useState(null);
//   const [timer, setTimer] = useState(0);

//   useEffect(() => {
//     if (!socket) return;
//     socket.emit("player:join", { roomCode: code, name });

//     const onLobby = ({ count }) => setState({ phase: "lobby", count });
    
//     // Use functional state update to handle incoming question data
//     const onStart = (q) => {
//       setState(prevState => ({ ...prevState, phase: "question", q }));
//       setSelectedAnswers([]);
//       setSelectedRadioAnswer(null);
//       setResult(null);
//       const ms = q.endsAt - Date.now();
//       setTimer(Math.ceil(ms/1000));
//     };

//     const tick = setInterval(() => setTimer(t => Math.max(0,t-1)), 1000);
    
//     // Use functional state update for reveal phase
//     const onEnd = ({ correctIndices, leaderboard }) => {
//       setState(prevState => ({ ...prevState, phase: "reveal", correctIndices, leaderboard }));
//     };

//     const onOver = ({ leaderboard }) => setState(prevState => ({ ...prevState, phase: "over", leaderboard }));
//     const onAnswerRes = ({ correct }) => setResult(correct ? "Correct!" : "Wrong");

//     socket.on("lobby:update", onLobby);
//     socket.on("question:start", onStart);
//     socket.on("question:end", onEnd);
//     socket.on("game:over", onOver);
//     socket.on("player:answer_result", onAnswerRes);

//     return () => {
//       clearInterval(tick);
//       // Clean up all listeners to prevent memory leaks and unexpected behavior
//       socket.off("lobby:update", onLobby);
//       socket.off("question:start", onStart);
//       socket.off("question:end", onEnd);
//       socket.off("game:over", onOver);
//       socket.off("player:answer_result", onAnswerRes);
//     };
//   }, [socket, code, name]); // The dependency array is correct and clean

//   const handleCheckboxChange = (index) => {
//     // ... same as before
//     setSelectedAnswers(prevAnswers => 
//       prevAnswers.includes(index) 
//         ? prevAnswers.filter(i => i !== index) 
//         : [...prevAnswers, index]
//     );
//   };

//   const handleRadioChange = (index) => {
//     // ... same as before
//     setSelectedRadioAnswer(index);
//   };
  
//   const submitAnswers = () => {
//     // Access the latest question data directly from the state
//     const q = state.q;
//     if (!q) return;

//     if (q.hasMultipleAnswers) {
//       if (selectedAnswers.length > 0) {
//         const sortedAnswers = selectedAnswers.sort((a, b) => a - b);
//         socket.emit("player:answer", { roomCode: code, choiceIndices: sortedAnswers });
//       }
//     } else {
//       if (selectedRadioAnswer !== null) {
//         socket.emit("player:answer", { roomCode: code, choiceIndices: [selectedRadioAnswer] });
//       }
//     }
//   };

//   const correctAnswersText = useMemo(() => {
//     if (state.phase === "reveal" && state.q && state.correctIndices) {
//       return state.correctIndices.map(index => state.q.choices[index]);
//     }
//     return [];
//   }, [state]);

//   // The rendering logic remains the same
//   return (
//     <div>
//       {/* ... */}
//       {state.phase === "lobby" && <p>Waiting... Players: {state.count || 1}</p>}

//       {state.phase === "question" && (
//         <div>
//           {/* <h3>{state.q.text}</h3> */}
//           <h3 dangerouslySetInnerHTML={{ __html: state.q.text }}></h3>
//           <p>Time left: {timer}s</p>
//           {state.q.choices.map((c, i) => (
//             <div key={i}>
//               <label>
//                 {state.q.hasMultipleAnswers ? (
//                   <input
//                     type="checkbox"
//                     checked={selectedAnswers.includes(i)}
//                     onChange={() => handleCheckboxChange(i)}
//                   />
//                 ) : (
//                   <input
//                     type="radio"
//                     name="answer"
//                     value={i}
//                     checked={selectedRadioAnswer === i}
//                     onChange={() => handleRadioChange(i)}
//                   />
//                 )}
//                 {c}
//               </label>
//             </div>
//           ))}
//           <button 
//             onClick={submitAnswers} 
//             disabled={(state.q.hasMultipleAnswers && selectedAnswers.length === 0) || (!state.q.hasMultipleAnswers && selectedRadioAnswer === null) || result !== null}
//           >
//             Submit Answer
//           </button>
//           {result && <p>{result}</p>}
//         </div>
//       )}

//       {state.phase === "reveal" && (
//         <div>
//           <h3>Correct answer(s):</h3>
//           <ul>
//             {correctAnswersText.map((answer, i) => (
//               <li key={i}> {answer}</li>
//             ))}
//           </ul>
//           <h4>Leaderboard</h4>
//           <ol>{state.leaderboard.map((p,i)=><li key={i}>{p.name} — {p.score}</li>)}</ol>
//         </div>
//       )}

//       {state.phase === "over" && (
//         <div>
//           <h3>Game over</h3>
//           <ol>{state.leaderboard.map((p,i)=><li key={i}>{p.name} — {p.score}</li>)}</ol>
//           <p><Link to="/join">Join another</Link></p>
//         </div>
//       )}
//     </div>
//   );
// }



// import { useEffect, useMemo, useState } from "react";
// import { useParams, useSearchParams, Link } from "react-router-dom";
// import { useSocket } from "./useSocket";

// // Import Material-UI components
// import Radio from '@mui/material/Radio';
// import RadioGroup from '@mui/material/RadioGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import FormControl from '@mui/material/FormControl';
// import FormLabel from '@mui/material/FormLabel';
// import Checkbox from '@mui/material/Checkbox';
// import FormGroup from '@mui/material/FormGroup';
// import Button from '@mui/material/Button';
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';

// export default function PlayerGame() {
//   const { code } = useParams();
//   const [params] = useSearchParams();
//   const name = useMemo(()=>params.get("name") || "Player", [params]);
//   const socket = useSocket();
//   const [state, setState] = useState({ phase: "lobby" });
//   const [selectedAnswers, setSelectedAnswers] = useState([]);
//   const [selectedRadioAnswer, setSelectedRadioAnswer] = useState(null);
//   const [result, setResult] = useState(null);
//   const [timer, setTimer] = useState(0);

//   useEffect(() => {
//     if (!socket) return;
//     socket.emit("player:join", { roomCode: code, name });

//     const onLobby = ({ count }) => setState(prevState => ({ ...prevState, phase: "lobby", count }));
    
//     const onStart = (q) => {
//       setState(prevState => ({ ...prevState, phase: "question", q }));
//       setSelectedAnswers([]);
//       setSelectedRadioAnswer(null);
//       setResult(null);
//       const ms = q.endsAt - Date.now();
//       setTimer(Math.ceil(ms/1000));
//     };

//     const tick = setInterval(() => setTimer(t => Math.max(0,t-1)), 1000);
    
//     const onEnd = ({ correctIndices, leaderboard }) => {
//       setState(prevState => ({ ...prevState, phase: "reveal", correctIndices, leaderboard }));
//     };

//     const onOver = ({ leaderboard }) => setState(prevState => ({ ...prevState, phase: "over", leaderboard }));
//     const onAnswerRes = ({ correct }) => setResult(correct ? "Correct!" : "Wrong");

//     socket.on("lobby:update", onLobby);
//     socket.on("question:start", onStart);
//     socket.on("question:end", onEnd);
//     socket.on("game:over", onOver);
//     socket.on("player:answer_result", onAnswerRes);

//     return () => {
//       clearInterval(tick);
//       socket.off("lobby:update", onLobby);
//       socket.off("question:start", onStart);
//       socket.off("question:end", onEnd);
//       socket.off("game:over", onOver);
//       socket.off("player:answer_result", onAnswerRes);
//     };
//   }, [socket, code, name]);

//   const handleCheckboxChange = (index) => {
//     setSelectedAnswers(prevAnswers => 
//       prevAnswers.includes(index) 
//         ? prevAnswers.filter(i => i !== index) 
//         : [...prevAnswers, index]
//     );
//   };

//   const handleRadioChange = (event) => {
//     setSelectedRadioAnswer(Number(event.target.value));
//   };
  
//   const submitAnswers = () => {
//     const q = state.q; 
//     if (!q) return;

//     if (q.hasMultipleAnswers) {
//       if (selectedAnswers.length > 0) {
//         const sortedAnswers = selectedAnswers.sort((a, b) => a - b);
//         socket.emit("player:answer", { roomCode: code, choiceIndices: sortedAnswers });
//       }
//     } else {
//       if (selectedRadioAnswer !== null) {
//         socket.emit("player:answer", { roomCode: code, choiceIndices: [selectedRadioAnswer] });
//       }
//     }
//   };

//   const correctAnswersText = useMemo(() => {
//     if (state.phase === "reveal" && state.q && state.correctIndices) {
//       return state.correctIndices.map(index => state.q.choices[index]);
//     }
//     return [];
//   }, [state]);

//   return (
//     <Box sx={{ p: 6 }}>  
//       {state.phase === "lobby" && <Typography variant="body1">Waiting... Players: {state.count || 1}</Typography>}

//       {state.phase === "question" && (
//         <Box>
//           <div dangerouslySetInnerHTML={{ __html: state.q.text }} />
//           <Typography variant="body2" sx={{ mt: 2 }}>Time left: {timer}s</Typography>

//           {state.q.hasMultipleAnswers ? (
//             <FormGroup sx={{ mt: 2 }}>
//               {state.q.choices.map((c, i) => (
//                 <FormControlLabel
//                   key={i}
//                   control={
//                     <Checkbox
//                       checked={selectedAnswers.includes(i)}
//                       onChange={() => handleCheckboxChange(i)}
//                     />
//                   }
//                   label={c}
//                 />
//               ))}
//             </FormGroup>
//           ) : (
//             <FormControl component="fieldset" sx={{ mt: 2 }}>
//               <FormLabel component="legend">Select an Answer</FormLabel>
//               <RadioGroup
//                 aria-label="answers"
//                 name="radio-buttons-group"
//                 value={selectedRadioAnswer}
//                 onChange={handleRadioChange}
//               >
//                 {state.q.choices.map((c, i) => (
//                   <FormControlLabel
//                     key={i}
//                     value={i}
//                     control={<Radio />}
//                     label={c}
//                   />
//                 ))}
//               </RadioGroup>
//             </FormControl>
//           )}

//           <Button
//             variant="contained"
//             onClick={submitAnswers}
//             disabled={(state.q.hasMultipleAnswers && selectedAnswers.length === 0) || (!state.q.hasMultipleAnswers && selectedRadioAnswer === null) || result !== null}
//             sx={{ mt: 2 }}
//           >
//             Submit Answer
//           </Button>

//           {result && <Typography variant="body1" sx={{ mt: 2 }}>{result}</Typography>}
//         </Box>
//       )}

//       {state.phase === "reveal" && (
//         <Box>
//           <Typography variant="h5">Correct answer(s):</Typography>
//           <ul>
//             {correctAnswersText.map((answer, i) => (
//               <li key={i}>{answer}</li>
//             ))}
//           </ul>
//           <Typography variant="h6" sx={{ mt: 2 }}>Leaderboard</Typography>
//           <ol>{state.leaderboard.map((p,i)=><li key={i}>{p.name} — {p.score}</li>)}</ol>
//         </Box>
//       )}

//       {state.phase === "over" && (
//         <Box>
//           <Typography variant="h5">Game over</Typography>
//           <ol>{state.leaderboard.map((p,i)=><li key={i}>{p.name} — {p.score}</li>)}</ol>
//           <Button variant="contained" component={Link} to="/join" sx={{ mt: 2 }}>Join another</Button>
//         </Box>
//       )}
//     </Box>
//   )
// }


// Import Material-UI components
// import { Box, Card, Typography, Button, Divider } from "@mui/material";
// import Radio from '@mui/material/Radio';
// import RadioGroup from '@mui/material/RadioGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import FormControl from '@mui/material/FormControl';
// import FormLabel from '@mui/material/FormLabel';
// import Checkbox from '@mui/material/Checkbox';
// import FormGroup from '@mui/material/FormGroup';
// import { useEffect, useMemo, useState } from "react";
// import { useParams, useSearchParams, Link } from "react-router-dom";
// import { useSocket } from "./useSocket";
// import GameLayout from "./components/GameLayout";
// export default function PlayerGame() {
//   const { code } = useParams();
//   const [params] = useSearchParams();
//   const name = useMemo(()=>params.get("name") || "Player", [params]);
//   const socket = useSocket();
//   const [state, setState] = useState({ phase: "lobby" });
//   const [selectedAnswers, setSelectedAnswers] = useState([]);
//   const [selectedRadioAnswer, setSelectedRadioAnswer] = useState(null);
//   const [result, setResult] = useState(null);
//   const [timer, setTimer] = useState(0);

//   useEffect(() => {
//     if (!socket) return;
//     socket.emit("player:join", { roomCode: code, name });

//     const onLobby = ({ count }) => setState(prevState => ({ ...prevState, phase: "lobby", count }));
    
//     const onStart = (q) => {
//       setState(prevState => ({ ...prevState, phase: "question", q }));
//       setSelectedAnswers([]);
//       setSelectedRadioAnswer(null);
//       setResult(null);
//       const ms = q.endsAt - Date.now();
//       setTimer(Math.ceil(ms/1000));
//     };

//     const tick = setInterval(() => setTimer(t => Math.max(0,t-1)), 1000);
    
//     const onEnd = ({ correctIndices, leaderboard }) => {
//       setState(prevState => ({ ...prevState, phase: "reveal", correctIndices, leaderboard }));
//     };

//     const onOver = ({ leaderboard }) => setState(prevState => ({ ...prevState, phase: "over", leaderboard }));
//     const onAnswerRes = ({ correct }) => setResult(correct ? "Correct!" : "Wrong");

//     socket.on("lobby:update", onLobby);
//     socket.on("question:start", onStart);
//     socket.on("question:end", onEnd);
//     socket.on("game:over", onOver);
//     socket.on("player:answer_result", onAnswerRes);

//     return () => {
//       clearInterval(tick);
//       socket.off("lobby:update", onLobby);
//       socket.off("question:start", onStart);
//       socket.off("question:end", onEnd);
//       socket.off("game:over", onOver);
//       socket.off("player:answer_result", onAnswerRes);
//     };
//   }, [socket, code, name]);

//   const handleCheckboxChange = (index) => {
//     setSelectedAnswers(prevAnswers => 
//       prevAnswers.includes(index) 
//         ? prevAnswers.filter(i => i !== index) 
//         : [...prevAnswers, index]
//     );
//   };

//   const handleRadioChange = (event) => {
//     setSelectedRadioAnswer(Number(event.target.value));
//   };
  
//   const submitAnswers = () => {
//     const q = state.q; 
//     if (!q) return;

//     if (q.hasMultipleAnswers) {
//       if (selectedAnswers.length > 0) {
//         const sortedAnswers = selectedAnswers.sort((a, b) => a - b);
//         socket.emit("player:answer", { roomCode: code, choiceIndices: sortedAnswers });
//       }
//     } else {
//       if (selectedRadioAnswer !== null) {
//         socket.emit("player:answer", { roomCode: code, choiceIndices: [selectedRadioAnswer] });
//       }
//     }
//   };

//   const correctAnswersText = useMemo(() => {
//     if (state.phase === "reveal" && state.q && state.correctIndices) {
//       return state.correctIndices.map(index => state.q.choices[index]);
//     }
//     return [];
//   }, [state]);


//   return (
//     <GameLayout title={`Game Room: ${code}`}>
//     <Box className="flex flex-col items-center p-6 space-y-6">
//       <Card className="p-6 w-full max-w-xl bg-[#F8FAFC]/95 backdrop-blur-sm shadow-xl border border-[#BCCCDC]/40">
//         {state.phase === "lobby" && (
//           <Typography variant="h6" className="text-[#64748B] text-center">
//             Waiting for host... Players: {state.count || 1}
//           </Typography>
//         )}

//         {state.phase === "question" && (
//           <Box>
//             <Typography variant="h6" className="text-[#334155] mb-2" dangerouslySetInnerHTML={{ __html: state.q.text }} />
//             <Typography variant="body2" className="text-[#64748B] mb-4">
//               Time left: {timer}s
//             </Typography>
//                       {state.q.hasMultipleAnswers ? (
//             <FormGroup sx={{ mt: 2 }}>
//               {state.q.choices.map((c, i) => (
//                 <FormControlLabel
//                   key={i}
//                   control={
//                     <Checkbox
//                       checked={selectedAnswers.includes(i)}
//                       onChange={() => handleCheckboxChange(i)}
//                     />
//                   }
//                   label={c}
//                 />
//               ))}
//             </FormGroup>
//           ) : (
//             <FormControl component="fieldset" sx={{ mt: 2 }}>
//               <FormLabel component="legend">Select an Answer</FormLabel>
//               <RadioGroup
//                 aria-label="answers"
//                 name="radio-buttons-group"
//                 value={selectedRadioAnswer}
//                 onChange={handleRadioChange}
//               >
//                 {state.q.choices.map((c, i) => (
//                   <FormControlLabel
//                     key={i}
//                     value={i}
//                     control={<Radio />}
//                     label={c}
//                   />
//                 ))}
//               </RadioGroup>
//             </FormControl>
//           )}

//             <Button
//               variant="contained"
//               onClick={submitAnswers}
//               sx={{ mt: 2, backgroundColor: "#64748B", "&:hover": { backgroundColor: "#475569" } }}
//             >
//               Submit
//             </Button>

//             {result && <Typography className="mt-4 text-center">{result}</Typography>}
//           </Box>
//         )}

//         {state.phase === "reveal" && (
//           <Box className="text-center">
//             <Typography variant="h6">Correct answer(s):</Typography>
//             <ul>
//               {correctAnswersText.map((a, i) => (
//                 <li key={i}>{a}</li>
//               ))}
//             </ul>
//             <Divider className="my-3" />
//             <Typography variant="h6">Leaderboard</Typography>
//             <ol>{state.leaderboard.map((p, i) => <li key={i}>{p.name} — {p.score}</li>)}</ol>
//           </Box>
//         )}

//         {state.phase === "over" && (
//           <Box className="text-center">
//             <Typography variant="h5">Game Over!</Typography>
//             <ol>{state.leaderboard.map((p, i) => <li key={i}>{p.name} — {p.score}</li>)}</ol>
//             <Button component={Link} to="/join" variant="contained"
//               sx={{ mt: 3, backgroundColor: "#64748B", "&:hover": { backgroundColor: "#475569" } }}>
//               Join Another
//             </Button>
//           </Box>
//         )}
//       </Card>
//     </Box>
//     </GameLayout>
//   );
// }


// import { Box, Card, Typography, Button, Divider } from "@mui/material";
// import { useEffect, useMemo, useState } from "react";
// import { useParams, useSearchParams, Link } from "react-router-dom";
// import { useSocket } from "./useSocket";
// import { motion } from "framer-motion";

// export default function PlayerGame() {
//   const { code } = useParams();
//   const [params] = useSearchParams();
//   const name = useMemo(() => params.get("name") || "Player", [params]);
//   const socket = useSocket();
//   const [state, setState] = useState({ phase: "lobby" });
//   const [selectedAnswers, setSelectedAnswers] = useState([]);
//   const [selectedRadioAnswer, setSelectedRadioAnswer] = useState(null);
//   const [result, setResult] = useState(null);
//   const [timer, setTimer] = useState(0);

//   const emojis = ["⚡", "🎯", "🎉", "🔥", "💡", "⭐", "🎮", "🥳"];

//   useEffect(() => {
//     if (!socket) return;
//     socket.emit("player:join", { roomCode: code, name });

//     const onLobby = ({ count }) => setState(prev => ({ ...prev, phase: "lobby", count }));
//     const onStart = (q) => {
//       setState(prev => ({ ...prev, phase: "question", q }));
//       setSelectedAnswers([]);
//       setSelectedRadioAnswer(null);
//       setResult(null);
//       const ms = q.endsAt - Date.now();
//       setTimer(Math.ceil(ms / 1000));
//     };
//     const tick = setInterval(() => setTimer(t => Math.max(0, t - 1)), 1000);
//     const onEnd = ({ correctIndices, leaderboard }) => setState(prev => ({ ...prev, phase: "reveal", correctIndices, leaderboard }));
//     const onOver = ({ leaderboard }) => setState(prev => ({ ...prev, phase: "over", leaderboard }));
//     const onAnswerRes = ({ correct }) => setResult(correct ? "✅ Correct!" : "❌ Wrong");

//     socket.on("lobby:update", onLobby);
//     socket.on("question:start", onStart);
//     socket.on("question:end", onEnd);
//     socket.on("game:over", onOver);
//     socket.on("player:answer_result", onAnswerRes);

//     return () => {
//       clearInterval(tick);
//       socket.off("lobby:update", onLobby);
//       socket.off("question:start", onStart);
//       socket.off("question:end", onEnd);
//       socket.off("game:over", onOver);
//       socket.off("player:answer_result", onAnswerRes);
//     };
//   }, [socket, code, name]);

//   const handleCheckboxChange = (index) => {
//     setSelectedAnswers(prev =>
//       prev.includes(index)
//         ? prev.filter(i => i !== index)
//         : [...prev, index]
//     );
//   };

//   const handleRadioChange = (event) => {
//     setSelectedRadioAnswer(Number(event.target.value));
//   };

//   const submitAnswers = () => {
//     const q = state.q;
//     if (!q) return;

//     if (q.hasMultipleAnswers) {
//       if (selectedAnswers.length > 0) {
//         const sortedAnswers = selectedAnswers.sort((a, b) => a - b);
//         socket.emit("player:answer", { roomCode: code, choiceIndices: sortedAnswers });
//       }
//     } else {
//       if (selectedRadioAnswer !== null) {
//         socket.emit("player:answer", { roomCode: code, choiceIndices: [selectedRadioAnswer] });
//       }
//     }
//   };

//   const correctAnswersText = useMemo(() => {
//     if (state.phase === "reveal" && state.q && state.correctIndices) {
//       return state.correctIndices.map(index => state.q.choices[index]);
//     }
//     return [];
//   }, [state]);

//   return (
//     <Box
//       className="flex flex-col items-center justify-center min-h-screen relative overflow-hidden p-6"
//       sx={{
//         background: "linear-gradient(-45deg, #0A0A1A, #1E1B4B, #2B1E68, #4338CA)",
//         backgroundSize: "400% 400%",
//         animation: "gradientMove 15s ease infinite",
//       }}
//     >
//       <style>
//         {`
//         @keyframes gradientMove {
//           0% { background-position: 0% 50%; }
//           50% { background-position: 100% 50%; }
//           100% { background-position: 0% 50%; }
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
//             opacity: 0.12 + Math.random() * 0.25,
//           }}
//           animate={{
//             y: [0, -25, 0],
//             x: [0, 10, 0],
//             rotate: [0, 8, -8, 0],
//           }}
//           transition={{
//             duration: 8 + Math.random() * 4,
//             repeat: Infinity,
//             ease: "easeInOut",
//           }}
//         >
//           {emoji}
//         </motion.div>
//       ))}

//       <motion.div
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//         className="z-10 w-full max-w-3xl"
//       >
//         <Card
//           className="p-8 bg-white/10 backdrop-blur-lg border border-white/40 shadow-[0_0_25px_rgba(255,255,255,0.5)] text-center"
//           sx={{
//             borderRadius: "22px",
//             color: "#1E1B4B",
//             backdropFilter: "blur(20px)",
//           }}
//         >
//           {/* Lobby Phase */}
//           {state.phase === "lobby" && (
//             <Typography variant="h5" sx={{ fontWeight: 700, color: "#1E1B4B" }}>
//               Waiting for host... 👀 Players: {state.count || 1}
//             </Typography>
//           )}

//           {/* Question Phase */}
//           {state.phase === "question" && (
//             <Box>
//               <Typography
//                 variant="h5"
//                 sx={{
//                   mb: 3,
//                   color: "#1E1B4B",
//                   fontWeight: 700,
//                 }}
//                 dangerouslySetInnerHTML={{ __html: state.q.text }}
//               />

//               <Typography variant="body2" sx={{ mb: 3, color: "#312E81" }}>
//                 ⏳ Time left: {timer}s
//               </Typography>

//               <Box
//                 sx={{
//                   display: "grid",
//                   gridTemplateColumns:
//                     state.q.choices.some(c => c.length > 25)
//                       ? "1fr"
//                       : "repeat(2, 1fr)",
//                   gap: 2,
//                 }}
//               >
//                 {state.q.choices.map((choice, i) => (
//                   <Card
//                     key={i}
//                     onClick={() =>
//                       state.q.hasMultipleAnswers
//                         ? handleCheckboxChange(i)
//                         : setSelectedRadioAnswer(i)
//                     }
//                     sx={{
//                       cursor: "pointer",
//                       padding: 2,
//                       borderRadius: "12px",
//                       textAlign: "center",
//                       fontWeight: 600,
//                       border:
//                         selectedAnswers.includes(i) || selectedRadioAnswer === i
//                           ? "2px solid #4C1D95"
//                           : "1px solid rgba(0,0,0,0.2)",
//                       backgroundColor:
//                         selectedAnswers.includes(i) || selectedRadioAnswer === i
//                           ? "rgba(200, 180, 255, 0.3)"
//                           : "rgba(255,255,255,0.5)",
//                       color: "#1E1B4B",
//                       "&:hover": {
//                         backgroundColor: "rgba(255,255,255,0.8)",
//                         transform: "scale(1.03)",
//                         transition: "all 0.2s ease",
//                       },
//                     }}
//                   >
//                     {choice}
//                   </Card>
//                 ))}
//               </Box>

//               <Button
//                 variant="contained"
//                 onClick={submitAnswers}
//                 sx={{
//                   mt: 4,
//                   py: 1.2,
//                   px: 4,
//                   borderRadius: "12px",
//                   background: "linear-gradient(90deg,#FDE68A,#F9A8D4,#C084FC)",
//                   color: "#1E1B4B",
//                   fontWeight: 700,
//                   "&:hover": {
//                     transform: "scale(1.05)",
//                     boxShadow: "0 0 20px rgba(255,255,255,0.5)",
//                   },
//                 }}
//               >
//                 Submit Answer
//               </Button>

//               {result && (
//                 <Typography sx={{ mt: 3, fontSize: "1.1rem", fontWeight: 600, color: "#1E1B4B" }}>
//                   {result}
//                 </Typography>
//               )}
//             </Box>
//           )}

//           {/* Reveal & Over Phases remain the same — cleaner dark text */}
//           {state.phase === "reveal" && (
//             <Box>
//               <Typography variant="h5" sx={{ mb: 2, color: "#1E1B4B" }}>
//                 ✅ Correct Answers:
//               </Typography>
//               <Typography sx={{ mb: 3, fontWeight: 500 }}>
//                 {correctAnswersText.join(", ")}
//               </Typography>
//               <Divider sx={{ my: 3, borderColor: "#1E1B4B" }} />
//               <Typography variant="h5" sx={{ color: "#1E1B4B" }}>
//                 🏆 Leaderboard
//               </Typography>
//               <ol style={{ listStyle: "none", padding: 0, color: "#1E1B4B" }}>
//                 {state.leaderboard.map((p, i) => (
//                   <li key={i} style={{ margin: "6px 0" }}>
//                     {p.name} — {p.score}
//                   </li>
//                 ))}
//               </ol>
//             </Box>
//           )}
//         </Card>
//       </motion.div>
//     </Box>
//   );
// }



// import { Box, Card, Typography, Button, Divider } from "@mui/material";
// import { useEffect, useMemo, useState } from "react";
// import { useParams, useSearchParams, Link } from "react-router-dom";
// import { useSocket } from "./useSocket";
// import { motion } from "framer-motion";

// export default function PlayerGame() {
//   const { code } = useParams();
//   const [params] = useSearchParams();
//   const name = useMemo(() => params.get("name") || "Player", [params]);
//   const socket = useSocket();

//   const [state, setState] = useState({ phase: "lobby", leaderboard: [] });
//   const [selectedAnswers, setSelectedAnswers] = useState([]);
//   const [selectedRadioAnswer, setSelectedRadioAnswer] = useState(null);
//   const [result, setResult] = useState(null);
//   const [timer, setTimer] = useState(0);

//   const emojis = ["⚡", "🎯", "🎉", "🔥", "💡", "⭐", "🎮", "🥳"];

//   // --- Socket Setup ---
//   useEffect(() => {
//     if (!socket) return;
//     socket.emit("player:join", { roomCode: code, name });

//     const onLobby = ({ count }) => setState(prev => ({ ...prev, phase: "lobby", count }));
//     const onStart = (q) => {
//       setState(prev => ({ ...prev, phase: "question", q }));
//       setSelectedAnswers([]);
//       setSelectedRadioAnswer(null);
//       setResult(null);
//       const ms = q.endsAt - Date.now();
//       setTimer(Math.ceil(ms / 1000));
//     };
//     const tick = setInterval(() => setTimer(t => Math.max(0, t - 1)), 1000);

//     const onEnd = ({ correctIndices, leaderboard }) => setState(prev => ({ ...prev, phase: "reveal", correctIndices, leaderboard }));
//     const onOver = ({ leaderboard }) => setState(prev => ({ ...prev, phase: "over", leaderboard }));
//     const onAnswerRes = ({ correct }) => setResult(correct ? "✅ Correct!" : "❌ Wrong");
//     const onLiveLeaderboard = ({ leaderboard }) => setState(prev => ({ ...prev, leaderboard }));

//     socket.on("lobby:update", onLobby);
//     socket.on("question:start", onStart);
//     socket.on("question:end", onEnd);
//     socket.on("game:over", onOver);
//     socket.on("player:answer_result", onAnswerRes);
//     socket.on("leaderboard:update", onLiveLeaderboard);

//     return () => {
//       clearInterval(tick);
//       socket.off("lobby:update", onLobby);
//       socket.off("question:start", onStart);
//       socket.off("question:end", onEnd);
//       socket.off("game:over", onOver);
//       socket.off("player:answer_result", onAnswerRes);
//       socket.off("leaderboard:update", onLiveLeaderboard);
//     };
//   }, [socket, code, name]);

//   // --- Selection Handlers ---
//   const handleCheckboxChange = (index) => {
//     setSelectedAnswers(prev =>
//       prev.includes(index)
//         ? prev.filter(i => i !== index)
//         : [...prev, index]
//     );
//   };

//   const handleRadioChange = (event) => {
//     setSelectedRadioAnswer(Number(event.target.value));
//   };

//   const submitAnswers = () => {
//     const q = state.q;
//     if (!q) return;

//     if (q.hasMultipleAnswers) {
//       if (selectedAnswers.length > 0) {
//         const sortedAnswers = selectedAnswers.sort((a, b) => a - b);
//         socket.emit("player:answer", { roomCode: code, choiceIndices: sortedAnswers });
//       }
//     } else {
//       if (selectedRadioAnswer !== null) {
//         socket.emit("player:answer", { roomCode: code, choiceIndices: [selectedRadioAnswer] });
//       }
//     }
//   };

//   const correctAnswersText = useMemo(() => {
//     if (state.phase === "reveal" && state.q && state.correctIndices) {
//       return state.correctIndices.map(index => state.q.choices[index]);
//     }
//     return [];
//   }, [state]);

//   return (
//     <Box
//       className="flex flex-col items-center justify-center min-h-screen relative overflow-hidden p-6"
//       sx={{
//         background: "linear-gradient(-45deg, #0A0A1A, #1E1B4B, #2B1E68, #4338CA)",
//         backgroundSize: "400% 400%",
//         animation: "gradientMove 15s ease infinite",
//       }}
//     >
//       <style>
//         {`
//         @keyframes gradientMove {
//           0% { background-position: 0% 50%; }
//           50% { background-position: 100% 50%; }
//           100% { background-position: 0% 50%; }
//         }
//         @keyframes pulseGlow {
//           0% { box-shadow: 0 0 20px rgba(255,255,255,0.4); }
//           50% { box-shadow: 0 0 40px rgba(255,255,255,0.9); }
//           100% { box-shadow: 0 0 20px rgba(255,255,255,0.4); }
//         }
//         `}
//       </style>

//       {/* Floating Emojis */}
//       {emojis.map((emoji, i) => (
//         <motion.div
//           key={i}
//           className="absolute text-5xl select-none"
//           style={{
//             top: `${Math.random() * 90}vh`,
//             left: `${Math.random() * 90}vw`,
//             opacity: 0.1 + Math.random() * 0.2,
//           }}
//           animate={{
//             y: [0, -25, 0],
//             x: [0, 10, 0],
//             rotate: [0, 8, -8, 0],
//           }}
//           transition={{
//             duration: 8 + Math.random() * 4,
//             repeat: Infinity,
//             ease: "easeInOut",
//           }}
//         >
//           {emoji}
//         </motion.div>
//       ))}

//       {/* Live Leaderboard Panel */}
//       {state.leaderboard?.length > 0 && (
//         <motion.div
//           initial={{ x: 300, opacity: 0 }}
//           animate={{ x: 0, opacity: 1 }}
//           transition={{ duration: 0.6 }}
//           className="absolute right-6 top-6 z-20"
//         >
//           <Card
//             className="p-4 bg-white/20 backdrop-blur-md border border-white/40"
//             sx={{
//               borderRadius: "16px",
//               color: "#1E1B4B",
//               minWidth: "220px",
//               animation: "pulseGlow 3s infinite ease-in-out",
//               marginTop: "40px",
//             }}
//           >
//             <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: "#1E1B4B" }}>
//               🏆 Live Leaderboard
//             </Typography>
//             <Divider sx={{ mb: 1, borderColor: "rgba(255,255,255,0.4)" }} />
//             <ol style={{ listStyle: "none", padding: 0, margin: 0 }}>
//               {state.leaderboard.slice(0, 5).map((p, i) => (
//                 <li key={i} style={{
//                   margin: "6px 0",
//                   fontWeight: i === 0 ? 800 : 500,
//                   color: i === 0 ? "#4C1D95" : "#1E1B4B",
//                 }}>
//                   {i + 1}. {p.name} — {p.score}
//                 </li>
//               ))}
//             </ol>
//           </Card>
//         </motion.div>
//       )}

//       {/* Main Game Card */}
//       <motion.div
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//         className="z-10 w-full max-w-3xl"
//       >
//         <Card
//           className="p-8 bg-white/10 backdrop-blur-lg border border-white/40 text-center"
//           sx={{
//             borderRadius: "22px",
//             color: "#1E1B4B",
//             animation: "pulseGlow 3s infinite ease-in-out",
//           }}
//         >
//           {/* Lobby */}
//           {/* {state.phase === "lobby" && (
//             <Typography variant="h5" sx={{ fontWeight: 700, color: "#1E1B4B" }}>
//               Waiting for host... 👀 Players: {state.count || 1}
//             </Typography>
//           )} */}

//           {/* Lobby */}
// {state.phase === "lobby" && (
//   <Box className="text-center">
//     <Typography
//       variant="h4"
//       // sx={{
//       //   fontWeight: 700,
//       //   color: "#5905d7ff",
//       //   textShadow: "0 0 10px rgba(255,255,255,0.6)",
//       //   mb: 3,
//       // }}
//       sx={{ mb: 3, fontWeight: 700, background: "linear-gradient(90deg, #FDE68A, #F9A8D4, #C084FC)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
//     >
//       Waiting for host to start the game 🎯
//     </Typography>

//     <Typography
//       variant="h6"
//       sx={{ mb: 3, color: "#D1D5DB", fontWeight: 500 }}
//     >
//       Players joined: {state.count || 1}
//     </Typography>

//     <Box className="flex flex-wrap justify-center gap-3 mt-6">
//       {state.leaderboard?.length > 0 &&
//         state.leaderboard.map((player, i) => (
//           <motion.div
//             key={player.name}
//             initial={{ scale: 0, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             transition={{ type: "spring", stiffness: 120, damping: 12 }}
//             className="relative"
//           >
//             <motion.div
//               animate={{
//                 y: [0, -3, 0],
//                 rotate: [0, 3, -3, 0],
//               }}
//               transition={{
//                 duration: 2,
//                 repeat: Infinity,
//                 ease: "easeInOut",
//               }}
//             >
//               <Card
//                 sx={{
//                   px: 3,
//                   py: 1.5,
//                   borderRadius: "12px",
//                   background: "rgba(255,255,255,0.15)",
//                   border: "1px solid rgba(255,255,255,0.4)",
//                   boxShadow: "0 0 20px rgba(255,255,255,0.2)",
//                   color: "#fff",
//                   fontWeight: 600,
//                   backdropFilter: "blur(8px)",
//                 }}
//               >
//                 {player.name}
//               </Card>
//             </motion.div>

//             {/* Confetti sparkle effect */}
//             {[...Array(5)].map((_, j) => (
//               <motion.span
//                 key={j}
//                 className="absolute text-lg select-none"
//                 style={{
//                   top: "50%",
//                   left: "50%",
//                   transform: "translate(-50%, -50%)",
//                   color: ["#FDE68A", "#F9A8D4", "#C084FC"][j % 3],
//                 }}
//                 animate={{
//                   x: [0, (Math.random() - 0.5) * 80],
//                   y: [0, (Math.random() - 0.5) * 80],
//                   opacity: [1, 0],
//                   rotate: [0, 360],
//                 }}
//                 transition={{
//                   duration: 1.2 + Math.random() * 0.8,
//                   delay: Math.random() * 0.5,
//                   repeat: Infinity,
//                   repeatDelay: 5 + Math.random() * 3,
//                 }}
//               >
//                 ✨
//               </motion.span>
//             ))}
//           </motion.div>
//         ))}
//     </Box>
//   </Box>
// )}


//           {/* Question */}
//           {state.phase === "question" && (
//             <Box>
//               <Typography
//                 variant="h5"
//                 sx={{ mb: 3, fontWeight: 700, color: "#1E1B4B" }}
//                 dangerouslySetInnerHTML={{ __html: state.q.text }}
//               />
//               <Typography variant="body2" sx={{ mb: 3, color: "#312E81" }}>
//                 ⏳ Time left: {timer}s
//               </Typography>

//               <Box
//                 sx={{
//                   display: "grid",
//                   gridTemplateColumns:
//                     state.q.choices.some(c => c.length > 25)
//                       ? "1fr"
//                       : "repeat(2, 1fr)",
//                   gap: 2,
//                 }}
//               >
//                 {state.q.choices.map((choice, i) => (
//                   <Card
//                     key={i}
//                     onClick={() =>
//                       state.q.hasMultipleAnswers
//                         ? handleCheckboxChange(i)
//                         : setSelectedRadioAnswer(i)
//                     }
//                     sx={{
//                       cursor: "pointer",
//                       padding: 2,
//                       borderRadius: "12px",
//                       textAlign: "center",
//                       fontWeight: 600,
//                       border:
//                         selectedAnswers.includes(i) || selectedRadioAnswer === i
//                           ? "2px solid #4c1d95ff"
//                           : "1px solid rgba(0,0,0,0.2)",
//                       backgroundColor:
//                         selectedAnswers.includes(i) || selectedRadioAnswer === i
//                           ? "rgba(200, 180, 255, 0.3)"
//                           : "rgba(255,255,255,0.6)",
//                       color: "#1E1B4B",
//                       "&:hover": {
//                         backgroundColor: "rgba(255,255,255,0.85)",
//                         transform: "scale(1.03)",
//                         transition: "all 0.2s ease",
//                       },
//                     }}
//                   >
//                     {choice}
//                   </Card>
//                 ))}
//               </Box>

//               <Button
//                 variant="contained"
//                 onClick={submitAnswers}
//                 sx={{
//                   mt: 4,
//                   py: 1.2,
//                   px: 4,
//                   borderRadius: "12px",
//                   background: "linear-gradient(90deg,#FDE68A,#F9A8D4,#C084FC)",
//                   color: "#1E1B4B",
//                   fontWeight: 700,
//                   "&:hover": {
//                     transform: "scale(1.05)",
//                     boxShadow: "0 0 20px rgba(255,255,255,0.6)",
//                   },
//                 }}
//               >
//                 Submit Answer
//               </Button>

//               {result && (
//                 <Typography sx={{ mt: 3, fontSize: "1.1rem", fontWeight: 600, color: "#1E1B4B" }}>
//                   {result}
//                 </Typography>
//               )}
//             </Box>
//           )}

//           {/* Reveal / Game Over */}
//           {state.phase === "reveal" && (
//             <Box>
//               <Typography variant="h5" sx={{ mb: 2, color: "#1E1B4B" }}>
//                 ✅ Correct Answers:
//               </Typography>
//               <Typography sx={{ mb: 3, fontWeight: 500 }}>
//                 {correctAnswersText.join(", ")}
//               </Typography>
//             </Box>
//           )}
//           {state.phase === "over" && (
//             <Box>
//               <Typography variant="h5" sx={{ color: "#1E1B4B", mb: 2 }}>
//                 🎉 Game Over!
//               </Typography>
//               <ol style={{ listStyle: "none", padding: 0, color: "#1E1B4B" }}>
//                 {state.leaderboard.map((p, i) => (
//                   <li key={i}>{p.name} — {p.score}</li>
//                 ))}
//               </ol>
//               <Button
//                 component={Link}
//                 to="/join"
//                 variant="contained"
//                 sx={{
//                   mt: 3,
//                   backgroundColor: "#64748B",
//                   "&:hover": { backgroundColor: "#475569" },
//                 }}
//               >
//                 Join Another
//               </Button>
//             </Box>
//           )}
//         </Card>
//       </motion.div>
//     </Box>
//   );
// }


// import { Box, Card, Typography, Button, Divider } from "@mui/material";
// import { useEffect, useMemo, useState } from "react";
// import { useParams, useSearchParams, Link } from "react-router-dom";
// import { useSocket } from "./useSocket";
// import { motion } from "framer-motion";

// export default function PlayerGame() {
//   const { code } = useParams();
//   const [params] = useSearchParams();
//   const name = useMemo(() => params.get("name") || "Player", [params]);
//   const socket = useSocket();

//   const [state, setState] = useState({ phase: "lobby", leaderboard: [] });
//   const [selectedAnswers, setSelectedAnswers] = useState([]);
//   const [selectedRadioAnswer, setSelectedRadioAnswer] = useState(null);
//   const [timer, setTimer] = useState(0);

//   const emojis = ["⚡", "🎯", "🎉", "🔥", "💡", "⭐", "🎮", "🥳"];

//   useEffect(() => {
//     if (!socket) return;
//     socket.emit("player:join", { roomCode: code, name });

//     const onLobby = ({ count }) =>
//       setState(prev => ({ ...prev, phase: "lobby", count }));

//     const onStart = (q) => {
//       setState(prev => ({ ...prev, phase: "question", q }));
//       setSelectedAnswers([]);
//       setSelectedRadioAnswer(null);
//       const ms = q.endsAt - Date.now();
//       setTimer(Math.ceil(ms / 1000));
//     };

//     const tick = setInterval(() => setTimer(t => Math.max(0, t - 1)), 1000);

//     const onEnd = ({ correctIndices, leaderboard }) =>
//       setState(prev => ({ ...prev, phase: "reveal", correctIndices, leaderboard }));

//     const onOver = ({ leaderboard }) =>
//       setState(prev => ({ ...prev, phase: "over", leaderboard }));

//     const onLiveLeaderboard = ({ leaderboard }) =>
//       setState(prev => ({ ...prev, leaderboard }));

//     socket.on("lobby:update", onLobby);
//     socket.on("question:start", onStart);
//     socket.on("question:end", onEnd);
//     socket.on("game:over", onOver);
//     socket.on("leaderboard:update", onLiveLeaderboard);

//     return () => {
//       clearInterval(tick);
//       socket.off("lobby:update", onLobby);
//       socket.off("question:start", onStart);
//       socket.off("question:end", onEnd);
//       socket.off("game:over", onOver);
//       socket.off("leaderboard:update", onLiveLeaderboard);
//     };
//   }, [socket, code, name]);

//   // --- Answer Handlers ---
//   const handleCheckboxChange = (index) => {
//     setSelectedAnswers(prev =>
//       prev.includes(index)
//         ? prev.filter(i => i !== index)
//         : [...prev, index]
//     );
//   };

//   const handleRadioChange = (index) => setSelectedRadioAnswer(index);

//   const submitAnswers = () => {
//     const q = state.q;
//     if (!q) return;
//     if (q.hasMultipleAnswers && selectedAnswers.length > 0)
//       socket.emit("player:answer", { roomCode: code, choiceIndices: selectedAnswers });
//     else if (!q.hasMultipleAnswers && selectedRadioAnswer !== null)
//       socket.emit("player:answer", { roomCode: code, choiceIndices: [selectedRadioAnswer] });
//   };

//   // --- Timer Bar ---
//   const TimerBar = () => (
//     <Box
//       sx={{
//         height: "14px",
//         width: "100%",
//         background: "rgba(255,255,255,0.25)",
//         borderRadius: "8px",
//         overflow: "hidden",
//         boxShadow: "0 0 15px rgba(255,255,255,0.4)",
//         mb: 3,
//       }}
//     >
//       <motion.div
//         animate={{
//           width: state.q
//             ? `${(timer / (state.q.timeLimitSec || 20)) * 100}%`
//             : "0%",
//         }}
//         transition={{ duration: 1, ease: "linear" }}
//         style={{
//           height: "100%",
//           background:
//             "linear-gradient(90deg,#fde68a,#f9a8d4,#c084fc)",
//           borderRadius: "8px",
//           boxShadow: "0 0 20px rgba(255,255,255,0.8)",
//         }}
//       />
//     </Box>
//   );

//   return (
//     <Box
//       className="flex flex-col items-center justify-center min-h-screen relative overflow-hidden p-6"
//       sx={{
//         background: "radial-gradient(circle at 20% 30%, #7E22CE, #4C1D95, #1E1B4B)",
//       }}
//     >
//       {/* Floating Emojis */}
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
//             y: [0, -20, 0],
//             rotate: [0, 8, -8, 0],
//           }}
//           transition={{
//             duration: 8 + Math.random() * 3,
//             repeat: Infinity,
//             ease: "easeInOut",
//           }}
//         >
//           {emoji}
//         </motion.div>
//       ))}

//       {/* Leaderboard (Right Floating) */}
//       {state.leaderboard?.length > 0 && (
//         <motion.div
//           initial={{ x: 300, opacity: 0 }}
//           animate={{ x: 0, opacity: 1 }}
//           transition={{ duration: 0.6 }}
//           className="absolute right-6 top-6 z-20"
//         >
//           <Card
//             className="p-4 bg-white/20 backdrop-blur-md border border-white/40"
//             sx={{
//               borderRadius: "16px",
//               color: "#1E1B4B",
//               animation: "pulseGlow 3s infinite ease-in-out",
//               minWidth: "220px",
//             }}
//           >
//             <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
//               🏆 Live Leaderboard
//             </Typography>
//             <Divider sx={{ mb: 1, borderColor: "rgba(255,255,255,0.3)" }} />
//             <ol style={{ listStyle: "none", padding: 0, margin: 0 }}>
//               {state.leaderboard.slice(0, 5).map((p, i) => (
//                 <li key={i} style={{
//                   margin: "6px 0",
//                   fontWeight: i === 0 ? 800 : 500,
//                   color: i === 0 ? "#1E1B4B" : "#e0e0ff",
//                 }}>
//                   {i + 1}. {p.name} — {p.score}
//                 </li>
//               ))}
//             </ol>
//           </Card>
//         </motion.div>
     
//       )}

//       {/* Main Card */}
//       <motion.div
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//         className="z-10 w-full max-w-3xl"
//       >
//         <Card
//           className="p-8 bg-white/10 backdrop-blur-lg border border-white/40 text-center shadow-[0_0_25px_rgba(255,255,255,0.3)]"
//           sx={{
//             borderRadius: "22px",
//             animation: "pulseGlow 3s infinite ease-in-out",
//           }}
//         >
//           {/* Lobby */}
//           {state.phase === "lobby" && (
//             <Typography variant="h4" sx={{
//               fontWeight: 700,
//               background:
//                 "linear-gradient(90deg,#FDE68A,#F9A8D4,#C084FC)",
//               WebkitBackgroundClip: "text",
//               WebkitTextFillColor: "transparent",
//             }}>
//               Waiting for host to start 🎯
//             </Typography>
//           )}

//           {/* Question */}
//           {state.phase === "question" && (
//             <Box>
//               <Typography
//                 variant="h5"
//                 sx={{
//                   mb: 2,
//                   fontWeight: 700,
//                   color: "#1E1B4B",
//                   textShadow: "0 0 10px rgba(255,255,255,0.5)",
//                 }}
//                 dangerouslySetInnerHTML={{ __html: state.q.text }}
//               />
//               <TimerBar />
//               <Typography variant="body2" sx={{ mb: 3, color: "#e0e0ff" }}>
//                 ⏳ {timer}s left
//               </Typography>

//               <Box
//                 sx={{
//                   display: "grid",
//                   gridTemplateColumns:
//                     state.q.choices.some(c => c.length > 25)
//                       ? "1fr"
//                       : "repeat(2, 1fr)",
//                   gap: 2,
//                 }}
//               >
//                 {state.q.choices.map((choice, i) => (
//                   <Card
//                     key={i}
//                     onClick={() =>
//                       state.q.hasMultipleAnswers
//                         ? handleCheckboxChange(i)
//                         : handleRadioChange(i)
//                     }
//                     sx={{
//                       cursor: "pointer",
//                       p: 2,
//                       borderRadius: "12px",
//                       textAlign: "center",
//                       fontWeight: 600,
//                       border:
//                         selectedAnswers.includes(i) ||
//                         selectedRadioAnswer === i
//                           ? "2px solid #FDE68A"
//                           : "1px solid rgba(255,255,255,0.3)",
//                       backgroundColor:
//                         selectedAnswers.includes(i) ||
//                         selectedRadioAnswer === i
//                           ? "rgba(255,255,255,0.3)"
//                           : "rgba(255,255,255,0.15)",
//                       color: "#22236cff",
//                       "&:hover": {
//                         backgroundColor: "rgba(255,255,255,0.25)",
//                         transform: "scale(1.04)",
//                       },
//                     }}
//                   >
//                     {choice}
//                   </Card>
//                 ))}
//               </Box>

//               <Button
//                 variant="contained"
//                 onClick={submitAnswers}
//                 sx={{
//                   mt: 4,
//                   py: 1.2,
//                   px: 4,
//                   borderRadius: "12px",
//                   background:
//                     "linear-gradient(90deg,#FDE68A,#F9A8D4,#C084FC)",
//                   color: "#1E1B4B",
//                   fontWeight: 700,
//                   "&:hover": {
//                     transform: "scale(1.05)",
//                     boxShadow: "0 0 25px rgba(255,255,255,0.6)",
//                   },
//                 }}
//               >
//                 Submit Answer
//               </Button>
//             </Box>
//           )}

//           {/* Reveal */}
//           {state.phase === "reveal" && (
//             <Box>
//               <Typography variant="h5" sx={{ mb: 2, color: "#1E1B4B" }}>
//                 ✅ Correct Answer(s):
//               </Typography>
//               <Typography sx={{ mb: 3, color: "#fde68a" }}>
//                 {state.correctIndices?.map(
//                   (i) => state.q.choices[i]
//                 ).join(", ")}
//               </Typography>
//             </Box>
//           )}

//           {/* Game Over */}
//           {state.phase === "over" && (
//             <Box>
//               <Typography variant="h5" sx={{ color: "#1E1B4B", mb: 2 }}>
//                 🎉 Game Over!
//               </Typography>
//               <ol style={{ listStyle: "none", padding: 0, color: "#1E1B4B" }}>
//                 {state.leaderboard.map((p, i) => (
//                   <li key={i}>{p.name} — {p.score}</li>
//                 ))}
//               </ol>
//               <Button
//                 component={Link}
//                 to="/join"
//                 variant="contained"
//                 sx={{
//                   mt: 3,
//                   backgroundColor: "#64748B",
//                   "&:hover": { backgroundColor: "#475569" },
//                 }}
//               >
//                 Join Another
//               </Button>
//             </Box>
//           )}
//         </Card>
//       </motion.div>
//     </Box>
//   );
// }


import { Box, Card, Typography, Button, Divider } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams, useSearchParams, Link } from "react-router-dom";
import { useSocket } from "./useSocket";
import { motion } from "framer-motion";
import Leaderboard from "./components/Leaderboard";
import {
  playJoinSound,
  playQuestionStartSound,
  playClickSound,
  playSubmitSound,
  playCorrectSound,
  playWrongSound,
  playTickSound,
  playTimeUpSound,
  playGameOverSound,
} from "./utils/sounds";
import {
  startLobbyMusic,
  startQuestionMusic,
  setPanic,
  stopMusic,
  toggleMusicMuted,
  isMusicMuted,
} from "./utils/musicEngine";

export default function PlayerGame() {
  const { code } = useParams();
  const [params] = useSearchParams();
  const paramName = params.get("name");
  const socket = useSocket();

  // If no name in URL, show a prompt before joining
  const [playerName, setPlayerName] = useState(paramName || "");
  const [nameConfirmed, setNameConfirmed] = useState(!!paramName);

  const name = playerName || "Player";

  const [state, setState] = useState({ phase: "lobby", leaderboard: [] });
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [selectedRadioAnswer, setSelectedRadioAnswer] = useState(null);
  const [timer, setTimer] = useState(0);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [musicMuted, setMusicMuted] = useState(isMusicMuted());

  const emojis = ["⚡", "🎯", "🎉", "🔥", "💡", "⭐", "🎮", "🥳"];

  useEffect(() => {
    if (!socket || !nameConfirmed) return;
    socket.emit("player:join", { roomCode: code, name });

    const onLobby = ({ count }) => {
      playJoinSound();
      startLobbyMusic();
      setState((prev) => ({ ...prev, phase: "lobby", count }));
    };

    const onStart = (q) => {
      playQuestionStartSound();
      startQuestionMusic();
      setState((prev) => ({ ...prev, phase: "question", q }));
      setSelectedAnswers([]);
      setSelectedRadioAnswer(null);
      setHasSubmitted(false);
      const ms = q.endsAt - Date.now();
      setTimer(Math.ceil(ms / 1000));
    };

    const tick = setInterval(() => setTimer((t) => {
      const next = Math.max(0, t - 1);
      if (next > 0 && next <= 5) { playTickSound(); setPanic(true); }
      if (next === 0 && t > 0) playTimeUpSound();
      return next;
    }), 1000);

    const onEnd = ({ correctIndices, leaderboard }) => {
      startLobbyMusic();
      setState((prev) => ({
        ...prev,
        phase: "reveal",
        correctIndices,
        leaderboard,
      }));
    };

    const onOver = ({ leaderboard }) => {
      playGameOverSound();
      stopMusic();
      setState((prev) => ({ ...prev, phase: "over", leaderboard }));
    };

    const onLiveLeaderboard = ({ leaderboard }) =>
      setState((prev) => ({ ...prev, leaderboard }));

    const onClosed = () => {
      stopMusic();
      setState((prev) => ({ ...prev, phase: "closed" }));
    };

    socket.on("lobby:update", onLobby);
    socket.on("question:start", onStart);
    socket.on("question:end", onEnd);
    socket.on("game:over", onOver);
    socket.on("leaderboard:update", onLiveLeaderboard);
    socket.on("game:closed", onClosed);

    return () => {
      clearInterval(tick);
      stopMusic();
      socket.off("lobby:update", onLobby);
      socket.off("question:start", onStart);
      socket.off("question:end", onEnd);
      socket.off("game:over", onOver);
      socket.off("leaderboard:update", onLiveLeaderboard);
      socket.off("game:closed", onClosed);
    };
  }, [socket, code, name, nameConfirmed]);

  const submitWith = (indices) => {
    if (hasSubmitted || !state.q) return;
    playSubmitSound();
    socket.emit("player:answer", {
      roomCode: code,
      choiceIndices: indices,
    });
    setHasSubmitted(true);
  };

  const handleCheckboxChange = (index) => {
    if (hasSubmitted) return;
    playClickSound();
    const next = selectedAnswers.includes(index)
      ? selectedAnswers.filter((i) => i !== index)
      : [...selectedAnswers, index];
    setSelectedAnswers(next);

    // Auto-submit once the allowed number of options has been selected
    const allowed = state.q?.correctCount || 1;
    if (next.length >= allowed) {
      submitWith(next);
    }
  };

  const handleRadioChange = (index) => {
    if (hasSubmitted) return;
    playClickSound();
    setSelectedRadioAnswer(index);
    // Single-answer questions submit immediately on selection
    submitWith([index]);
  };

  // --- Timer Bar with counter overlay ---
  const TimerBar = () => {
    const total = state.q?.timeLimitSec || 20;
    const pct = state.q ? Math.max(0, Math.min(100, (timer / total) * 100)) : 0;
    return (
      <Box
        sx={{
          position: "relative",
          height: "28px",
          width: "100%",
          background: "rgba(255,255,255,0.25)",
          borderRadius: "10px",
          overflow: "hidden",
          boxShadow: "0 0 15px rgba(255,255,255,0.4)",
          mb: 3,
        }}
      >
        <motion.div
          animate={{
            width: `${pct}%`,
            background:
              timer <= 5
                ? "linear-gradient(90deg,#ef4444,#f97316,#fde68a)"
                : "linear-gradient(90deg,#fde68a,#f9a8d4,#c084fc)",
          }}
          transition={{ duration: 1, ease: "linear" }}
          style={{
            height: "100%",
            borderRadius: "10px",
            boxShadow:
              timer <= 5
                ? "0 0 25px rgba(239,68,68,0.8)"
                : "0 0 20px rgba(255,255,255,0.8)",
          }}
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
    );
  };

  // If name not yet confirmed, show name entry screen
  if (!nameConfirmed) {
    return (
      <Box
        className="flex flex-col items-center justify-center min-h-screen p-4"
        sx={{
          background: "radial-gradient(circle at 20% 30%, #7E22CE, #4C1D95, #1E1B4B)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card
            sx={{
              p: 5,
              borderRadius: 4,
              background: "rgba(255,255,255,0.08)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.15)",
              boxShadow: "0 0 40px rgba(168,85,247,0.4)",
              textAlign: "center",
              maxWidth: 400,
              width: "100%",
            }}
          >
            <Typography variant="h4" sx={{ color: "#fff", fontWeight: 700, mb: 1 }}>
              🎮 Join the Game!
            </Typography>
            <Typography sx={{ color: "rgba(255,255,255,0.7)", mb: 3 }}>
              Room: <strong>{code}</strong>
            </Typography>
            <input
              type="text"
              placeholder="Enter your name..."
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && playerName.trim()) setNameConfirmed(true); }}
              autoFocus
              style={{
                width: "100%",
                padding: "14px 18px",
                borderRadius: "12px",
                border: "1px solid rgba(255,255,255,0.2)",
                background: "rgba(255,255,255,0.1)",
                color: "#fff",
                fontSize: "1.1rem",
                outline: "none",
                marginBottom: "16px",
              }}
            />
            <Button
              variant="contained"
              fullWidth
              disabled={!playerName.trim()}
              onClick={() => setNameConfirmed(true)}
              sx={{
                py: 1.5,
                borderRadius: 3,
                fontWeight: 700,
                fontSize: "1.1rem",
                background: "linear-gradient(135deg, #a78bfa, #7c3aed)",
                "&:hover": { background: "linear-gradient(135deg, #7c3aed, #6d28d9)" },
              }}
            >
              Let's Go! 🚀
            </Button>
          </Card>
        </motion.div>
      </Box>
    );
  }

  return (
    <Box
      className="flex flex-col items-center justify-center min-h-screen relative overflow-hidden p-4 md:p-6"
      sx={{
        background:
          "radial-gradient(circle at 20% 30%, #7E22CE, #4C1D95, #1E1B4B)",
      }}
    >
      <style>
        {`
        @keyframes pulseGlow {
          0% { box-shadow: 0 0 10px rgba(253,230,138,0.3); }
          50% { box-shadow: 0 0 25px rgba(249,168,212,0.8); }
          100% { box-shadow: 0 0 10px rgba(253,230,138,0.3); }
        }
      `}
      </style>

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
            y: [0, -20, 0],
            rotate: [0, 8, -8, 0],
          }}
          transition={{
            duration: 8 + Math.random() * 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {emoji}
        </motion.div>
      ))}

      {/* Leaderboard
      {state.leaderboard?.length > 0 && (
        <motion.div
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="absolute right-4 md:right-6 top-4 md:top-6 z-20"
           style={{ top: "100px" }}
        >
          <Card
            className="p-3 md:p-4 bg-white/20 backdrop-blur-md border border-white/40"
            sx={{
              borderRadius: "16px",
              color: "#1E1B4B",
              animation: "pulseGlow 3s infinite ease-in-out",
              minWidth: "180px",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, fontSize: { xs: "1rem", md: "1.25rem" } }}>
              🏆 Live Leaderboard
            </Typography>
            <Divider sx={{ mb: 1, borderColor: "rgba(255,255,255,0.3)" }} />
            <ol style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {state.leaderboard.slice(0, 5).map((p, i) => (
                <li
                  key={i}
                  style={{
                    margin: "6px 0",
                    fontWeight: i === 0 ? 800 : 500,
                    color: i === 0 ? "#171d35ff" : "#1f1f47ff",
                    fontSize: i === 0 ? "1rem" : "0.875rem",
                  }}
                >
                  {i + 1}. {p.name} — {p.score}
                </li>
              ))}
            </ol>
          </Card>
        </motion.div> */
      /* )} */}

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="z-10 w-full max-w-3xl"
      >
        <Card
          className="p-4 md:p-8 bg-white/80 backdrop-blur-lg border border-white/40 text-center shadow-[0_0_25px_rgba(255,255,255,0.3)]"
          sx={{
            borderRadius: "22px",
            animation: "pulseGlow 3s infinite ease-in-out",
          }}
        >
          {state.phase === "lobby" && (
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                fontSize: { xs: "1.8rem", md: "2.5rem" },
                background:
                  "linear-gradient(90deg,#FDE68A,#F9A8D4,#C084FC)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Waiting for host to start 🎯
            </Typography>
          )}

          {state.phase === "question" && (
            <Box>
              <Typography
                variant="h5"
                sx={{
                  mb: 2,
                  px: 1,
                  fontWeight: 700,
                  color: "#1E1B4B",
                  wordBreak: "break-word",
                  overflowWrap: "anywhere",
                  fontSize: { xs: "1.35rem", md: "1.75rem" },
                }}
                dangerouslySetInnerHTML={{ __html: state.q.text }}
              />
              <Typography
                variant="h6"
                sx={{
                  mb: 2,
                  fontWeight: 700,
                  color: "#1E1B4B",
                  textShadow: "0 0 10px rgba(255,255,255,0.5)",
                  fontSize: { xs: "1rem", md: "1.25rem" },
                }}
              >
                {state.q.hasMultipleAnswers
                  ? `Select ${state.q.correctCount || 2} options 👇`
                  : "Tap your answer 👇"}
              </Typography>
              <TimerBar />

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: 2,
                }}
              >
                {state.q.choices.map((choice, i) => {
                  const isSelected =
                    selectedAnswers.includes(i) || selectedRadioAnswer === i;

                  return (
                    <Card
                      key={i}
                      onClick={() => {
                        if (hasSubmitted) return;
                        state.q.hasMultipleAnswers
                          ? handleCheckboxChange(i)
                          : handleRadioChange(i);
                      }}
                      sx={{
                        cursor: hasSubmitted ? "not-allowed" : "pointer",
                        p: 2,
                        minHeight: { xs: 90, md: 120 },
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "12px",
                        textAlign: "center",
                        fontWeight: 800,
                        fontSize: { xs: "2rem", md: "2.5rem" },
                        border: isSelected
                          ? "2px solid #22c55e"
                          : "1px solid rgba(255,255,255,0.3)",
                        backgroundColor: isSelected
                          ? "rgba(34,197,94,0.35)"
                          : "rgba(255,255,255,0.15)",
                        color: isSelected ? "#065f46" : "#22236cff",
                        opacity: hasSubmitted && !isSelected ? 0.6 : 1,
                        boxShadow: isSelected
                          ? "0 0 18px rgba(34,197,94,0.6)"
                          : "none",
                        animation:
                          hasSubmitted && isSelected
                            ? "pulseGlow 1.5s infinite ease-in-out"
                            : "none",
                        "&:hover": !hasSubmitted
                          ? {
                              backgroundColor: isSelected
                                ? "rgba(34,197,94,0.45)"
                                : "rgba(255,255,255,0.25)",
                              transform: "scale(1.04)",
                            }
                          : {},
                      }}
                    >
                      {i + 1}
                    </Card>
                  );
                })}
              </Box>

              {hasSubmitted && (
                <Typography
                  sx={{
                    mt: 4,
                    fontWeight: 700,
                    color: "#22c55e",
                    fontSize: "1.1rem",
                  }}
                >
                  Answer Locked 🔒
                </Typography>
              )}
            </Box>
          )}

          {state.phase === "reveal" && (
            <Box>
              <Typography variant="h5" sx={{ mb: 2, color: "#1E1B4B", fontSize: { xs: "1.5rem", md: "2rem" } }}>
                ✅ Correct Answer{state.correctIndices?.length > 1 ? "s" : ""}:
              </Typography>
              <Typography sx={{ mb: 3, fontWeight: 700, fontSize: { xs: "1.25rem", md: "1.5rem" }, color: "#1E1B4B" }}>
                {state.correctIndices
                  ?.map((i) => `Option ${i + 1}`)
                  .join(", ")}
              </Typography>
              <Leaderboard leaderboard={state.leaderboard} />
            </Box>
          )}

          {state.phase === "over" && (
            <Box>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 800,
                  mb: 3,
                  background: "linear-gradient(90deg,#FDE68A,#F9A8D4,#C084FC)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                🎉 Final Results
              </Typography>
              <Leaderboard leaderboard={state.leaderboard} podium />
            </Box>
          )}

          {state.phase === "closed" && (
            <Box>
              <Typography variant="h5" sx={{ color: "#1E1B4B", fontWeight: 700, mb: 2 }}>
                👋 The host has ended this session
              </Typography>
              <Typography sx={{ color: "#1E1B4B", mb: 3 }}>
                Thanks for playing!
              </Typography>
              <Link to="/join" style={{ color: "#FDE68A", fontWeight: 700 }}>
                Join another game
              </Link>
            </Box>
          )}
        </Card>
      </motion.div>
    </Box>
  );
}



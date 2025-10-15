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



import { Box, Card, Typography, Button, Divider } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams, Link } from "react-router-dom";
import { useSocket } from "./useSocket";
import { motion } from "framer-motion";

export default function PlayerGame() {
  const { code } = useParams();
  const [params] = useSearchParams();
  const name = useMemo(() => params.get("name") || "Player", [params]);
  const socket = useSocket();

  const [state, setState] = useState({ phase: "lobby", leaderboard: [] });
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [selectedRadioAnswer, setSelectedRadioAnswer] = useState(null);
  const [result, setResult] = useState(null);
  const [timer, setTimer] = useState(0);

  const emojis = ["⚡", "🎯", "🎉", "🔥", "💡", "⭐", "🎮", "🥳"];

  // --- Socket Setup ---
  useEffect(() => {
    if (!socket) return;
    socket.emit("player:join", { roomCode: code, name });

    const onLobby = ({ count }) => setState(prev => ({ ...prev, phase: "lobby", count }));
    const onStart = (q) => {
      setState(prev => ({ ...prev, phase: "question", q }));
      setSelectedAnswers([]);
      setSelectedRadioAnswer(null);
      setResult(null);
      const ms = q.endsAt - Date.now();
      setTimer(Math.ceil(ms / 1000));
    };
    const tick = setInterval(() => setTimer(t => Math.max(0, t - 1)), 1000);

    const onEnd = ({ correctIndices, leaderboard }) => setState(prev => ({ ...prev, phase: "reveal", correctIndices, leaderboard }));
    const onOver = ({ leaderboard }) => setState(prev => ({ ...prev, phase: "over", leaderboard }));
    const onAnswerRes = ({ correct }) => setResult(correct ? "✅ Correct!" : "❌ Wrong");
    const onLiveLeaderboard = ({ leaderboard }) => setState(prev => ({ ...prev, leaderboard }));

    socket.on("lobby:update", onLobby);
    socket.on("question:start", onStart);
    socket.on("question:end", onEnd);
    socket.on("game:over", onOver);
    socket.on("player:answer_result", onAnswerRes);
    socket.on("leaderboard:update", onLiveLeaderboard);

    return () => {
      clearInterval(tick);
      socket.off("lobby:update", onLobby);
      socket.off("question:start", onStart);
      socket.off("question:end", onEnd);
      socket.off("game:over", onOver);
      socket.off("player:answer_result", onAnswerRes);
      socket.off("leaderboard:update", onLiveLeaderboard);
    };
  }, [socket, code, name]);

  // --- Selection Handlers ---
  const handleCheckboxChange = (index) => {
    setSelectedAnswers(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const handleRadioChange = (event) => {
    setSelectedRadioAnswer(Number(event.target.value));
  };

  const submitAnswers = () => {
    const q = state.q;
    if (!q) return;

    if (q.hasMultipleAnswers) {
      if (selectedAnswers.length > 0) {
        const sortedAnswers = selectedAnswers.sort((a, b) => a - b);
        socket.emit("player:answer", { roomCode: code, choiceIndices: sortedAnswers });
      }
    } else {
      if (selectedRadioAnswer !== null) {
        socket.emit("player:answer", { roomCode: code, choiceIndices: [selectedRadioAnswer] });
      }
    }
  };

  const correctAnswersText = useMemo(() => {
    if (state.phase === "reveal" && state.q && state.correctIndices) {
      return state.correctIndices.map(index => state.q.choices[index]);
    }
    return [];
  }, [state]);

  return (
    <Box
      className="flex flex-col items-center justify-center min-h-screen relative overflow-hidden p-6"
      sx={{
        background: "linear-gradient(-45deg, #0A0A1A, #1E1B4B, #2B1E68, #4338CA)",
        backgroundSize: "400% 400%",
        animation: "gradientMove 15s ease infinite",
      }}
    >
      <style>
        {`
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes pulseGlow {
          0% { box-shadow: 0 0 20px rgba(255,255,255,0.4); }
          50% { box-shadow: 0 0 40px rgba(255,255,255,0.9); }
          100% { box-shadow: 0 0 20px rgba(255,255,255,0.4); }
        }
        `}
      </style>

      {/* Floating Emojis */}
      {emojis.map((emoji, i) => (
        <motion.div
          key={i}
          className="absolute text-5xl select-none"
          style={{
            top: `${Math.random() * 90}vh`,
            left: `${Math.random() * 90}vw`,
            opacity: 0.1 + Math.random() * 0.2,
          }}
          animate={{
            y: [0, -25, 0],
            x: [0, 10, 0],
            rotate: [0, 8, -8, 0],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {emoji}
        </motion.div>
      ))}

      {/* Live Leaderboard Panel */}
      {state.leaderboard?.length > 0 && (
        <motion.div
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="absolute right-6 top-6 z-20"
        >
          <Card
            className="p-4 bg-white/20 backdrop-blur-md border border-white/40"
            sx={{
              borderRadius: "16px",
              color: "#1E1B4B",
              minWidth: "220px",
              animation: "pulseGlow 3s infinite ease-in-out",
              marginTop: "40px",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: "#1E1B4B" }}>
              🏆 Live Leaderboard
            </Typography>
            <Divider sx={{ mb: 1, borderColor: "rgba(255,255,255,0.4)" }} />
            <ol style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {state.leaderboard.slice(0, 5).map((p, i) => (
                <li key={i} style={{
                  margin: "6px 0",
                  fontWeight: i === 0 ? 800 : 500,
                  color: i === 0 ? "#4C1D95" : "#1E1B4B",
                }}>
                  {i + 1}. {p.name} — {p.score}
                </li>
              ))}
            </ol>
          </Card>
        </motion.div>
      )}

      {/* Main Game Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="z-10 w-full max-w-3xl"
      >
        <Card
          className="p-8 bg-white/10 backdrop-blur-lg border border-white/40 text-center"
          sx={{
            borderRadius: "22px",
            color: "#1E1B4B",
            animation: "pulseGlow 3s infinite ease-in-out",
          }}
        >
          {/* Lobby */}
          {/* {state.phase === "lobby" && (
            <Typography variant="h5" sx={{ fontWeight: 700, color: "#1E1B4B" }}>
              Waiting for host... 👀 Players: {state.count || 1}
            </Typography>
          )} */}

          {/* Lobby */}
{state.phase === "lobby" && (
  <Box className="text-center">
    <Typography
      variant="h4"
      // sx={{
      //   fontWeight: 700,
      //   color: "#5905d7ff",
      //   textShadow: "0 0 10px rgba(255,255,255,0.6)",
      //   mb: 3,
      // }}
      sx={{ mb: 3, fontWeight: 700, background: "linear-gradient(90deg, #FDE68A, #F9A8D4, #C084FC)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
    >
      Waiting for host to start the game 🎯
    </Typography>

    <Typography
      variant="h6"
      sx={{ mb: 3, color: "#D1D5DB", fontWeight: 500 }}
    >
      Players joined: {state.count || 1}
    </Typography>

    <Box className="flex flex-wrap justify-center gap-3 mt-6">
      {state.leaderboard?.length > 0 &&
        state.leaderboard.map((player, i) => (
          <motion.div
            key={player.name}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 120, damping: 12 }}
            className="relative"
          >
            <motion.div
              animate={{
                y: [0, -3, 0],
                rotate: [0, 3, -3, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Card
                sx={{
                  px: 3,
                  py: 1.5,
                  borderRadius: "12px",
                  background: "rgba(255,255,255,0.15)",
                  border: "1px solid rgba(255,255,255,0.4)",
                  boxShadow: "0 0 20px rgba(255,255,255,0.2)",
                  color: "#fff",
                  fontWeight: 600,
                  backdropFilter: "blur(8px)",
                }}
              >
                {player.name}
              </Card>
            </motion.div>

            {/* Confetti sparkle effect */}
            {[...Array(5)].map((_, j) => (
              <motion.span
                key={j}
                className="absolute text-lg select-none"
                style={{
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  color: ["#FDE68A", "#F9A8D4", "#C084FC"][j % 3],
                }}
                animate={{
                  x: [0, (Math.random() - 0.5) * 80],
                  y: [0, (Math.random() - 0.5) * 80],
                  opacity: [1, 0],
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 1.2 + Math.random() * 0.8,
                  delay: Math.random() * 0.5,
                  repeat: Infinity,
                  repeatDelay: 5 + Math.random() * 3,
                }}
              >
                ✨
              </motion.span>
            ))}
          </motion.div>
        ))}
    </Box>
  </Box>
)}


          {/* Question */}
          {state.phase === "question" && (
            <Box>
              <Typography
                variant="h5"
                sx={{ mb: 3, fontWeight: 700, color: "#1E1B4B" }}
                dangerouslySetInnerHTML={{ __html: state.q.text }}
              />
              <Typography variant="body2" sx={{ mb: 3, color: "#312E81" }}>
                ⏳ Time left: {timer}s
              </Typography>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns:
                    state.q.choices.some(c => c.length > 25)
                      ? "1fr"
                      : "repeat(2, 1fr)",
                  gap: 2,
                }}
              >
                {state.q.choices.map((choice, i) => (
                  <Card
                    key={i}
                    onClick={() =>
                      state.q.hasMultipleAnswers
                        ? handleCheckboxChange(i)
                        : setSelectedRadioAnswer(i)
                    }
                    sx={{
                      cursor: "pointer",
                      padding: 2,
                      borderRadius: "12px",
                      textAlign: "center",
                      fontWeight: 600,
                      border:
                        selectedAnswers.includes(i) || selectedRadioAnswer === i
                          ? "2px solid #4c1d95ff"
                          : "1px solid rgba(0,0,0,0.2)",
                      backgroundColor:
                        selectedAnswers.includes(i) || selectedRadioAnswer === i
                          ? "rgba(200, 180, 255, 0.3)"
                          : "rgba(255,255,255,0.6)",
                      color: "#1E1B4B",
                      "&:hover": {
                        backgroundColor: "rgba(255,255,255,0.85)",
                        transform: "scale(1.03)",
                        transition: "all 0.2s ease",
                      },
                    }}
                  >
                    {choice}
                  </Card>
                ))}
              </Box>

              <Button
                variant="contained"
                onClick={submitAnswers}
                sx={{
                  mt: 4,
                  py: 1.2,
                  px: 4,
                  borderRadius: "12px",
                  background: "linear-gradient(90deg,#FDE68A,#F9A8D4,#C084FC)",
                  color: "#1E1B4B",
                  fontWeight: 700,
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: "0 0 20px rgba(255,255,255,0.6)",
                  },
                }}
              >
                Submit Answer
              </Button>

              {result && (
                <Typography sx={{ mt: 3, fontSize: "1.1rem", fontWeight: 600, color: "#1E1B4B" }}>
                  {result}
                </Typography>
              )}
            </Box>
          )}

          {/* Reveal / Game Over */}
          {state.phase === "reveal" && (
            <Box>
              <Typography variant="h5" sx={{ mb: 2, color: "#1E1B4B" }}>
                ✅ Correct Answers:
              </Typography>
              <Typography sx={{ mb: 3, fontWeight: 500 }}>
                {correctAnswersText.join(", ")}
              </Typography>
            </Box>
          )}
          {state.phase === "over" && (
            <Box>
              <Typography variant="h5" sx={{ color: "#1E1B4B", mb: 2 }}>
                🎉 Game Over!
              </Typography>
              <ol style={{ listStyle: "none", padding: 0, color: "#1E1B4B" }}>
                {state.leaderboard.map((p, i) => (
                  <li key={i}>{p.name} — {p.score}</li>
                ))}
              </ol>
              <Button
                component={Link}
                to="/join"
                variant="contained"
                sx={{
                  mt: 3,
                  backgroundColor: "#64748B",
                  "&:hover": { backgroundColor: "#475569" },
                }}
              >
                Join Another
              </Button>
            </Box>
          )}
        </Card>
      </motion.div>
    </Box>
  );
}

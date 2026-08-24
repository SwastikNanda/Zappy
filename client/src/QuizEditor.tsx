// // import React, { useState } from "react";
// // import API from "../api";

// // export default function QuizEditor({ onQuizSaved }) {
// //  const [quizDetails, setQuizDetails] = useState({
// //      title: "",
// //      description: "",
// //  });
// // const [currentQuestion, setCurrentQuestion] = useState({
// //  text: "",
// //  choices: ["", "", "", ""],
// //  correctIndex: 0,
// //  timeLimitSec: 15
// //  });
// //  function handleQuestionChange(e) { const { name, value } = e.target; setCurrentQuestion(prev => ({ ...prev, [name]: value })); }

// // function handleChoiceChange(index, value) {
// //  const newChoices = [...currentQuestion.choices];
// //  newChoices[index] = value;
// //  setCurrentQuestion(prev => ({ ...prev, choices: newChoices }));
// //  }

// //  function addQuestion() {
// //  // Basic validation
// //  if (!currentQuestion.text || currentQuestion.choices.some(c => !c)) {
// //  alert("Please fill in all fields.");
// //  return;
// // }
// //  setQuizDetails(prev => ({
// //  ...prev,
// //  questions: [...prev.questions, currentQuestion]
// //  }));
// //  // Reset for next question
// //  setCurrentQuestion({
// //  text: "",
// //  choices: ["", "", "", ""],
// //  correctIndex: 0,
// //  timeLimitSec: 15
// //  });
// //  }

// //  async function saveQuiz() {
// //  if (quizDetails.questions.length === 0) {
// //  alert("Please add at least one question.");
// //  return;
// //  }
// //  try {
// //  const res = await API.post("/quizzes", quizDetails);
// //  console.log("Quiz saved:", res.data);
// //  if (onQuizSaved) onQuizSaved(res.data);
// //  } catch (error) {
// //  console.error("Failed to save quiz:", error);
// //  alert("Failed to save quiz.");
// //  }
// //  }

// //  return (
// //  <div>
// //  <h2>Create New Quiz</h2>
// //  <div>
// //  <label>Title: <input type="text" value={quizDetails.title} onChange={e => setQuizDetails(p => ({ ...p, title: e.target.value }))} /></label>
// //  </div>
// // <div>
// //  <label>Description: <textarea value={quizDetails.description} onChange={e => setQuizDetails(p => ({ ...p, description: e.target.value }))} /></label>
// //  </div>

// //  <hr />
// //  <h3>Question #{quizDetails.questions.length + 1}</h3>
// //  <div>
// //  <label>
// //  Question Text: <input type="text" name="text" value={currentQuestion.text} onChange={handleQuestionChange} />
// //  </label>
// //  </div>
// // <div>
// //  <label>
// //  Time Limit (sec): <input type="number" name="timeLimitSec" value={currentQuestion.timeLimitSec} onChange={handleQuestionChange} min="5" max="180" />
// //  </label>
// //  </div>
// //  <h4>Choices:</h4>
// //  {currentQuestion.choices.map((choice, index) => (
// //  <div key={index}>
// //  <label>
// //  Option {index + 1}: <input type="text" value={choice} onChange={e => handleChoiceChange(index, e.target.value)} />
// //  </label>
// //  </div>
// //  ))}
// // <div>
// //  <label>
// //  Correct Answer:
// // <select name="correctIndex" value={currentQuestion.correctIndex} onChange={handleQuestionChange}>
// //  {currentQuestion.choices.map((_, index) => (
// //  <option key={index} value={index}>{`Option ${index + 1}`}</option>
// //  ))}
// //  </select>
// //  </label>
// //  </div>

// //    <div style={{ marginTop: 20 }}>
// //   <button onClick={addQuestion}>Add Question</button>
// //     <button onClick={saveQuiz} disabled={quizDetails.questions.length === 0}>Finish Quiz ({quizDetails.questions.length} questions)</button>
// //    </div>
// //    </div>
// //  )
  
// // }


// // import React, { useState } from "react";

// // export default function QuizEditor({ onSave }) {
// //   const [questions, setQuestions] = useState([]);
// //   const [currentQuestion, setCurrentQuestion] = useState({
// //     text: "",
// //     choices: ["", "", "", ""],
// //     correctIndex: 0,
// //     timeLimitSec: 15,
// //   });

// //   const handleInputChange = (e) => {
// //     const { name, value } = e.target;
// //     setCurrentQuestion({ ...currentQuestion, [name]: value });
// //   };

// //   const handleChoiceChange = (index, value) => {
// //     const newChoices = [...currentQuestion.choices];
// //     newChoices[index] = value;
// //     setCurrentQuestion({ ...currentQuestion, choices: newChoices });
// //   };

// //   const addQuestion = () => {
// //     if (!currentQuestion.text || currentQuestion.choices.some((c) => !c)) {
// //       alert("Please fill in the question and all four choices.");
// //       return;
// //     }
// //     setQuestions([...questions, currentQuestion]);
// //     setCurrentQuestion({
// //       text: "",
// //       choices: ["", "", "", ""],
// //       correctIndex: 0,
// //       timeLimitSec: 15,
// //     });
// //   };

// //   const endQuiz = () => {
// //     if (questions.length === 0) {
// //       alert("Please add at least one question before ending the quiz.");
// //       return;
// //     }
// //     onSave({ questions });
// //   };

// //   return (
// //     <div>
// //       <h3>Add Questions ({questions.length})</h3>
// //       <div>
// //         <label>
// //           Question Text:
// //           <input
// //             type="text"
// //             name="text"
// //             value={currentQuestion.text}
// //             onChange={handleInputChange}
// //           />
// //         </label>
// //       </div>
// //       <div>
// //         <label>
// //           Time Limit (sec):
// //           <input
// //             type="number"
// //             name="timeLimitSec"
// //             value={currentQuestion.timeLimitSec}
// //             onChange={handleInputChange}
// //             min="5"
// //             max="180"
// //           />
// //         </label>
// //       </div>
// //       <h4>Answer Choices:</h4>
// //       {currentQuestion.choices.map((choice, index) => (
// //         <div key={index}>
// //           <label>
// //             Option {index + 1}:
// //             <input
// //               type="text"
// //               value={choice}
// //               onChange={(e) => handleChoiceChange(index, e.target.value)}
// //             />
// //           </label>
// //         </div>
// //       ))}
// //       <div>
// //         <label>
// //           Correct Answer:
// //           <select
// //             name="correctIndex"
// //             value={currentQuestion.correctIndex}
// //             onChange={handleInputChange}
// //           >
// //             {currentQuestion.choices.map((_, index) => (
// //               <option key={index} value={index}>
// //                 Option {index + 1}
// //               </option>
// //             ))}
// //           </select>
// //         </label>
// //       </div>
// //       <div style={{ marginTop: "1rem" }}>
// //         <button onClick={addQuestion}>Add Question</button>
// //         <button onClick={endQuiz} disabled={questions.length === 0}>
// //           End Quiz and Create Room
// //         </button>
// //       </div>
// //     </div>
// //   );
// // }

// // import React, { useState } from "react";

// // export default function QuizEditor({ onSave }) {
// //   const [questions, setQuestions] = useState([]);
// //   const [currentQuestion, setCurrentQuestion] = useState({
// //     text: "",
// //     choices: ["", "", "", ""],
// //     correctIndex: 0,
// //     timeLimitSec: 15,
// //   });

// //   const handleInputChange = (e) => {
// //     const { name, value } = e.target;
// //     // Check if the input is for a numeric value and convert it
// //     if (name === "correctIndex" || name === "timeLimitSec") {
// //       setCurrentQuestion({ ...currentQuestion, [name]: Number(value) });
// //     } else {
// //       setCurrentQuestion({ ...currentQuestion, [name]: value });
// //     }
// //   };

// //   const handleChoiceChange = (index, value) => {
// //     const newChoices = [...currentQuestion.choices];
// //     newChoices[index] = value;
// //     setCurrentQuestion({ ...currentQuestion, choices: newChoices });
// //   };

// //   const addQuestion = () => {
// //     if (!currentQuestion.text || currentQuestion.choices.some((c) => !c)) {
// //       alert("Please fill in the question and all four choices.");
// //       return;
// //     }
// //     setQuestions([...questions, currentQuestion]);
// //     // Reset for the next question, ensuring correctIndex and timeLimitSec are numbers
// //     setCurrentQuestion({
// //       text: "",
// //       choices: ["", "", "", ""],
// //       correctIndex: 0,
// //       timeLimitSec: 15,
// //     });
// //   };

// //   const endQuiz = () => {
// //     if (questions.length === 0) {
// //       alert("Please add at least one question before ending the quiz.");
// //       return;
// //     }
// //     onSave({ questions });
// //   };

// //   return (
// //     <div>
// //       <h3>Add Questions ({questions.length})</h3>
// //       <div>
// //         <label>
// //           Question Text:
// //           <input
// //             type="text"
// //             name="text"
// //             value={currentQuestion.text}
// //             onChange={handleInputChange}
// //           />


// //         </label>
// //       </div>
// //       <div>
// //         <label>
// //           Time Limit (sec):
// //           <input
// //             type="number"
// //             name="timeLimitSec"
// //             value={currentQuestion.timeLimitSec}
// //             onChange={handleInputChange}
// //             min="5"
// //             max="180"
// //           />
// //         </label>
// //       </div>
// //       <h4>Answer Choices:</h4>
// //       {currentQuestion.choices.map((choice, index) => (
// //         <div key={index}>
// //           <label>
// //             Option {index + 1}:
// //             <input
// //               type="text"
// //               value={choice}
// //               onChange={(e) => handleChoiceChange(index, e.target.value)}
// //             />
// //           </label>
// //         </div>
// //       ))}
// //       <div>
// //         <label>
// //           Correct Answer:
// //           <select
// //             name="correctIndex"
// //             value={currentQuestion.correctIndex}
// //             onChange={handleInputChange}
// //           >
// //             {currentQuestion.choices.map((_, index) => (
// //               <option key={index} value={index}>
// //                 Option {index + 1}
// //               </option>
// //             ))}
// //           </select>
// //         </label>
// //       </div>
// //       <div style={{ marginTop: "1rem" }}>
// //         <button onClick={addQuestion}>Add Question</button>
// //         <button onClick={endQuiz} disabled={questions.length === 0}>
// //           End Quiz and Create Room
// //         </button>
// //       </div>
// //     </div>
// //   );
// // }

// // import React, { useState } from "react";
// // import { Editor } from "@tinymce/tinymce-react";

// // export default function QuizEditor({ onSave }) {
// //   const [questions, setQuestions] = useState([]);
// //   const [currentQuestion, setCurrentQuestion] = useState({
// //     text: "",
// //     choices: ["", "", "", ""],
// //     correctIndices: [], // This will now be an array
// //     timeLimitSec: 15,
// //   });

// //   const handleInputChange = (e) => {
// //     const { name, value } = e.target;
// //     // For time limit, ensure it's a number
// //     if (name === "timeLimitSec") {
// //       setCurrentQuestion({ ...currentQuestion, [name]: Number(value) });
// //     } else {
// //       setCurrentQuestion({ ...currentQuestion, [name]: value });
// //     }
// //   };

// //   const handleEditorChange = (content) => {
// //     setCurrentQuestion({ ...currentQuestion, text: content });

// //   };

// //   const handleChoiceChange = (index, value) => {
// //     const newChoices = [...currentQuestion.choices];
// //     newChoices[index] = value;
// //     setCurrentQuestion({ ...currentQuestion, choices: newChoices });
// //   };

// //   const handleCorrectAnswerChange = (index) => {
// //     const { correctIndices } = currentQuestion;
// //     const newCorrectIndices = correctIndices.includes(index)
// //       ? correctIndices.filter((i) => i !== index)
// //       : [...correctIndices, index];

// //     setCurrentQuestion({ ...currentQuestion, correctIndices: newCorrectIndices });
// //   };

// //   const addQuestion = () => {
// //     if (!currentQuestion.text || currentQuestion.choices.some((c) => !c) || currentQuestion.correctIndices.length === 0) {
// //       alert("Please fill in the question, all four choices, and select at least one correct answer.");
// //       return;
// //     }
// //     setQuestions([...questions, currentQuestion]);
// //     setCurrentQuestion({
// //       text: "",
// //       choices: ["", "", "", ""],
// //       correctIndices: [],
// //       timeLimitSec: 15,
// //     });
// //   };

// //   // const endQuiz = () => {
// //   //   if (questions.length === 0) {
// //   //     alert("Please add at least one question before ending the quiz.");
// //   //     return;
// //   //   }
// //   //   onSave({ questions });
// //   // };


// //   const endQuiz = () => {
// //     // Check if the current question is valid and has not been added yet
// //     const isCurrentQuestionValid = 
// //         currentQuestion.text && 
// //         currentQuestion.choices.every(c => c) && 
// //         currentQuestion.correctIndices.length > 0;

// //     let finalQuestions = [...questions];

// //     if (isCurrentQuestionValid) {
// //         finalQuestions.push(currentQuestion);
// //     }
    
// //     if (finalQuestions.length === 0) {
// //         alert("Please add at least one question before ending the quiz.");
// //         return;
// //     }
    
// //     // Send the combined list of questions to the server
// //     onSave({ questions: finalQuestions });
// // };


// //   return (
// //     <div>
// //       <h3>Add Questions ({questions.length})</h3>
// //       <div>
// //         <label>Question Text:</label>
// //         <Editor
// //           apiKey="0gn1nl2pcgdtjpnb3b8iyodwu7az8ldbkqxpa75qztjwti0q" // api key from TinyMCE 
// //           // initialValue={currentQuestion.text});
          
// //           onEditorChange={handleEditorChange}
// //           init={{
// //             height: 300,
// //             menubar: false,
// //             plugins: "link lists image code fullscreen emoticons",
// //             toolbar:
// //               "undo redo | formatselect | bold italic | alignleft aligncenter alignright | bullist numlist | link image | fullscreen | code",
// //           }}
// //         />
// //       </div>
// //       <div>
// //         <label>
// //           Time Limit (sec):
// //           <input
// //             type="number"
// //             name="timeLimitSec"
// //             value={currentQuestion.timeLimitSec}
// //             onChange={handleInputChange}
// //             min="5"
// //             max="180"
// //           />
// //         </label>
// //       </div>
// //       <h4>Answer Choices:</h4>
// //       {currentQuestion.choices.map((choice, index) => (
// //         <div key={index}>
// //           <label>
// //             <input
// //               type="checkbox"
// //               checked={currentQuestion.correctIndices.includes(index)}
// //               onChange={() => handleCorrectAnswerChange(index)}
// //             />
// //             Option {index + 1}:
// //             <input
// //               type="text"
// //               value={choice}
// //               onChange={(e) => handleChoiceChange(index, e.target.value)}
// //             />
// //           </label>
// //         </div>
// //       ))}
// //       <div style={{ marginTop: "1rem" }}>
// //         <button onClick={addQuestion}>Add Question</button>
// //         <button onClick={endQuiz} disabled={questions.length === 0}>
// //           End Quiz and Create Room
// //         </button>
// //       </div>
// //     </div>
// //   );
// // }








// import React, { useState } from "react";
// import { Editor } from "@tinymce/tinymce-react";

// export default function QuizEditor({ onSave }) {
//   const [questions, setQuestions] = useState([]);
//   const [currentQuestion, setCurrentQuestion] = useState({
//     text: "",
//     choices: ["", "", "", ""],
//     correctIndices: [],
//     timeLimitSec: 15,
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     if (name === "timeLimitSec") {
//       setCurrentQuestion({ ...currentQuestion, [name]: Number(value) });
//     } else {
//       setCurrentQuestion({ ...currentQuestion, [name]: value });
//     }
//   };

//   const handleEditorChange = (content) => {
//     setCurrentQuestion({ ...currentQuestion, text: content });
//   };

//   const handleChoiceChange = (index, value) => {
//     const newChoices = [...currentQuestion.choices];
//     newChoices[index] = value;
//     setCurrentQuestion({ ...currentQuestion, choices: newChoices });
//   };

//   const handleCorrectAnswerChange = (index) => {
//     const { correctIndices } = currentQuestion;
//     const newCorrectIndices = correctIndices.includes(index)
//       ? correctIndices.filter((i) => i !== index)
//       : [...correctIndices, index];
//     setCurrentQuestion({ ...currentQuestion, correctIndices: newCorrectIndices });
//   };

//   const addQuestion = () => {
//     if (!currentQuestion.text || currentQuestion.choices.some((c) => !c) || currentQuestion.correctIndices.length === 0) {
//       alert("Please fill in the question, all four choices, and select at least one correct answer.");
//       return;
//     }
//     setQuestions([...questions, currentQuestion]);
//     setCurrentQuestion({
//       text: "",
//       choices: ["", "", "", ""],
//       correctIndices: [],
//       timeLimitSec: 15,
//     });
//   };

//   const endQuiz = () => {
//     const isCurrentQuestionValid = 
//         currentQuestion.text && 
//         currentQuestion.choices.every(c => c) && 
//         currentQuestion.correctIndices.length > 0;
    
//     let finalQuestions = [...questions];

//     if (isCurrentQuestionValid) {
//         finalQuestions.push(currentQuestion);
//     }
    
//     if (finalQuestions.length === 0) {
//         alert("Please add at least one question before ending the quiz.");
//         return;
//     }
    
//     onSave({ questions: finalQuestions });
//   };

//   return (
//     <div>
//       <h3>Add Questions ({questions.length})</h3>
//       <div>
//         <label>Question Text:</label>
//         <Editor
//           apiKey="0gn1nl2pcgdtjpnb3b8iyodwu7az8ldbkqxpa75qztjwti0q" // Make sure to use your own API key
//           key={questions.length} // <-- Key change here to force re-render
//           //initialValue={currentQuestion.text}
//           onEditorChange={handleEditorChange}
//           init={{
//             height: 300,
//             menubar: false,
//             plugins: "link lists image code fullscreen emoticons",
//             toolbar:
//               "undo redo | formatselect | bold italic | alignleft aligncenter alignright | bullist numlist | link image | fullscreen | code",
//           }}
//         />
//       </div>
//       <div>
//         <label>
//           Time Limit (sec):
//           <input
//             type="number"
//             name="timeLimitSec"
//             value={currentQuestion.timeLimitSec}
//             onChange={handleInputChange}
//             min="5"
//             max="180"
//           />
//         </label>
//       </div>
//       <h4>Answer Choices:</h4>
//       {currentQuestion.choices.map((choice, index) => (
//         <div key={index}>
//           <label>
//             <input
//               type="checkbox"
//               checked={currentQuestion.correctIndices.includes(index)}
//               onChange={() => handleCorrectAnswerChange(index)}
//             />
//             Option {index + 1}:
//             <input
//               type="text"
//               value={choice}
//               onChange={(e) => handleChoiceChange(index, e.target.value)}
//             />
//           </label>
//         </div>
//       ))}
//       <div style={{ marginTop: "1rem" }}>
//         <button onClick={addQuestion}>Add Question</button>
//         <button onClick={endQuiz} disabled={questions.length === 0}>
//           End Quiz and Create Room
//         </button>
//       </div>
//     </div>
//   );
// }




// import React, { useState } from 'react';
// import { Editor } from "@tinymce/tinymce-react"; // Keep TinyMCE for rich text
// import { Button } from "./components/ui/button";
// import { Input } from "./components/ui/input";
// import { Card } from "./components/ui/card";
// import { Checkbox } from "./components/ui/checkbox";
// import { Plus, Bold, Italic, AlignLeft, AlignCenter, AlignRight, List, Link, Image, Maximize2, Code, X } from 'lucide-react';
// import Navigation from './components/Navigation';

// // NOTE: Define the structure for the final question data
// interface Question {
//   text: string;
//   choices: string[];
//   correctIndices: number[];
//   timeLimitSec: number;
// }

// interface QuizCreatorProps {
//   onSave: (quizData: { questions: Question[] }) => void;
// }

// export default function QuizCreator({ onSave }: QuizCreatorProps) {
//   const [questions, setQuestions] = useState<Question[]>([]);
//   const [currentQuestion, setCurrentQuestion] = useState<Question>({
//     text: "",
//     choices: ["", "", "", ""],
//     correctIndices: [], // Array for multiple correct answers
//     timeLimitSec: 15,
//   });

//   // --- Handlers for Current Question State ---

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     // For time limit, ensure it's a number
//     if (name === "timeLimitSec") {
//       setCurrentQuestion(prev => ({ ...prev, [name]: Number(value) }));
//     } else {
//       setCurrentQuestion(prev => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleEditorChange = (content: string) => {
//     setCurrentQuestion(prev => ({ ...prev, text: content }));
//   };

//   const handleChoiceChange = (index: number, value: string) => {
//     const newChoices = [...currentQuestion.choices];
//     newChoices[index] = value;
//     setCurrentQuestion(prev => ({ ...prev, choices: newChoices }));
//   };

//   const toggleCorrectAnswer = (index: number) => {
//     const { correctIndices } = currentQuestion;
//     const newCorrectIndices = correctIndices.includes(index)
//       ? correctIndices.filter((i) => i !== index)
//       : [...correctIndices, index];
//     setCurrentQuestion(prev => ({ ...prev, correctIndices: newCorrectIndices }));
//   };

//   // --- Action Functions ---

//   const addQuestion = () => {
//     // Validation logic
//     if (!currentQuestion.text || currentQuestion.choices.some((c) => !c) || currentQuestion.correctIndices.length === 0) {
//       alert("Please fill in the question, all four choices, and select at least one correct answer.");
//       return;
//     }
//     setQuestions([...questions, currentQuestion]);
    
//     // Reset for the next question
//     setCurrentQuestion({
//       text: "",
//       choices: ["", "", "", ""],
//       correctIndices: [],
//       timeLimitSec: 15,
//     });
//   };

//   const handleRemoveQuestion = (indexToRemove: number) => {
//     setQuestions(questions.filter((_, index) => index !== indexToRemove));
//   };
  
//   const handleEndQuiz = () => {
//     // Validation for the question currently being edited
//     const isCurrentQuestionValid = 
//         currentQuestion.text && 
//         currentQuestion.choices.every(c => c.trim()) && 
//         currentQuestion.correctIndices.length > 0;
    
//     let finalQuestions = [...questions];

//     // Include the current question if it's valid
//     if (isCurrentQuestionValid) {
//         finalQuestions.push(currentQuestion);
//     }
    
//     if (finalQuestions.length === 0) {
//         alert("Please add at least one valid question before ending the quiz.");
//         return;
//     }
    
//     onSave({ questions: finalQuestions });
//   };

//   // The 'key' on the Editor component ensures it clears when a new question is added.
//   const editorKey = questions.length; 

//   return (
//     <div className="max-w-4xl mx-auto p-6 space-y-6 flex flex-col items-center">


      
//       {/* Create or Use Sample Quiz Section (Kept for UI consistency) */}
//       <Card className="p-6 bg-[#F8FAFC]/95 backdrop-blur-sm border border-[#BCCCDC]/40 shadow-xl w-full">
//         <div className="text-center">
//           <h2 className="text-xl font-semibold text-[#64748B] mb-4">Create or Use Sample Quiz</h2>
//           <Button variant="outline" className="border-[#64748B] text-[#64748B] hover:bg-[#D9EAFD] hover:border-[#64748B]">
//             Use Sample Quiz
//           </Button>
//         </div>
//       </Card>

//       {/* Add Questions Section */}
//       <Card className="p-6 bg-[#F8FAFC]/95 backdrop-blur-sm border border-[#BCCCDC]/40 shadow-xl w-full">
//         <div className="text-center mb-6">
//           <h2 className="text-xl font-semibold text-[#64748B] mb-4">
//             Add Questions ({questions.length})
//           </h2>
//         </div>

//         {/* Question Text Editor (TinyMCE Integration) */}
//         <div className="mb-6">
//           <label className="block text-sm font-medium text-[#64748B] mb-2">
//             Question Text:
//           </label>
            
//           {/* Custom Toolbar - Renders as static buttons */}
//           <div className="flex items-center space-x-1 p-2 border border-[#BCCCDC] rounded-t-md bg-[#D9EAFD]">
//             <Button variant="ghost" size="sm" className="h-8 w-8 p-0"><Bold className="h-4 w-4" /></Button>
//             <Button variant="ghost" size="sm" className="h-8 w-8 p-0"><Italic className="h-4 w-4" /></Button>
//             <div className="w-px h-6 bg-gray-300 mx-1" />
//             <Button variant="ghost" size="sm" className="h-8 w-8 p-0"><AlignLeft className="h-4 w-4" /></Button>
//             <Button variant="ghost" size="sm" className="h-8 w-8 p-0"><AlignCenter className="h-4 w-4" /></Button>
//             <Button variant="ghost" size="sm" className="h-8 w-8 p-0"><AlignRight className="h-4 w-4" /></Button>
//             <div className="w-px h-6 bg-gray-300 mx-1" />
//             <Button variant="ghost" size="sm" className="h-8 w-8 p-0"><List className="h-4 w-4" /></Button>
//             <Button variant="ghost" size="sm" className="h-8 w-8 p-0"><Link className="h-4 w-4" /></Button>
//             <Button variant="ghost" size="sm" className="h-8 w-8 p-0"><Image className="h-4 w-4" /></Button>
//             <Button variant="ghost" size="sm" className="h-8 w-8 p-0"><Maximize2 className="h-4 w-4" /></Button>
//             <Button variant="ghost" size="sm" className="h-8 w-8 p-0"><Code className="h-4 w-4" /></Button>
//             <div className="ml-auto">
//               <span className="text-xs bg-gray-700 text-white px-2 py-1 rounded">
//                 Editor below
//               </span>
//             </div>
//           </div>
          
//           <Editor
//             apiKey="0gn1nl2pcgdtjpnb3b8iyodwu7az8ldbkqxpa75qztjwti0q" // Replace with your actual key
//             key={editorKey} 
//             // initialValue={currentQuestion.text}
//             onEditorChange={handleEditorChange}
//             init={{
//                 height: 300,
//                 menubar: false,
//                 plugins: "link lists image code fullscreen emoticons",
//                 toolbar: "undo redo | formatselect | bold italic | alignleft aligncenter alignright | bullist numlist | link image | fullscreen | code",
//                 // Tailwind CSS compatibility fixes
//                 content_style: 'body { font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif; }'
//             }}
//           />
//         </div>

//         {/* Time Limit */}
//         <div className="mb-6">
//           <label className="block text-sm font-medium text-[#64748B] mb-2">
//             Time Limit (sec):
//           </label>
//           <Input
//             type="number"
//             name="timeLimitSec"
//             value={currentQuestion.timeLimitSec}
//             onChange={handleInputChange}
//             className="w-24 focus:ring-[#64748B] focus:border-[#64748B] bg-white"
//             min="5"
//             max="180"
//           />
//         </div>

//         {/* Answer Choices */}
//         <div className="mb-6">
//           <label className="block text-sm font-medium text-[#64748B] mb-3">
//             Answer Choices (Select correct with checkbox):
//           </label>
//           <div className="space-y-3">
//             {currentQuestion.choices.map((choice, index) => (
//               <div key={index} className="flex items-center space-x-3">
//                 <Checkbox
//                   checked={currentQuestion.correctIndices.includes(index)}
//                   onCheckedChange={() => toggleCorrectAnswer(index)}
//                   className="border-[#64748B] data-[state=checked]:bg-[#64748B] data-[state=checked]:border-[#64748B]"
//                 />
//                 <Input
//                   value={choice}
//                   onChange={(e) => handleChoiceChange(index, e.target.value)}
//                   placeholder={`Option ${index + 1}:`}
//                   className="flex-1 focus:ring-[#64748B] focus:border-[#64748B] bg-white"
//                 />
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Action Buttons */}
//         <div className="flex items-center justify-center space-x-3">
//           <Button
//             onClick={addQuestion}
//             className="bg-[#64748B] hover:bg-[#64748B]/90 text-white shadow-lg hover:shadow-xl transition-all"
//           >
//             <Plus className="h-4 w-4 mr-2" />
//             Add Question
//           </Button>
//           <Button
//             variant="outline"
//             onClick={handleEndQuiz}
//             className="border-[#64748B] text-[#64748B] hover:bg-[#D9EAFD] hover:border-[#64748B] shadow-lg hover:shadow-xl transition-all"
//             disabled={questions.length === 0 && (!currentQuestion.text || currentQuestion.correctIndices.length === 0)}
//           >
//             End Quiz and Create Room
//           </Button>
//         </div>
//       </Card>

//       {/* Questions List */}
//       {questions.length > 0 && (
//         <Card className="p-6 bg-[#F8FAFC]/95 backdrop-blur-sm border border-[#BCCCDC]/40 shadow-xl w-full">
//           <div className="text-center mb-4">
//             <h3 className="text-lg font-semibold text-[#64748B]">Added Questions</h3>
//           </div>
//           <div className="space-y-4">
//             {questions.map((question, index) => (
//               <div key={index} className="p-4 border border-[#BCCCDC] rounded-lg bg-white/70">
//                 <div className="flex items-start justify-between">
//                   <div className="flex-1">
//                     <h4 className="font-medium text-[#64748B] mb-2">
//                       Question {index + 1}: <span dangerouslySetInnerHTML={{ __html: question.text }} />
//                     </h4>
//                     <p className="text-sm text-[#64748B]/80 mb-2">
//                       Time Limit: {question.timeLimitSec} seconds
//                     </p>
//                     <div className="text-sm text-[#64748B]/80">
//                       Options: {question.choices.filter(opt => opt.trim()).join(' / ')}
//                     </div>
//                     <div className="text-xs mt-1 font-semibold text-green-600">
//                       Correct: {question.correctIndices.map(i => question.choices[i]).join('; ')}
//                     </div>
//                   </div>
//                   <Button 
//                     variant="ghost" 
//                     size="sm" 
//                     onClick={() => handleRemoveQuestion(index)}
//                     className="text-red-600 hover:text-red-700 hover:bg-red-50"
//                   >
//                     <X className="h-4 w-4" />
//                   </Button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </Card>
//       )}
//     </div>
//   );
// }

// import React, { useState } from "react";
// import { Editor } from "@tinymce/tinymce-react";
// import { Button } from "./components/ui/button";
// import { Input } from "./components/ui/input";
// import { Card } from "./components/ui/card";
// import { Checkbox } from "./components/ui/checkbox";
// import { Plus, Bold, Italic, AlignLeft, AlignCenter, AlignRight, List, Link, Image, Maximize2, Code, X } from 'lucide-react';
// import GameLayout from './components/GameLayout'; 


// // NOTE: Define the structure for the final question data
// interface Question {
//   text: string;
//   choices: string[];
//   correctIndices: number[];
//   timeLimitSec: number;
// }

// interface QuizCreatorProps {
//   onSave: (quizData: { questions: Question[] }) => void;
// }

// export default function QuizCreator({ onSave }: QuizCreatorProps) {
//   const [questions, setQuestions] = useState<Question[]>([]);
//   const [currentQuestion, setCurrentQuestion] = useState<Question>({
//     text: "",
//     choices: ["", "", "", ""],
//     correctIndices: [], // Array for multiple correct answers
//     timeLimitSec: 15,
//   });

//   // --- Handlers for Current Question State ---

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     // For time limit, ensure it's a number
//     if (name === "timeLimitSec") {
//       setCurrentQuestion(prev => ({ ...prev, [name]: Number(value) }));
//     } else {
//       setCurrentQuestion(prev => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleEditorChange = (content: string) => {
//     setCurrentQuestion(prev => ({ ...prev, text: content }));
//   };

//   const handleChoiceChange = (index: number, value: string) => {
//     const newChoices = [...currentQuestion.choices];
//     newChoices[index] = value;
//     setCurrentQuestion(prev => ({ ...prev, choices: newChoices }));
//   };

//   const toggleCorrectAnswer = (index: number) => {
//     const { correctIndices } = currentQuestion;
//     const newCorrectIndices = correctIndices.includes(index)
//       ? correctIndices.filter((i) => i !== index)
//       : [...correctIndices, index];
//     setCurrentQuestion(prev => ({ ...prev, correctIndices: newCorrectIndices }));
//   };

//   // --- Action Functions ---

//   const addQuestion = () => {
//     // Validation logic
//     if (!currentQuestion.text || currentQuestion.choices.some((c) => !c) || currentQuestion.correctIndices.length === 0) {
//       alert("Please fill in the question, all four choices, and select at least one correct answer.");
//       return;
//     }
//     setQuestions([...questions, currentQuestion]);
    
//     // Reset for the next question
//     setCurrentQuestion({
//       text: "",
//       choices: ["", "", "", ""],
//       correctIndices: [],
//       timeLimitSec: 15,
//     });
//   };

//   const handleRemoveQuestion = (indexToRemove: number) => {
//     setQuestions(questions.filter((_, index) => index !== indexToRemove));
//   };
  
//   const handleEndQuiz = () => {
//     // Validation for the question currently being edited
//     const isCurrentQuestionValid = 
//         currentQuestion.text && 
//         currentQuestion.choices.every(c => c.trim()) && 
//         currentQuestion.correctIndices.length > 0;
    
//     let finalQuestions = [...questions];

//     // Include the current question if it's valid
//     if (isCurrentQuestionValid) {
//         finalQuestions.push(currentQuestion);
//     }
    
//     if (finalQuestions.length === 0) {
//         alert("Please add at least one valid question before ending the quiz.");
//         return;
//     }
    
//     onSave({ questions: finalQuestions });
//   };

//   // The 'key' on the Editor component ensures it clears when a new question is added.
//   const editorKey = questions.length; 

//   return (
//     <div className="max-w-4xl mx-auto p-6 space-y-6 flex flex-col items-center">


      
//       {/* Create or Use Sample Quiz Section (Kept for UI consistency) */}
//       <Card className="p-6 bg-[#F8FAFC]/95 backdrop-blur-sm border border-[#BCCCDC]/40 shadow-xl w-full">
//         <div className="text-center">
//           <h2 className="text-xl font-semibold text-[#64748B] mb-4">Create or Use Sample Quiz</h2>
//           <Button variant="outline" className="border-[#64748B] text-[#64748B] hover:bg-[#D9EAFD] hover:border-[#64748B]">
//             Use Sample Quiz
//           </Button>
//         </div>
//       </Card>

//       {/* Add Questions Section */}
//       <Card className="p-6 bg-[#F8FAFC]/95 backdrop-blur-sm border border-[#BCCCDC]/40 shadow-xl w-full">
//         <div className="text-center mb-6">
//           <h2 className="text-xl font-semibold text-[#64748B] mb-4">
//             Add Questions ({questions.length})
//           </h2>
//         </div>

//         {/* Question Text Editor (TinyMCE Integration) */}
//         <div className="mb-6">
//           <label className="block text-sm font-medium text-[#64748B] mb-2">
//             Question Text:
//           </label>
            
//           {/* Custom Toolbar - Renders as static buttons */}
//           <div className="flex items-center space-x-1 p-2 border border-[#BCCCDC] rounded-t-md bg-[#D9EAFD]">
//             <Button variant="ghost" size="sm" className="h-8 w-8 p-0"><Bold className="h-4 w-4" /></Button>
//             <Button variant="ghost" size="sm" className="h-8 w-8 p-0"><Italic className="h-4 w-4" /></Button>
//             <div className="w-px h-6 bg-gray-300 mx-1" />
//             <Button variant="ghost" size="sm" className="h-8 w-8 p-0"><AlignLeft className="h-4 w-4" /></Button>
//             <Button variant="ghost" size="sm" className="h-8 w-8 p-0"><AlignCenter className="h-4 w-4" /></Button>
//             <Button variant="ghost" size="sm" className="h-8 w-8 p-0"><AlignRight className="h-4 w-4" /></Button>
//             <div className="w-px h-6 bg-gray-300 mx-1" />
//             <Button variant="ghost" size="sm" className="h-8 w-8 p-0"><List className="h-4 w-4" /></Button>
//             <Button variant="ghost" size="sm" className="h-8 w-8 p-0"><Link className="h-4 w-4" /></Button>
//             <Button variant="ghost" size="sm" className="h-8 w-8 p-0"><Image className="h-4 w-4" /></Button>
//             <Button variant="ghost" size="sm" className="h-8 w-8 p-0"><Maximize2 className="h-4 w-4" /></Button>
//             <Button variant="ghost" size="sm" className="h-8 w-8 p-0"><Code className="h-4 w-4" /></Button>
//             <div className="ml-auto">
//               <span className="text-xs bg-gray-700 text-white px-2 py-1 rounded">
//                 Editor below
//               </span>
//             </div>
//           </div>
          
//           <Editor
//             apiKey="0gn1nl2pcgdtjpnb3b8iyodwu7az8ldbkqxpa75qztjwti0q" // Replace with your actual key
//             key={editorKey} 
//             // initialValue={currentQuestion.text}
//             onEditorChange={handleEditorChange}
//             init={{
//                 height: 300,
//                 menubar: false,
//                 plugins: "link lists image code fullscreen emoticons",
//                 toolbar: "undo redo | formatselect | bold italic | alignleft aligncenter alignright | bullist numlist | link image | fullscreen | code",
//                 // Tailwind CSS compatibility fixes
//                 content_style: 'body { font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif; }'
//             }}
//           />
//         </div>

//         {/* Time Limit */}
//         <div className="mb-6">
//           <label className="block text-sm font-medium text-[#64748B] mb-2">
//             Time Limit (sec):
//           </label>
//           <Input
//             type="number"
//             name="timeLimitSec"
//             value={currentQuestion.timeLimitSec}
//             onChange={handleInputChange}
//             className="w-24 focus:ring-[#64748B] focus:border-[#64748B] bg-white"
//             min="5"
//             max="180"
//           />
//         </div>

//         {/* Answer Choices */}
//         <div className="mb-6">
//           <label className="block text-sm font-medium text-[#64748B] mb-3">
//             Answer Choices (Select correct with checkbox):
//           </label>
//           <div className="space-y-3">
//             {currentQuestion.choices.map((choice, index) => (
//               <div key={index} className="flex items-center space-x-3">
//                 <Checkbox
//                   checked={currentQuestion.correctIndices.includes(index)}
//                   onCheckedChange={() => toggleCorrectAnswer(index)}
//                   className="border-[#64748B] data-[state=checked]:bg-[#64748B] data-[state=checked]:border-[#64748B]"
//                 />
//                 <Input
//                   value={choice}
//                   onChange={(e) => handleChoiceChange(index, e.target.value)}
//                   placeholder={`Option ${index + 1}:`}
//                   className="flex-1 focus:ring-[#64748B] focus:border-[#64748B] bg-white"
//                 />
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Action Buttons */}
//         <div className="flex items-center justify-center space-x-3">
//           <Button
//             onClick={addQuestion}
//             className="bg-[#64748B] hover:bg-[#64748B]/90 text-white shadow-lg hover:shadow-xl transition-all"
//           >
//             <Plus className="h-4 w-4 mr-2" />
//             Add Question
//           </Button>
//           <Button
//             variant="outline"
//             onClick={handleEndQuiz}
//             className="border-[#64748B] text-[#64748B] hover:bg-[#D9EAFD] hover:border-[#64748B] shadow-lg hover:shadow-xl transition-all"
//             disabled={questions.length === 0 && (!currentQuestion.text || currentQuestion.correctIndices.length === 0)}
//           >
//             End Quiz and Create Room
//           </Button>
//         </div>
//       </Card>

//       {/* Questions List */}
//       {questions.length > 0 && (
//         <Card className="p-6 bg-[#F8FAFC]/95 backdrop-blur-sm border border-[#BCCCDC]/40 shadow-xl w-full">
//           <div className="text-center mb-4">
//             <h3 className="text-lg font-semibold text-[#64748B]">Added Questions</h3>
//           </div>
//           <div className="space-y-4">
//             {questions.map((question, index) => (
//               <div key={index} className="p-4 border border-[#BCCCDC] rounded-lg bg-white/70">
//                 <div className="flex items-start justify-between">
//                   <div className="flex-1">
//                     <h4 className="font-medium text-[#64748B] mb-2">
//                       Question {index + 1}: <span dangerouslySetInnerHTML={{ __html: question.text }} />
//                     </h4>
//                     <p className="text-sm text-[#64748B]/80 mb-2">
//                       Time Limit: {question.timeLimitSec} seconds
//                     </p>
//                     <div className="text-sm text-[#64748B]/80">
//                       Options: {question.choices.filter(opt => opt.trim()).join(' / ')}
//                     </div>
//                     <div className="text-xs mt-1 font-semibold text-green-600">
//                       Correct: {question.correctIndices.map(i => question.choices[i]).join('; ')}
//                     </div>
//                   </div>
//                   <Button 
//                     variant="ghost" 
//                     size="sm" 
//                     onClick={() => handleRemoveQuestion(index)}
//                     className="text-red-600 hover:text-red-700 hover:bg-red-50"
//                   >
//                     <X className="h-4 w-4" />
//                   </Button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </Card>
//       )}
//     </div>
//   );
// }



// import React, { useState } from "react";
// import { Editor } from "@tinymce/tinymce-react";
// import { Button } from "./components/ui/button";
// import { Input } from "./components/ui/input";
// import { Card } from "./components/ui/card";
// import { Checkbox } from "./components/ui/checkbox";
// import { Plus, X } from "lucide-react";

// interface Question {
//   text: string;
//   choices: string[];
//   correctIndices: number[];
//   timeLimitSec: number;
// }

// interface QuizCreatorProps {
//   onSave: (quizData: { questions: Question[] }) => void;
// }

// export default function QuizCreator({ onSave }: QuizCreatorProps) {
//   const [questions, setQuestions] = useState<Question[]>([]);
//   const [currentQuestion, setCurrentQuestion] = useState<Question>({
//     text: "",
//     choices: ["", "", "", ""],
//     correctIndices: [],
//     timeLimitSec: 15,
//   });

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     if (name === "timeLimitSec") {
//       setCurrentQuestion((prev) => ({ ...prev, timeLimitSec: Number(value) }));
//     }
//   };

//   const handleEditorChange = (content: string) => {
//     setCurrentQuestion((prev) => ({ ...prev, text: content }));
//   };

//   const handleChoiceChange = (index: number, value: string) => {
//     const newChoices = [...currentQuestion.choices];
//     newChoices[index] = value;
//     setCurrentQuestion((prev) => ({ ...prev, choices: newChoices }));
//   };

//   const toggleCorrectAnswer = (index: number) => {
//     const { correctIndices } = currentQuestion;
//     const newCorrectIndices = correctIndices.includes(index)
//       ? correctIndices.filter((i) => i !== index)
//       : [...correctIndices, index];
//     setCurrentQuestion((prev) => ({ ...prev, correctIndices: newCorrectIndices }));
//   };

//   const addQuestion = () => {
//     if (
//       !currentQuestion.text ||
//       currentQuestion.choices.some((c) => !c.trim()) ||
//       currentQuestion.correctIndices.length === 0
//     ) {
//       alert("Fill in question, all choices, and select at least one correct answer.");
//       return;
//     }
//     setQuestions([...questions, currentQuestion]);
//     setCurrentQuestion({ text: "", choices: ["", "", "", ""], correctIndices: [], timeLimitSec: 15 });
//   };

//   const endQuiz = () => {
//     const isCurrentQuestionValid =
//       currentQuestion.text &&
//       currentQuestion.choices.every((c) => c.trim()) &&
//       currentQuestion.correctIndices.length > 0;

//     let finalQuestions = [...questions];
//     if (isCurrentQuestionValid) {
//       finalQuestions.push(currentQuestion);
//     }
//     if (finalQuestions.length === 0) {
//       alert("Add at least one valid question.");
//       return;
//     }
//     onSave({ questions: finalQuestions });
//   };

//   const removeQuestion = (index: number) => {
//     setQuestions(questions.filter((_, i) => i !== index));
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6 space-y-6">
//       <Card className="p-6 shadow-md">
//         <h2 className="text-xl font-semibold mb-4">Add Questions ({questions.length})</h2>

//         {/* Question Editor */}
//         <Editor
//           apiKey="0gn1nl2pcgdtjpnb3b8iyodwu7az8ldbkqxpa75qztjwti0q" // Make sure to use your own API key
//           key={questions.length} // reset after add
//          // initialValue={currentQuestion.text}
//           onEditorChange={handleEditorChange}
//           init={{
//             height: 200,
//             menubar: false,
//             plugins: "link lists image code fullscreen",
//             toolbar:
//               "undo redo | bold italic | alignleft aligncenter alignright | bullist numlist | link image | fullscreen | code",
//           }}
//         />

//         {/* Time Limit */}
//         <div className="mt-4">
//           <label>Time Limit (sec): </label>
//           <Input
//             type="number"
//             name="timeLimitSec"
//             value={currentQuestion.timeLimitSec}
//             onChange={handleInputChange}
//             min={5}
//             max={180}
//           />
//         </div>

//         {/* Choices */}
//         <div className="mt-4 space-y-2">
//           {currentQuestion.choices.map((c, i) => (
//             <div key={i} className="flex items-center space-x-2">
//               <Checkbox
//                 checked={currentQuestion.correctIndices.includes(i)}
//                 onCheckedChange={() => toggleCorrectAnswer(i)}
//               />
//               <Input
//                 value={c}
//                 onChange={(e) => handleChoiceChange(i, e.target.value)}
//                 placeholder={`Option ${i + 1}`}
//               />
//             </div>
//           ))}
//         </div>

//         {/* Buttons */}
//         <div className="mt-6 flex space-x-4">
//           <Button onClick={addQuestion}>
//             <Plus className="mr-2 h-4 w-4" /> Add Question
//           </Button>
//           <Button variant="outline" onClick={endQuiz}>
//             End Quiz and Create Room
//           </Button>
//         </div>
//       </Card>

//       {/* Questions List */}
//       {questions.length > 0 && (
//         <Card className="p-4 shadow-md">
//           <h3 className="font-semibold mb-3">Added Questions</h3>
//           {questions.map((q, idx) => (
//             <div key={idx} className="border p-3 rounded mb-2 bg-white">
//               <div className="flex justify-between items-start">
//                 <div>
//                   <div dangerouslySetInnerHTML={{ __html: q.text }} />
//                   <p className="text-sm text-gray-500">Choices: {q.choices.join(", ")}</p>
//                   <p className="text-sm text-green-600">
//                     Correct: {q.correctIndices.map((i) => q.choices[i]).join(", ")}
//                   </p>
//                 </div>
//                 <Button variant="ghost" onClick={() => removeQuestion(idx)}>
//                   <X className="h-4 w-4" />
//                 </Button>
//               </div>
//             </div>
//           ))}
//         </Card>
//       )}
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Card } from "./components/ui/card";
import { Checkbox } from "./components/ui/checkbox";
import { Plus, X, Pencil, Image as ImageIcon } from "lucide-react";

/* ================= EDITOR CONFIG ================= */

const quillModules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ align: [] }],
    ["link", "image"],
    ["clean"],
  ],
};

// Quill represents an empty document as "<p><br></p>"; treat that as blank
const isEmptyHtml = (html: string) => {
  if (!html) return true;
  return html.replace(/<(.|\n)*?>/g, "").replace(/&nbsp;/g, "").trim() === "";
};

/* ================= TYPES ================= */

export interface Question {
  text: string;
  choices: string[];
  choiceImages: string[];
  correctIndices: number[];
  timeLimitSec: number;
}

export interface QuizData {
  _id?: string;
  title: string;
  description: string;
  questions: Question[];
}

interface QuizEditorProps {
  onSave: (quizData: { title: string, description: string, questions: Question[] }) => void;
  onSaveOnly?: (quizData: { title: string, description: string, questions: Question[] }) => void;
  initialQuiz?: QuizData | null;
}

/* ================= COMPONENT ================= */

const MAX_IMAGE_BYTES = 1_500_000; // ~1.5 MB

// Normalize a question that may come from older saved quizzes without images
const normalizeQuestion = (q: Question): Question => ({
  ...q,
  choiceImages: q.choiceImages
    ? q.choices.map((_, i) => q.choiceImages[i] ?? "")
    : q.choices.map(() => ""),
});

// Always build fresh arrays so state updates never share references
const makeEmptyQuestion = (): Question => ({
  text: "",
  choices: ["", "", "", ""],
  choiceImages: ["", "", "", ""],
  correctIndices: [],
  timeLimitSec: 15,
});

export default function QuizEditor({ onSave, onSaveOnly, initialQuiz }: QuizEditorProps) {
  const isEditing = !!initialQuiz;
  const [questions, setQuestions] = useState<Question[]>(
    (initialQuiz?.questions ?? []).map(normalizeQuestion)
  );
  const [quizDetails, setQuizDetails] = useState({
    title: initialQuiz?.title ?? "",
    description: initialQuiz?.description ?? "",
  });

  const [currentQuestion, setCurrentQuestion] = useState<Question>(makeEmptyQuestion());
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  // Re-populate the form when a saved quiz is loaded for editing
  useEffect(() => {
    if (initialQuiz) {
      setQuizDetails({
        title: initialQuiz.title || "",
        description: initialQuiz.description || "",
      });
      setQuestions((initialQuiz.questions || []).map(normalizeQuestion));
      setCurrentQuestion(makeEmptyQuestion());
      setEditingIndex(null);
    }
  }, [initialQuiz]);

  /* ================= HANDLERS ================= */

  const handleDetailsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setQuizDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditorChange = (content: string) => {
    setCurrentQuestion((prev) => ({
      ...prev,
      text: content,
    }));
  };

  const handleChoiceChange = (index: number, value: string) => {
    const updatedChoices = [...currentQuestion.choices];
    updatedChoices[index] = value;

    setCurrentQuestion((prev) => ({
      ...prev,
      choices: updatedChoices,
    }));
  };

  const handleChoiceImageChange = (index: number, file: File | undefined) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }
    if (file.size > MAX_IMAGE_BYTES) {
      alert("Image is too large. Please use an image under 1.5 MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = String(reader.result);
      setCurrentQuestion((prev) => {
        const updated = [...prev.choiceImages];
        updated[index] = dataUrl;
        return { ...prev, choiceImages: updated };
      });
    };
    reader.readAsDataURL(file);
  };

  const removeChoiceImage = (index: number) => {
    setCurrentQuestion((prev) => {
      const updated = [...prev.choiceImages];
      updated[index] = "";
      return { ...prev, choiceImages: updated };
    });
  };

  // An option counts as filled if it has text OR an image
  const isOptionFilled = (q: Question, i: number) =>
    Boolean(q.choices[i]?.trim()) || Boolean(q.choiceImages[i]);

  const toggleCorrectAnswer = (index: number) => {
    setCurrentQuestion((prev) => ({
      ...prev,
      correctIndices: prev.correctIndices.includes(index)
        ? prev.correctIndices.filter((i) => i !== index)
        : [...prev.correctIndices, index],
    }));
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentQuestion((prev) => ({
      ...prev,
      timeLimitSec: Number(e.target.value),
    }));
  };

  /* ================= ACTIONS ================= */

  const addQuestion = () => {
    if (
      isEmptyHtml(currentQuestion.text) ||
      currentQuestion.choices.some((_, i) => !isOptionFilled(currentQuestion, i)) ||
      currentQuestion.correctIndices.length === 0
    ) {
      alert("Fill question, all options (text or image), and select correct answer(s)");
      return;
    }

    if (editingIndex !== null) {
      // Replace the question being edited
      setQuestions((prev) =>
        prev.map((q, i) => (i === editingIndex ? currentQuestion : q))
      );
      setEditingIndex(null);
    } else {
      setQuestions((prev) => [...prev, currentQuestion]);
    }

    setCurrentQuestion(makeEmptyQuestion());
  };

  const editQuestion = (index: number) => {
    const q = normalizeQuestion(questions[index]);
    setCurrentQuestion({
      text: q.text,
      choices: [...q.choices],
      choiceImages: [...q.choiceImages],
      correctIndices: [...q.correctIndices],
      timeLimitSec: q.timeLimitSec,
    });
    setEditingIndex(index);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelEditQuestion = () => {
    setEditingIndex(null);
    setCurrentQuestion(makeEmptyQuestion());
  };

  const removeQuestion = (index: number) => {
    setQuestions((prev) => prev.filter((_, i) => i !== index));
    if (editingIndex === index) {
      setEditingIndex(null);
      setCurrentQuestion(makeEmptyQuestion());
    }
  };

  // Collect + validate all questions (including the in-progress one if valid)
  const collectQuestions = (): Question[] | null => {
    const isCurrentValid =
      !isEmptyHtml(currentQuestion.text) &&
      currentQuestion.choices.every((_, i) => isOptionFilled(currentQuestion, i)) &&
      currentQuestion.correctIndices.length > 0;

    let finalQuestions: Question[];
    if (editingIndex !== null) {
      // An edit is in progress: commit it if valid, otherwise keep the original
      finalQuestions = isCurrentValid
        ? questions.map((q, i) => (i === editingIndex ? currentQuestion : q))
        : [...questions];
    } else {
      finalQuestions = isCurrentValid
        ? [...questions, currentQuestion]
        : [...questions];
    }

    if (finalQuestions.length === 0) {
      alert("Add at least one valid question");
      return null;
    }
    if (!quizDetails.title) {
      alert("Please enter a title for the quiz.");
      return null;
    }
    return finalQuestions;
  };

  const saveQuiz = () => {
    const finalQuestions = collectQuestions();
    if (!finalQuestions) return;
    if (onSaveOnly) {
      onSaveOnly({ ...quizDetails, questions: finalQuestions });
    } else {
      onSave({ ...quizDetails, questions: finalQuestions });
    }
  };

  const endQuiz = () => {
    const finalQuestions = collectQuestions();
    if (!finalQuestions) return;
    onSave({ ...quizDetails, questions: finalQuestions });
  };

  /* ================= UI ================= */

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">
          {isEditing ? "Edit Quiz" : "Create Quiz"}
        </h2>
        <div className="mb-4">
          <label className="block mb-1 font-medium">
            Title
          </label>
          <Input
            name="title"
            value={quizDetails.title}
            onChange={handleDetailsChange}
            className="border-gray-300 shadow-sm shadow-purple-200/50 focus:border-purple-400"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">
            Description
          </label>
          <Input
            name="description"
            value={quizDetails.description}
            onChange={handleDetailsChange}
            className="border-gray-300 shadow-sm shadow-purple-200/50 focus:border-purple-400"
          />
        </div>

        <h2 className="text-xl font-semibold mb-4">
          Add Questions
        </h2>

        {/* Question Editor */}
        <ReactQuill
          theme="snow"
          value={currentQuestion.text}
          onChange={handleEditorChange}
          modules={quillModules}
          placeholder="Type your question here..."
          style={{ marginBottom: "8px" }}
        />

        {/* Time Limit */}
        <div className="mt-4">
          <label className="block mb-1 font-medium">
            Time Limit (seconds)
          </label>
          <Input
            type="number"
            min={5}
            max={180}
            value={currentQuestion.timeLimitSec}
            onChange={handleTimeChange}
            className="border-gray-300 shadow-sm shadow-purple-200/50 focus:border-purple-400"
          />
        </div>

        {/* Options */}
        <div className="mt-4 space-y-3">
          <p className="text-sm text-gray-500">
            Each option needs text, an image, or both.
          </p>
          {currentQuestion.choices.map((choice, i) => (
            <div
              key={i}
              className="flex items-start gap-2 rounded-lg border border-gray-200 p-2"
            >
              <Checkbox
                className="mt-2"
                checked={currentQuestion.correctIndices.includes(i)}
                onCheckedChange={() => toggleCorrectAnswer(i)}
              />
              <div className="flex-1 min-w-0 space-y-2">
                <Input
                  placeholder={`Option ${i + 1}`}
                  value={choice}
                  onChange={(e) => handleChoiceChange(i, e.target.value)}
                  className="border-gray-300 shadow-sm shadow-purple-200/50 focus:border-purple-400"
                />
                <div className="flex items-center gap-2 flex-wrap">
                  <label className="inline-flex items-center gap-1 cursor-pointer text-sm text-purple-600 hover:text-purple-800">
                    <ImageIcon className="h-4 w-4" />
                    <span>{currentQuestion.choiceImages[i] ? "Change image" : "Add image"}</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        handleChoiceImageChange(i, e.target.files?.[0]);
                        e.target.value = "";
                      }}
                    />
                  </label>
                  {currentQuestion.choiceImages[i] && (
                    <div className="flex items-center gap-2">
                      <img
                        src={currentQuestion.choiceImages[i]}
                        alt={`Option ${i + 1}`}
                        className="h-12 w-12 rounded object-cover border border-gray-200"
                      />
                      <Button
                        variant="ghost"
                        onClick={() => removeChoiceImage(i)}
                        title="Remove image"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="mt-6 flex flex-wrap gap-4">
          <Button onClick={addQuestion}>
            {editingIndex !== null ? (
              <><Pencil className="mr-2 h-4 w-4" /> Update Question</>
            ) : (
              <><Plus className="mr-2 h-4 w-4" /> Add Question</>
            )}
          </Button>
          {editingIndex !== null && (
            <Button variant="ghost" onClick={cancelEditQuestion}>
              Cancel Edit
            </Button>
          )}
          <Button variant="secondary" onClick={saveQuiz}>
            {isEditing ? "Save Changes" : "Save Quiz"}
          </Button>
          <Button variant="outline" onClick={endQuiz}>
            {isEditing ? "Save & Host" : "End Quiz & Host"}
          </Button>
        </div>
      </Card>

      {/* Added Questions */}
      {questions.length > 0 && (
        <Card className="p-4">
          <h3 className="font-semibold mb-3">Added Questions ({questions.length})</h3>

          {questions.map((q, idx) => (
            <div
              key={idx}
              className={`border p-3 rounded mb-2 bg-white ${
                editingIndex === idx ? "ring-2 ring-purple-400" : ""
              }`}
            >
              <div className="flex justify-between items-start gap-2">
                <div className="min-w-0 flex-1">
                  <div
                    className="break-words [overflow-wrap:anywhere]"
                    dangerouslySetInnerHTML={{ __html: q.text }}
                  />
                  <div className="mt-2 flex flex-wrap gap-2">
                    {q.choices.map((c, i) => (
                      <div
                        key={i}
                        className={`flex items-center gap-1 rounded border px-2 py-1 text-sm break-words [overflow-wrap:anywhere] ${
                          q.correctIndices.includes(i)
                            ? "border-green-400 bg-green-50 text-green-700"
                            : "border-gray-200 text-gray-600"
                        }`}
                      >
                        <span className="font-semibold">{i + 1}.</span>
                        {q.choiceImages?.[i] && (
                          <img
                            src={q.choiceImages[i]}
                            alt={`Option ${i + 1}`}
                            className="h-8 w-8 rounded object-cover"
                          />
                        )}
                        {c?.trim() && <span>{c}</span>}
                        {!c?.trim() && !q.choiceImages?.[i] && (
                          <span className="italic text-gray-400">empty</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    onClick={() => editQuestion(idx)}
                    title="Edit question"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => removeQuestion(idx)}
                    title="Remove question"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </Card>
      )}
    </div>
  );
}

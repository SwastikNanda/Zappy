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



import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Card } from "./components/ui/card";
import { Checkbox } from "./components/ui/checkbox";
import { Plus, X } from "lucide-react";

interface Question {
  text: string;
  choices: string[];
  correctIndices: number[];
  timeLimitSec: number;
}

interface QuizCreatorProps {
  onSave: (quizData: { questions: Question[] }) => void;
}

export default function QuizCreator({ onSave }: QuizCreatorProps) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Question>({
    text: "",
    choices: ["", "", "", ""],
    correctIndices: [],
    timeLimitSec: 15,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "timeLimitSec") {
      setCurrentQuestion((prev) => ({ ...prev, timeLimitSec: Number(value) }));
    }
  };

  const handleEditorChange = (content: string) => {
    setCurrentQuestion((prev) => ({ ...prev, text: content }));
  };

  const handleChoiceChange = (index: number, value: string) => {
    const newChoices = [...currentQuestion.choices];
    newChoices[index] = value;
    setCurrentQuestion((prev) => ({ ...prev, choices: newChoices }));
  };

  const toggleCorrectAnswer = (index: number) => {
    const { correctIndices } = currentQuestion;
    const newCorrectIndices = correctIndices.includes(index)
      ? correctIndices.filter((i) => i !== index)
      : [...correctIndices, index];
    setCurrentQuestion((prev) => ({ ...prev, correctIndices: newCorrectIndices }));
  };

  const addQuestion = () => {
    if (
      !currentQuestion.text ||
      currentQuestion.choices.some((c) => !c.trim()) ||
      currentQuestion.correctIndices.length === 0
    ) {
      alert("Fill in question, all choices, and select at least one correct answer.");
      return;
    }
    setQuestions([...questions, currentQuestion]);
    setCurrentQuestion({ text: "", choices: ["", "", "", ""], correctIndices: [], timeLimitSec: 15 });
  };

  const endQuiz = () => {
    const isCurrentQuestionValid =
      currentQuestion.text &&
      currentQuestion.choices.every((c) => c.trim()) &&
      currentQuestion.correctIndices.length > 0;

    let finalQuestions = [...questions];
    if (isCurrentQuestionValid) {
      finalQuestions.push(currentQuestion);
    }
    if (finalQuestions.length === 0) {
      alert("Add at least one valid question.");
      return;
    }
    onSave({ questions: finalQuestions });
  };

  const removeQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card className="p-6 shadow-md">
        <h2 className="text-xl font-semibold mb-4">Add Questions ({questions.length})</h2>

        {/* Question Editor */}
        <Editor
          apiKey="0gn1nl2pcgdtjpnb3b8iyodwu7az8ldbkqxpa75qztjwti0q" // Make sure to use your own API key
          key={questions.length} // reset after add
         // initialValue={currentQuestion.text}
          onEditorChange={handleEditorChange}
          init={{
            height: 200,
            menubar: false,
            plugins: "link lists image code fullscreen",
            toolbar:
              "undo redo | bold italic | alignleft aligncenter alignright | bullist numlist | link image | fullscreen | code",
          }}
        />

        {/* Time Limit */}
        <div className="mt-4">
          <label>Time Limit (sec): </label>
          <Input
            type="number"
            name="timeLimitSec"
            value={currentQuestion.timeLimitSec}
            onChange={handleInputChange}
            min={5}
            max={180}
          />
        </div>

        {/* Choices */}
        <div className="mt-4 space-y-2">
          {currentQuestion.choices.map((c, i) => (
            <div key={i} className="flex items-center space-x-2">
              <Checkbox
                checked={currentQuestion.correctIndices.includes(i)}
                onCheckedChange={() => toggleCorrectAnswer(i)}
              />
              <Input
                value={c}
                onChange={(e) => handleChoiceChange(i, e.target.value)}
                placeholder={`Option ${i + 1}`}
              />
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="mt-6 flex space-x-4">
          <Button onClick={addQuestion}>
            <Plus className="mr-2 h-4 w-4" /> Add Question
          </Button>
          <Button variant="outline" onClick={endQuiz}>
            End Quiz and Create Room
          </Button>
        </div>
      </Card>

      {/* Questions List */}
      {questions.length > 0 && (
        <Card className="p-4 shadow-md">
          <h3 className="font-semibold mb-3">Added Questions</h3>
          {questions.map((q, idx) => (
            <div key={idx} className="border p-3 rounded mb-2 bg-white">
              <div className="flex justify-between items-start">
                <div>
                  <div dangerouslySetInnerHTML={{ __html: q.text }} />
                  <p className="text-sm text-gray-500">Choices: {q.choices.join(", ")}</p>
                  <p className="text-sm text-green-600">
                    Correct: {q.correctIndices.map((i) => q.choices[i]).join(", ")}
                  </p>
                </div>
                <Button variant="ghost" onClick={() => removeQuestion(idx)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </Card>
      )}
    </div>
  );
}

// import { useEffect, useState } from "react";
// import { Card, Typography, Button } from "@mui/material";

// export default function SavedQuizzes({ onHost }) {
//   const [quizzes, setQuizzes] = useState([]);
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     fetch(`${import.meta.env.VITE_API_URL}/api/quizzes`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     })
//       .then((res) => res.json())
//       .then(setQuizzes)
//       .catch(console.error);
//   }, []);

//   if (!quizzes.length) {
//     return (
//       <Typography sx={{ color: "white", mt: 3 }}>
//         No saved quizzes yet 🚀
//       </Typography>
//     );
//   }

//   return (
//     <div className="space-y-4">
//       {quizzes.map((quiz) => (
//         <Card
//           key={quiz._id}
//           className="p-4 bg-white/10 border border-white/20"
//           sx={{ borderRadius: "14px" }}
//         >
//           <Typography variant="h6" sx={{ color: "rgba(9, 0, 59, 0.7)" }}>
//             {quiz.title}
//           </Typography>

//           <Typography sx={{ color: "rgba(19, 18, 18, 0.7)", mb: 2 }}>
//             {quiz.description}
//           </Typography>

//           <Button
//             onClick={() => onHost(quiz._id)}
//             variant="contained"
//             sx={{
//               borderRadius: "10px",
//               background:
//                 "linear-gradient(90deg,#FDE68A,#F9A8D4,#C084FC)",
//               color: "#333",
//             }}
//           >
//             Host this Quiz
//           </Button>
//         </Card>
//       ))}
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { Card, Typography, Button } from "@mui/material";
import API from "./api";

export default function SavedQuizzes({ onHost, onEdit, quizCreated }) {
  const [quizzes, setQuizzes] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/quizzes`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then(setQuizzes)
      .catch(console.error);
  }, [quizCreated]);

  async function handleDeleteQuiz(quizId) {
    if (window.confirm("Are you sure you want to delete this quiz?")) {
      try {
        await API.delete(`/quizzes/${quizId}`);
        setQuizzes(quizzes.filter((quiz) => quiz._id !== quizId));
      } catch (error) {
        console.error("Failed to delete quiz:", error);
        alert("Failed to delete quiz.");
      }
    }
  }

  if (!quizzes.length) {
    return (
      <Typography sx={{ color: "rgba(9, 0, 59, 0.7)", mt: 3 }}>
        No saved quizzes yet 🚀
      </Typography>
    );
  }

  return (
    <div className="space-y-4">
      {quizzes.map((quiz) => (
        <Card
          key={quiz._id}
          className="p-4 bg-white/10 border border-white/20"
          sx={{ borderRadius: "14px" }}
        >
          <Typography variant="h6" sx={{ color: "rgba(9, 0, 59, 0.7)" }}>
            {quiz.title}
          </Typography>

          <Typography sx={{ color: "rgba(19, 18, 18, 0.7)", mb: 2 }}>
            {quiz.description}
          </Typography>

          <Button
            onClick={() => onHost(quiz._id)}
            variant="contained"
            sx={{
              borderRadius: "10px",
              background:
                "linear-gradient(90deg,#FDE68A,#F9A8D4,#C084FC)",
              color: "#333",
              mr: 2,
            }}
          >
            Host this Quiz
          </Button>
          <Button
            onClick={() => onEdit && onEdit(quiz._id)}
            variant="contained"
            sx={{
              borderRadius: "10px",
              background: "linear-gradient(90deg,#a78bfa,#7c3aed)",
              color: "#fff",
              mr: 2,
            }}
          >
            Edit
          </Button>
          <Button
            onClick={() => handleDeleteQuiz(quiz._id)}
            variant="contained"
            color="error"
            sx={{
              borderRadius: "10px",
            }}
          >
            Delete
          </Button>
        </Card>
      ))}
    </div>
  );
}

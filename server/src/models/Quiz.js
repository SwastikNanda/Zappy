// import mongoose from "mongoose";

// const quizSchema = new mongoose.Schema({
//   title:      { type: String, required: true },
//   description:{ type: String },
//   host:       { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   questions:  [{ type: mongoose.Schema.Types.ObjectId, ref: "Questions" }]
// }, { timestamps: true });

// export default mongoose.model("Quiz", quizSchema);


import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  text: String,
  choices: [String],
  choiceImages: [String],
  correctIndices: { type: [Number], required: true },
  timeLimitSec: Number
}, { _id: false });

const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  questions: [questionSchema]
}, { timestamps: true });

export default mongoose.model("Quiz", quizSchema);

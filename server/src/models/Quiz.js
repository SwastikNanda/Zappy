import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
  title:      { type: String, required: true },
  description:{ type: String },
  host:       { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  questions:  [{ type: mongoose.Schema.Types.ObjectId, ref: "Questions" }]
}, { timestamps: true });

export default mongoose.model("Quiz", quizSchema);

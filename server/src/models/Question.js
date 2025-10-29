
import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  text:        { type: String, required: true },
  options:     [{ type: String, required: true }], 
  correctIndex:{ type: Number, required: true }, 
  timeLimit:   { type: Number, default: 20 }
});

export default mongoose.model("Question", questionSchema);
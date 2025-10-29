import mongoose from "mongoose";

const playerSchema = new mongoose.Schema({
  user:   { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  score:  { type: Number, default: 0 },
  answered: { type: Boolean, default: false }
});

const gameSessionSchema = new mongoose.Schema({
  quiz:     { type: mongoose.Schema.Types.ObjectId, ref: "Quiz", required: true },
  host:     { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  players:  [playerSchema],
  currentQ: { type: Number, default: 0 }, 
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model("GameSession", gameSessionSchema);
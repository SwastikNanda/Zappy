import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true, index: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ["player", "admin", "host"], default: "player" }
}, { timestamps: true });

userSchema.methods.matchPassword = async function(password) {
  return await bcrypt.compare(password, this.passwordHash);
};

export default mongoose.model("User", userSchema);

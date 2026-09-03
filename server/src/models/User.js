// import mongoose from "mongoose";
// import bcrypt from "bcryptjs";

// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true, index: true },
//   passwordHash: { type: String, required: true },
//   role: { type: String,enum: ["player", "admin", "host"], default : "player" }
  
// }, { timestamps: true });

// userSchema.pre("save", async function(next) {
//   if (!this.isModified("password")) return next();
//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });

// userSchema.methods.matchPassword = async function(password) {
//   return await bcrypt.compare(password, this.password);
// };

// export default mongoose.model("User", userSchema);


// import mongoose from "mongoose";
// import bcrypt from "bcryptjs";

// const userSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true, index: true },
//     password: { type: String, required: true }, // ✅ change to 'password' instead of 'passwordHash'
//     role: {
//       type: String,
//       enum: ["player", "admin", "host"],
//       default: "player",
//     },
//   },
//   { timestamps: true }
// );

// // ✅ Hash password before saving (only if modified)
// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   try {
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
//   } catch (err) {
//     next(err);
//   }
// });

// // ✅ Compare input password with hashed one
// userSchema.methods.matchPassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

// export default mongoose.model("User", userSchema);

import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: true 
    },

    email: { 
      type: String, 
      required: true, 
      unique: true, 
      index: true,
      trim: true,
      lowercase: true 
    },

    // we store the hashed password here
    password: { 
      type: String, 
      required: true 
    },

    role: {
      type: String,
      enum: ["player", "host", "admin"],
      default: "player"
    }
  },
  { timestamps: true }
);

// 🔐 Hash password before saving (only if it was modified)
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// 🔐 Compare raw password with hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model("User", userSchema);

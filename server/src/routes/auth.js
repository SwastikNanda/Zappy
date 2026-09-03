// // import express from "express";
// // import jwt from "jsonwebtoken";
// // import User from "../models/User.js";
// // const router = express.Router();
// // router.post("/register", async (req, res) => {
// //   try {
// //     const { username, email, password, role } = req.body;

// //     const existing = await User.findOne({ email });
// //     if (existing) return res.status(400).json({ message: "User already exists" });

// //     const user = await User.create({ username, email, password, role });
// //     res.status(201).json({ message: "User registered successfully" });
// //   } catch (err) {
// //     res.status(500).json({ error: err.message });
// //   }
// // });
// // router.post("/login", async (req, res) => {
// //   try {
// //     const { email, password } = req.body;
// //     const user = await User.findOne({ email });

// //     if (!user || !(await user.matchPassword(password))) {
// //       return res.status(401).json({ message: "Invalid credentials" });
// //     }

// //     const token = jwt.sign(
// //       { id: user._id, role: user.role },
// //       process.env.JWT_SECRET,
// //       { expiresIn: "1d" }
// //     );

// //     res.json({ token, user: { id: user._id, username: user.username, role: user.role } });
// //   } catch (err) {
// //     res.status(500).json({ error: err.message });
// //   }
// // });

// // export default router;

// // import express from "express";
// // import jwt from "jsonwebtoken";
// // import User from "../models/User.js";

// // const router = express.Router();

// // // 🟢 Register new user
// // router.post("/register", async (req, res) => {
// //   try {
// //     const { name, email, password, role } = req.body;

// //     const existing = await User.findOne({ email });
// //     if (existing) return res.status(400).json({ message: "User already exists" });

// //     const user = new User({ name, email, passwordHash: password, role });
// //     await user.save();

// //     res.status(201).json({ message: "User registered successfully" });
// //   } catch (err) {
// //     console.error("❌ Register error:", err);
// //     res.status(500).json({ error: err.message });
// //   }
// // });

// // // 🟢 Login user
// // router.post("/login", async (req, res) => {
// //   try {
// //     const { email, password } = req.body;
// //     const user = await User.findOne({ email });

// //     if (!user || !(await user.matchPassword(password))) {
// //       return res.status(401).json({ message: "Invalid credentials" });
// //     }

// //     const token = jwt.sign(
// //       { id: user._id, role: user.role },
// //       process.env.JWT_SECRET,
// //       { expiresIn: "1d" }
// //     );

// //     res.json({
// //       token,
// //       user: {
// //         id: user._id,
// //         name: user.name,
// //         role: user.role,
// //       },
// //     });
// //   } catch (err) {
// //     console.error("❌ Login error:", err);
// //     res.status(500).json({ error: err.message });
// //   }
// // });

// // export default router;

// import express from "express";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import User from "../models/User.js";
// const router = express.Router();
// router.post("/register", async (req, res) => {
//   try {
//     const { name, email, password, role } = req.body;
//     if (role !== "host") {
//       return res.status(403).json({ message: "Only hosts can register." });
//     }
//     const existing = await User.findOne({ email });
//     if (existing) return res.status(400).json({ message: "User already exists" });
//     const passwordHash = await bcrypt.hash(password, 10);
//     const user = await User.create({ name, email, passwordHash, role: "host" });
//     const token = jwt.sign(
//       { id: user._id, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "1d" }
//     );
//     res.status(201).json({
//       message: "Host registered successfully",
//       token,
//       user: { id: user._id, name: user.name, email: user.email, role: user.role }
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: err.message });
//   }
// });
// router.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     if (!user || !(await user.matchPassword(password))) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }
//     if (user.role !== "host") {
//       return res.status(403).json({ message: "Only hosts can log in." });
//     }
//     const token = jwt.sign(
//       { id: user._id, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "1d" }
//     );
//     res.json({
//       token,
//       user: { id: user._id, name: user.name, role: user.role }
//     });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });
// export default router;

// router.post("/register", async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     const existing = await User.findOne({ email });
//     if (existing) return res.status(400).json({ message: "User already exists" });

//     const user = await User.create({ name, email, password });

//     const token = jwt.sign(
//       { id: user._id },
//       process.env.JWT_SECRET,
//       { expiresIn: "1d" }
//     );

//     res.status(201).json({
//       message: "Registered successfully",
//       token,
//       user: { id: user._id, name: user.name, email: user.email }
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: err.message });
//   }
// });

import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// Escape user input before using it in a regex
const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// Case-insensitive exact email match (covers accounts created before emails
// were stored lowercased)
const findByEmail = (email) =>
  User.findOne({
    email: { $regex: `^${escapeRegex(email)}$`, $options: "i" },
  });

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { name, password, role } = req.body;
    const email = String(req.body.email || "").trim();

    if (!name || !email || !password)
      return res.status(400).json({ message: "Missing fields" });

    const exists = await findByEmail(email);
    if (exists)
      return res.status(400).json({ message: "User already exists" });

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password,
      role: role || "player",
    });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(201).json({
      message: "Registered successfully",
      token,
      user: { id: user._id, name: user.name, role: user.role },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { password } = req.body;
    const email = String(req.body.email || "").trim();

    const user = await findByEmail(email);
    if (!user)
      return res.status(401).json({ message: "Invalid email or password" });

    const matched = await user.matchPassword(password);
    if (!matched)
      return res.status(401).json({ message: "Invalid email or password" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful",
      token,
      user: { id: user._id, name: user.name, role: user.role },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

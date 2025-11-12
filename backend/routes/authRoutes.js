const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/UsersModel");

const router = express.Router();

// ------------------- SIGNUP -------------------
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // Automatically log in user after signup
    req.session.userId = newUser._id;
    req.session.username = newUser.username;

    res.status(201).json({ success: true, user: newUser, message: "Signup successful" });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ------------------- LOGIN -------------------
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ success: false, message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ success: false, message: "Invalid credentials" });

    // Store user in session
    req.session.userId = user._id;
    req.session.username = user.username;

    res.json({ success: true, user });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ------------------- AUTO-LOGIN / CHECK SESSION -------------------
router.get("/home", (req, res) => {
  if (req.session.userId) {
    return res.json({
      success: true,
      user: { _id: req.session.userId, username: req.session.username },
    });
  }
  res.status(401).json({ success: false, message: "Not logged in" });
});

// ------------------- LOGOUT -------------------
router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Logout error:", err);
      return res.status(500).json({ success: false, message: "Logout failed" });
    }
    res.clearCookie("connect.sid"); // clear session cookie
    res.json({ success: true, message: "Logged out successfully" });
  });
});

// Get current user (for auto-login)
router.get("/home", async (req, res) => {
  if (!req.session.userId) return res.status(401).json({ success: false });

  const user = await User.findById(req.session.userId).select("-password");
  res.json({ success: true, user });
});

module.exports = router;

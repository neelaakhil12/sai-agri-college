const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

// Login admin
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // For testing purposes, check against env first
  if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
    const token = jwt.sign({ id: "admin" }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.cookie("token", token, { httpOnly: true });
    return res.json({ message: "Login successful", token });
  }

  // Database check
  const admin = await Admin.findOne({ username });
  if (admin && (await admin.comparePassword(password))) {
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.cookie("token", token, { httpOnly: true });
    return res.json({ message: "Login successful", token });
  }

  res.status(401).json({ message: "Invalid credentials" });
});

// Logout admin
router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out" });
});

// Auth check
router.get("/auth", (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ authenticated: false });

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    res.json({ authenticated: true });
  } catch (err) {
    res.status(401).json({ authenticated: false });
  }
});

module.exports = router;

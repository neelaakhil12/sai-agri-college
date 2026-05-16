const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

// Receptionist Login (Hardcoded for simplicity)
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "receptionist" && password === "receptionist123") {
    const secret = process.env.JWT_SECRET || "srisai_secret_key_123";
    // We sign as adminId to allow accessing staffRoutes which require adminAuth
    // Or we can just reuse the admin token approach
    const token = jwt.sign({ id: "receptionist", role: "receptionist" }, secret, { expiresIn: "24h" });
    res.cookie("token", token, { // Use 'token' cookie so adminAuth passes
      httpOnly: true, 
      secure: process.env.NODE_ENV === "production", 
      sameSite: "Lax", 
      path: "/",
      maxAge: 24 * 60 * 60 * 1000
    });
    return res.json({ message: "Login successful", token });
  }
  return res.status(401).json({ message: "Invalid receptionist credentials" });
});

router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out" });
});

router.get("/auth", (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ authenticated: false });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "srisai_secret_key_123");
    if (decoded.role === "receptionist" || decoded.id) {
      return res.json({ authenticated: true });
    }
    return res.status(401).json({ authenticated: false });
  } catch (err) {
    res.status(401).json({ authenticated: false });
  }
});

module.exports = router;

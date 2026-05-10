const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const pool = require("../utils/db");
const bcrypt = require("bcryptjs");

// Login admin
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  const cleanUser = username.trim().toLowerCase();
  const cleanPass = password.trim();

  try {
    try {
      // 1. Check against DB
      const [rows] = await pool.query("SELECT * FROM admins WHERE username = ?", [cleanUser]);
      const admin = rows[0];

      if (admin) {
        const isMatch = await bcrypt.compare(cleanPass, admin.password);
        if (isMatch) {
            const secret = process.env.JWT_SECRET || "srisai_secret_key_123";
            const token = jwt.sign({ id: admin.id }, secret, { expiresIn: "24h" });
           res.cookie("token", token, { 
             httpOnly: true, 
             secure: process.env.NODE_ENV === "production", 
             sameSite: "Lax", 
             path: "/",
             maxAge: 24 * 60 * 60 * 1000 // 24 hours
           });
           return res.json({ message: "Login successful", token });
        }
      }
    } catch (dbErr) {
      console.error("Database connection failed, falling back to ENV:", dbErr.message);
    }

    // 2. Fallback to ENV (if DB fails or user not in DB)
    const envUser = (process.env.ADMIN_USERNAME || "admin").trim().toLowerCase();
    const envPass = (process.env.ADMIN_PASSWORD || "admin123").trim();

    if (cleanUser === envUser && cleanPass === envPass) {
       console.log("✅ Admin login successful via ENV fallback");
       const secret = process.env.JWT_SECRET || "srisai_secret_key_123";
       const token = jwt.sign({ id: "admin-env" }, secret, { expiresIn: "24h" });
       res.cookie("token", token, { 
         httpOnly: true, 
         secure: process.env.NODE_ENV === "production", 
         sameSite: "Lax", 
         path: "/",
         maxAge: 24 * 60 * 60 * 1000
       });
       return res.json({ message: "Login successful", token });
    }

    console.log(`❌ Login failed for user: ${cleanUser}. Expected: ${envUser}`);
    return res.status(401).json({ message: "Invalid credentials" });
  } catch (err) {
    console.error("Login verification error:", err);
    return res.status(500).json({ message: "Server error during login" });
  }
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
    jwt.verify(token, process.env.JWT_SECRET || "srisai_secret_key_123");
    res.json({ authenticated: true });
  } catch (err) {
    res.status(401).json({ authenticated: false });
  }
});

module.exports = router;


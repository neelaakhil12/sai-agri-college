const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const pool = require("../utils/db");

// Middleware for Admin Auth
const adminAuth = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Unauthorized" });
  try {
    const secret = process.env.JWT_SECRET || "srisai_secret_key_123";
    jwt.verify(token, secret);
    next();
  } catch (err) { return res.status(401).json({ message: "Invalid token" }); }
};

// Middleware for Staff Auth
const staffAuth = (req, res, next) => {
  const token = req.cookies.staffToken;
  if (!token) return res.status(401).json({ message: "Unauthorized" });
  try {
    const secret = process.env.JWT_SECRET || "srisai_secret_key_123";
    const decoded = jwt.verify(token, secret);
    req.staffId = decoded.id;
    next();
  } catch (err) { return res.status(401).json({ message: "Invalid token" }); }
};

// --- ADMIN ROUTES FOR STAFF MANAGEMENT ---

// Get all staff
router.get("/admin/list", adminAuth, async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT id, name, email, department, created_at FROM staff");
    res.json(rows);
  } catch (err) { res.status(500).json({ message: "Failed to fetch staff" }); }
});

// Create staff
router.post("/admin/create", adminAuth, async (req, res) => {
  const { name, email, password, department } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query(
      "INSERT INTO staff (name, email, password, department) VALUES (?, ?, ?, ?)",
      [name, email, hashedPassword, department]
    );
    res.json({ message: "Staff account created successfully" });
  } catch (err) { res.status(500).json({ message: "Failed to create staff" }); }
});

// Delete staff
router.delete("/admin/:id", adminAuth, async (req, res) => {
  try {
    await pool.query("DELETE FROM staff WHERE id = ?", [req.params.id]);
    res.json({ message: "Staff deleted" });
  } catch (err) { res.status(500).json({ message: "Delete failed" }); }
});

// --- STAFF PORTAL ROUTES ---

// Staff Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const [rows] = await pool.query("SELECT * FROM staff WHERE email = ?", [email]);
    if (rows.length === 0) return res.status(401).json({ message: "Invalid email or password" });
    
    const staff = rows[0];
    const isMatch = await bcrypt.compare(password, staff.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid email or password" });

    const token = jwt.sign({ id: staff.id }, process.env.JWT_SECRET || "srisai_secret_key_123", { expiresIn: "12h" });
    res.cookie("staffToken", token, { httpOnly: true, maxAge: 12 * 60 * 60 * 1000 });
    res.json({ message: "Login successful", staff: { name: staff.name, email: staff.email } });
  } catch (err) { res.status(500).json({ message: "Server error" }); }
});

// Get Staff Profile
router.get("/profile", staffAuth, async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT id, name, email, department FROM staff WHERE id = ?", [req.staffId]);
    res.json(rows[0]);
  } catch (err) { res.status(500).json({ message: "Fetch failed" }); }
});

// Mark Attendance
router.post("/attendance", staffAuth, async (req, res) => {
  const { student_id, status, date } = req.body;
  try {
    await pool.query(
      "INSERT INTO attendance (student_id, date, status, marked_by) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE status = ?, marked_by = ?",
      [student_id, date, status, req.staffId, status, req.staffId]
    );
    res.json({ message: "Attendance marked successfully" });
  } catch (err) { res.status(500).json({ message: "Failed to mark attendance" }); }
});

// Get Attendance for a date
router.get("/attendance/:date", staffAuth, async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM attendance WHERE date = ?", [req.params.date]);
    res.json(rows);
  } catch (err) { res.status(500).json({ message: "Fetch failed" }); }
});

module.exports = router;

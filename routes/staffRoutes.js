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

// ─── ADMIN: STAFF MANAGEMENT ────────────────────────────────────────────────

// Get all staff
router.get("/admin/list", adminAuth, async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT id, employee_id, name, email, department, role, created_at FROM staff ORDER BY created_at DESC"
    );
    res.json(rows);
  } catch (err) { res.status(500).json({ message: "Failed to fetch staff" }); }
});

// Create staff
router.post("/admin/create", adminAuth, async (req, res) => {
  const { employee_id, name, email, password, department, role } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Name, email and password are required" });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query(
      "INSERT INTO staff (employee_id, name, email, password, department, role) VALUES (?, ?, ?, ?, ?, ?)",
      [employee_id || null, name, email, hashedPassword, department || null, role || null]
    );
    res.json({ message: "Staff account created successfully" });
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") return res.status(400).json({ message: "Email already exists" });
    res.status(500).json({ message: "Failed to create staff" });
  }
});

// Update staff
router.put("/admin/:id", adminAuth, async (req, res) => {
  const { employee_id, name, email, department, role, password } = req.body;
  try {
    if (password) {
      const hashed = await bcrypt.hash(password, 10);
      await pool.query(
        "UPDATE staff SET employee_id=?, name=?, email=?, department=?, role=?, password=? WHERE id=?",
        [employee_id, name, email, department, role, hashed, req.params.id]
      );
    } else {
      await pool.query(
        "UPDATE staff SET employee_id=?, name=?, email=?, department=?, role=? WHERE id=?",
        [employee_id, name, email, department, role, req.params.id]
      );
    }
    res.json({ message: "Staff updated successfully" });
  } catch (err) { res.status(500).json({ message: "Update failed" }); }
});

// Delete staff
router.delete("/admin/:id", adminAuth, async (req, res) => {
  try {
    await pool.query("DELETE FROM staff WHERE id = ?", [req.params.id]);
    res.json({ message: "Staff deleted" });
  } catch (err) { res.status(500).json({ message: "Delete failed" }); }
});

// ─── ADMIN: STAFF ATTENDANCE ─────────────────────────────────────────────────

// Get all staff WITH their attendance for a specific date
router.get("/admin/attendance", adminAuth, async (req, res) => {
  const { date } = req.query;
  if (!date) return res.status(400).json({ message: "Date required" });
  try {
    const [rows] = await pool.query(`
      SELECT s.id, s.employee_id, s.name, s.department, s.role,
             sa.status, sa.check_in, sa.check_out
      FROM staff s
      LEFT JOIN staff_attendance sa ON sa.staff_id = s.id AND sa.date = ?
      ORDER BY s.name ASC
    `, [date]);
    res.json(rows);
  } catch (err) { res.status(500).json({ message: "Failed to fetch attendance" }); }
});

// Save / update attendance for one staff member
router.post("/admin/attendance/save", adminAuth, async (req, res) => {
  const { staff_id, date, status, check_in, check_out } = req.body;
  if (!staff_id || !date || !status) {
    return res.status(400).json({ message: "staff_id, date and status are required" });
  }
  try {
    await pool.query(`
      INSERT INTO staff_attendance (staff_id, date, status, check_in, check_out)
      VALUES (?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE status=VALUES(status), check_in=VALUES(check_in), check_out=VALUES(check_out)
    `, [staff_id, date, status, check_in || null, check_out || null]);
    res.json({ message: "Attendance saved" });
  } catch (err) { res.status(500).json({ message: "Failed to save attendance" }); }
});

// Bulk save attendance for a full date (array of records)
router.post("/admin/attendance/bulk", adminAuth, async (req, res) => {
  const { date, records } = req.body; // records: [{staff_id, status, check_in, check_out}]
  if (!date || !Array.isArray(records) || records.length === 0) {
    return res.status(400).json({ message: "date and records[] are required" });
  }
  try {
    for (const r of records) {
      if (!r.staff_id || !r.status) continue;
      await pool.query(`
        INSERT INTO staff_attendance (staff_id, date, status, check_in, check_out)
        VALUES (?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE status=VALUES(status), check_in=VALUES(check_in), check_out=VALUES(check_out)
      `, [r.staff_id, date, r.status, r.check_in || null, r.check_out || null]);
    }
    res.json({ message: "Attendance saved for all staff" });
  } catch (err) { res.status(500).json({ message: "Bulk save failed" }); }
});

// Get attendance history for a staff member
router.get("/admin/attendance/history/:staffId", adminAuth, async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM staff_attendance WHERE staff_id = ? ORDER BY date DESC LIMIT 60",
      [req.params.staffId]
    );
    res.json(rows);
  } catch (err) { res.status(500).json({ message: "Fetch failed" }); }
});

// ─── STAFF PORTAL ROUTES ─────────────────────────────────────────────────────

// Staff Login
router.post("/login", async (req, res) => {
  const { username, email, password } = req.body;
  const identifier = username || email;
  try {
    const [rows] = await pool.query("SELECT * FROM staff WHERE email = ? OR name = ?", [identifier, identifier]);
    if (rows.length === 0) return res.status(401).json({ message: "Invalid email or password" });
    const staff = rows[0];
    const isMatch = await bcrypt.compare(password, staff.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid email or password" });
    const token = jwt.sign({ id: staff.id }, process.env.JWT_SECRET || "srisai_secret_key_123", { expiresIn: "12h" });
    res.cookie("staffToken", token, { httpOnly: true, maxAge: 12 * 60 * 60 * 1000 });
    res.json({ message: "Login successful", staff: { name: staff.name, email: staff.email, department: staff.department } });
  } catch (err) { res.status(500).json({ message: "Server error" }); }
});

// Get Staff Profile
router.get("/profile", staffAuth, async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT id, employee_id, name, email, department, role FROM staff WHERE id = ?",
      [req.staffId]
    );
    res.json(rows[0]);
  } catch (err) { res.status(500).json({ message: "Fetch failed" }); }
});

// Mark Student Attendance (staff portal)
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

// Get Student Attendance for a date (staff portal)
router.get("/attendance/:date", staffAuth, async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM attendance WHERE date = ?", [req.params.date]);
    res.json(rows);
  } catch (err) { res.status(500).json({ message: "Fetch failed" }); }
});

module.exports = router;

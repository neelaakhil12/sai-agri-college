const express = require("express");
const router = express.Router();
const pool = require("../utils/db");
const authenticate = require("../utils/authMiddleware");

// Get Subjects
router.get("/:course", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM subjects WHERE course = ? ORDER BY semester ASC",
      [req.params.course]
    );
    res.json(rows);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Add Subject (Admin)
router.post("/admin/add", authenticate, async (req, res) => {
  try {
    const { course, subject_name, subject_code, semester, credits } = req.body;
    const [result] = await pool.query(
      "INSERT INTO subjects (course, subject_name, subject_code, semester, credits) VALUES (?, ?, ?, ?, ?)",
      [course, subject_name, subject_code, semester, credits]
    );
    const [newSubject] = await pool.query("SELECT * FROM subjects WHERE id = ?", [result.insertId]);
    res.status(201).json(newSubject[0]);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;

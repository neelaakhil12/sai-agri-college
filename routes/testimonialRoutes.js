const express = require("express");
const router = express.Router();
const pool = require("../utils/db");
const authenticate = require("../utils/authMiddleware");

// Get all testimonials
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM testimonials ORDER BY created_at DESC");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create testimonial (Public/Admin)
router.post("/", async (req, res) => {
  const { studentName, initials, achievement, quote, stars } = req.body;
  try {
    const [result] = await pool.query(
      "INSERT INTO testimonials (student_name, initials, achievement, quote, stars) VALUES (?, ?, ?, ?, ?)",
      [studentName, initials, achievement, quote, stars || 5]
    );
    const [newTestimonial] = await pool.query("SELECT * FROM testimonials WHERE id = ?", [result.insertId]);
    res.status(201).json(newTestimonial[0]);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete testimonial (Protected)
router.delete("/:id", authenticate, async (req, res) => {
  try {
    await pool.query("DELETE FROM testimonials WHERE id = ?", [req.params.id]);
    res.json({ message: "Testimonial deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

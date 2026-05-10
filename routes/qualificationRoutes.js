const express = require("express");
const router = express.Router();
const pool = require("../utils/db");
const authenticate = require("../utils/authMiddleware");

// Get qualifications for a student
router.get("/:studentId", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM qualifications WHERE student_id = ?",
      [req.params.studentId]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add/Update qualifications (Bulk)
router.post("/:studentId", authenticate, async (req, res) => {
  const { studentId } = req.params;
  const { qualifications } = req.body;

  try {
    // Delete existing
    await pool.query("DELETE FROM qualifications WHERE student_id = ?", [studentId]);
    
    // Insert new ones
    for (const q of qualifications) {
      await pool.query(
        "INSERT INTO qualifications (student_id, examination, board_university, year_of_passing, percentage_cgpa) VALUES (?, ?, ?, ?, ?)",
        [studentId, q.examination, q.board_university, q.year_of_passing, q.percentage_cgpa]
      );
    }
    res.json({ message: "Qualifications updated" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;

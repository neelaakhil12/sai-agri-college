const express = require("express");
const router = express.Router();
const pool = require("../utils/db");
const authenticate = require("../utils/authMiddleware");

// PUBLIC: Submit enquiry
router.post("/", async (req, res) => {
  const { studentName, parentName, mobile, email, stream, batch, message } = req.body;

  try {
    await pool.query(
      "INSERT INTO enquiries (student_name, parent_name, mobile, email, stream, batch, message) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [studentName, parentName, mobile, email, stream, batch, message]
    );
    res.status(201).json({ message: "Enquiry submitted successfully" });
  } catch (err) {
    res.status(400).json({ message: "Failed to submit enquiry", error: err.message });
  }
});

// ADMIN: Get all enquiries
router.get("/", authenticate, async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM enquiries ORDER BY created_at DESC");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ADMIN: Delete enquiry
router.delete("/:id", authenticate, async (req, res) => {
  try {
    await pool.query("DELETE FROM enquiries WHERE id = ?", [req.params.id]);
    res.json({ message: "Enquiry deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete enquiry", error: err.message });
  }
});

module.exports = router;


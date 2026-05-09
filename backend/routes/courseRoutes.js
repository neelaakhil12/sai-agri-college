const express = require("express");
const router = express.Router();
const pool = require("../utils/db");
const upload = require("../utils/multerConfig");
const authenticate = require("../utils/authMiddleware");

// Get all courses
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM courses ORDER BY id ASC");
    
    // Parse JSON strings if they are returned as strings
    const parsedRows = rows.map(row => ({
      ...row,
      details: typeof row.details === 'string' ? JSON.parse(row.details || '[]') : (row.details || [])
    }));

    res.json(parsedRows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create course (Protected)
router.post("/", authenticate, upload.single("image"), async (req, res) => {
  const { title, stream, description, details, badge, eligibility, seats_label, head_class } = req.body;
  const image = req.file ? req.file.path : "";

  try {
    const [result] = await pool.query(
      "INSERT INTO courses (title, stream, description, details, image, badge, eligibility, seats_label, head_class) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [title, stream, description, typeof details === 'string' ? details : JSON.stringify(details), image, badge || '', eligibility || '', seats_label || '', head_class || '']
    );
    const [newCourse] = await pool.query("SELECT * FROM courses WHERE id = ?", [result.insertId]);
    res.status(201).json(newCourse[0]);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update course (Protected)
router.put("/:id", authenticate, upload.single("image"), async (req, res) => {
  const { title, description, stream, details, badge, eligibility, seats_label, head_class } = req.body;
  
  try {
    let query = "UPDATE courses SET title=?, description=?, stream=?, details=?, badge=?, eligibility=?, seats_label=?, head_class=?";
    let params = [
      title, description, stream,
      typeof details === 'string' ? details : JSON.stringify(details),
      badge || '', eligibility || '', seats_label || '', head_class || ''
    ];

    if (req.file) {
      query += ", image=?";
      params.push(req.file.path);
    }

    query += " WHERE id=?";
    params.push(req.params.id);

    await pool.query(query, params);
    const [updated] = await pool.query("SELECT * FROM courses WHERE id = ?", [req.params.id]);
    res.json(updated[0]);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete course (Protected)
router.delete("/:id", authenticate, async (req, res) => {
  try {
    await pool.query("DELETE FROM courses WHERE id = ?", [req.params.id]);
    res.json({ message: "Course deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

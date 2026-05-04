const express = require("express");
const router = express.Router();
const pool = require("../utils/db");
const upload = require("../utils/multerConfig");
const authenticate = require("../utils/authMiddleware");

// Get all courses
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM courses ORDER BY id ASC");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create course (Protected)
router.post("/", authenticate, upload.single("image"), async (req, res) => {
  const { title, stream, description, details } = req.body;
  const image = req.file ? req.file.path : "";

  try {
    const [result] = await pool.query(
      "INSERT INTO courses (title, stream, description, details, image) VALUES (?, ?, ?, ?, ?)",
      [title, stream, description, typeof details === 'string' ? details : JSON.stringify(details), image]
    );
    const [newCourse] = await pool.query("SELECT * FROM courses WHERE id = ?", [result.insertId]);
    res.status(201).json(newCourse[0]);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update course (Protected)
router.put("/:id", authenticate, upload.single("image"), async (req, res) => {
  const { title, description, stream, details } = req.body;
  
  try {
    let query = "UPDATE courses SET title=?, description=?, stream=?, details=?";
    let params = [title, description, stream, typeof details === 'string' ? details : JSON.stringify(details)];

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

const express = require("express");
const router = express.Router();
const pool = require("../utils/db");
const upload = require("../utils/multerConfig");
const authenticate = require("../utils/authMiddleware");

// Get all stories
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM stories ORDER BY id ASC");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create story (Protected)
router.post("/", authenticate, upload.single("image"), async (req, res) => {
  const { name, initials, place, category } = req.body;
  const image = req.file ? req.file.path.replace(/\\/g, "/") : "";

  try {
    const [result] = await pool.query(
      "INSERT INTO stories (name, initials, place, category, image) VALUES (?, ?, ?, ?, ?)",
      [name, initials, place, category, image]
    );
    const [newStory] = await pool.query("SELECT * FROM stories WHERE id = ?", [result.insertId]);
    res.status(201).json(newStory[0]);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update story (Protected)
router.put("/:id", authenticate, upload.single("image"), async (req, res) => {
  const { name, initials, place, category } = req.body;
  const updateData = [name, initials, place, category];
  let query = "UPDATE stories SET name = ?, initials = ?, place = ?, category = ?";

  if (req.file) {
    query += ", image = ?";
    updateData.push(req.file.path.replace(/\\/g, "/"));
  }

  query += " WHERE id = ?";
  updateData.push(req.params.id);

  try {
    await pool.query(query, updateData);
    const [updatedStory] = await pool.query("SELECT * FROM stories WHERE id = ?", [req.params.id]);
    res.json(updatedStory[0]);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete story (Protected)
router.delete("/:id", authenticate, async (req, res) => {
  try {
    await pool.query("DELETE FROM stories WHERE id = ?", [req.params.id]);
    res.json({ message: "Story deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

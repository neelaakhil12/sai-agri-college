const express = require("express");
const router = express.Router();
const pool = require("../utils/db");
const upload = require("../utils/multerConfig");
const authenticate = require("../utils/authMiddleware");

// Get all gallery items
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM gallery ORDER BY created_at DESC");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add gallery item (Protected)
router.post("/", authenticate, upload.single("image"), async (req, res) => {
  const { label, sub_label } = req.body;
  const image = req.file ? req.file.path.replace(/\\/g, "/") : "";

  try {
    const [result] = await pool.query(
      "INSERT INTO gallery (image, label, sub_label) VALUES (?, ?, ?)",
      [image, label, sub_label]
    );
    const [newItem] = await pool.query("SELECT * FROM gallery WHERE id = ?", [result.insertId]);
    res.status(201).json(newItem[0]);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete gallery item (Protected)
router.delete("/:id", authenticate, async (req, res) => {
  try {
    await pool.query("DELETE FROM gallery WHERE id = ?", [req.params.id]);
    res.json({ message: "Gallery item deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

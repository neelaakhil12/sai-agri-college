const express = require("express");
const router = express.Router();
const pool = require("../utils/db");
const upload = require("../utils/multerConfig");
const authenticate = require("../utils/authMiddleware");

// Get hero sliders
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM hero ORDER BY id ASC");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create hero slider (Protected)
router.post("/", authenticate, upload.single("image"), async (req, res) => {
  const { tag, h1, motto, description, btn1_label, btn1_href, btn2_label, btn2_href, bg_gradient } = req.body;
  const image = req.file ? req.file.path.replace(/\\/g, "/") : "";

  try {
    const [result] = await pool.query(
      "INSERT INTO hero (tag, h1, motto, description, btn1_label, btn1_href, btn2_label, btn2_href, bg_gradient, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [tag, h1, motto, description, btn1_label, btn1_href, btn2_label, btn2_href, bg_gradient, image]
    );
    const [newHero] = await pool.query("SELECT * FROM hero WHERE id = ?", [result.insertId]);
    res.status(201).json(newHero[0]);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update hero slider (Protected)
router.put("/:id", authenticate, upload.single("image"), async (req, res) => {
  const { tag, h1, motto, description, btn1_label, btn1_href, btn2_label, btn2_href, bg_gradient } = req.body;
  const updateData = [tag, h1, motto, description, btn1_label, btn1_href, btn2_label, btn2_href, bg_gradient];
  let query = "UPDATE hero SET tag = ?, h1 = ?, motto = ?, description = ?, btn1_label = ?, btn1_href = ?, btn2_label = ?, btn2_href = ?, bg_gradient = ?";

  if (req.file) {
    query += ", image = ?";
    updateData.push(req.file.path.replace(/\\/g, "/"));
  }

  query += " WHERE id = ?";
  updateData.push(req.params.id);

  try {
    await pool.query(query, updateData);
    const [updatedHero] = await pool.query("SELECT * FROM hero WHERE id = ?", [req.params.id]);
    res.json(updatedHero[0]);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete hero slider (Protected)
router.delete("/:id", authenticate, async (req, res) => {
  try {
    await pool.query("DELETE FROM hero WHERE id = ?", [req.params.id]);
    res.json({ message: "Hero slider deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

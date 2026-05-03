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
      [title, stream, description, details, image]
    );
    const [newCourse] = await pool.query("SELECT * FROM courses WHERE id = ?", [result.insertId]);
    res.status(201).json(newCourse[0]);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update course (Protected)
router.put("/:id", authenticate, upload.single("image"), async (req, res) => {
      detailsArr = typeof details === "string" ? JSON.parse(details) : details;
    } catch (e) {
      detailsArr = [details];
    }
  }

  const updateData = { title, description, stream, details: detailsArr };
  
  if (req.file) {
    updateData.image = req.file.path;
  }

  try {
    const { data, error } = await supabase
      .from("courses")
      .update(updateData)
      .eq("id", req.params.id)
      .select();

    if (error) throw error;
    res.json(data[0]);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;



const express = require("express");
const router = express.Router();
const Faculty = require("../models/Faculty");
const upload = require("../utils/multerConfig");

const authenticate = require("../utils/authMiddleware");

// Get all faculty
router.get("/", async (req, res) => {
  try {
    const faculty = await Faculty.find();
    res.json(faculty);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create faculty (Protected)
router.post("/", authenticate, upload.single("image"), async (req, res) => {
  const { name, initials, department, experience, category } = req.body;
  const image = req.file ? req.file.path : "";

  const faculty = new Faculty({
    name,
    initials,
    department,
    experience,
    image,
    category,
  });

  try {
    const newFaculty = await faculty.save();
    res.status(201).json(newFaculty);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete faculty (Protected)
router.delete("/:id", authenticate, async (req, res) => {
  try {
    await Faculty.findByIdAndDelete(req.params.id);
    res.json({ message: "Faculty deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

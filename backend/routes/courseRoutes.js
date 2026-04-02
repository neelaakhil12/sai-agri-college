const express = require("express");
const router = express.Router();
const Course = require("../models/Course");
const upload = require("../utils/multerConfig");

const authenticate = require("../utils/authMiddleware");

// Get all courses
router.get("/", async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create course (Protected)
router.post("/", authenticate, upload.single("image"), async (req, res) => {
  const { title, description, stream, details } = req.body;
  const image = req.file ? req.file.path : "";
  
  let detailList = [];
  try {
    if (details) {
      if (details.startsWith("[")) {
        detailList = JSON.parse(details);
      } else {
        // Fallback: split by comma if not JSON array
        detailList = details.split(",").map(d => d.trim());
      }
    }
  } catch (err) {
    // If parsing fails for some reason (e.g. malformed json starts with [), just treat as single item or comma list
    detailList = details.split(",").map(d => d.trim());
  }

  const course = new Course({
    title,
    description,
    stream,
    details: detailList,
    image,
  });

  try {
    const newCourse = await course.save();
    res.status(201).json(newCourse);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete course (Protected)
router.delete("/:id", authenticate, async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: "Course deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

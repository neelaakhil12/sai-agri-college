const express = require("express");
const router = express.Router();
const Testimonial = require("../models/Testimonial");
const upload = require("../utils/multerConfig");
const authenticate = require("../utils/authMiddleware");

// Get all
router.get("/", async (req, res) => {
  try {
    const list = await Testimonial.find();
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create (Protected)
router.post("/", authenticate, upload.single("image"), async (req, res) => {
  const { studentName, achievement, quote, initials, stars } = req.body;
  const image = req.file ? req.file.path : "";

  const entry = new Testimonial({
    studentName,
    achievement,
    quote,
    initials,
    stars: parseInt(stars) || 5,
    image,
  });

  try {
    const saved = await entry.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete (Protected)
router.delete("/:id", authenticate, async (req, res) => {
  try {
    await Testimonial.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

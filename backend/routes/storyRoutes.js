const express = require("express");
const router = express.Router();
const SuccessStory = require("../models/SuccessStory");
const upload = require("../utils/multerConfig");

const authenticate = require("../utils/authMiddleware");

// Get all success stories
router.get("/", async (req, res) => {
  try {
    const stories = await SuccessStory.find();
    res.json(stories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create success story (Protected)
router.post("/", authenticate, upload.single("image"), async (req, res) => {
  const { name, initials, place, category } = req.body;
  const image = req.file ? req.file.path : "";

  const story = new SuccessStory({
    name,
    initials,
    place,
    category,
    image,
  });

  try {
    const newStory = await story.save();
    res.status(201).json(newStory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete story (Protected)
router.delete("/:id", authenticate, async (req, res) => {
  try {
    await SuccessStory.findByIdAndDelete(req.params.id);
    res.json({ message: "Success story deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const Rank = require("../models/Rank");
const upload = require("../utils/multerConfig");

const authenticate = require("../utils/authMiddleware");

// Get all ranks
router.get("/", async (req, res) => {
  try {
    const ranks = await Rank.find();
    res.json(ranks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create rank (Protected)
router.post("/", authenticate, upload.single("image"), async (req, res) => {
  const { studentName, hallTicketNumber, rank, exam, stream, year } = req.body;
  const image = req.file ? req.file.path : "";

  const newRank = new Rank({
    studentName,
    hallTicketNumber,
    rank,
    exam,
    stream,
    year: parseInt(year) || new Date().getFullYear(),
    image,
  });

  try {
    const savedRank = await newRank.save();
    res.status(201).json(savedRank);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete rank (Protected)
router.delete("/:id", authenticate, async (req, res) => {
  try {
    await Rank.findByIdAndDelete(req.params.id);
    res.json({ message: "Rank deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

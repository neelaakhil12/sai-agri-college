const express = require("express");
const router = express.Router();
const Enquiry = require("../models/Enquiry");
const authenticate = require("../utils/authMiddleware");

// PUBLIC: Submit enquiry
router.post("/", async (req, res) => {
  try {
    const newEnquiry = new Enquiry(req.body);
    await newEnquiry.save();
    res.status(201).json({ message: "Enquiry submitted successfully" });
  } catch (err) {
    res.status(400).json({ message: "Failed to submit enquiry", error: err.message });
  }
});

// ADMIN: Get all enquiries
router.get("/", authenticate, async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    res.json(enquiries);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ADMIN: Delete enquiry
router.delete("/:id", authenticate, async (req, res) => {
  try {
    await Enquiry.findByIdAndDelete(req.params.id);
    res.json({ message: "Enquiry deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete enquiry", error: err.message });
  }
});

module.exports = router;

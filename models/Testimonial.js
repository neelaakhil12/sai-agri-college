const mongoose = require("mongoose");

const TestimonialSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  achievement: { type: String, required: true }, // e.g. "IIT Palakkad - MPC Batch"
  quote: { type: String, required: true },
  initials: { type: String, required: true },
  stars: { type: Number, default: 5 },
  image: { type: String }, // Optional image
});

module.exports = mongoose.model("Testimonial", TestimonialSchema);

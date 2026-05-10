const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  stream: { type: String, required: true }, // Engineering, Medical, Commerce
  details: { type: [String] }, // List of features/details
  image: { type: String },
});

module.exports = mongoose.model("Course", CourseSchema);

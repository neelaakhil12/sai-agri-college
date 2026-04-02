const mongoose = require("mongoose");

const FacultySchema = new mongoose.Schema({
  name: { type: String, required: true },
  initials: { type: String, required: true },
  department: { type: String, required: true },
  experience: { type: String, required: true },
  image: { type: String }, // Path to the image
  category: { type: String, required: true }, // math, phys, etc.
});

module.exports = mongoose.model("Faculty", FacultySchema);

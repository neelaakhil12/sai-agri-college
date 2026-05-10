const mongoose = require("mongoose");

const SuccessStorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  initials: { type: String, required: true },
  place: { type: String, required: true },
  category: { type: String, required: true }, // jee, neet, etc.
  image: { type: String },
});

module.exports = mongoose.model("SuccessStory", SuccessStorySchema);

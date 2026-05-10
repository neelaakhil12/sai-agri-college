const mongoose = require("mongoose");

const RankSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  hallTicketNumber: { type: String }, // New field
  rank: { type: String, required: true },
  exam: { type: String, required: true },
  stream: { type: String }, // New field
  year: { type: Number, default: new Date().getFullYear() },
  image: { type: String },
});

module.exports = mongoose.model("Rank", RankSchema);

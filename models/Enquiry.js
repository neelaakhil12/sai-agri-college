const mongoose = require("mongoose");

const EnquirySchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  parentName: { type: String, required: true },
  mobile: { type: String, required: true },
  email: { type: String },
  stream: { type: String, required: true },
  batch: { type: String },
  message: { type: String },
  status: { type: String, default: "pending" }, // pending, contacted, closed
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Enquiry", EnquirySchema);

const mongoose = require("mongoose");

const certificateSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  job: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
  fileUrl: { type: String, required: true },
  issuedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Certificate", certificateSchema);

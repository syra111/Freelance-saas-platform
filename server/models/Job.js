const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  category: { type: String },
  budget: { type: Number },
  deadline: { type: Date },
  status: {
    type: String,
    enum: ["open", "closed", "completed"],
    default: "open"
  },
  poster: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  assignedFreelancer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
}, { timestamps: true }); 

module.exports = mongoose.model("Job", jobSchema);

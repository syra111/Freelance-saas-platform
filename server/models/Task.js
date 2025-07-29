const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  job: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
  title: { type: String, required: true },
  description: { type: String },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  status: { type: String, enum: ["todo", "submitted", "inprogress", "approved"], default: "todo" },
  submittedWork: { type: String },
  submittedLink: { type: String },
  submittedFile: { type: String }
}, { timestamps: true });

module.exports = mongoose.model("Task", taskSchema);

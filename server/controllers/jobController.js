const Job = require("../models/Job");
const { validationResult } = require("express-validator");

exports.createJob = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ message: errors.array()[0].msg });

  console.log("Incoming body:", req.body); 

  try {
    const job = await Job.create({
      ...req.body,
      poster: req.user.id,
    });
    res.status(201).json(job);
  } catch (err) {
    console.error("Job creation error:", err);
    res.status(500).json({ message: "Failed to create job" });
  }
};

exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ status: "open" }).sort({ createdAt: -1 });
    res.json(jobs);
  } catch {
    res.status(500).json({ message: "Failed to fetch jobs" });
  }
};

exports.getMyJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ poster: req.user.id });
    res.json(jobs);
  } catch {
    res.status(500).json({ message: "Failed to fetch your jobs" });
  }
};

exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.json(job);
  } catch {
    res.status(500).json({ message: "Failed to get job" });
  }
};

exports.updateJob = async (req, res) => {
  const { id } = req.params;

  try {
    const job = await Job.findById(id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    if (job.poster.toString() !== req.user.id)
      return res.status(403).json({ message: "Not authorized to edit this job" });

    const updated = await Job.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updated);
  } catch {
    res.status(500).json({ message: "Failed to update job" });
  }
};

exports.deleteJob = async (req, res) => {
  const { id } = req.params;

  try {
    const job = await Job.findById(id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    if (job.poster.toString() !== req.user.id)
      return res.status(403).json({ message: "Not authorized to delete this job" });

    await job.deleteOne();
    res.json({ message: "Job deleted successfully" });
  } catch {
    res.status(500).json({ message: "Failed to delete job" });
  }
};

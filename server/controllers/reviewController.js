const Review = require("../models/Review");
const Job = require("../models/Job");

exports.giveReview = async (req, res) => {
  const { jobId, rating, comment } = req.body;
  const reviewer = req.user._id;

  try {
    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });

    if (job.status !== "completed") {
      return res.status(400).json({ message: "You can only review after job is completed." });
    }

    let reviewee;
    if (String(job.assignedFreelancer) === String(reviewer)) {
      reviewee = job.createdBy;
    } else if (String(job.createdBy) === String(reviewer)) {
      reviewee = job.assignedFreelancer;
    } else {
      return res.status(403).json({ message: "You are not part of this job" });
    }

    const alreadyReviewed = await Review.findOne({ job: job._id, reviewer });
    if (alreadyReviewed) {
      return res.status(400).json({ message: "You have already reviewed this job" });
    }

    const review = await Review.create({
      job: job._id,
      reviewer,
      reviewee,
      rating,
      comment
    });

    res.status(201).json({ message: "Review submitted", review });
  } catch (error) {
    res.status(500).json({ message: "Failed to submit review", error: error.message });
  }
};


exports.getUserReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ reviewee: req.params.userId })
      .populate("reviewer", "name")
      .populate("job", "title");

    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch reviews", error: err.message });
  }
};

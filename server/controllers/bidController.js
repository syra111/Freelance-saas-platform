const Bid = require("../models/Bid");
const Notification = require("../models/Notification");
const sendEmail = require("../utils/sendEmail"); 
const Job = require("../models/Job");


exports.placeBid = async (req, res) => {
  const { jobId, bidAmount, timeline, message } = req.body;

  try {
    // Check if already bid on this job
    const exists = await Bid.findOne({ job: jobId, user: req.user._id });
    if (exists) {
      return res.status(400).json({ message: "You already bid on this job" });
    }

    const bid = await Bid.create({
      job: jobId,
      user: req.user._id,
      bidAmount,
      timeline,
      message
    });

    res.status(201).json(bid);
  } catch (error) {
    res.status(500).json({ message: "Failed to place bid", error: error.message });
  }
};

exports.getBidsForJob = async (req, res) => {
  try {
    const bids = await Bid.find({ job: req.params.jobId }).populate("user", "name email");
    res.json(bids);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch bids", error: error.message });
  }
};


exports.updateBidStatus = async (req, res) => {
  const { status } = req.body;
  const bidId = req.params.bidId;

  if (!["accepted", "rejected"].includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  try {
    const bid = await Bid.findById(bidId).populate("user").populate("job");
    if (!bid) return res.status(404).json({ message: "Bid not found" });

    bid.status = status;
    await bid.save();


    
    if (status === "accepted") {
      await Job.findByIdAndUpdate(bid.job._id, {
        status: "closed",
        assignedFreelancer: bid.user._id // or "assigned"
      });
    }

    await Bid.updateMany(
      { job: bid.job._id, _id: { $ne: bid._id } },
      { status: "rejected" }
    );

    await Notification.create({
      user: bid.user._id,
      message: `Your bid on "${bid.job.title}" has been ${status}.`
    });

    let to = bid.user.email;
    let subject = `Bid ${status.toUpperCase()}`;
    let text = `Your bid on "${bid.job.title}" has been ${status}.`;
    await sendEmail(to.toString(), subject.toString(), text.toString());

    res.status(200).json({ message: `Bid ${status}`, bid });
  } catch (error) {
    res.status(500).json({ message: "Failed to update bid status", error: error.message });
  }
};


exports.myBids = async (req, res) => {
  try {
    const bids = await Bid.find({ user: req.user._id }).populate("job", "title deadline");
    res.json(bids);
  } catch (error) {
    res.status(500).json({ message: "Error fetching your bids", error: error.message });
  }
};

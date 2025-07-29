const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const Notification = require("../models/Notification");

router.get("/", protect, async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch notifications" });
  }
});

module.exports = router;

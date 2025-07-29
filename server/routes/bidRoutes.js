const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const {
  placeBid,
  getBidsForJob,
  updateBidStatus,
  myBids
} = require("../controllers/bidController");

const { protect } = require("../middlewares/authMiddleware");
const { allowAdminOnly } = require("../middlewares/roleMiddleware");

router.post(
  "/",
  protect,
  body("jobId").notEmpty().withMessage("Job ID is required"),
  body("bidAmount").isNumeric().withMessage("Amount must be number"),
  body("timeline").notEmpty().withMessage("Timeline is required"),
  body("message").notEmpty().withMessage("Message is required"),
  placeBid
);

router.get("/my", protect, myBids);

router.get("/job/:jobId", protect, allowAdminOnly, getBidsForJob);

router.patch("/:bidId", protect, allowAdminOnly, updateBidStatus);

module.exports = router;

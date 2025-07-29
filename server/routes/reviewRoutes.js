const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const { giveReview, getUserReviews } = require("../controllers/reviewController");

router.post("/", protect, giveReview); 
router.get("/user/:userId", protect, getUserReviews); 

module.exports = router;

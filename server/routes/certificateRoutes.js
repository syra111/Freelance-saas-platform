const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const { getCertificateByJob } = require("../controllers/certificateController");

router.get("/download/:jobId", protect, getCertificateByJob);

module.exports = router;

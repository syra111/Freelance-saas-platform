const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const {
  createTask,
  submitTaskWork,
  reviewTask,
  getTasksByJob
} = require("../controllers/taskController");

const { protect } = require("../middlewares/authMiddleware");
const { allowAdminOnly } = require("../middlewares/roleMiddleware");

router.post("/", protect, allowAdminOnly, createTask);

router.post("/submit/:taskId", protect, upload.single("submittedFile"), submitTaskWork);

router.post("/review/:taskId", protect, allowAdminOnly, reviewTask);

router.get("/job/:jobId", protect, getTasksByJob);

module.exports = router;

const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const {
  createJob,
  getAllJobs,
  getMyJobs,
  getJobById,
  updateJob,
  deleteJob,
} = require("../controllers/jobController");

const { protect } = require("../middlewares/authMiddleware");
const { allowAdminOnly } = require("../middlewares/roleMiddleware");




// Validation rules
const jobValidation = [
  body("title").notEmpty().withMessage("Title is required"),
  body("description").notEmpty().withMessage("Description is required"),
  body("category").notEmpty().withMessage("Category is required"),
  body("budget").isNumeric().withMessage("Budget must be a number"),
  body("deadline").notEmpty().withMessage("Deadline is required"),
];

const jobUpdateValidation = [
  body("title").optional().notEmpty().withMessage("Title cannot be empty"),
  body("description").optional().notEmpty().withMessage("Description cannot be empty"),
  body("category").optional().notEmpty(),
  body("budget").optional().isNumeric().withMessage("Budget must be a number"),
  body("deadline").optional().notEmpty(),
];
  

console.log("protect:", typeof protect);
console.log("allowAdminOnly:", typeof allowAdminOnly);
console.log("createJob:", typeof createJob);
console.log("jobValidation:", jobValidation.map(f => typeof f));


router.post("/", protect, allowAdminOnly, ...jobValidation, createJob);

router.get("/", getAllJobs);
router.get("/my", protect, allowAdminOnly, getMyJobs);

router.get("/:id", getJobById);

router.put("/:id", protect, allowAdminOnly, ...jobUpdateValidation, updateJob);

router.delete("/:id", protect, allowAdminOnly, deleteJob);
module.exports = router;

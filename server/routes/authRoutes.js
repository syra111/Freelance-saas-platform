const express = require('express');
const router = express.Router();
const { body } = require("express-validator");

const { register, login } = require('../controllers/authController');

router.post(
  '/register',
  [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Invalid email").normalizeEmail(),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
    
  ],
  register
);

router.post(
  '/login',
  [
    body("email").isEmail().withMessage("Invalid email").normalizeEmail(),
    body("password").exists().withMessage("Password is required")
  ],
  login
);

module.exports = router;

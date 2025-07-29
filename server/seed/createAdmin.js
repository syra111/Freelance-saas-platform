const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

dotenv.config(); 

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const adminExists = await User.findOne({ role: "admin" });

    if (adminExists) {
      console.log("Admin already exists.");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

    const adminUser = new User({
      name: "Super Admin",
      email: process.env.ADMIN_EMAIL,
      password: hashedPassword,
      role: "admin"
    });

    await adminUser.save();
    console.log("Admin user created successfully.");
    process.exit();
  } catch (error) {
    console.error("Seeding failed:", error.message);
    process.exit(1);
  }
};

seedAdmin();

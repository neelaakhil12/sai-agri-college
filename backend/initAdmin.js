require("dotenv").config();
const mongoose = require("mongoose");
const Admin = require("./models/Admin");

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/aakash_academy";

mongoose
  .connect(MONGO_URI, {
    serverSelectionTimeoutMS: 5000,
  })
  .then(async () => {
    console.log("✅ Connected to MongoDB");
    const existingAdmin = await Admin.findOne({ username: process.env.ADMIN_USERNAME });
    if (existingAdmin) {
      console.log("ℹ️ Admin already exists");
      process.exit();
    }
    const admin = new Admin({
      username: process.env.ADMIN_USERNAME,
      password: process.env.ADMIN_PASSWORD,
    });
    await admin.save();
    console.log("✨ Admin user created successfully!");
    process.exit();
  })
  .catch((err) => {
    console.error("❌ Failed to connect to MongoDB in initAdmin script. Please check if mongod is running.");
    process.exit(1);
  });

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
    let admin = await Admin.findOne({ username: process.env.ADMIN_USERNAME });
    if (admin) {
      console.log("ℹ️ Admin already exists, updating password...");
      admin.password = process.env.ADMIN_PASSWORD;
      await admin.save();
      console.log("✨ Admin password updated successfully!");
    } else {
      admin = new Admin({
        username: process.env.ADMIN_USERNAME,
        password: process.env.ADMIN_PASSWORD,
      });
      await admin.save();
      console.log("✨ Admin user created successfully!");
    }
    process.exit();
  })
  .catch((err) => {
    console.error("❌ Error in initAdmin script:", err.message);
    process.exit(1);
  });

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Database Connection
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/aakash_academy";

mongoose
  .connect(MONGO_URI, {
    serverSelectionTimeoutMS: 5000, // Wait 5 seconds only
  })
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => {
    console.log("❌ MongoDB Connection Error!");
    console.log("Please make sure MongoDB is RUNNING on your local machine.");
    console.log("If you haven't installed MongoDB, please install it or use a MongoDB Atlas URI.");
    console.log("Current URI:", MONGO_URI);
  });

// Admin Auth Routes (Simplified for now)
const adminRoutes = require("./routes/adminRoutes");
const facultyRoutes = require("./routes/facultyRoutes");
const courseRoutes = require("./routes/courseRoutes");
const rankRoutes = require("./routes/rankRoutes");
const storyRoutes = require("./routes/storyRoutes");
const enquiryRoutes = require("./routes/enquiryRoutes");
const testimonialRoutes = require("./routes/testimonialRoutes");

app.use("/api/admin", adminRoutes);
app.use("/api/faculty", facultyRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/ranks", rankRoutes);
app.use("/api/stories", storyRoutes);
app.use("/api/enquiries", enquiryRoutes);
app.use("/api/testimonials", testimonialRoutes);


// Error Handling Middleware for Multer
app.use((err, req, res, next) => {
  if (err instanceof require("multer").MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({ message: "File is too large! Maximum limit is 1MB." });
    }
    return res.status(400).json({ message: err.message });
  } else if (err) {
    return res.status(400).json({ message: err.message });
  }
  next();
});

app.get("/", (req, res) => {
  res.send("Aakash Academy API is running...");
});

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}

module.exports = app;

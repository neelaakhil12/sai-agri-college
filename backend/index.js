require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: ["http://localhost:3000", "https://your-domain.com"], credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
const adminRoutes = require("./routes/adminRoutes");
const facultyRoutes = require("./routes/facultyRoutes");
const courseRoutes = require("./routes/courseRoutes");
const rankRoutes = require("./routes/rankRoutes");
const storyRoutes = require("./routes/storyRoutes");
const enquiryRoutes = require("./routes/enquiryRoutes");
const testimonialRoutes = require("./routes/testimonialRoutes");
const heroRoutes = require("./routes/heroRoutes");
const galleryRoutes = require("./routes/galleryRoutes");

app.use("/api/admin", adminRoutes);
app.use("/api/faculty", facultyRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/ranks", rankRoutes);
app.use("/api/stories", storyRoutes);
app.use("/api/enquiries", enquiryRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/hero", heroRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/students", require("./routes/studentRoutes"));
app.use("/api/fees", require("./routes/feeRoutes"));
app.use("/api/subjects", require("./routes/subjectRoutes"));

// Error Handling Middleware for Multer
app.use((err, req, res, next) => {
  if (err instanceof require("multer").MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({ message: "File is too large! Maximum limit is 5MB." });
    }
    return res.status(400).json({ message: err.message });
  } else if (err) {
    return res.status(400).json({ message: err.message });
  }
  next();
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "../sri-sai-agriculture/build")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../sri-sai-agriculture/build", "index.html"));
});

// Catch-all handler for any request that doesn't match the ones above
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../sri-sai-agriculture/build", "index.html"));
});

const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

module.exports = app;


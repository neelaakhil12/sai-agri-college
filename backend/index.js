// GLOBAL ERROR CATCHER
process.on('uncaughtException', (err) => {
  console.error("⛔️ CRITICAL CRASH (Uncaught):", err.message);
  console.error(err.stack);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error("⛔️ CRITICAL CRASH (Unhandled Rejection):", reason);
});

try {
  console.log("🎬 SCRIPT STARTING...");
  require("dotenv").config();
  console.log("✅ Dotenv loaded");
  
  const express = require("express");
  const cors = require("cors");
  const path = require("path");
  const cookieParser = require("cookie-parser");
  console.log("✅ Modules loaded");

  const app = express();
  const PORT = process.env.PORT || 5000;

  app.use(cors());
  app.use(express.json());
  app.use(cookieParser());
  app.use("/uploads", express.static(path.join(__dirname, "uploads")));

  // Import Routes
  app.use("/api/students", require("./routes/studentRoutes"));
  app.use("/api/faculty", require("./routes/facultyRoutes"));
  app.use("/api/courses", require("./routes/courseRoutes"));
  app.use("/api/stories", require("./routes/storyRoutes"));
  app.use("/api/testimonials", require("./routes/testimonialRoutes"));
  app.use("/api/ranks", require("./routes/rankRoutes"));
  app.use("/api/gallery", require("./routes/galleryRoutes"));
  app.use("/api/hero", require("./routes/heroRoutes"));
  app.use("/api/enquiries", require("./routes/enquiryRoutes"));
  app.use("/api/subjects", require("./routes/subjectRoutes"));
  app.use("/api/qualifications", require("./routes/qualificationRoutes"));
  app.use("/api/admin", require("./routes/adminRoutes"));
  app.use("/api/student-fees", require("./routes/feeRoutes"));
  console.log("✅ Routes initialized");

  // Serve static files
  const buildPath = path.join(__dirname, "../sri-sai-agriculture/build");
  app.use(express.static(buildPath));
  
  // Use a general middleware for the SPA fallback to avoid path-to-regexp issues
  app.use((req, res) => {
    res.sendFile(path.join(buildPath, "index.html"));
  });

  console.log("🎬 Starting Express Server...");
  app.listen(PORT, () => {
    console.log(`🚀 SERVER IS LIVE ON PORT ${PORT}`);
  }).on('error', (err) => {
    console.error("❌ SERVER FAILED TO START:", err.message);
  });

  // DB Test
  const pool = require("./utils/db");
  pool.getConnection()
    .then(c => { console.log("✅ DB Connected!"); c.release(); })
    .catch(e => console.error("❌ DB Error:", e.message));

} catch (err) {
  console.error("⛔️ INITIALIZATION ERROR:", err.message);
  console.error(err.stack);
}

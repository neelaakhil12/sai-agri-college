const express = require("express");
const router = express.Router();
const pool = require("../utils/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const upload = require("../utils/multerConfig");
const authenticate = require("../utils/authMiddleware");

// Register Student
router.post("/register", upload.single("photo"), async (req, res) => {
  const { 
    email, password, student_name, father_name, mother_name, 
    branch, inter_type, dob, gender, admission_type, 
    course_applied, medium, nationality, religion,
    door_no, village, mandal, pin, district,
    mobile1, mobile2, residence_phone, email_personal, reference,
    qualifications, roll_no, current_year, academic_enrolled_year
  } = req.body;

  const photo = req.file ? req.file.path.replace(/\\/g, "/") : "";

  try {
    const hashedPassword = await bcrypt.hash(password || roll_no, 10);

    // 1. Insert Student
    const [result] = await pool.query(
      `INSERT INTO students (
        email, password, student_name, father_name, mother_name,
        branch, inter_type, dob, gender, admission_type,
        course_applied, medium, nationality, religion,
        door_no, village, mandal, pin, district,
        mobile1, mobile2, residence_phone, email_personal, reference,
        photo, roll_no, current_year, academic_enrolled_year
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        email, hashedPassword, student_name, father_name, mother_name,
        branch, inter_type, dob || null, gender, admission_type,
        course_applied, medium, nationality, religion,
        door_no, village, mandal, pin, district,
        mobile1, mobile2, residence_phone, email_personal, reference,
        photo, roll_no, current_year || '1st year', academic_enrolled_year
      ]
    );

    const studentId = result.insertId;

    // 2. Insert Qualifications if provided
    if (qualifications) {
      const quals = JSON.parse(qualifications);
      for (const q of quals) {
        await pool.query(
          "INSERT INTO qualifications (student_id, examination, board_university, year_of_passing, percentage_cgpa) VALUES (?, ?, ?, ?, ?)",
          [studentId, q.examination, q.board_university, q.year_of_passing, q.percentage_cgpa]
        );
      }
    }

    // 3. Initialize Fees with null/zero
    const years = ["1st year", "2nd year", "3rd year", "4th year"];
    for (const year of years) {
      await pool.query(
        "INSERT INTO student_fees (student_id, academic_year) VALUES (?, ?)",
        [studentId, year]
      );
    }

    res.status(201).json({ message: "Registration successful", studentId });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Student Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const [rows] = await pool.query("SELECT * FROM students WHERE email = ?", [email]);
    const student = rows[0];

    if (!student || !(await bcrypt.compare(password, student.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: student.id, role: 'student' }, process.env.JWT_SECRET || "srisai_secret_key_123", { expiresIn: "24h" });
    
    res.cookie("studentToken", token, { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === "production", 
      sameSite: "Lax", 
      maxAge: 24 * 60 * 60 * 1000 
    });

    res.json({ message: "Login successful", student });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get Student Profile
router.get("/profile", async (req, res) => {
  const token = req.cookies.studentToken;
  if (!token) return res.status(401).json({ message: "Not authenticated" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "srisai_secret_key_123");
    
    const [students] = await pool.query("SELECT * FROM students WHERE id = ?", [decoded.id]);
    const student = students[0];

    if (!student) return res.status(404).json({ message: "Student not found" });

    const [qualifications] = await pool.query("SELECT * FROM qualifications WHERE student_id = ?", [student.id]);
    const [fees] = await pool.query("SELECT * FROM student_fees WHERE student_id = ?", [student.id]);

    student.qualifications = qualifications;
    student.student_fees = fees;

    res.json(student);
  } catch (err) {
    res.status(401).json({ message: "Session expired" });
  }
});

// Get All Students (Admin Only)
router.get("/admin/list", authenticate, async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM students ORDER BY created_at DESC");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update Student (Admin)
router.put("/admin/update/:id", authenticate, upload.single("photo"), async (req, res) => {
  const { id } = req.params;
  const updates = { ...req.body };
  console.log("Incoming updates for student:", req.params.id, updates);
  
  try {
    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }

    // Handle empty date strings for MySQL
    if (updates.dob === "") {
      updates.dob = null;
    }
    
    let updateQuery = "UPDATE students SET ";
    let queryParams = [];
    
    // Handle photo upload
    if (req.file) {
      updates.photo = req.file.path.replace(/\\/g, "/");
    }

    // Filter out fields that shouldn't be directly updated this way
    delete updates.id;
    delete updates._id;
    delete updates.created_at;

    const fields = Object.keys(updates);
    if (fields.length === 0) return res.json({ message: "No changes provided" });

    fields.forEach((field, index) => {
      updateQuery += `\`${field}\` = ?`;
      if (index < fields.length - 1) updateQuery += ", ";
      queryParams.push(updates[field]);
    });

    updateQuery += " WHERE id = ?";
    queryParams.push(id);

    await pool.query(updateQuery, queryParams);
    res.json({ message: "Student updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete Student (Admin)
router.delete("/admin/delete/:id", authenticate, async (req, res) => {
  const { id } = req.params;
  try {
    // 1. Delete associated fees
    await pool.query("DELETE FROM student_fees WHERE student_id = ?", [id]);
    // 2. Delete associated qualifications
    await pool.query("DELETE FROM qualifications WHERE student_id = ?", [id]);
    // 3. Delete student
    await pool.query("DELETE FROM students WHERE id = ?", [id]);
    
    res.json({ message: "Student deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

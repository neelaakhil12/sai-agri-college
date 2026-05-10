const express = require("express");
const router = express.Router();
const pool = require("../utils/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const upload = require("../utils/multerConfig");
const authenticate = require("../utils/authMiddleware");
const { sendEmail } = require('../utils/mailer');
const crypto = require('crypto');

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
    // Fallback for initial registration where roll_no/password might be missing
    const authCredential = password || roll_no || email || "SriSai@123";
    const hashedPassword = await bcrypt.hash(authCredential, 10);

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

    // Calculate attendance percentage
    const [attRows] = await pool.query(
      "SELECT status, COUNT(*) as count FROM attendance WHERE student_id = ? GROUP BY status",
      [student.id]
    );
    let totalDays = 0;
    let presentDays = 0;
    attRows.forEach(row => {
      totalDays += row.count;
      if (row.status === 'Present') presentDays += row.count;
    });
    const attendancePercentage = totalDays > 0 ? ((presentDays / totalDays) * 100).toFixed(2) : "0.00";

    student.qualifications = qualifications;
    student.student_fees = fees;
    student.attendance_percentage = attendancePercentage;

    res.json(student);
  } catch (err) {
    res.status(401).json({ message: "Session expired" });
  }
});

// Get All Students (Admin Only)
router.get("/admin/list", authenticate, async (req, res) => {
  try {
    console.log("🔍 Admin requesting student list...");
    const [rows] = await pool.query("SELECT id, roll_no, email, student_name, father_name, mother_name, branch, inter_type, dob, gender, admission_type, course_applied, medium, nationality, religion, door_no, village, mandal, pin, district, mobile1, mobile2, residence_phone, email_personal, reference, photo, current_year, academic_enrolled_year, created_at FROM students ORDER BY created_at DESC");
    console.log(`✅ Found ${rows.length} students in DB.`);
    res.json(rows);
  } catch (err) {
    console.error("❌ Admin student list error:", err.message);
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

    // Handle date formatting for MySQL
    if (updates.dob) {
      if (updates.dob === "") {
        updates.dob = null;
      } else if (typeof updates.dob === 'string' && updates.dob.includes('-')) {
        const parts = updates.dob.split('-');
        if (parts.length === 3 && parts[2].length === 4) {
          // Convert DD-MM-YYYY to YYYY-MM-DD
          updates.dob = `${parts[2]}-${parts[1]}-${parts[0]}`;
        }
      }
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

// @route   POST api/students/forgot-password
// @desc    Request password reset
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  try {
    const [students] = await pool.query('SELECT * FROM students WHERE email = ?', [email]);
    if (students.length === 0) {
      return res.status(404).json({ message: 'No student found with this email' });
    }

    const student = students[0];
    const token = crypto.randomBytes(32).toString('hex');
    const expiry = new Date(Date.now() + 3600000); // 1 hour

    await pool.query('UPDATE students SET reset_token = ?, reset_token_expiry = ? WHERE id = ?', [token, expiry, student.id]);

    const resetUrl = `${req.protocol}://${req.get('host')}/portal/reset-password/${token}`;
    
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px; border: 1px solid #eef2f6; border-radius: 24px; background-color: #ffffff;">
        <div style="text-align: center; margin-bottom: 32px;">
          <h1 style="color: #1a6b3c; margin: 0; font-size: 24px;">Sri Sai Agricultural College</h1>
          <p style="color: #64748b; font-size: 14px; margin-top: 4px;">Student Portal Access</p>
        </div>
        
        <p style="font-size: 16px; color: #1e293b; margin-bottom: 24px;">Hello <strong>${student.student_name}</strong>,</p>
        
        <p style="font-size: 16px; color: #475569; line-height: 1.6; margin-bottom: 32px;">
          We received a request to reset the password for your student portal account. 
          If you made this request, please click the button below:
        </p>
        
        <div style="text-align: center; margin-bottom: 32px;">
          <a href="${resetUrl}" style="display: inline-block; padding: 16px 32px; background-color: #1a6b3c; color: #ffffff; text-decoration: none; border-radius: 12px; font-weight: 700; font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em; box-shadow: 0 4px 12px rgba(26, 107, 60, 0.2);">
            Reset My Password
          </a>
        </div>
        
        <div style="padding: 24px; background-color: #f8fafc; border-radius: 16px; margin-bottom: 32px;">
          <p style="font-size: 13px; color: #64748b; margin: 0; word-break: break-all;">
            <strong>Link not working?</strong> Copy and paste this URL into your browser:<br/>
            <span style="color: #1a6b3c;">${resetUrl}</span>
          </p>
        </div>
        
        <hr style="border: none; border-top: 1px solid #eef2f6; margin-bottom: 24px;"/>
        
        <p style="font-size: 13px; color: #94a3b8; text-align: center; margin: 0;">
          This link will expire in 1 hour.<br/>
          If you didn't request this, you can safely ignore this email.
        </p>
      </div>
    `;

    const success = await sendEmail(email, 'Password Reset Request - Sri Sai Agri', html);
    if (success) {
      res.json({ message: 'Reset link sent to your email' });
    } else {
      res.status(500).json({ message: 'Failed to send email. Check SMTP settings.' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// @route   POST api/students/reset-password/:token
// @desc    Reset password using token
router.post('/reset-password/:token', async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const [students] = await pool.query('SELECT * FROM students WHERE reset_token = ? AND reset_token_expiry > NOW()', [token]);
    
    if (students.length === 0) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    const student = students[0];
    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query('UPDATE students SET password = ?, reset_token = NULL, reset_token_expiry = NULL WHERE id = ?', [hashedPassword, student.id]);

    res.json({ message: 'Password reset successful! You can now log in.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

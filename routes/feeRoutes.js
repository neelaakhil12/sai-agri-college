const express = require("express");
const router = express.Router();
const pool = require("../utils/db");
const authenticate = require("../utils/authMiddleware");

// Update Student Fees (Admin Only)
router.put("/admin/update/:studentId", authenticate, async (req, res) => {
  const { studentId } = req.params;
  const { fees } = req.body; // Array of fee objects for different years

  try {
    for (const fee of fees) {
      await pool.query(
        `UPDATE student_fees SET 
          total_fee = ?, fee_paid = ?, due_amount = ?, 
          hostel_total_fee = ?, hostel_fee_paid = ?, hostel_due_amount = ?,
          status = ?, last_payment_date = ?
        WHERE student_id = ? AND academic_year = ?`,
        [
          fee.total_fee, fee.fee_paid, fee.due_amount,
          fee.hostel_total_fee, fee.hostel_fee_paid, fee.hostel_due_amount,
          fee.status, fee.last_payment_date, studentId, fee.academic_year
        ]
      );
    }
    res.json({ message: "Fees updated successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get Fees for a student
router.get("/:studentId", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM student_fees WHERE student_id = ? ORDER BY academic_year ASC",
      [req.params.studentId]
    );
    res.json(rows);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;

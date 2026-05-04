require("dotenv").config();
const pool = require("./utils/db");
const bcrypt = require("bcryptjs");

const username = process.env.ADMIN_USERNAME || "admin";
const password = process.env.ADMIN_PASSWORD || "admin123";

async function initAdmin() {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const [rows] = await pool.query("SELECT * FROM admins WHERE username = ?", [username]);
    const existingAdmin = rows[0];

    if (existingAdmin) {
      console.log("ℹ️ Admin already exists, updating password...");
      await pool.query("UPDATE admins SET password = ? WHERE id = ?", [hashedPassword, existingAdmin.id]);
      console.log("✨ Admin password updated successfully!");
    } else {
      console.log("ℹ️ Creating new admin user...");
      await pool.query("INSERT INTO admins (username, password) VALUES (?, ?)", [username, hashedPassword]);
      console.log("✨ Admin user created successfully!");
    }
    process.exit(0);
  } catch (err) {
    console.error("❌ Error in initAdmin script:", err.message);
    process.exit(1);
  }
}

initAdmin();

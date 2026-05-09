const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: './backend/.env' });

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

async function resetAdmin() {
    try {
        const username = "admin";
        const password = "admin123";
        const hashedPassword = await bcrypt.hash(password, 10);
        
        console.log("Resetting admin to admin/admin123...");
        
        // Check if admin exists
        const [rows] = await pool.query("SELECT * FROM admins WHERE username = ?", [username]);
        if (rows.length > 0) {
            await pool.query("UPDATE admins SET password = ? WHERE username = ?", [hashedPassword, username]);
            console.log("✅ Admin password updated.");
        } else {
            await pool.query("INSERT INTO admins (username, password) VALUES (?, ?)", [username, hashedPassword]);
            console.log("✅ Admin user created.");
        }
        process.exit(0);
    } catch (err) {
        console.error("❌ Error:", err.message);
        process.exit(1);
    }
}

resetAdmin();

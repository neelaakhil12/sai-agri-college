const mysql = require('mysql2/promise');
require('dotenv').config({ path: './backend/.env' });

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

async function describeHero() {
    try {
        const [rows] = await pool.query("DESCRIBE hero");
        console.log("Hero table schema:", rows);
        process.exit(0);
    } catch (err) {
        console.error("Error:", err.message);
        process.exit(1);
    }
}

describeHero();

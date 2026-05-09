const mysql = require('mysql2/promise');

async function addHostelColumns() {
    const connectionConfig = {
        host: '193.203.184.84',
        user: process.env.DB_USER || 'u244113830_admin',
        password: process.env.DB_PASSWORD || 'Srisaicollege@123',
        database: process.env.DB_NAME || 'u244113830_college',
        port: 3306
    };

    let pool;
    try {
        pool = await mysql.createConnection(connectionConfig);
        console.log("✅ Connected to Database.");
    } catch (err) {
        console.error("❌ Connection Failed:", err.message);
        return;
    }

    try {
        await pool.query(`ALTER TABLE student_fees ADD COLUMN hostel_total_fee DECIMAL(10, 2) DEFAULT 0`);
        await pool.query(`ALTER TABLE student_fees ADD COLUMN hostel_fee_paid DECIMAL(10, 2) DEFAULT 0`);
        await pool.query(`ALTER TABLE student_fees ADD COLUMN hostel_due_amount DECIMAL(10, 2) DEFAULT 0`);
        console.log("✅ Added hostel fee columns to student_fees table.");
    } catch (err) {
        if (err.code === 'ER_DUP_FIELDNAME') {
            console.log("⚠️ Hostel columns already exist.");
        } else {
            console.error("❌ Error adding columns:", err.message);
        }
    }

    console.log("🎉 ALTER COMPLETE!");
    await pool.end();
}

addHostelColumns();

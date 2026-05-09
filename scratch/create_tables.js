const mysql = require('mysql2/promise');

async function createMissingTables() {
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
        await pool.query(`
            CREATE TABLE IF NOT EXISTS student_fees (
                id INT AUTO_INCREMENT PRIMARY KEY,
                student_id INT,
                academic_year VARCHAR(255),
                total_fee DECIMAL(10, 2) DEFAULT 0,
                fee_paid DECIMAL(10, 2) DEFAULT 0,
                due_amount DECIMAL(10, 2) DEFAULT 0,
                status VARCHAR(50) DEFAULT 'Pending',
                last_payment_date DATE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
            )
        `);
        console.log("✅ Created student_fees table.");
    } catch (err) {
        console.error("❌ Error creating student_fees:", err.message);
    }

    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS qualifications (
                id INT AUTO_INCREMENT PRIMARY KEY,
                student_id INT,
                examination VARCHAR(255),
                board_university VARCHAR(255),
                year_of_passing VARCHAR(50),
                percentage_cgpa VARCHAR(50),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
            )
        `);
        console.log("✅ Created qualifications table.");
    } catch (err) {
        console.error("❌ Error creating qualifications:", err.message);
    }

    console.log("🎉 TABLE CREATION COMPLETE!");
    await pool.end();
}

createMissingTables();

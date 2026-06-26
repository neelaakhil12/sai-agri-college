const mysql = require('mysql2/promise');
require('dotenv').config();

async function runMigration() {
    // 1. Local Database migration
    try {
        const localConn = await mysql.createConnection({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || '',
            database: process.env.DB_NAME || 'srisai_db',
            port: process.env.DB_PORT || 3306
        });
        console.log("🔌 Connected to Local DB.");
        await localConn.query(`ALTER TABLE student_fees ADD COLUMN travelling_fee DECIMAL(10,2) DEFAULT 0`);
        console.log("✅ Added travelling_fee column to Local DB.");
        await localConn.end();
    } catch (err) {
        if (err.code === 'ER_DUP_FIELDNAME') {
            console.log("⚠️ travelling_fee column already exists in Local DB.");
        } else {
            console.error("❌ Local DB Migration Error:", err.message);
        }
    }

    // 2. Hostinger Database migration
    try {
        const hostingerConn = await mysql.createConnection({
            host: '193.203.184.84',
            user: 'u244113830_admin',
            password: 'Srisaicollege@123',
            database: 'u244113830_college',
            port: 3306
        });
        console.log("🔌 Connected to Hostinger DB.");
        await hostingerConn.query(`ALTER TABLE student_fees ADD COLUMN travelling_fee DECIMAL(10,2) DEFAULT 0`);
        console.log("✅ Added travelling_fee column to Hostinger DB.");
        await hostingerConn.end();
    } catch (err) {
        if (err.code === 'ER_DUP_FIELDNAME') {
            console.log("⚠️ travelling_fee column already exists in Hostinger DB.");
        } else {
            console.error("❌ Hostinger DB Migration Error:", err.message);
        }
    }

    console.log("🎉 Migration process completed.");
}

runMigration().catch(err => {
    console.error("Fatal error during migration:", err);
});

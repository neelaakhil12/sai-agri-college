const mysql = require('mysql2/promise');
require('dotenv').config({ path: '../backend/.env' });

async function alterTable() {
    const connectionConfig = {
        host: '193.203.184.84',
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT || 3306
    };

    let pool;
    try {
        pool = await mysql.createConnection(connectionConfig);
        console.log("✅ Connected to Database.");
    } catch (err) {
        console.error("❌ Connection Failed:", err.message);
        return;
    }

    const columnsToAdd = [
        "father_name VARCHAR(255)",
        "mother_name VARCHAR(255)",
        "inter_type VARCHAR(255)",
        "dob DATE",
        "gender VARCHAR(50)",
        "admission_type VARCHAR(255)",
        "medium VARCHAR(255)",
        "nationality VARCHAR(255)",
        "religion VARCHAR(255)",
        "door_no VARCHAR(255)",
        "village VARCHAR(255)",
        "mandal VARCHAR(255)",
        "pin VARCHAR(50)",
        "district VARCHAR(255)",
        "mobile2 VARCHAR(20)",
        "residence_phone VARCHAR(20)",
        "email_personal VARCHAR(255)",
        "reference VARCHAR(255)",
        "current_year VARCHAR(255)"
    ];

    for (const col of columnsToAdd) {
        const colName = col.split(' ')[0];
        try {
            await pool.query(`ALTER TABLE students ADD COLUMN ${col}`);
            console.log(`✅ Added column ${colName}`);
        } catch (err) {
            if (err.code === 'ER_DUP_FIELDNAME') {
                console.log(`⚠️ Column ${colName} already exists, skipping.`);
            } else {
                console.error(`❌ Error adding ${colName}:`, err.message);
            }
        }
    }

    console.log("🎉 ALTER COMPLETE!");
    await pool.end();
}

alterTable();

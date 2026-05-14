const mysql = require('mysql2/promise');

async function checkStudentsTable() {
    const conn = await mysql.createConnection({
        host: '193.203.184.84',
        user: 'u244113830_admin',
        password: 'Srisaicollege@123',
        database: 'u244113830_college',
        port: 3306
    });

    console.log("✅ Connected to Hostinger DB.");

    try {
        const [rows] = await conn.query(`DESCRIBE students`);
        console.log("\n📋 students table columns:");
        rows.forEach(r => console.log(`  - ${r.Field} (${r.Type})`));
    } catch (err) {
        console.error("❌ Error describing students table:", err.message);
    }

    await conn.end();
}

checkStudentsTable().catch(err => {
    console.error("Fatal error:", err.message);
    process.exit(1);
});

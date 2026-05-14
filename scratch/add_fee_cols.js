const mysql = require('mysql2/promise');

async function addFeeColumns() {
    const conn = await mysql.createConnection({
        host: '193.203.184.84',
        user: 'u244113830_admin',
        password: 'Srisaicollege@123',
        database: 'u244113830_college',
        port: 3306
    });

    console.log("✅ Connected to Hostinger DB.");

    const columns = [
        { name: 'committed_fee',  sql: `ALTER TABLE student_fees ADD COLUMN committed_fee  DECIMAL(10,2) DEFAULT 0` },
        { name: 'admission_fee',  sql: `ALTER TABLE student_fees ADD COLUMN admission_fee  DECIMAL(10,2) DEFAULT 0` },
        { name: 'practical_fee',  sql: `ALTER TABLE student_fees ADD COLUMN practical_fee  DECIMAL(10,2) DEFAULT 0` },
        { name: 'hostel_fee',     sql: `ALTER TABLE student_fees ADD COLUMN hostel_fee     DECIMAL(10,2) DEFAULT 0` },
        { name: 'paid_amount',    sql: `ALTER TABLE student_fees ADD COLUMN paid_amount    DECIMAL(10,2) DEFAULT 0` },
        { name: 'payment_status', sql: `ALTER TABLE student_fees ADD COLUMN payment_status VARCHAR(50)   DEFAULT 'Pending'` },
        { name: 'last_payment_date', sql: `ALTER TABLE student_fees ADD COLUMN last_payment_date DATE NULL` },
    ];

    for (const col of columns) {
        try {
            await conn.query(col.sql);
            console.log(`✅ Added column: ${col.name}`);
        } catch (err) {
            if (err.code === 'ER_DUP_FIELDNAME') {
                console.log(`⚠️  Column already exists: ${col.name}`);
            } else {
                console.error(`❌ Error adding ${col.name}:`, err.message);
            }
        }
    }

    // Verify final structure
    const [rows] = await conn.query(`DESCRIBE student_fees`);
    console.log("\n📋 Final student_fees columns:");
    rows.forEach(r => console.log(`  - ${r.Field} (${r.Type}, default: ${r.Default})`));

    await conn.end();
    console.log("\n🎉 Migration complete!");
}

addFeeColumns().catch(err => {
    console.error("Fatal error:", err.message);
    process.exit(1);
});

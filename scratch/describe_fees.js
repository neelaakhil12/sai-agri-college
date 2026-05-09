const mysql = require('mysql2/promise');

async function describeTable() {
    const connectionConfig = {
        host: '193.203.184.84',
        user: 'u244113830_admin',
        password: 'Srisaicollege@123',
        database: 'u244113830_college',
        port: 3306
    };

    let pool;
    try {
        pool = await mysql.createConnection(connectionConfig);
        console.log("✅ Connected to Database.");
        const [rows] = await pool.query('DESCRIBE student_fees');
        console.log(JSON.stringify(rows, null, 2));
    } catch (err) {
        console.error("❌ Error:", err.message);
    } finally {
        if (pool) await pool.end();
    }
}

describeTable();

const mysql = require('mysql2/promise');
require('dotenv').config();

async function updateTable() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });

    try {
        console.log('Adding reset token columns...');
        await connection.query(`
            ALTER TABLE students 
            ADD COLUMN reset_token VARCHAR(255) NULL,
            ADD COLUMN reset_token_expiry DATETIME NULL
        `);
        console.log('Successfully added columns.');
    } catch (err) {
        if (err.code === 'ER_DUP_COLUMN_NAME') {
            console.log('Columns already exist.');
        } else {
            console.error('Error updating table:', err);
        }
    } finally {
        await connection.end();
    }
}

updateTable();

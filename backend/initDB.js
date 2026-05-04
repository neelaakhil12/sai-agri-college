const mysql = require('mysql2/promise');
require('dotenv').config({ path: './backend/.env' });

async function initDB() {
    console.log("🚀 Starting Database Initialization for Hostinger...");
    
    const connectionConfig = {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT || 3306
    };

    let pool;
    try {
        pool = await mysql.createConnection(connectionConfig);
        console.log("✅ Connected to Hostinger MySQL Database.");
    } catch (err) {
        console.error("❌ Connection Failed:", err.message);
        console.log("\nTIP: Ensure your current IP is whitelisted in Hostinger -> Remote MySQL.");
        return;
    }

    const tables = {
        admins: `
            CREATE TABLE IF NOT EXISTS admins (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(255) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `,
        hero: `
            CREATE TABLE IF NOT EXISTS hero (
                id INT AUTO_INCREMENT PRIMARY KEY,
                tag VARCHAR(255),
                h1 TEXT,
                motto TEXT,
                description TEXT,
                btn1_label VARCHAR(255),
                btn1_href VARCHAR(255),
                btn2_label VARCHAR(255),
                btn2_href VARCHAR(255),
                bg_gradient VARCHAR(255),
                image VARCHAR(255),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `,
        students: `
            CREATE TABLE IF NOT EXISTS students (
                id INT AUTO_INCREMENT PRIMARY KEY,
                student_name VARCHAR(255),
                roll_no VARCHAR(255),
                course_applied VARCHAR(255),
                academic_enrolled_year VARCHAR(255),
                mobile1 VARCHAR(20),
                branch VARCHAR(255),
                photo VARCHAR(255),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `,
        faculty: `
            CREATE TABLE IF NOT EXISTS faculty (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255),
                designation VARCHAR(255),
                department VARCHAR(255),
                image VARCHAR(255),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `,
        courses: `
            CREATE TABLE IF NOT EXISTS courses (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255),
                duration VARCHAR(255),
                description TEXT,
                image VARCHAR(255),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `,
        ranks: `
            CREATE TABLE IF NOT EXISTS ranks (
                id INT AUTO_INCREMENT PRIMARY KEY,
                student_name VARCHAR(255),
                rank VARCHAR(255),
                exam VARCHAR(255),
                image VARCHAR(255),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `,
        stories: `
            CREATE TABLE IF NOT EXISTS stories (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255),
                description TEXT,
                image VARCHAR(255),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `,
        testimonials: `
            CREATE TABLE IF NOT EXISTS testimonials (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255),
                role VARCHAR(255),
                content TEXT,
                image VARCHAR(255),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `,
        gallery: `
            CREATE TABLE IF NOT EXISTS gallery (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255),
                category VARCHAR(255),
                image VARCHAR(255),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `,
        enquiries: `
            CREATE TABLE IF NOT EXISTS enquiries (
                id INT AUTO_INCREMENT PRIMARY KEY,
                studentName VARCHAR(255),
                parentName VARCHAR(255),
                mobile VARCHAR(20),
                stream VARCHAR(255),
                batch VARCHAR(255),
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `
    };

    for (const [name, query] of Object.entries(tables)) {
        try {
            await pool.query(query);
            console.log(`✅ Table '${name}' is ready.`);
        } catch (err) {
            console.error(`❌ Error creating table '${name}':`, err.message);
        }
    }

    console.log("\n🎉 Database schema is fully initialized!");
    await pool.end();
}

initDB();

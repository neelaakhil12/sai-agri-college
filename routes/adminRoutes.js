const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const pool = require("../utils/db");
const bcrypt = require("bcryptjs");

// Login admin
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  const cleanUser = username.trim().toLowerCase();
  const cleanPass = password.trim();

  try {
    try {
      // 1. Check against DB
      const [rows] = await pool.query("SELECT * FROM admins WHERE username = ?", [cleanUser]);
      const admin = rows[0];

      if (admin) {
        const isMatch = await bcrypt.compare(cleanPass, admin.password);
        if (isMatch) {
            const secret = process.env.JWT_SECRET || "srisai_secret_key_123";
            const token = jwt.sign({ id: admin.id }, secret, { expiresIn: "24h" });
           res.cookie("token", token, { 
             httpOnly: true, 
             secure: process.env.NODE_ENV === "production", 
             sameSite: "Lax", 
             path: "/",
             maxAge: 24 * 60 * 60 * 1000 // 24 hours
           });
           return res.json({ message: "Login successful", token });
        }
      }
    } catch (dbErr) {
      console.error("Database connection failed, falling back to ENV:", dbErr.message);
    }

    // 2. Fallback to ENV (if DB fails or user not in DB)
    const envUser = (process.env.ADMIN_USERNAME || "admin").trim().toLowerCase();
    const envPass = (process.env.ADMIN_PASSWORD || "admin123").trim();

    if (cleanUser === envUser && cleanPass === envPass) {
       console.log("✅ Admin login successful via ENV fallback");
       const secret = process.env.JWT_SECRET || "srisai_secret_key_123";
       const token = jwt.sign({ id: "admin-env" }, secret, { expiresIn: "24h" });
       res.cookie("token", token, { 
         httpOnly: true, 
         secure: process.env.NODE_ENV === "production", 
         sameSite: "Lax", 
         path: "/",
         maxAge: 24 * 60 * 60 * 1000
       });
       return res.json({ message: "Login successful", token });
    }

    console.log(`❌ Login failed for user: ${cleanUser}. Expected: ${envUser}`);
    return res.status(401).json({ message: "Invalid credentials" });
  } catch (err) {
    console.error("Login verification error:", err);
    return res.status(500).json({ message: "Server error during login" });
  }
});


// Logout admin
router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out" });
});

// Auth check
router.get("/auth", (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ authenticated: false });

  try {
    jwt.verify(token, process.env.JWT_SECRET || "srisai_secret_key_123");
    res.json({ authenticated: true });
  } catch (err) {
    res.status(401).json({ authenticated: false });
  }
});

// Middleware for admin auth
const authenticate = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Unauthorized" });
  try {
    const secret = process.env.JWT_SECRET || "srisai_secret_key_123";
    const decoded = jwt.verify(token, secret);
    req.adminId = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

// Get site settings (Public - for registration fee)
router.get("/settings/public", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT setting_key, setting_value FROM site_settings");
    const settings = {};
    rows.forEach(r => settings[r.setting_key] = r.setting_value);
    res.json(settings);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch settings" });
  }
});

// Get all site settings (Admin)
router.get("/settings", authenticate, async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM site_settings");
    const settings = {};
    rows.forEach(r => settings[r.setting_key] = r.setting_value);
    res.json(settings);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch settings" });
  }
});

// Update site setting (Admin)
router.post("/settings", authenticate, async (req, res) => {
  const { key, value } = req.body;
  try {
    await pool.query(
      "INSERT INTO site_settings (setting_key, setting_value) VALUES (?, ?) ON DUPLICATE KEY UPDATE setting_value = ?",
      [key, value, value]
    );
    res.json({ message: "Setting updated" });
  } catch (err) {
    res.status(500).json({ message: "Failed to update setting" });
  }
});

// Get registration fields (Public)
router.get("/registration-fields", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM registration_fields WHERE is_active = 1 ORDER BY sort_order ASC");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch fields" });
  }
});

// Admin: Get all fields (including inactive)
router.get("/admin/registration-fields", authenticate, async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM registration_fields ORDER BY sort_order ASC");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch fields" });
  }
});

// Admin: Save/Update fields
router.post("/registration-fields", authenticate, async (req, res) => {
  const { fields } = req.body;
  try {
    for (const f of fields) {
      if (f.id) {
        await pool.query(
          "UPDATE registration_fields SET field_label = ?, field_type = ?, is_required = ?, is_active = ?, sort_order = ? WHERE id = ?",
          [f.field_label, f.field_type, f.is_required, f.is_active, f.sort_order, f.id]
        );
      } else {
        await pool.query(
          "INSERT INTO registration_fields (field_name, field_label, field_type, is_required, sort_order) VALUES (?, ?, ?, ?, ?)",
          [f.field_name, f.field_label, f.field_type, f.is_required, f.sort_order]
        );
      }
    }
    res.json({ message: "Registration fields updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to update fields" });
  }
});

// Admin: Delete field
router.delete("/registration-fields/:id", authenticate, async (req, res) => {
  try {
    await pool.query("DELETE FROM registration_fields WHERE id = ?", [req.params.id]);
    res.json({ message: "Field deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete field" });
  }
});

module.exports = router;


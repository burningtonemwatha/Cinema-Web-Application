const express = require('express');
const router = express.Router();
const { pool } = require('../server');
const bcrypt = require('bcrypt');

// Register Route
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!pool) {
      return res.status(500).json({ error: "Database connection not initialized" });
    }

    const [existingUser] = await pool.query("SELECT * FROM users WHERE username = ?", [username]);
    if (existingUser.length > 0) {
      return res.status(400).json({ error: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query("INSERT INTO users (username, password) VALUES (?, ?)", [username, hashedPassword]);
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!pool) {
      return res.status(500).json({ error: "Database connection not initialized" });
    }

    const [rows] = await pool.query("SELECT * FROM users WHERE username = ?", [username]);

    if (rows.length === 0) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // ✅ Store user ID in session
    req.session.userId = user.id;
    console.log("User logged in, session userId:", req.session.userId);

    res.json({ message: "Login successful", userId: user.id });

  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Logout Route
router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: "Logout failed" });
    }
    res.json({ message: "Logged out successfully" });
  });
});

module.exports = router;

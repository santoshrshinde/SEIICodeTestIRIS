const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jwt-simple');
const router = express.Router();
const db = require('./../db/db');

const secretKey = 'santoshloveshinnu'; // You can store this in an environment variable.

// User registration
router.post('/register', (req, res) => {
  const { username, password, email, address } = req.body;
  try {
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) return res.status(500).json({ error: err.message });
      const query = 'INSERT INTO users (username, password, hashed_password, email, address) VALUES (?, ?, ?, ?, ?)';
      db.query(query, [username, password, hashedPassword, email, address], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'User registered successfully' });
      });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
  // res.status(500).json({ error: error });
});

// User authentication (login)
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);
  const query = 'SELECT * FROM users WHERE username = ?';
  db.query(query, [username], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: 'User not found', success: false });

    bcrypt.compare(password, results[0].hashed_password, (err, isMatch) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' ,success: false});

      const payload = { user_id: results[0].id, username: results[0].username };
      const token = jwt.encode(payload, secretKey);
      res.status(200).json({ message: 'Login successful',success: true, token, user_id: results[0].user_id });
    });
  });
});

// Fetch user data by user ID
router.get('/:id', (req, res) => {
  const userId = req.params.id;
  const query = 'SELECT username, email, address FROM users WHERE user_id = ?';
  db.query(query, [userId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(results[0]);
  });
});

module.exports = router;

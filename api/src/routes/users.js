const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jwt-simple');
const router = express.Router();
const db = require('./../db/db');

const secretKey = 'your_jwt_secret_key'; // You can store this in an environment variable.

// User registration
router.post('/register', (req, res) => {
  const { username, password, email, address } = req.body;
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) return res.status(500).json({ error: err.message });

    const query = 'INSERT INTO users (username, password, email, address) VALUES (?, ?, ?, ?)';
    db.query(query, [username, hashedPassword, email, address], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: 'User registered successfully' });
    });
  });
});

// User authentication (login)
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const query = 'SELECT * FROM users WHERE username = ?';
  db.query(query, [username], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: 'User not found' });

    const user = results[0];
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

      const payload = { user_id: user.id, username: user.username };
      const token = jwt.encode(payload, secretKey);
      res.status(200).json({ message: 'Login successful', token });
    });
  });
});

module.exports = router;

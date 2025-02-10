const express = require('express');
const router = express.Router();
const db = require('./../db/db');

// Add to cart
router.post('/add', (req, res) => {
  const { user_id, product_id, quantity } = req.body;
  const query = 'INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)';
  db.query(query, [user_id, product_id, quantity], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Product added to cart' });
  });
});

module.exports = router;

const express = require('express');
const router = express.Router();
const db = require('./../db/db');

// Add to wishlist
router.post('/add', (req, res) => {
  const { user_id, product_id } = req.body;
  const query = 'INSERT INTO wishlist (user_id, product_id) VALUES (?, ?)';
  db.query(query, [user_id, product_id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Product added to wishlist' });
  });
});

module.exports = router;

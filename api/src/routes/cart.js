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


router.post('/all', (req, res) => {
  const query = `SELECT 
                p.name, 
                p.description, 
                p.price, 
                p.imagepath, 
                c.cart_id, 
                c.user_id, 
                c.quantity,
                c.product_id
            FROM 
                products p
            JOIN 
                cart c ON p.product_id = c.product_id
            WHERE c.user_id = ?`;
  db.query(query, [req.body.user_id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'cart items', data: result });
  });
});
router.post('/delete', (req, res) => {
  console.log(req.body.user_id, req.body.cart_id);
  const query = `DELETE FROM cart
            WHERE user_id = ? AND cart_id = ? AND product_id = ?`;
  db.query(query, [req.body.user_id, req.body.cart_id, req.body.product_id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'deleted from cart'});
  });
  // db.commit();
});

module.exports = router;

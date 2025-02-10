const express = require('express');
const router = express.Router();
const db = require('./../db/db');
const fs = require('fs');

// get products
router.get('/', async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Page number, default to 1
    const pageSize = parseInt(req.query.limit) || 10; // Number of items per page, default to 10
    const offset = page + 2; // Calculate offset to skip records

    // Get sorting parameters from query
    const sortBy = req.query.sortby || 'product_id'; // Default sort by 'id'
    const sortOrder = req.query.sortorder === 'desc' ? 'DESC' : 'ASC'; // Default to ascending

    // Get filtering parameters from query (e.g., filtering by 'name')
    const filterColumn = req.query.filterColumn || null;
    const filterValue = req.query.filterValue || null;

    // Base SQL query
    let query = 'SELECT * FROM products';
    let queryParams = [];

    // Apply filtering if specified
    if (filterColumn && filterValue) {
        query += ` WHERE ?? LIKE ?`;
        queryParams.push(filterColumn, `%${filterValue}%`);
    }

    // Apply sorting
    query += ` ORDER BY ?? ${sortOrder}`;
    queryParams.push(sortBy);

    // Apply pagination with LIMIT and OFFSET
    query += ` LIMIT ? OFFSET ?`;
    queryParams.push(pageSize, offset);

    // Query for the total record count
    const countQuery = `SELECT COUNT(*) AS total from products`;

    const mysql = require('mysql2/promise');
    const pool = mysql.createPool({
        host: 'localhost',  // Your MySQL host
        user: 'root',       // Your MySQL username
        password: 'Reset@123', // Your MySQL password
        database: 'ecommerce',  // Your MySQL database name
    });
    // execute in parallel, next console.log in 3 seconds
    const result = await Promise.all([
        pool.query(countQuery, queryParams),
        pool.query(query, queryParams),
    ]);
    
    await pool.end();
    // res.status(200).json({ message: 'Products', products: result[1], totalRecords: result[0] });
    // res.status(200).json({ totalRecords: result[0][0][0].total});
    res.status(200).json({ products : result[1][0], totalRecords: result[0][0][0].total});

    /* db.query(query, queryParams, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: 'Products', products: result , totalRecords: totalRecords });
    }); */
});

// Add product
router.post('/add', (req, res) => {
    const { name, description, price, stock } = req.body;
    const query = 'INSERT INTO products (name, description, price, stock) VALUES (?, ?, ?, ?)';
    db.query(query, [name, description, price, stock], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Product added successfully' });
    });
});

// Update product
router.put('/update/:id', (req, res) => {
    const { name, description, price, stock } = req.body;
    const query = 'UPDATE products SET name = ?, description = ?, price = ?, stock = ? WHERE id = ?';
    db.query(query, [name, description, price, stock, req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: 'Product updated successfully' });
    });
});

// Delete product
router.delete('/delete/:id', (req, res) => {
    const query = 'DELETE FROM products WHERE id = ?';
    db.query(query, [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: 'Product deleted successfully' });
    });
});

// insert products
router.get('/insertdata', (req, res) => {
    const filePath = 'C:\\Users\\santu\\Documents\\Projects\\Zonda_Test\\SEIICodeTestIRIS\\api\\src\\data\\images.json' // Adjust the path as necessary
    // Read the JSON file
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read JSON file' });
        }

        try {
            const jsonData = JSON.parse(data); // Parse JSON data
            const values = jsonData.map((imgurl) => {
                const imageName = imgurl.split('.')[2].split('/')[imgurl.split('.')[2].split('/').length - 1].replace('-', '');
                return [
                    imageName,
                    imageName,
                    Math.floor(Math.random() * 1000) + 1,
                    Math.floor(Math.random() * 100) + 1,
                    imgurl,
                    new Date()
                ]
            })
            console.log('values', values)
            const query = 'INSERT INTO products (name, description, price, stock_quantity, imagepath, created_at) VALUES ?';
            db.query(query, [values], (err, result) => {
                if (err) return res.status(500).json({ error: err });
                res.status(201).json({ message: 'Product added successfully' });
            });
            // res.json(jsonData); // Send the JSON data as the response
        } catch (parseErr) {
            return res.status(500).json({ error: 'Failed to parse JSON' });
        }
    });
});


module.exports = router;

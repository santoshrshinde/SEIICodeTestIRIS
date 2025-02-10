const mysql = require('mysql2');
// Create a single connection to MySQL database
const connection = mysql.createConnection({
    host: 'localhost',  // Your MySQL host
    user: 'root',       // Your MySQL username
    password: 'Reset@123', // Your MySQL password
    database: 'ecommerce',  // Your MySQL database name
});

// Test the MySQL connection
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL as id ' + connection.threadId);
});

module.exports = connection;
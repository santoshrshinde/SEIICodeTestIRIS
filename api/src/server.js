const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const productRoutes = require('./routes/products');
const cartRoutes = require('./routes/cart');
const wishlistRoutes = require('./routes/wishlist');
const userRoutes = require('./routes/users');
const verifyToken = require('./middleware/auth');

const cors = require('cors');
const port = 3000;

app.use(cors({
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200
}))

app.use(bodyParser.json());

// Routes
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/users', userRoutes);

// Example protected route
app.get('/api/protected', verifyToken, (req, res) => {
  res.json({ message: 'This is a protected route' });
});

app.listen(port, () => {
  console.log('Server running on port 3000');
});

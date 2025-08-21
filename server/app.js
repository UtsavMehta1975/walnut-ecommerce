const express = require('express');
const cors = require('cors');

const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const orderRoutes = require('./routes/orderRoutes');
const authRoutes = require('./routes/authRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');

const app = express();

// 🛡️ Enable CORS for frontend access
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000', // Frontend origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// 🔧 Parse incoming JSON
app.use(express.json());

// 🐛 Optional: Log requests for debugging
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
});

// 🏠 Root route for healthcheck
app.get('/', (req, res) => {
  res.json({ 
    message: '🌰 Walnut E-commerce API is running!',
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
});

// 📊 API Routes
app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/categories', categoryRoutes);
app.use('/analytics', analyticsRoutes);

const userRoutes = require('./routes/userRoutes');
app.use('/users', userRoutes);

module.exports = app;

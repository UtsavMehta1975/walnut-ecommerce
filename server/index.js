// Load environment variables
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');

// Create Express app
const app = express();

// Enable CORS
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Parse JSON
app.use(express.json());

// Healthcheck route - responds immediately
app.get('/', (req, res) => {
  res.json({
    message: '🌰 Walnut E-commerce API is running!',
    status: 'healthy',
    timestamp: new Date().toISOString(),
    database: sequelize.authenticate ? 'connecting' : 'error',
    env: {
      DB_HOST: process.env.DB_HOST || 'not set',
      DB_USER: process.env.DB_USER || 'not set', 
      DB_NAME: process.env.DB_NAME || 'not set',
      NODE_ENV: process.env.NODE_ENV || 'not set'
    }
  });
});

// Load routes
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const userRoutes = require('./routes/userRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');

// Mount routes
app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/categories', categoryRoutes);
app.use('/users', userRoutes);
app.use('/analytics', analyticsRoutes);

// Load models and associations
const Product = require('./models/Product');
const Category = require('./models/Category');
const Order = require('./models/Order');
const OrderItem = require('./models/OrderItem');
const User = require('./models/User');

// Set up associations
Order.hasMany(OrderItem, { foreignKey: 'orderId' });
OrderItem.belongsTo(Order, { foreignKey: 'orderId' });
Product.hasMany(OrderItem, { foreignKey: 'productId' });
OrderItem.belongsTo(Product, { foreignKey: 'productId' });

// Start server immediately for healthcheck
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`🌰 Walnut server running on port ${PORT}`);
  console.log('🔍 Environment Variables:');
  console.log('DB_HOST:', process.env.DB_HOST);
  console.log('DB_USER:', process.env.DB_USER);
  console.log('DB_NAME:', process.env.DB_NAME);
  console.log('NODE_ENV:', process.env.NODE_ENV);
});

// Connect to database in background (non-blocking)
async function connectDatabase() {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.');
    
    await sequelize.sync({ force: false, alter: true });
    console.log('✅ Database models synced successfully.');
    
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    console.log('🔄 App will continue running without database connection.');
  }
}

// Start database connection after server is running
setTimeout(connectDatabase, 1000);

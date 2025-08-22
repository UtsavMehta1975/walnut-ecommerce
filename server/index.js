// Load environment variables
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');

// Create Express app
const app = express();

// Enable CORS with multiple origins
const allowedOrigins = [
  'http://localhost:3000',
  'https://walnut-ecommerce-frontend122.vercel.app',
  'https://walnut-ecommerce-frontend1.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Parse JSON
app.use(express.json());

// Healthcheck route - responds immediately
app.get('/', (req, res) => {
  // Mask the password in MYSQL_URL for security
  let maskedUrl = 'not set';
  if (process.env.MYSQL_URL) {
    try {
      const url = new URL(process.env.MYSQL_URL);
      maskedUrl = `${url.protocol}//${url.username}:****@${url.hostname}:${url.port}${url.pathname}`;
    } catch (e) {
      maskedUrl = 'SET (invalid format)';
    }
  }
  
  res.json({
    message: '🌰 Walnut E-commerce API is running!',
    status: 'healthy',
    timestamp: new Date().toISOString(),
    database: 'connecting',
    env: {
      MYSQL_URL: maskedUrl,
      DB_HOST: process.env.DB_HOST || 'not set',
      DB_USER: process.env.DB_USER || 'not set', 
      DB_NAME: process.env.DB_NAME || 'not set',
      NODE_ENV: process.env.NODE_ENV || 'not set',
      PORT: process.env.PORT || 'not set'
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
  console.log('🔍 Environment Variables Debug:');
  console.log('MYSQL_URL:', process.env.MYSQL_URL ? 'SET' : 'UNDEFINED');
  
  // Show masked MYSQL_URL for debugging
  if (process.env.MYSQL_URL) {
    try {
      const url = new URL(process.env.MYSQL_URL);
      console.log('   Host:', url.hostname);
      console.log('   Port:', url.port);
      console.log('   Database:', url.pathname.substring(1));
      console.log('   User:', url.username);
    } catch (e) {
      console.log('   MYSQL_URL format error:', e.message);
    }
  }
  
  console.log('DB_HOST:', process.env.DB_HOST || 'UNDEFINED');
  console.log('DB_USER:', process.env.DB_USER || 'UNDEFINED');
  console.log('DB_NAME:', process.env.DB_NAME || 'UNDEFINED');
  console.log('DB_PASSWORD:', process.env.DB_PASSWORD ? 'SET' : 'UNDEFINED');
  console.log('NODE_ENV:', process.env.NODE_ENV || 'UNDEFINED');
  console.log('CORS_ORIGIN:', process.env.CORS_ORIGIN || 'UNDEFINED');

  // Check if we have database credentials
  if (!process.env.MYSQL_URL && (!process.env.DB_HOST || !process.env.DB_USER || !process.env.DB_NAME)) {
    console.log('⚠️  WARNING: Database environment variables are missing!');
    console.log('   Please set MYSQL_URL or DB_HOST/USER/NAME in Railway Variables.');
  }
});

// Connect to database in background (non-blocking)
async function connectDatabase() {
  try {
    console.log('🔗 Attempting database connection...');

    if (process.env.MYSQL_URL) {
      console.log('   Using MYSQL_URL connection');
      try {
        const url = new URL(process.env.MYSQL_URL);
        console.log('   Connecting to:', `${url.hostname}:${url.port}`);
      } catch (e) {
        console.log('   MYSQL_URL parsing error:', e.message);
      }
    } else {
      console.log('   Host:', process.env.DB_HOST);
      console.log('   User:', process.env.DB_USER);
      console.log('   Database:', process.env.DB_NAME);
    }

    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.');

    await sequelize.sync({ force: false, alter: true });
    console.log('✅ Database models synced successfully.');

  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    console.log('🔄 App will continue running without database connection.');
    console.log('   Please check your Railway environment variables.');

    // Additional error details
    if (error.code) {
      console.log('   Error code:', error.code);
    }
    if (error.errno) {
      console.log('   Error number:', error.errno);
    }
  }
}

// Start database connection after server is running
setTimeout(connectDatabase, 1000);

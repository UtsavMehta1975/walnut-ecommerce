const express = require('express');
const cors = require('cors');

// Create a basic Express app for healthcheck
const app = express();

// Enable CORS
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Parse JSON
app.use(express.json());

// Healthcheck route
app.get('/', (req, res) => {
  res.json({ 
    message: '🌰 Walnut E-commerce API is running!',
    status: 'healthy',
    timestamp: new Date().toISOString(),
    env: {
      DB_HOST: process.env.DB_HOST || 'not set',
      DB_USER: process.env.DB_USER || 'not set',
      DB_NAME: process.env.DB_NAME || 'not set',
      NODE_ENV: process.env.NODE_ENV || 'not set'
    }
  });
});

// Start the server immediately for healthcheck
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🌰 Walnut server running on port ${PORT}`);
  console.log('🔍 Environment Variables:');
  console.log('DB_HOST:', process.env.DB_HOST);
  console.log('DB_USER:', process.env.DB_USER);
  console.log('DB_NAME:', process.env.DB_NAME);
  console.log('NODE_ENV:', process.env.NODE_ENV);
});

// Try to connect to database in background
setTimeout(async () => {
  try {
    const sequelize = require('./config/database');
    
    // Test database connection
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.');
    
    // Sync models
    await sequelize.sync({ force: false, alter: true });
    console.log('✅ Database models synced successfully.');
    
    // Load the full app
    const fullApp = require('./app');
    
    // Add all routes from the main app
    app.use('/auth', fullApp._router.stack.find(layer => layer.route && layer.route.path === '/auth')?.route || (req, res) => res.status(404).json({ error: 'Auth routes not loaded' }));
    app.use('/products', fullApp._router.stack.find(layer => layer.route && layer.route.path === '/products')?.route || (req, res) => res.status(404).json({ error: 'Product routes not loaded' }));
    app.use('/orders', fullApp._router.stack.find(layer => layer.route && layer.route.path === '/orders')?.route || (req, res) => res.status(404).json({ error: 'Order routes not loaded' }));
    app.use('/categories', fullApp._router.stack.find(layer => layer.route && layer.route.path === '/categories')?.route || (req, res) => res.status(404).json({ error: 'Category routes not loaded' }));
    app.use('/users', fullApp._router.stack.find(layer => layer.route && layer.route.path === '/users')?.route || (req, res) => res.status(404).json({ error: 'User routes not loaded' }));
    
    console.log('✅ Full application loaded successfully.');
    
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    console.log('🔄 App will continue running without database connection.');
  }
}, 2000); // Wait 2 seconds before trying database connection

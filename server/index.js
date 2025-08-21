// Load environment variables (dotenv will be ignored if no .env file exists)
require('dotenv').config();
const app = require('./app');
const sequelize = require('./config/database');

// Debug: Log environment variables (remove in production)
console.log('🔍 Environment Variables Debug:');
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_NAME:', process.env.DB_NAME);
console.log('NODE_ENV:', process.env.NODE_ENV);

// 📊 Swagger UI
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// 🧩 Models
const Product = require('./models/Product');
const Category = require('./models/Category');
const Order = require('./models/Order');
const OrderItem = require('./models/OrderItem');
const User = require('./models/User');

// 🔗 Associations
Order.hasMany(OrderItem, { foreignKey: 'orderId' });
OrderItem.belongsTo(Order, { foreignKey: 'orderId' });

Product.hasMany(OrderItem, { foreignKey: 'productId' });
OrderItem.belongsTo(Product, { foreignKey: 'productId' });

// 🛡️ Safe Sync: No force, no alter
sequelize.sync({ force: false, alter: true })
  .then(() => {
    console.log('🌰 Walnut DB synced without altering schema');
    app.listen(process.env.PORT || 5000, () => {
      console.log(`🌰 Walnut server running on port ${process.env.PORT || 5000}`);
      console.log(`📚 Swagger UI available at http://localhost:${process.env.PORT || 5000}/docs`);
    });
  })
  .catch(err => {
    console.error('❌ DB sync error:', err);
  });

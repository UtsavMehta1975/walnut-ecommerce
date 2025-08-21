const { Sequelize } = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.MYSQL_URL) {
  // Use Railway's MYSQL_URL for production
  console.log('🔧 Using MYSQL_URL for database connection');
  
  try {
    const url = new URL(process.env.MYSQL_URL);
    console.log('   Parsed URL - Host:', url.hostname, 'Port:', url.port, 'Database:', url.pathname.substring(1));
    
    sequelize = new Sequelize(process.env.MYSQL_URL, {
      dialect: 'mysql',
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      },
      logging: console.log, // Enable SQL logging for debugging
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
    });
  } catch (error) {
    console.error('❌ Error parsing MYSQL_URL:', error.message);
    throw error;
  }
} else {
  // Fallback to individual variables for local development
  console.log('🔧 Using individual database variables for local development');
  
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      dialect: 'mysql',
      logging: console.log
    }
  );
}

module.exports = sequelize;

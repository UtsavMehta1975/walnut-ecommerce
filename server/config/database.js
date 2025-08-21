const { Sequelize } = require('sequelize');
require('dotenv').config();

let sequelize;

// Check if we have direct database variables (preferred for Railway)
if (process.env.DB_HOST && process.env.DB_USER && process.env.DB_NAME) {
  console.log('🔧 Using direct database variables for Railway connection');
  console.log('   Host:', process.env.DB_HOST);
  console.log('   User:', process.env.DB_USER);
  console.log('   Database:', process.env.DB_NAME);
  console.log('   Port:', process.env.DB_PORT || 3306);
  
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT || 3306,
      dialect: 'mysql',
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      },
      logging: console.log,
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
    }
  );
} else if (process.env.MYSQL_URL) {
  // Fallback to MYSQL_URL if direct variables not available
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
      logging: console.log,
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
  // Local development fallback
  console.log('🔧 Using local development database configuration');
  
  sequelize = new Sequelize(
    process.env.DB_NAME || 'walnut_db',
    process.env.DB_USER || 'root',
    process.env.DB_PASSWORD || '',
    {
      host: process.env.DB_HOST || 'localhost',
      dialect: 'mysql',
      logging: console.log
    }
  );
}

module.exports = sequelize;

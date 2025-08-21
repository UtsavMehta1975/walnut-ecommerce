const { Sequelize } = require('sequelize');
require('dotenv').config();

// Railway provides these environment variables
const config = {
  host: process.env.DB_HOST || process.env.MYSQLHOST || 'localhost',
  port: process.env.DB_PORT || process.env.MYSQLPORT || 3306,
  username: process.env.DB_USER || process.env.MYSQLUSER || 'root',
  password: process.env.DB_PASSWORD || process.env.MYSQLPASSWORD || '',
  database: process.env.DB_NAME || process.env.MYSQLDATABASE || 'railway',
  dialect: 'mysql',
  logging: console.log, // Enable logging for debugging
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
};

// If MYSQL_URL is provided, use it instead
if (process.env.MYSQL_URL) {
  const sequelize = new Sequelize(process.env.MYSQL_URL, {
    dialect: 'mysql',
    logging: console.log,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  });
  module.exports = sequelize;
} else {
  const sequelize = new Sequelize(config);
  module.exports = sequelize;
}

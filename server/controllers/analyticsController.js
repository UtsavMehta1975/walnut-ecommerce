const sequelize = require('../config/database');


const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');
const Product = require('../models/Product');
// Total Sales
exports.getTotalSales = async (req, res) => {
  try {
    const orders = await Order.findAll({ attributes: ['totalAmount'] });

    const totalSales = orders.reduce((sum, order) => {
      return sum + parseFloat(order.totalAmount || 0);
    }, 0);

    res.json({ totalSales });
  } catch (error) {
    console.error('Error fetching total sales:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Total Orders
exports.getTotalOrders = async (req, res) => {
  try {
    const count = await Order.count();
    res.json({ totalOrders: count });
  } catch (error) {
    console.error('Error fetching total orders:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


exports.getTopProducts = async (req, res) => {
  try {
    const topProducts = await OrderItem.findAll({
      attributes: [
        'productId',
        [sequelize.fn('SUM', sequelize.col('quantity')), 'totalSold']
      ],
      include: {
        model: Product,
        attributes: ['id', 'name', 'price']
      },
      group: ['productId', 'Product.id'],
      order: [[sequelize.fn('SUM', sequelize.col('quantity')), 'DESC']],
      limit: 5 // Change this to return more or fewer products
    });

    res.json(topProducts);
  } catch (error) {
    console.error('Error fetching top products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

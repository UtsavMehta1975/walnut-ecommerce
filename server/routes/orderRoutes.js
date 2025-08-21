const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// 🛒 Create a new order (requires authentication)
router.post('/', authMiddleware, orderController.createOrder);

// 📦 Get all orders (admin only)
router.get('/', authMiddleware, roleMiddleware('admin'), orderController.getOrders);

// 🚚 Update order status (admin only)
router.put('/:id/status', authMiddleware, roleMiddleware('admin'), orderController.updateOrderStatus);

module.exports = router;

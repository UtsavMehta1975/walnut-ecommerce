const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');

/**
 * @swagger
 * tags:
 *   name: Analytics
 *   description: Business insights and performance metrics
 */

/**
 * @swagger
 * /analytics/total-sales:
 *   get:
 *     summary: Get total sales amount
 *     tags: [Analytics]
 *     responses:
 *       200:
 *         description: Total sales retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalSales:
 *                   type: number
 *                   example: 12500.75
 */
router.get('/total-sales', analyticsController.getTotalSales);

/**
 * @swagger
 * /analytics/total-orders:
 *   get:
 *     summary: Get total number of orders
 *     tags: [Analytics]
 *     responses:
 *       200:
 *         description: Total orders retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalOrders:
 *                   type: integer
 *                   example: 320
 */
router.get('/total-orders', analyticsController.getTotalOrders);

/**
 * @swagger
 * /analytics/top-products:
 *   get:
 *     summary: Get top-selling products
 *     tags: [Analytics]
 *     responses:
 *       200:
 *         description: Top products retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   productId:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   totalSold:
 *                     type: integer
 */
router.get('/top-products', analyticsController.getTopProducts);

module.exports = router;

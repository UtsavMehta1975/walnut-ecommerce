const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const verifyToken = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const upload = require('../middleware/uploadMiddleware');

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Endpoints for managing products and inventory
 */

/**
 * @swagger
 * /upload:
 *   post:
 *     summary: Upload product image (admin only)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Image uploaded successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (not admin)
 */
router.post('/upload', verifyToken, roleMiddleware('admin'), upload.single('image'), productController.uploadImage);

/**
 * @swagger
 * /search:
 *   get:
 *     summary: Search products
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         description: Search query
 *     responses:
 *       200:
 *         description: Search results
 */
router.get('/search', productController.searchProducts);

/**
 * @swagger
 * /{id}/stock:
 *   put:
 *     summary: Update product stock (admin only)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               stock:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Stock updated
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.put('/:id/stock', verifyToken, roleMiddleware('admin'), productController.updateStock);

/**
 * @swagger
 * /inventory:
 *   get:
 *     summary: View inventory
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Inventory list
 */
router.get('/inventory', productController.getInventory);

/**
 * @swagger
 * /:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of products
 */
router.get('/', productController.getAllProducts);

/**
 * @swagger
 * /category/{id}:
 *   get:
 *     summary: Get products by category
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Category ID
 *     responses:
 *       200:
 *         description: Products in category
 */
router.get('/category/:id', productController.getProductsByCategory);

/**
 * @swagger
 * /{id}:
 *   get:
 *     summary: Get product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product details
 *       404:
 *         description: Product not found
 */
router.get('/:id', productController.getProductById);

/**
 * @swagger
 * /:
 *   post:
 *     summary: Create a new product (admin only)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               categoryId:
 *                 type: integer
 *               stock:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Product created
 */
router.post('/', verifyToken, roleMiddleware('admin'), productController.createProduct);

/**
 * @swagger
 * /{id}:
 *   put:
 *     summary: Update product (admin only)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Product updated
 */
router.put('/:id', verifyToken, roleMiddleware('admin'), productController.updateProduct);

/**
 * @swagger
 * /{id}:
 *   delete:
 *     summary: Delete product (admin only)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Product deleted
 */
router.delete('/:id', verifyToken, roleMiddleware('admin'), productController.deleteProduct);

module.exports = router;

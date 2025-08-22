const { Op } = require('sequelize');
const fs = require('fs');
const path = require('path');
const Product = require('../models/Product');
const Category = require('../models/Category');

exports.updateStock = async (req, res) => {
  try {
    const { id } = req.params;
    const { inStock } = req.body;

    if (typeof inStock !== 'number' || inStock < 0) {
      return res.status(400).json({ error: 'Invalid stock value' });
    }

    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    product.inStock = inStock;
    await product.save();

    res.json({ message: 'Stock updated', product });
  } catch (error) {
    console.error('Error updating stock:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getInventory = async (req, res) => {
  try {
    const products = await Product.findAll({
      attributes: ['id', 'name', 'price', 'inStock']
    });

    res.json({ inventory: products });
  } catch (error) {
    console.error('Error fetching inventory:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const { name, categoryId, inStock, limit, offset, order } = req.query;

    const whereClause = {};
    const orderClause = [];

    if (name) whereClause.name = { [Op.like]: `%${name}%` };
    if (categoryId) whereClause.categoryId = categoryId;
    if (inStock !== undefined) whereClause.inStock = inStock === 'true';

    if (order) {
      const [field, direction] = order.split('_');
      orderClause.push([field, direction.toUpperCase()]);
    }

    const products = await Product.findAll({
      where: whereClause,
      include: {
        model: Category,
        attributes: ['name', 'description'],
      },
      limit: limit ? parseInt(limit) : undefined,
      offset: offset ? parseInt(offset) : undefined,
      order: orderClause.length ? orderClause : undefined,
    });

    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

exports.searchProducts = async (req, res) => {
  try {
    const { name, minPrice, maxPrice, categoryId } = req.query;
    const where = {};

    if (name) where.name = { [Op.like]: `%${name}%` };
    if (minPrice) where.price = { [Op.gte]: parseFloat(minPrice) };
    if (maxPrice) where.price = { ...where.price, [Op.lte]: parseFloat(maxPrice) };
    if (categoryId) where.categoryId = categoryId;

    const products = await Product.findAll({ where });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Search failed', details: err.message });
  }
};



exports.createProduct = async (req, res) => {
  try {
    const { name, price, categoryId, imageUrl, stock, inStock, description } = req.body;

    if (!name || price <= 0 || !categoryId || stock === undefined || stock < 0) {
      return res.status(400).json({ error: 'Invalid product data' });
    }

    const category = await Category.findByPk(categoryId);
    if (!category) {
      return res.status(400).json({ error: `Category ID ${categoryId} does not exist` });
    }

    const product = await Product.create({
      name,
      price,
      categoryId,
      imageUrl: imageUrl || null,
      stock: parseInt(stock),
      inStock: inStock !== undefined ? Boolean(inStock) : stock > 0,
      description: description || '',
    });

    res.status(201).json(product);
  } catch (err) {
    console.error('Error creating product:', err);
    res.status(500).json({ error: 'Failed to create product', details: err.message });
  }
};


exports.getProductsByCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const products = await Product.findAll({ where: { categoryId: id } });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products by category' });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id, {
      include: {
        model: Category,
        attributes: ['name', 'description'],
      },
    });
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.json(product);
  } catch (err) {
    console.error('Error fetching product:', err);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, categoryId, imageUrl } = req.body;

    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    // Delete old image if new one is provided
    if (imageUrl && product.imageUrl && product.imageUrl !== imageUrl) {
      const oldPath = path.join(__dirname, '..', product.imageUrl);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }

    await product.update({ name, price, categoryId, imageUrl });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update product' });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    // Delete image file
    if (product.imageUrl) {
      const filePath = path.join(__dirname, '..', product.imageUrl);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    await product.destroy();
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
};

exports.uploadImage = async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No image uploaded' });

  const imageUrl = `/uploads/${req.file.filename}`;
  res.json({ imageUrl });
};

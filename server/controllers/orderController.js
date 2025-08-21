const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');
const Product = require('../models/Product');

exports.createOrder = async (req, res) => {
  try {
    const { items } = req.body;
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Order must contain at least one item' });
    }

    console.log('📦 Incoming order items:', items);

    const order = await Order.create({ userId: req.user.id, totalAmount: 0 });


    let total = 0;
    const orderItems = [];

    for (const item of items) {
      const { productId, quantity } = item;

      const product = await Product.findByPk(productId);
      if (!product) {
        console.warn(`⚠️ Product not found: ${productId}`);
        return res.status(404).json({ error: `Product ${productId} not found` });
      }

      if (product.stock < quantity) {
        console.warn(`🚫 Insufficient stock for product ${productId}`);
        return res.status(400).json({ error: `Insufficient stock for product ${product.name}` });
      }

      const itemTotal = product.price * quantity;
      total += itemTotal;

      const orderItem = await OrderItem.create({
        orderId: order.id,
        productId,
        quantity,
        price: product.price,
      });

      orderItems.push(orderItem);

      // Decrement stock
      product.stock -= quantity;
      await product.save();
      console.log(`📉 Stock updated for product ${product.id}: ${product.stock}`);
    }

    order.totalAmount = total;
    await order.save();

    console.log('✅ Order created:', order.toJSON());
    res.status(201).json({
      message: 'Order created successfully',
      order: {
        id: order.id,
        totalAmount: order.totalAmount,
        status: order.status,
        items: orderItems,
      },
    });
  } catch (err) {
    console.error('❌ Order creation error:', err);
    res.status(500).json({ error: 'Order creation failed' });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: {
        model: OrderItem,
        include: {
          model: Product,
          attributes: ['id', 'name', 'price', 'categoryId'],
        },
      },
    });

    res.json(orders);
  } catch (err) {
    console.error('❌ Fetch orders error:', err);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status value' });
    }

    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Restore stock if cancelling
    if (order.status !== 'cancelled' && status === 'cancelled') {
      const items = await OrderItem.findAll({ where: { orderId: order.id } });

      for (const item of items) {
        const product = await Product.findByPk(item.productId);
        if (product) {
          product.stock += item.quantity;
          await product.save();
          console.log(`🔁 Restored stock for product ${product.id}: ${product.stock}`);
        }
      }
    }

    order.status = status;
    await order.save();

    res.json({ message: 'Order status updated', order });
  } catch (err) {
    console.error('❌ Status update error:', err);
    res.status(500).json({ error: 'Failed to update order status' });
  }
};

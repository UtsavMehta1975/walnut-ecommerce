const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { Op } = require('sequelize');

exports.login = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // 🔍 Find user by email or username
    const user = await User.findOne({
      where: {
        [Op.or]: [
          username ? { username } : null,
          email ? { email } : null
        ].filter(Boolean)
      }
    });

    if (!user) return res.status(401).json({ error: 'User not found' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: 'Invalid password' });

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET || 'your-super-secret-jwt-key-here', {
      expiresIn: '1d'
    });

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('❌ Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getMe = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ['id', 'username', 'name', 'email', 'role']
    });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch user info' });
  }
};

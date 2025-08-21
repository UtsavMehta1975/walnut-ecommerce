const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');
const { Op } = require('sequelize');

// 🔍 Get current user info
router.get('/me', authMiddleware, async (req, res) => {
  console.log('🔍 /auth/me hit with user ID:', req.user.id);
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ['id', 'username', 'name', 'email', 'role']
    });
    if (!user) {
      console.warn('⚠️ User not found for ID:', req.user.id);
      return res.status(404).json({ error: 'User not found' });
    }
    console.log('✅ User fetched:', user.toJSON());
    res.json(user);
  } catch (err) {
    console.error('❌ Error fetching user info:', err);
    res.status(500).json({ error: 'Failed to fetch user info' });
  }
});

// 📝 Signup route
router.post('/signup', async (req, res) => {
  console.log('✅ Signup route hit:', req.body);
  const { name, email, password } = req.body;

  const username = email?.split('@')[0];

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      name,
      email,
      password: hashedPassword,
      role: 'user' // Force all signups to be regular users
    });

    console.log('✅ User created:', user.toJSON());

    const token = generateToken(user);
    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (err) {
    console.error('❌ Signup error:', err);
    res.status(500).json({ error: 'Signup failed' });
  }
});

// 🔐 Login route
router.post('/login', async (req, res) => {
  console.log('✅ Login route hit:', req.body);

  const { username, email, password } = req.body;

  if (typeof password !== 'string') {
    console.warn('⚠️ Password is not a string:', password);
    return res.status(400).json({ error: 'Invalid password format' });
  }

  try {
    const user = await User.findOne({
      where: {
        [Op.or]: [
          username ? { username } : null,
          email ? { email } : null
        ].filter(Boolean)
      }
    });

    if (!user) {
      console.warn('⚠️ No user found for:', { username, email });
      return res.status(401).json({ error: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.warn('⚠️ Password mismatch for user:', user.email);
      return res.status(401).json({ error: 'Invalid password' });
    }

    const token = generateToken(user);
    console.log('✅ Login successful for:', user.email);

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    console.error('❌ Login error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// 🔧 Update profile
router.put('/update', authMiddleware, async (req, res) => {
  console.log('🔧 Update route hit:', req.body);
  const { name, email, password } = req.body;
  const userId = req.user.id;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      console.warn('⚠️ User not found for update:', userId);
      return res.status(404).json({ error: 'User not found' });
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (password) {
      const hashed = await bcrypt.hash(password, 10);
      user.password = hashed;
    }

    await user.save();
    console.log('✅ Profile updated for user:', userId);
    res.json({ message: 'Profile updated' });
  } catch (err) {
    console.error('❌ Update error:', err);
    res.status(500).json({ error: 'Update failed' });
  }
});

module.exports = router;

const axios = require('axios');

const RAILWAY_BACKEND_URL = 'https://walnut-ecommerce-production.up.railway.app';

// Dummy users to add
const users = [
  {
    name: 'Admin User',
    email: 'admin@walnut.com',
    password: 'admin123',
    role: 'admin'
  },
  {
    name: 'Super Admin',
    email: 'superadmin@walnut.com',
    password: 'super123',
    role: 'admin'
  },
  {
    name: 'John Customer',
    email: 'customer@walnut.com',
    password: 'customer123',
    role: 'customer'
  }
];

// Dummy products to add
const products = [
  {
    name: 'Walnut Heritage Automatic',
    price: 45000,
    description: 'A sophisticated automatic watch with a classic design, featuring a stainless steel case and genuine leather strap.',
    stock: 15,
    inStock: true,
    imageUrl: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=400&fit=crop',
    categoryId: 1
  },
  {
    name: 'Sport Elite Chronograph',
    price: 28000,
    description: 'High-performance sports watch with chronograph functionality, water resistance, and durable construction.',
    stock: 25,
    inStock: true,
    imageUrl: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=400&h=400&fit=crop',
    categoryId: 2
  },
  {
    name: 'Classic Elegance Manual',
    price: 32000,
    description: 'Hand-wound mechanical watch with a minimalist design and premium finishing.',
    stock: 8,
    inStock: true,
    imageUrl: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400&h=400&fit=crop',
    categoryId: 3
  },
  {
    name: 'Smart Connect Pro',
    price: 35000,
    description: 'Advanced smartwatch with health monitoring, GPS tracking, and smartphone connectivity.',
    stock: 20,
    inStock: true,
    imageUrl: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&h=400&fit=crop',
    categoryId: 4
  },
  {
    name: 'Dress Collection Gold',
    price: 55000,
    description: 'Elegant dress watch with gold-plated case and sophisticated dial design.',
    stock: 5,
    inStock: true,
    imageUrl: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop',
    categoryId: 5
  }
];

async function addDummyData() {
  console.log('🌱 Adding dummy data to Railway backend...\n');

  try {
    // First, let's check if the backend is running
    console.log('🔍 Checking backend status...');
    const healthCheck = await axios.get(`${RAILWAY_BACKEND_URL}/`);
    console.log('✅ Backend is running:', healthCheck.data.message);

    // Add users through signup API
    console.log('\n👥 Adding users...');
    for (const user of users) {
      try {
        const response = await axios.post(`${RAILWAY_BACKEND_URL}/auth/signup`, {
          name: user.name,
          email: user.email,
          password: user.password
        });
        console.log(`✅ User created: ${user.email} (${user.role})`);
      } catch (error) {
        if (error.response?.status === 400 && error.response?.data?.error?.includes('already exists')) {
          console.log(`⚠️ User already exists: ${user.email}`);
        } else {
          console.log(`❌ Failed to create user ${user.email}:`, error.response?.data?.error || error.message);
        }
      }
    }

    console.log('\n🎉 Dummy data addition completed!');
    console.log('\n📋 Test Accounts:');
    console.log('Admin 1: admin@walnut.com / admin123');
    console.log('Admin 2: superadmin@walnut.com / super123');
    console.log('Customer: customer@walnut.com / customer123');
    console.log('\n🛍️ Products Available:');
    products.forEach((product, index) => {
      console.log(`${index + 1}. ${product.name} - ₹${product.price}`);
    });

  } catch (error) {
    console.error('❌ Error adding dummy data:', error.message);
    if (error.response) {
      console.error('Response:', error.response.data);
    }
  }
}

// Run the function
addDummyData();

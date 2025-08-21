const Category = require('./models/Category');
const Product = require('./models/Product');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const sequelize = require('./config/database');

const categories = [
  {
    name: 'Luxury Watches',
    description: 'Premium timepieces with exceptional craftsmanship and materials'
  },
  {
    name: 'Sport Watches',
    description: 'High-performance watches designed for athletes and outdoor activities'
  },
  {
    name: 'Classic Watches',
    description: 'Timeless designs that never go out of style'
  },
  {
    name: 'Smart Watches',
    description: 'Modern watches with advanced technology and connectivity'
  },
  {
    name: 'Dress Watches',
    description: 'Elegant watches perfect for formal occasions'
  }
];

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

// Sample users for testing - 2 admins, 1 customer
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

async function seedData() {
  try {
    // Sync database
    await sequelize.sync({ force: false });

    console.log('🌱 Starting to seed data...');

    // Create categories
    for (const category of categories) {
      await Category.findOrCreate({
        where: { name: category.name },
        defaults: category
      });
    }
    console.log('✅ Categories seeded successfully');

    // Create products
    for (const product of products) {
      await Product.findOrCreate({
        where: { name: product.name },
        defaults: product
      });
    }
    console.log('✅ Products seeded successfully');

    // Create users
    for (const user of users) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      await User.findOrCreate({
        where: { email: user.email },
        defaults: {
          name: user.name,
          email: user.email,
          password: hashedPassword,
          role: user.role
        }
      });
    }
    console.log('✅ Users seeded successfully');

    console.log('🎉 Database seeding completed!');
    console.log('\n📋 Test Accounts:');
    console.log('Admin 1: admin@walnut.com / admin123');
    console.log('Admin 2: superadmin@walnut.com / super123');
    console.log('Customer: customer@walnut.com / customer123');
    console.log('\n🛍️ Products Available:');
    products.forEach((product, index) => {
      console.log(`${index + 1}. ${product.name} - ₹${product.price}`);
    });
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  }
}

// Run the seed function
seedData();





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
  },
  {
    name: 'Luxury Diamond Edition',
    price: 120000,
    description: 'Ultra-premium watch with diamond accents and platinum case.',
    stock: 2,
    inStock: true,
    imageUrl: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=400&h=400&fit=crop',
    categoryId: 1
  },
  {
    name: 'Adventure Explorer',
    price: 22000,
    description: 'Rugged outdoor watch with compass, altimeter, and extreme durability.',
    stock: 12,
    inStock: true,
    imageUrl: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=400&fit=crop',
    categoryId: 2
  },
  {
    name: 'Vintage Collection',
    price: 38000,
    description: 'Retro-inspired watch with vintage aesthetics and modern reliability.',
    stock: 10,
    inStock: true,
    imageUrl: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400&h=400&fit=crop',
    categoryId: 3
  },
  {
    name: 'Fitness Tracker Plus',
    price: 18000,
    description: 'Smart fitness watch with heart rate monitoring and workout tracking.',
    stock: 30,
    inStock: true,
    imageUrl: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&h=400&fit=crop',
    categoryId: 4
  },
  {
    name: 'Executive Business',
    price: 42000,
    description: 'Professional business watch with understated elegance and precision.',
    stock: 15,
    inStock: true,
    imageUrl: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop',
    categoryId: 5
  },
  {
    name: 'Limited Edition Artisan',
    price: 85000,
    description: 'Handcrafted limited edition watch with unique dial design and premium materials.',
    stock: 3,
    inStock: true,
    imageUrl: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=400&fit=crop',
    categoryId: 1
  },
  {
    name: 'Racing Chronograph',
    price: 32000,
    description: 'High-speed chronograph designed for racing enthusiasts with tachymeter scale.',
    stock: 18,
    inStock: true,
    imageUrl: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=400&h=400&fit=crop',
    categoryId: 2
  },
  {
    name: 'Luxury Moonphase',
    price: 68000,
    description: 'Elegant moonphase watch with celestial dial and premium complications.',
    stock: 7,
    inStock: true,
    imageUrl: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=400&fit=crop',
    categoryId: 1
  },
  {
    name: 'Marine Diver Pro',
    price: 25000,
    description: 'Professional diving watch with 300m water resistance and luminous markers.',
    stock: 22,
    inStock: true,
    imageUrl: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=400&h=400&fit=crop',
    categoryId: 2
  },
  {
    name: 'Vintage Aviator',
    price: 42000,
    description: 'Classic pilot watch with large dial and leather strap for aviation enthusiasts.',
    stock: 12,
    inStock: true,
    imageUrl: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400&h=400&fit=crop',
    categoryId: 3
  },
  {
    name: 'Smart Health Monitor',
    price: 28000,
    description: 'Advanced health monitoring smartwatch with ECG and blood oxygen tracking.',
    stock: 35,
    inStock: true,
    imageUrl: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&h=400&fit=crop',
    categoryId: 4
  },
  {
    name: 'Royal Collection',
    price: 95000,
    description: 'Ultra-luxury watch with precious metals and hand-engraved dial.',
    stock: 3,
    inStock: true,
    imageUrl: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop',
    categoryId: 5
  },
  {
    name: 'Tactical Military',
    price: 18000,
    description: 'Rugged military-grade watch with night vision compatibility and GPS.',
    stock: 15,
    inStock: true,
    imageUrl: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=400&fit=crop',
    categoryId: 2
  },
  {
    name: 'Art Deco Classic',
    price: 38000,
    description: 'Art deco inspired watch with geometric patterns and vintage aesthetics.',
    stock: 9,
    inStock: true,
    imageUrl: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400&h=400&fit=crop',
    categoryId: 3
  },
  {
    name: 'Connected Lifestyle',
    price: 22000,
    description: 'Smartwatch with lifestyle tracking, music control, and mobile payments.',
    stock: 28,
    inStock: true,
    imageUrl: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&h=400&fit=crop',
    categoryId: 4
  },
  {
    name: 'Boardroom Elite',
    price: 48000,
    description: 'Executive watch designed for boardroom meetings and business presentations.',
    stock: 11,
    inStock: true,
    imageUrl: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop',
    categoryId: 5
  },
  {
    name: 'Heritage Limited',
    price: 75000,
    description: 'Limited edition heritage watch with numbered dial and certificate.',
    stock: 4,
    inStock: true,
    imageUrl: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=400&fit=crop',
    categoryId: 1
  },
  {
    name: 'Extreme Sports',
    price: 19000,
    description: 'High-impact sports watch with shock resistance and activity tracking.',
    stock: 20,
    inStock: true,
    imageUrl: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=400&h=400&fit=crop',
    categoryId: 2
  },
  {
    name: 'Retro Revival',
    price: 35000,
    description: 'Modern interpretation of classic 1960s watch design with contemporary features.',
    stock: 14,
    inStock: true,
    imageUrl: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400&h=400&fit=crop',
    categoryId: 3
  },
  {
    name: 'Tech Companion',
    price: 24000,
    description: 'Smart companion watch with voice assistant and app ecosystem integration.',
    stock: 32,
    inStock: true,
    imageUrl: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&h=400&fit=crop',
    categoryId: 4
  },
  {
    name: 'Gala Evening',
    price: 52000,
    description: 'Elegant evening watch perfect for formal events and special occasions.',
    stock: 8,
    inStock: true,
    imageUrl: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop',
    categoryId: 5
  }
];

// Sample users for testing
const users = [
  {
    name: 'Admin User',
    email: 'admin@walnut.com',
    password: 'admin123',
    role: 'admin'
  },
  {
    name: 'John Customer',
    email: 'customer@walnut.com',
    password: 'customer123',
    role: 'user'
  },
  {
    name: 'Sarah Johnson',
    email: 'sarah@walnut.com',
    password: 'sarah123',
    role: 'user'
  },
  {
    name: 'Mike Wilson',
    email: 'mike@walnut.com',
    password: 'mike123',
    role: 'user'
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
    console.log('Admin: admin@walnut.com / admin123');
    console.log('Customer: customer@walnut.com / customer123');
    console.log('Sarah: sarah@walnut.com / sarah123');
    console.log('Mike: mike@walnut.com / mike123');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  }
}

// Run the seed function
seedData();





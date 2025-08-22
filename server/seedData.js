const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Category = require('./models/Category');
const Product = require('./models/Product');

const seedData = async () => {
  try {
    // Clear existing data
    await Product.destroy({ where: {} });
    await Category.destroy({ where: {} });
    await User.destroy({ where: {} });

    // Create categories
    const categories = await Category.bulkCreate([
      {
        name: 'Luxury Watches',
        description: 'Premium timepieces from world-renowned brands'
      },
      {
        name: 'Chains',
        description: 'Elegant chains and necklaces for sophisticated style'
      },
      {
        name: 'Keychains',
        description: 'Stylish and functional keychains for everyday use'
      },
      {
        name: 'Rings',
        description: 'Exquisite rings for special occasions and daily wear'
      }
    ]);

    // Create users
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await User.bulkCreate([
      {
        username: 'admin',
        name: 'Admin User',
        email: 'admin@walnut.com',
        password: hashedPassword,
        role: 'admin'
      },
      {
        username: 'superadmin',
        name: 'Super Admin',
        email: 'superadmin@walnut.com',
        password: hashedPassword,
        role: 'admin'
      },
      {
        username: 'customer',
        name: 'John Customer',
        email: 'customer@walnut.com',
        password: hashedPassword,
        role: 'customer'
      }
    ]);

    // Luxury Watches (30 products)
    const watches = [
      {
        name: 'Rolex Submariner Date',
        price: 125000,
        description: 'Iconic dive watch with automatic movement, 300m water resistance',
        stock: 5,
        categoryId: categories[0].id,
        imageUrl: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=400&fit=crop'
      },
      {
        name: 'Omega Speedmaster Professional',
        price: 85000,
        description: 'Moonwatch with chronograph function, NASA certified',
        stock: 8,
        categoryId: categories[0].id,
        imageUrl: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=400&h=400&fit=crop'
      },
      {
        name: 'Cartier Santos',
        price: 95000,
        description: 'Aviation-inspired luxury watch with square case design',
        stock: 3,
        categoryId: categories[0].id,
        imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop'
      },
      {
        name: 'Patek Philippe Nautilus',
        price: 450000,
        description: 'Ultra-luxury sports watch with blue dial and integrated bracelet',
        stock: 2,
        categoryId: categories[0].id,
        imageUrl: 'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?w=400&h=400&fit=crop'
      },
      {
        name: 'Audemars Piguet Royal Oak',
        price: 380000,
        description: 'Revolutionary luxury sports watch with octagonal bezel',
        stock: 4,
        categoryId: categories[0].id,
        imageUrl: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=400&h=400&fit=crop'
      },
      {
        name: 'IWC Portugieser',
        price: 125000,
        description: 'Classic pilot watch with clean, elegant design',
        stock: 6,
        categoryId: categories[0].id,
        imageUrl: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=400&fit=crop'
      },
      {
        name: 'Breitling Navitimer',
        price: 95000,
        description: 'Aviation chronograph with slide rule bezel',
        stock: 7,
        categoryId: categories[0].id,
        imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop'
      },
      {
        name: 'Tag Heuer Monaco',
        price: 75000,
        description: 'Square racing chronograph with distinctive design',
        stock: 5,
        categoryId: categories[0].id,
        imageUrl: 'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?w=400&h=400&fit=crop'
      },
      {
        name: 'Hublot Big Bang',
        price: 180000,
        description: 'Modern luxury watch with fusion of materials',
        stock: 3,
        categoryId: categories[0].id,
        imageUrl: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=400&h=400&fit=crop'
      },
      {
        name: 'Panerai Luminor',
        price: 85000,
        description: 'Italian luxury dive watch with distinctive crown guard',
        stock: 4,
        categoryId: categories[0].id,
        imageUrl: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=400&fit=crop'
      },
      {
        name: 'Jaeger-LeCoultre Reverso',
        price: 95000,
        description: 'Art Deco inspired reversible watch case',
        stock: 2,
        categoryId: categories[0].id,
        imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop'
      },
      {
        name: 'Vacheron Constantin Overseas',
        price: 280000,
        description: 'Elegant sports watch with interchangeable straps',
        stock: 3,
        categoryId: categories[0].id,
        imageUrl: 'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?w=400&h=400&fit=crop'
      },
      {
        name: 'Breguet Classique',
        price: 150000,
        description: 'Traditional luxury watch with guilloché dial',
        stock: 2,
        categoryId: categories[0].id,
        imageUrl: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=400&h=400&fit=crop'
      },
      {
        name: 'A. Lange & Söhne Lange 1',
        price: 320000,
        description: 'German luxury watch with asymmetric dial design',
        stock: 1,
        categoryId: categories[0].id,
        imageUrl: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=400&fit=crop'
      },
      {
        name: 'Richard Mille RM 011',
        price: 850000,
        description: 'Ultra-lightweight luxury sports watch',
        stock: 1,
        categoryId: categories[0].id,
        imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop'
      },
      {
        name: 'Girard-Perregaux Laureato',
        price: 125000,
        description: 'Elegant sports watch with integrated bracelet',
        stock: 4,
        categoryId: categories[0].id,
        imageUrl: 'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?w=400&h=400&fit=crop'
      },
      {
        name: 'Chopard Happy Sport',
        price: 85000,
        description: 'Luxury sports watch with floating diamonds',
        stock: 3,
        categoryId: categories[0].id,
        imageUrl: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=400&h=400&fit=crop'
      },
      {
        name: 'Piaget Polo',
        price: 180000,
        description: 'Ultra-thin luxury sports watch',
        stock: 2,
        categoryId: categories[0].id,
        imageUrl: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=400&fit=crop'
      },
      {
        name: 'Blancpain Fifty Fathoms',
        price: 150000,
        description: 'Original luxury dive watch with rotating bezel',
        stock: 3,
        categoryId: categories[0].id,
        imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop'
      },
      {
        name: 'Zenith El Primero',
        price: 95000,
        description: 'High-frequency chronograph with legendary movement',
        stock: 5,
        categoryId: categories[0].id,
        imageUrl: 'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?w=400&h=400&fit=crop'
      },
      {
        name: 'Tudor Black Bay',
        price: 45000,
        description: 'Heritage dive watch with modern reliability',
        stock: 8,
        categoryId: categories[0].id,
        imageUrl: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=400&h=400&fit=crop'
      },
      {
        name: 'Longines Heritage',
        price: 35000,
        description: 'Vintage-inspired timepieces with modern technology',
        stock: 6,
        categoryId: categories[0].id,
        imageUrl: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=400&fit=crop'
      },
      {
        name: 'Hamilton Khaki Field',
        price: 8500,
        description: 'Military-inspired field watch with robust design',
        stock: 12,
        categoryId: categories[0].id,
        imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop'
      },
      {
        name: 'Seiko Prospex',
        price: 12000,
        description: 'Professional dive watch with Japanese precision',
        stock: 15,
        categoryId: categories[0].id,
        imageUrl: 'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?w=400&h=400&fit=crop'
      },
      {
        name: 'Tissot T-Touch',
        price: 18000,
        description: 'Touch-screen watch with multiple functions',
        stock: 10,
        categoryId: categories[0].id,
        imageUrl: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=400&h=400&fit=crop'
      },
      {
        name: 'Mido Baroncelli',
        price: 22000,
        description: 'Elegant dress watch with Swiss precision',
        stock: 7,
        categoryId: categories[0].id,
        imageUrl: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=400&fit=crop'
      },
      {
        name: 'Certina DS Action',
        price: 15000,
        description: 'Sports watch with double security technology',
        stock: 9,
        categoryId: categories[0].id,
        imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop'
      },
      {
        name: 'Oris Aquis',
        price: 28000,
        description: 'Professional dive watch with water resistance',
        stock: 6,
        categoryId: categories[0].id,
        imageUrl: 'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?w=400&h=400&fit=crop'
      },
      {
        name: 'Sinn 556',
        price: 18000,
        description: 'German engineering with tool watch functionality',
        stock: 4,
        categoryId: categories[0].id,
        imageUrl: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=400&h=400&fit=crop'
      },
      {
        name: 'Nomos Tangente',
        price: 35000,
        description: 'Bauhaus design with in-house movement',
        stock: 5,
        categoryId: categories[0].id,
        imageUrl: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=400&fit=crop'
      }
    ];

    // Chains (10 products)
    const chains = [
      {
        name: '18K Gold Cuban Link Chain',
        price: 8500,
        description: 'Premium 18K gold Cuban link chain with secure clasp',
        stock: 8,
        categoryId: categories[1].id,
        imageUrl: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop'
      },
      {
        name: 'Platinum Diamond Chain',
        price: 25000,
        description: 'Luxury platinum chain with pave diamond setting',
        stock: 3,
        categoryId: categories[1].id,
        imageUrl: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop'
      },
      {
        name: 'Sterling Silver Rope Chain',
        price: 1200,
        description: 'Classic sterling silver rope chain with lobster clasp',
        stock: 15,
        categoryId: categories[1].id,
        imageUrl: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop'
      },
      {
        name: 'White Gold Tennis Chain',
        price: 18000,
        description: 'Elegant white gold tennis chain with round diamonds',
        stock: 4,
        categoryId: categories[1].id,
        imageUrl: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop'
      },
      {
        name: 'Rose Gold Figaro Chain',
        price: 6500,
        description: 'Stylish rose gold Figaro chain with traditional pattern',
        stock: 6,
        categoryId: categories[1].id,
        imageUrl: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop'
      },
      {
        name: 'Yellow Gold Franco Chain',
        price: 7200,
        description: 'Bold yellow gold Franco chain with textured links',
        stock: 7,
        categoryId: categories[1].id,
        imageUrl: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop'
      },
      {
        name: 'White Gold Box Chain',
        price: 9500,
        description: 'Minimalist white gold box chain with clean design',
        stock: 5,
        categoryId: categories[1].id,
        imageUrl: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop'
      },
      {
        name: 'Platinum Curb Chain',
        price: 15000,
        description: 'Heavy platinum curb chain with substantial weight',
        stock: 3,
        categoryId: categories[1].id,
        imageUrl: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop'
      },
      {
        name: '18K Gold Herringbone Chain',
        price: 5800,
        description: 'Flexible 18K gold herringbone chain with smooth finish',
        stock: 9,
        categoryId: categories[1].id,
        imageUrl: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop'
      },
      {
        name: 'Sterling Silver Snake Chain',
        price: 1800,
        description: 'Unique sterling silver snake chain with textured surface',
        stock: 12,
        categoryId: categories[1].id,
        imageUrl: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop'
      }
    ];

    // Keychains (10 products)
    const keychains = [
      {
        name: 'Leather Keychain with Gold Hardware',
        price: 450,
        description: 'Premium leather keychain with gold-plated hardware',
        stock: 25,
        categoryId: categories[2].id,
        imageUrl: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop'
      },
      {
        name: 'Stainless Steel Keychain',
        price: 280,
        description: 'Durable stainless steel keychain with engraved logo',
        stock: 30,
        categoryId: categories[2].id,
        imageUrl: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop'
      },
      {
        name: 'Carbon Fiber Keychain',
        price: 380,
        description: 'Lightweight carbon fiber keychain with modern design',
        stock: 20,
        categoryId: categories[2].id,
        imageUrl: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop'
      },
      {
        name: 'Brass Keychain with Leather',
        price: 320,
        description: 'Classic brass keychain with genuine leather strap',
        stock: 18,
        categoryId: categories[2].id,
        imageUrl: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop'
      },
      {
        name: 'Aluminum Keychain with LED',
        price: 550,
        description: 'Modern aluminum keychain with built-in LED light',
        stock: 15,
        categoryId: categories[2].id,
        imageUrl: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop'
      },
      {
        name: 'Wooden Keychain with Brass',
        price: 280,
        description: 'Natural wooden keychain with brass accents',
        stock: 22,
        categoryId: categories[2].id,
        imageUrl: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop'
      },
      {
        name: 'Silicone Keychain with Metal',
        price: 180,
        description: 'Flexible silicone keychain with metal core',
        stock: 35,
        categoryId: categories[2].id,
        imageUrl: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop'
      },
      {
        name: 'Titanium Keychain',
        price: 420,
        description: 'Ultra-lightweight titanium keychain with durability',
        stock: 16,
        categoryId: categories[2].id,
        imageUrl: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop'
      },
      {
        name: 'Copper Keychain with Patina',
        price: 350,
        description: 'Aged copper keychain with natural patina finish',
        stock: 14,
        categoryId: categories[2].id,
        imageUrl: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop'
      },
      {
        name: 'Ceramic Keychain with Gold',
        price: 480,
        description: 'Premium ceramic keychain with gold-plated details',
        stock: 12,
        categoryId: categories[2].id,
        imageUrl: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop'
      }
    ];

    // Rings (10 products)
    const rings = [
      {
        name: 'Diamond Solitaire Ring',
        price: 85000,
        description: 'Classic diamond solitaire ring with 18K white gold setting',
        stock: 3,
        categoryId: categories[3].id,
        imageUrl: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop'
      },
      {
        name: 'Sapphire Engagement Ring',
        price: 45000,
        description: 'Stunning sapphire engagement ring with diamond accents',
        stock: 5,
        categoryId: categories[3].id,
        imageUrl: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop'
      },
      {
        name: 'Emerald Cut Diamond Ring',
        price: 125000,
        description: 'Elegant emerald cut diamond ring with platinum setting',
        stock: 2,
        categoryId: categories[3].id,
        imageUrl: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop'
      },
      {
        name: 'Rose Gold Wedding Band',
        price: 8500,
        description: 'Timeless rose gold wedding band with comfort fit',
        stock: 8,
        categoryId: categories[3].id,
        imageUrl: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop'
      },
      {
        name: 'Vintage Style Ring',
        price: 28000,
        description: 'Vintage-inspired ring with intricate filigree work',
        stock: 4,
        categoryId: categories[3].id,
        imageUrl: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop'
      },
      {
        name: 'Platinum Eternity Ring',
        price: 65000,
        description: 'Platinum eternity ring with full diamond pave',
        stock: 3,
        categoryId: categories[3].id,
        imageUrl: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop'
      },
      {
        name: 'Yellow Gold Signet Ring',
        price: 12000,
        description: 'Classic yellow gold signet ring with engraved design',
        stock: 6,
        categoryId: categories[3].id,
        imageUrl: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop'
      },
      {
        name: 'White Gold Cocktail Ring',
        price: 35000,
        description: 'Statement white gold cocktail ring with colored stones',
        stock: 4,
        categoryId: categories[3].id,
        imageUrl: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop'
      },
      {
        name: 'Sterling Silver Stacking Ring',
        price: 2800,
        description: 'Versatile sterling silver stacking ring set',
        stock: 15,
        categoryId: categories[3].id,
        imageUrl: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop'
      },
      {
        name: 'Titanium Wedding Ring',
        price: 1800,
        description: 'Modern titanium wedding ring with comfort fit',
        stock: 12,
        categoryId: categories[3].id,
        imageUrl: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop'
      }
    ];

    // Combine all products
    const allProducts = [...watches, ...chains, ...keychains, ...rings];

    // Create all products
    await Product.bulkCreate(allProducts);

    console.log('✅ Seed data created successfully!');
    console.log(`📊 Created ${categories.length} categories`);
    console.log(`👥 Created 3 users (2 admins, 1 customer)`);
    console.log(`🛍️ Created ${allProducts.length} products:`);
    console.log(`   - ${watches.length} Luxury Watches`);
    console.log(`   - ${chains.length} Chains`);
    console.log(`   - ${keychains.length} Keychains`);
    console.log(`   - ${rings.length} Rings`);

  } catch (error) {
    console.error('❌ Error seeding data:', error);
  }
};

module.exports = seedData;





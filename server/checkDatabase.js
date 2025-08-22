const User = require('./models/User');
const Category = require('./models/Category');
const Product = require('./models/Product');

const checkDatabase = async () => {
  try {
    console.log('🔍 Checking database state...\n');

    // Check users
    const users = await User.findAll();
    console.log(`👥 Users: ${users.length}`);
    users.forEach(user => {
      console.log(`   - ${user.name} (${user.email}) - Role: ${user.role}`);
    });

    // Check categories
    const categories = await Category.findAll();
    console.log(`\n📂 Categories: ${categories.length}`);
    categories.forEach(cat => {
      console.log(`   - ${cat.name}: ${cat.description}`);
    });

    // Check products
    const products = await Product.findAll({
      include: {
        model: Category,
        attributes: ['name']
      }
    });
    console.log(`\n🛍️ Products: ${products.length}`);
    
    if (products.length > 0) {
      console.log('\n📋 Product Details:');
      products.forEach((product, index) => {
        console.log(`   ${index + 1}. ${product.name}`);
        console.log(`      Price: ₹${product.price}`);
        console.log(`      Category: ${product.Category?.name || 'Unknown'}`);
        console.log(`      Stock: ${product.stock}`);
        console.log(`      Image: ${product.imageUrl || 'No image'}`);
        console.log(`      In Stock: ${product.inStock ? 'Yes' : 'No'}`);
        console.log('');
      });
    } else {
      console.log('   No products found in database');
    }

    console.log('✅ Database check completed!');
  } catch (error) {
    console.error('❌ Error checking database:', error);
  }
};

checkDatabase();

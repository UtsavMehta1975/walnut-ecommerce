const seedData = require('./seedData');

console.log('🌱 Running seed data on Railway database...');
console.log('This will clear existing data and create fresh products.\n');

// Run the seed function
seedData()
  .then(() => {
    console.log('\n🎉 Seed data completed successfully!');
    console.log('Your Railway database now has:');
    console.log('   - 4 Categories (Luxury Watches, Chains, Keychains, Rings)');
    console.log('   - 3 Users (2 admins, 1 customer)');
    console.log('   - 60 Products (30 watches, 10 chains, 10 keychains, 10 rings)');
    console.log('\nYou can now test the image upload functionality in the admin panel!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Error running seed data:', error);
    process.exit(1);
  });

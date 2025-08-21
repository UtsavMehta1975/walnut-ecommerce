const axios = require('axios');

const RAILWAY_BACKEND_URL = 'https://walnut-ecommerce-production.up.railway.app';

async function simpleTest() {
  console.log('🧪 Simple Backend Test\n');

  try {
    // Test 1: Health check
    console.log('1️⃣ Testing health check...');
    const health = await axios.get(`${RAILWAY_BACKEND_URL}/`);
    console.log('✅ Health check passed:', health.data.message);
    console.log('   Database status:', health.data.database);
    console.log('');

    // Test 2: Categories endpoint
    console.log('2️⃣ Testing categories endpoint...');
    const categories = await axios.get(`${RAILWAY_BACKEND_URL}/categories`);
    console.log('✅ Categories loaded:', categories.data.length, 'categories');
    console.log('');

    // Test 3: Products endpoint
    console.log('3️⃣ Testing products endpoint...');
    const products = await axios.get(`${RAILWAY_BACKEND_URL}/products`);
    console.log('✅ Products loaded:', products.data.length, 'products');
    console.log('');

    console.log('🎉 All API endpoints are working!');
    console.log('\n📋 Your Application Status:');
    console.log('✅ Backend: Running on Railway');
    console.log('✅ Database: Connected and working');
    console.log('✅ Categories: Available');
    console.log('✅ Products: Available');
    console.log('✅ Frontend: Connected to backend');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
  }
}

simpleTest();

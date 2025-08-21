const axios = require('axios');

const RAILWAY_BACKEND_URL = 'https://walnut-ecommerce-production.up.railway.app';

// Test users
const testUsers = [
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

async function checkUsers() {
  console.log('🧪 Testing user accounts...\n');

  for (const user of testUsers) {
    try {
      console.log(`🔐 Testing login for: ${user.email}`);
      const response = await axios.post(`${RAILWAY_BACKEND_URL}/auth/login`, {
        email: user.email,
        password: user.password
      });
      
      console.log(`✅ Login successful for: ${user.email}`);
      console.log(`   Role: ${response.data.user.role}`);
      console.log(`   Name: ${response.data.user.name}`);
      console.log('');
      
    } catch (error) {
      if (error.response?.status === 401) {
        console.log(`❌ Login failed for: ${user.email} - Invalid credentials`);
        console.log(`   This user might not exist yet.`);
      } else {
        console.log(`❌ Error testing ${user.email}:`, error.response?.data?.error || error.message);
      }
      console.log('');
    }
  }

  console.log('📋 User Credentials Summary:');
  console.log('=============================');
  testUsers.forEach((user, index) => {
    console.log(`${index + 1}. ${user.name}`);
    console.log(`   Email: ${user.email}`);
    console.log(`   Password: ${user.password}`);
    console.log(`   Role: ${user.role}`);
    console.log('');
  });
}

checkUsers();

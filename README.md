# ⏰ Walnut - Premium Watch Store

A modern, futuristic e-commerce platform for premium timepieces, built with React and Node.js.

## 🌟 Features

### 🛍️ **Customer Features**
- **Modern Product Catalog** - Browse premium watches with stunning visuals
- **Advanced Search & Filtering** - Find your perfect timepiece by category, price, and features
- **Shopping Cart** - Seamless cart management with quantity controls
- **Checkout Process** - Complete order placement with tax and shipping calculation
- **Order Tracking** - View order history and status updates
- **Responsive Design** - Beautiful experience on all devices

### 👨‍💼 **Admin Features**
- **User Management** - Manage customer accounts and roles
- **Product Management** - Add, edit, and remove products with image uploads
- **Order Management** - Process orders and update status
- **Analytics Dashboard** - Sales reports and business insights
- **Inventory Control** - Stock management and alerts

### 🎨 **Design Features**
- **Futuristic UI** - Glassmorphism effects and modern animations
- **Premium Aesthetics** - Luxury-focused design for watch enthusiasts
- **Smooth Interactions** - Hover effects and micro-animations
- **Dark Theme** - Elegant dark mode with gradient backgrounds
- **Mobile-First** - Responsive design optimized for all screen sizes

## 🚀 Tech Stack

### Frontend
- **React 19** - Modern React with hooks and context
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API calls
- **React Hot Toast** - Beautiful notifications
- **Day.js** - Date manipulation

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MySQL** - Relational database
- **Sequelize** - ORM for database management
- **JWT** - Authentication and authorization
- **Multer** - File upload handling
- **Swagger** - API documentation

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- MySQL database
- npm or yarn

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd walnut
   ```

2. **Install dependencies**
   ```bash
   # Install server dependencies
   cd server
   npm install

   # Install client dependencies
   cd ../client
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the server directory:
   ```env
   DB_HOST=localhost
   DB_USER=your_username
   DB_PASSWORD=your_password
   DB_NAME=Walnut_db
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRES_IN=1d
   PORT=5000
   ```

4. **Set up the database**
   ```bash
   # Create MySQL database
   CREATE DATABASE Walnut_db;
   ```

5. **Seed the database**
   ```bash
   cd server
   npm run seed
   ```

6. **Start the application**
   ```bash
   # Start the backend server
   cd server
   npm run dev

   # Start the frontend (in a new terminal)
   cd client
   npm start
   ```

## 🎯 Usage

### For Customers
1. **Register/Login** - Create an account or sign in
2. **Browse Products** - Explore the watch collection with search and filters
3. **Add to Cart** - Select watches and add them to your cart
4. **Checkout** - Complete your purchase with order confirmation
5. **Track Orders** - Monitor your order status and history

### For Administrators
1. **Access Admin Panel** - Login with admin credentials
2. **Manage Products** - Add, edit, or remove watch products
3. **Process Orders** - Update order status and manage inventory
4. **View Analytics** - Monitor sales and business metrics
5. **User Management** - Manage customer accounts

## 📱 Pages & Features

### Customer Pages
- **Store** - Main product catalog with search and filtering
- **Cart** - Shopping cart with quantity management
- **My Orders** - Order history and tracking
- **About** - Company information and story
- **Contact** - Contact form and information
- **Projects** - Special collections and custom projects

### Admin Pages
- **Dashboard** - Overview and analytics
- **Products** - Product management interface
- **Orders** - Order processing and management
- **Users** - Customer account management

## 🎨 Design System

### Color Palette
- **Primary**: Blue gradients (#3b82f6 to #1d4ed8)
- **Secondary**: Green accents (#10b981)
- **Background**: Purple gradients (#667eea to #764ba2)
- **Text**: White and light grays
- **Accents**: Gold and silver for luxury feel

### Typography
- **Headings**: Bold, large fonts for impact
- **Body**: Clean, readable text
- **Prices**: Prominent green styling
- **Buttons**: Rounded, gradient designs

### Components
- **Cards**: Glassmorphism effect with blur
- **Buttons**: Gradient backgrounds with hover effects
- **Forms**: Clean inputs with focus states
- **Navigation**: Sticky header with backdrop blur

## 🔧 API Endpoints

### Authentication
- `POST /auth/login` - User login
- `POST /auth/signup` - User registration
- `GET /auth/me` - Get current user

### Products
- `GET /products` - Get all products
- `GET /products/:id` - Get specific product
- `POST /products` - Create product (admin)
- `PUT /products/:id` - Update product (admin)
- `DELETE /products/:id` - Delete product (admin)

### Orders
- `POST /orders` - Create order
- `GET /orders` - Get all orders
- `PUT /orders/:id/status` - Update order status

### Categories
- `GET /categories` - Get all categories
- `POST /categories` - Create category (admin)

## 🚀 Deployment

### Frontend Deployment
```bash
cd client
npm run build
# Deploy the build folder to your hosting service
```

### Backend Deployment
```bash
cd server
npm install --production
# Deploy to your server (Heroku, AWS, etc.)
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Email: support@Walnut.com
- Documentation: Available at `/docs` when server is running
- Issues: Please use GitHub issues

## 🎉 Acknowledgments

- **Unsplash** - High-quality watch images
- **React Community** - Amazing ecosystem
- **Tailwind CSS** - Beautiful utility classes
- **All Contributors** - Your valuable contributions

---

**Walnut** - Where Time Meets Luxury ⏰✨






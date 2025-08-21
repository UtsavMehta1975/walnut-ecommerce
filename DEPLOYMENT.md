# 🚀 Walnut E-commerce - Free Hosting Deployment Guide

## 📋 Overview
This guide will help you deploy your Walnut e-commerce application for free using:
- **Frontend**: Vercel (React)
- **Backend**: Railway (Node.js)
- **Database**: PlanetScale (MySQL)

## 🎯 Step-by-Step Deployment

### 1. Frontend Deployment (Vercel)

#### Prerequisites:
- GitHub account
- Vercel account (free)

#### Steps:
1. **Push your code to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/walnut.git
   git push -u origin main
   ```

2. **Deploy to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub
   - Click "New Project"
   - Import your GitHub repository
   - Set root directory to `client`
   - Add environment variable: `REACT_APP_API_URL` = your backend URL
   - Deploy!

### 2. Backend Deployment (Railway)

#### Prerequisites:
- Railway account (free tier)

#### Steps:
1. **Deploy to Railway:**
   - Go to [railway.app](https://railway.app)
   - Sign up with GitHub
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your repository
   - Set root directory to `server`
   - Add environment variables (see `server/env.example`)

2. **Set Environment Variables:**
   ```
   PORT=5000
   NODE_ENV=production
   DB_HOST=your-planetscale-host
   DB_NAME=your-database-name
   DB_USER=your-database-user
   DB_PASSWORD=your-database-password
   JWT_SECRET=your-super-secret-jwt-key
   CORS_ORIGIN=https://your-frontend-domain.vercel.app
   ```

### 3. Database Setup (PlanetScale)

#### Steps:
1. **Create PlanetScale Account:**
   - Go to [planetscale.com](https://planetscale.com)
   - Sign up for free tier
   - Create new database

2. **Get Connection Details:**
   - Copy host, database name, username, and password
   - Use these in your Railway environment variables

3. **Run Migrations:**
   - Your Sequelize models will auto-sync on first deployment

## 🔧 Configuration Files

### Frontend (Vercel)
- `client/vercel.json` - Vercel configuration
- Environment variable: `REACT_APP_API_URL`

### Backend (Railway)
- `server/railway.json` - Railway configuration
- `server/env.example` - Environment variables template

## 🌐 Custom Domain (Optional)

### Vercel:
1. Go to project settings
2. Add custom domain
3. Update DNS records

### Railway:
1. Go to project settings
2. Add custom domain
3. Update DNS records

## 📊 Monitoring & Analytics

### Vercel Analytics:
- Built-in performance monitoring
- Real-time analytics
- Error tracking

### Railway Monitoring:
- Built-in logs
- Performance metrics
- Health checks

## 🔒 Security Best Practices

1. **Environment Variables:**
   - Never commit `.env` files
   - Use strong JWT secrets
   - Rotate secrets regularly

2. **CORS Configuration:**
   - Only allow your frontend domain
   - Use HTTPS in production

3. **Database Security:**
   - Use connection pooling
   - Enable SSL connections
   - Regular backups

## 🚨 Troubleshooting

### Common Issues:

1. **CORS Errors:**
   - Check CORS_ORIGIN in backend
   - Ensure frontend URL is correct

2. **Database Connection:**
   - Verify environment variables
   - Check database credentials
   - Ensure database is accessible

3. **Build Failures:**
   - Check Node.js version compatibility
   - Verify all dependencies are installed
   - Check for syntax errors

## 💰 Cost Breakdown

### Free Tier Limits:
- **Vercel**: Unlimited deployments, 100GB bandwidth
- **Railway**: $5 credit monthly (sufficient for small apps)
- **PlanetScale**: 1 database, 1 billion reads/month

### Scaling Up:
- All platforms offer affordable paid plans
- Easy to upgrade as your app grows

## 📞 Support

- **Vercel**: Excellent documentation and community
- **Railway**: Discord community and docs
- **PlanetScale**: Great documentation and support

---

**Happy Deploying! 🌰**

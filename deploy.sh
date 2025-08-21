#!/bin/bash

echo "🚀 Walnut E-commerce Deployment Script"
echo "======================================"

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📁 Initializing Git repository..."
    git init
    git add .
    git commit -m "Initial commit for deployment"
    echo "✅ Git repository initialized"
else
    echo "✅ Git repository already exists"
fi

# Check if remote origin exists
if ! git remote get-url origin > /dev/null 2>&1; then
    echo "🔗 Please add your GitHub repository as remote origin:"
    echo "   git remote add origin https://github.com/yourusername/walnut.git"
    echo "   git push -u origin main"
else
    echo "✅ Remote origin already configured"
fi

echo ""
echo "📋 Next Steps:"
echo "=============="
echo ""
echo "1. 🎯 Frontend (Vercel):"
echo "   - Go to https://vercel.com"
echo "   - Sign up with GitHub"
echo "   - Import your repository"
echo "   - Set root directory to 'client'"
echo "   - Add environment variable: REACT_APP_API_URL"
echo ""
echo "2. 🔧 Backend (Railway):"
echo "   - Go to https://railway.app"
echo "   - Sign up with GitHub"
echo "   - Deploy from GitHub repo"
echo "   - Set root directory to 'server'"
echo "   - Configure environment variables (see server/env.example)"
echo ""
echo "3. 🗄️ Database (PlanetScale):"
echo "   - Go to https://planetscale.com"
echo "   - Create free account"
echo "   - Create new database"
echo "   - Copy connection details to Railway env vars"
echo ""
echo "📖 For detailed instructions, see DEPLOYMENT.md"
echo ""
echo "�� Happy Deploying!"

#!/bin/bash

# Deployment Script for Just Peac Homes
# This script deploys both Sanity Studio and the Next.js frontend.

echo "🚀 Starting deployment process..."

# Step 1: Deploy Sanity Studio Schema
echo ""
echo "📝 Deploying Sanity Studio..."
cd studio-borui

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing Sanity Studio dependencies..."
    npm install --quiet
fi

# Deploy Sanity Studio to Sanity Cloud
echo "🌐 Deploying schema to Sanity Cloud..."
# Load token from .env and use it for deployment
export SANITY_AUTH_TOKEN=$(grep SANITY_API_TOKEN ../.env | head -1 | cut -d'=' -f2)
npm run deploy -- --yes

# Check if Sanity deployment was successful
if [ $? -eq 0 ]; then
    echo "✅ Sanity Studio deployed successfully!"
else
    echo "❌ Sanity Studio deployment failed."
    exit 1
fi

# Step 2: Deploy Next.js Frontend
echo ""
echo "📱 Deploying Next.js Frontend..."
cd ../frontend

# Ensure dependencies are up to date (quietly)
echo "📦 Installing dependencies..."
npm install --quiet

# Build the project
echo "🌐 Building project..."
npm run pages:build

# Check if build was successful
if [ -d ".vercel/output" ]; then
    echo "✅ Build successful. Deploying to Cloudflare Pages..."
    npx wrangler pages deploy .vercel/output --project-name=just-peac-homes
else
    echo "❌ Build failed or output directory not found."
    exit 1
fi

echo "✅ Deployment complete!"

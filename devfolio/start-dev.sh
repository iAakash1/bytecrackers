#!/bin/bash

# AI Deepfake Authenticity Checker - Development Startup Script
# This script starts all services for local development

set -e

echo "🚀 Starting AI Deepfake Authenticity Checker Development Environment"
echo "=================================================================="

# Check if required tools are installed
command -v node >/dev/null 2>&1 || { echo "❌ Node.js is required but not installed. Aborting." >&2; exit 1; }
command -v npm >/dev/null 2>&1 || { echo "❌ npm is required but not installed. Aborting." >&2; exit 1; }
command -v python3 >/dev/null 2>&1 || { echo "❌ Python 3 is required but not installed. Aborting." >&2; exit 1; }

echo "✅ All required tools are installed"

# Create log directory
mkdir -p logs

# Function to cleanup background processes
cleanup() {
    echo "🛑 Shutting down services..."
    jobs -p | xargs -r kill
    exit 0
}

# Set trap to cleanup on exit
trap cleanup SIGINT SIGTERM

# Start Hardhat local blockchain
echo "🔗 Starting Hardhat local blockchain..."
cd contracts
npm run node > ../logs/hardhat.log 2>&1 &
HARDHAT_PID=$!
echo "   Hardhat node PID: $HARDHAT_PID"
cd ..

# Wait for Hardhat to start
echo "⏳ Waiting for Hardhat node to start..."
sleep 5

# Deploy contracts to local network
echo "📜 Deploying smart contracts..."
cd contracts
npm run deploy:local > ../logs/deploy.log 2>&1
echo "✅ Smart contracts deployed successfully"
cd ..

# Start AI service
echo "🧠 Starting AI service..."
cd ai-service
python3 -m venv venv 2>/dev/null || true
source venv/bin/activate 2>/dev/null || true
pip install -r requirements.txt > ../logs/ai-install.log 2>&1
python app.py > ../logs/ai-service.log 2>&1 &
AI_PID=$!
echo "   AI service PID: $AI_PID"
cd ..

# Wait for AI service to start
echo "⏳ Waiting for AI service to start..."
sleep 3

# Start frontend development server
echo "💻 Starting frontend development server..."
cd frontend
npm run dev > ../logs/frontend.log 2>&1 &
FRONTEND_PID=$!
echo "   Frontend PID: $FRONTEND_PID"
cd ..

# Wait for frontend to start
echo "⏳ Waiting for frontend to start..."
sleep 5

echo ""
echo "🎉 All services are now running!"
echo "================================"
echo "📱 Frontend:        http://localhost:5173"
echo "🔗 Hardhat Node:   http://localhost:8545"
echo "🧠 AI Service:     http://localhost:5000"
echo ""
echo "📋 Logs are available in the 'logs' directory:"
echo "   - logs/hardhat.log"
echo "   - logs/deploy.log"
echo "   - logs/ai-service.log"
echo "   - logs/frontend.log"
echo ""
echo "🛑 Press Ctrl+C to stop all services"
echo ""

# Wait for all background processes
wait

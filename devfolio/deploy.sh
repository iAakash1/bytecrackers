#!/bin/bash

# AI Deepfake Authenticity Checker - Deployment Script
# This script helps deploy the full-stack application

set -e

echo "🚀 AI Deepfake Authenticity Checker Deployment Script"
echo "===================================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# Check if required tools are installed
check_dependencies() {
    print_info "Checking dependencies..."
    
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed. Please install Node.js 18+ and try again."
        exit 1
    fi
    
    if ! command -v npm &> /dev/null; then
        print_error "npm is not installed. Please install npm and try again."
        exit 1
    fi
    
    if ! command -v python3 &> /dev/null; then
        print_warning "Python 3 is not installed. AI service won't work without Python."
    fi
    
    print_status "All required dependencies are available"
}

# Install all dependencies
install_dependencies() {
    print_info "Installing dependencies..."
    
    # Install contract dependencies
    print_info "Installing contract dependencies..."
    cd contracts
    npm install
    cd ..
    
    # Install frontend dependencies
    print_info "Installing frontend dependencies..."
    cd frontend
    npm install
    cd ..
    
    # Install Python dependencies if Python is available
    if command -v python3 &> /dev/null; then
        print_info "Installing AI service dependencies..."
        cd ai-service
        pip3 install -r requirements.txt
        cd ..
    fi
    
    print_status "All dependencies installed successfully"
}

# Compile smart contracts
compile_contracts() {
    print_info "Compiling smart contracts..."
    cd contracts
    npm run compile
    cd ..
    print_status "Smart contracts compiled successfully"
}

# Build frontend
build_frontend() {
    print_info "Building frontend..."
    cd frontend
    npm run build
    cd ..
    print_status "Frontend built successfully"
}

# Start local development environment
start_dev() {
    print_info "Starting development environment..."
    
    print_info "Starting local Hardhat network..."
    cd contracts
    npm run node &
    HARDHAT_PID=$!
    cd ..
    
    print_info "Waiting for network to start..."
    sleep 5
    
    if command -v python3 &> /dev/null; then
        print_info "Starting AI service..."
        cd ai-service
        python3 app.py &
        AI_PID=$!
        cd ..
    fi
    
    print_info "Starting frontend development server..."
    cd frontend
    npm run dev &
    FRONTEND_PID=$!
    cd ..
    
    print_status "Development environment started!"
    print_info "Frontend: http://localhost:5173"
    print_info "AI Service: http://localhost:5000"
    print_info "Hardhat Network: http://localhost:8545"
    
    print_warning "Press Ctrl+C to stop all services"
    
    # Wait for user interrupt
    trap 'kill $HARDHAT_PID $AI_PID $FRONTEND_PID 2>/dev/null; exit' INT
    wait
}

# Deploy to production
deploy_production() {
    print_info "Preparing for production deployment..."
    
    # Build everything
    compile_contracts
    build_frontend
    
    print_status "Production build completed!"
    print_info "Frontend build available in: frontend/dist/"
    print_info "Contract artifacts available in: contracts/artifacts/"
    print_info "Contract types available in: contracts/typechain-types/"
    
    print_warning "Next steps for production deployment:"
    echo "1. Deploy contracts to your chosen network"
    echo "2. Update frontend environment variables with contract addresses"
    echo "3. Deploy frontend to hosting service (Vercel, Netlify, etc.)"
    echo "4. Deploy AI service to cloud platform (Railway, Heroku, etc.)"
}

# Show help
show_help() {
    echo "Usage: $0 [COMMAND]"
    echo ""
    echo "Commands:"
    echo "  install     Install all dependencies"
    echo "  compile     Compile smart contracts"
    echo "  build       Build frontend for production"
    echo "  dev         Start local development environment"
    echo "  deploy      Prepare for production deployment"
    echo "  help        Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 install && $0 dev    # Install dependencies and start development"
    echo "  $0 deploy               # Prepare for production deployment"
}

# Main script logic
main() {
    case "$1" in
        "install")
            check_dependencies
            install_dependencies
            ;;
        "compile")
            compile_contracts
            ;;
        "build")
            build_frontend
            ;;
        "dev")
            check_dependencies
            start_dev
            ;;
        "deploy")
            check_dependencies
            deploy_production
            ;;
        "help"|"--help"|"-h")
            show_help
            ;;
        "")
            print_info "AI Deepfake Authenticity Checker is ready!"
            print_info "Run '$0 help' to see available commands"
            print_info "Quick start: '$0 install && $0 dev'"
            ;;
        *)
            print_error "Unknown command: $1"
            show_help
            exit 1
            ;;
    esac
}

# Run main function with all arguments
main "$@"

#!/bin/bash

# AI Deepfake Authenticity Checker - Installation Script
# Optimized for macOS with Python 3.10.10 and Node.js LTS
# Date: 2025-06-28

set -e  # Exit on any error

echo "🚀 AI Deepfake Authenticity Checker - Installation Script"
echo "=========================================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check prerequisites
print_status "Checking prerequisites..."

# Check Node.js
if command -v node >/dev/null 2>&1; then
    NODE_VERSION=$(node --version)
    print_success "Node.js found: $NODE_VERSION"
else
    print_error "Node.js not found. Please install Node.js 18+ from https://nodejs.org/"
    exit 1
fi

# Check npm
if command -v npm >/dev/null 2>&1; then
    NPM_VERSION=$(npm --version)
    print_success "npm found: $NPM_VERSION"
else
    print_error "npm not found. Please install npm."
    exit 1
fi

# Check Python
PYTHON_CMD=""
if command -v python3.10 >/dev/null 2>&1; then
    PYTHON_CMD="python3.10"
    PYTHON_VERSION=$(python3.10 --version)
    print_success "Python 3.10 found: $PYTHON_VERSION"
elif command -v python3 >/dev/null 2>&1; then
    PYTHON_CMD="python3"
    PYTHON_VERSION=$(python3 --version)
    print_success "Python 3 found: $PYTHON_VERSION"
    if [[ $PYTHON_VERSION == *"3.10."* ]]; then
        print_success "Python 3.10.x detected - perfect for this project!"
    else
        print_warning "Python 3.10.x recommended for optimal compatibility"
    fi
else
    print_error "Python 3 not found. Please install Python 3.9+ from https://python.org/"
    exit 1
fi

# Clean previous installations
print_status "Cleaning previous installations..."
find . -name "node_modules" -type d -exec rm -rf {} + 2>/dev/null || true
find . -name "package-lock.json" -delete 2>/dev/null || true
find . -name "__pycache__" -type d -exec rm -rf {} + 2>/dev/null || true
print_success "Cleanup completed"

# Install root dependencies
print_status "Installing root dependencies..."
npm install
if [ $? -eq 0 ]; then
    print_success "Root dependencies installed"
else
    print_error "Failed to install root dependencies"
    exit 1
fi

# Install frontend dependencies
print_status "Installing frontend dependencies..."
cd frontend
npm install
if [ $? -eq 0 ]; then
    print_success "Frontend dependencies installed"
    
    # Run audit fix
    print_status "Fixing frontend security vulnerabilities..."
    npm audit fix --force
    print_success "Frontend security issues resolved"
else
    print_error "Failed to install frontend dependencies"
    exit 1
fi
cd ..

# Install contract dependencies
print_status "Installing smart contract dependencies..."
cd contracts
npm install --legacy-peer-deps
if [ $? -eq 0 ]; then
    print_success "Contract dependencies installed"
    
    # Compile contracts to verify setup
    print_status "Compiling smart contracts..."
    npx hardhat compile
    if [ $? -eq 0 ]; then
        print_success "Smart contracts compiled successfully"
    else
        print_warning "Smart contract compilation failed - check contracts later"
    fi
else
    print_error "Failed to install contract dependencies"
    exit 1
fi
cd ..

# Install Python dependencies
print_status "Installing Python dependencies..."
cd ai-service

# Upgrade pip first
print_status "Upgrading pip..."
$PYTHON_CMD -m pip install --upgrade pip

# Install requirements
print_status "Installing Python packages..."
pip3 install -r requirements.txt
if [ $? -eq 0 ]; then
    print_success "Python dependencies installed"
    
    # Generate lock file
    print_status "Generating Python lock file..."
    pip3 freeze > requirements-lock-generated.txt
    print_success "Python lock file generated"
else
    print_error "Failed to install Python dependencies"
    print_warning "You may need to create a virtual environment first:"
    print_warning "  $PYTHON_CMD -m venv venv"
    print_warning "  source venv/bin/activate"
    print_warning "  pip install -r requirements.txt"
fi
cd ..

# Install chainlink-functions dependencies (optional)
print_status "Installing Chainlink Functions dependencies..."
cd chainlink-functions
npm install
if [ $? -eq 0 ]; then
    print_success "Chainlink Functions dependencies installed"
else
    print_warning "Chainlink Functions installation failed (non-critical)"
fi
cd ..

# Final verification
print_status "Running final verification..."

# Check if all package.json files have node_modules
MISSING_DEPS=""
if [ ! -d "node_modules" ]; then
    MISSING_DEPS="$MISSING_DEPS root"
fi
if [ ! -d "frontend/node_modules" ]; then
    MISSING_DEPS="$MISSING_DEPS frontend"
fi
if [ ! -d "contracts/node_modules" ]; then
    MISSING_DEPS="$MISSING_DEPS contracts"
fi

if [ -z "$MISSING_DEPS" ]; then
    print_success "All dependencies installed successfully!"
else
    print_warning "Missing dependencies in: $MISSING_DEPS"
fi

# Generate package-lock files
print_status "Generating package-lock.json files..."
npm shrinkwrap 2>/dev/null || true
cd frontend && npm shrinkwrap 2>/dev/null || true && cd ..
cd contracts && npm shrinkwrap 2>/dev/null || true && cd ..

echo ""
echo "🎉 Installation Complete!"
echo "========================"
echo ""
echo "Next steps:"
echo "1. Copy environment files:"
echo "   cp .env.example .env"
echo "   cp frontend/.env.example frontend/.env.local"
echo "   cp ai-service/.env.example ai-service/.env"
echo ""
echo "2. Start development environment:"
echo "   npm run dev"
echo ""
echo "3. Run tests:"
echo "   npm run test:all"
echo ""
echo "4. Build all components:"
echo "   npm run build:all"
echo ""
print_success "Happy coding! 🚀"

# 🚀 Installation Guide - Python 3.10.10 Optimized

## Quick Install (Recommended)

```bash
# Run the automated installation script
chmod +x install.sh
./install.sh
```

## Manual Installation

### Prerequisites

- **Node.js**: 18+ (LTS recommended)
- **Python**: 3.10.10 (confirmed compatible) or 3.9+
- **npm**: 8+
- **Git**: Latest version

### Step-by-Step Installation

#### 1. Clone and Setup
```bash
git clone <repository-url>
cd ai-deepfake-authenticity-checker
```

#### 2. Install All Dependencies
```bash
# Option A: Use the enhanced install script
npm run install:all

# Option B: Manual step-by-step
npm install                           # Root dependencies
npm run install:frontend             # Frontend (React + TypeScript)
npm run install:contracts            # Smart contracts (Hardhat)
npm run install:python              # AI service (Python Flask)
```

#### 3. Environment Configuration
```bash
# Copy environment templates
cp .env.example .env
cp frontend/.env.example frontend/.env.local
cp ai-service/.env.example ai-service/.env

# Edit the files with your API keys and configuration
```

#### 4. Verification
```bash
# Build all components
npm run build:all

# Run all tests
npm run test:all

# Start development environment
npm run dev
```

## Python 3.10.10 Specific Setup

Since you have Python 3.10.10, these packages are specifically optimized:

```txt
# Core ML Frameworks (Python 3.10.10 tested)
torch==2.3.1
torchvision==0.18.1
tensorflow==2.16.1
opencv-python==4.10.0.84
numpy==1.26.4
scikit-learn==1.5.0

# AI Detection Models
deepface==0.0.92
mtcnn==0.1.1
mediapipe==0.10.11
```

### Virtual Environment (Recommended for Python)
```bash
cd ai-service
python3 -m venv ai-deepfake-env
source ai-deepfake-env/bin/activate  # macOS/Linux
# OR
ai-deepfake-env\Scripts\activate     # Windows

pip install --upgrade pip
pip install -r requirements.txt
```

## Troubleshooting

### Node.js Issues

**Hardhat Toolbox Conflicts:**
```bash
cd contracts
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

**Frontend Security Vulnerabilities:**
```bash
cd frontend
npm audit fix --force
```

### Python Issues

**Package Conflicts:**
```bash
cd ai-service
pip install --upgrade pip
pip install -r requirements.txt --force-reinstall
```

**macOS Specific (M1/M2 chips):**
```bash
# For TensorFlow on Apple Silicon
pip install tensorflow-macos
pip install tensorflow-metal
```

### Complete Reset
```bash
# Nuclear option - clean everything
npm run clean:all
find . -name "package-lock.json" -delete
find . -name "node_modules" -type d -exec rm -rf {} +
find . -name "__pycache__" -type d -exec rm -rf {} +

# Then reinstall
./install.sh
```

## Development Scripts

```bash
# Development
npm run dev                    # Start all services
npm run dev:frontend          # Frontend only (port 3000)
npm run dev:contracts         # Hardhat node (port 8545)
npm run dev:ai-service        # Python Flask (port 5000)

# Building
npm run build:all             # Build everything
npm run build:frontend        # Build React app
npm run build:contracts       # Compile smart contracts

# Testing
npm run test:all              # Run all tests
npm run test:frontend         # React component tests
npm run test:contracts        # Smart contract tests
npm run test:python           # Python API tests

# Utilities
npm run lint                  # Lint all code
npm run format                # Format all code
npm run clean:all             # Clean all build artifacts
npm run check-deps            # Check for outdated packages
```

## Environment Variables

### Root `.env`
```env
# Blockchain
ALCHEMY_API_KEY=your_alchemy_key
PRIVATE_KEY=your_wallet_private_key

# IPFS
PINATA_API_KEY=your_pinata_key
PINATA_SECRET_KEY=your_pinata_secret

# Chainlink
CHAINLINK_SUBSCRIPTION_ID=your_subscription_id
```

### Frontend `.env.local`
```env
VITE_ALCHEMY_API_KEY=your_alchemy_key
VITE_PINATA_API_KEY=your_pinata_key
VITE_CONTRACT_ADDRESS=deployed_contract_address
```

### AI Service `.env`
```env
FLASK_ENV=development
AWS_ACCESS_KEY_ID=your_aws_key
AWS_SECRET_ACCESS_KEY=your_aws_secret
AWS_REGION=us-east-1
REDIS_URL=redis://localhost:6379
```

## Port Configuration

- **Frontend**: http://localhost:3000
- **Hardhat Node**: http://localhost:8545
- **AI Service**: http://localhost:5000
- **Chainlink Functions**: N/A (external)

## Verification Checklist

After installation, verify these work:

- [ ] `npm run build:all` completes without errors
- [ ] `npm run test:all` passes all tests
- [ ] `npm run dev` starts all services
- [ ] Frontend loads at http://localhost:3000
- [ ] Smart contracts compile successfully
- [ ] Python service starts without import errors
- [ ] No security vulnerabilities in `npm audit`
- [ ] All environment variables are configured

## Performance Tips

### For Development
```bash
# Use npm workspaces for faster installs
npm install --workspaces

# Enable npm cache
npm config set cache ~/.npm-cache

# Use Node.js LTS for stability
nvm install --lts
nvm use --lts
```

### For Python
```bash
# Use UV for faster package management (optional)
pip install uv
uv pip install -r requirements.txt

# Enable parallel pip installs
pip install --upgrade pip setuptools wheel
```

## Next Steps

1. **Configure APIs**: Set up AWS, Pinata, and Alchemy accounts
2. **Deploy Contracts**: Deploy to testnets (Sepolia, Mumbai)
3. **Test Integration**: Upload test images and verify detection
4. **Production Setup**: Configure production environment variables

Need help? Check the [troubleshooting guide](docs/troubleshooting.md) or [open an issue](https://github.com/your-repo/issues).

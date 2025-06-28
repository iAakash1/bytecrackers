# Deployment Guide

## Quick Start Deployment

This guide covers deploying the complete AI Deepfake Authenticity Checker platform to production.

## Prerequisites

### Required Accounts & Services
1. **Alchemy** - For blockchain RPC endpoints
2. **Pinata** - For IPFS storage
3. **AWS** - For Rekognition AI services
4. **Chainlink** - For Functions subscription
5. **WalletConnect** - For wallet integration
6. **Vercel** - For frontend hosting
7. **Railway/Render** - For AI service hosting

### Required Tools
- Node.js 18+
- Python 3.9+
- Git
- Wallet with testnet/mainnet funds

## Step 1: Environment Setup

### 1.1 Clone and Setup Repository
```bash
git clone <repository-url>
cd ai-deepfake-authenticity-checker
```

### 1.2 Install Dependencies
```bash
# Install all dependencies
npm run install:all
```

### 1.3 Configure Environment Variables
```bash
# Copy environment templates
cp .env.example .env
cp frontend/.env.example frontend/.env.local
cp contracts/.env.example contracts/.env
cp ai-service/.env.example ai-service/.env

# Edit each .env file with your actual values
```

## Step 2: Smart Contract Deployment

### 2.1 Compile Contracts
```bash
cd contracts
npx hardhat compile
```

### 2.2 Deploy to Testnet (Sepolia)
```bash
# Deploy to Sepolia testnet
npx hardhat run scripts/deploy.ts --network sepolia

# Verify contracts on Etherscan
npx hardhat verify --network sepolia CONTRACT_ADDRESS
```

### 2.3 Deploy to Mainnet (Polygon)
```bash
# Deploy to Polygon mainnet
npx hardhat run scripts/deploy.ts --network polygon

# Verify contracts on Polygonscan
npx hardhat verify --network polygon CONTRACT_ADDRESS
```

### 2.4 Configure Chainlink Functions
1. Create Chainlink Functions subscription
2. Fund subscription with LINK tokens
3. Add deployed contracts as consumers
4. Update contract with subscription details

## Step 3: AI Service Deployment

### 3.1 Prepare AI Service
```bash
cd ai-service

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

### 3.2 Deploy to Railway
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway init
railway up
```

### 3.3 Deploy to Render (Alternative)
1. Connect GitHub repository to Render
2. Create new Web Service
3. Set build command: `pip install -r requirements.txt`
4. Set start command: `gunicorn app:app`
5. Add environment variables from `.env`

### 3.4 Configure Environment Variables
Set these variables in your hosting platform:
```bash
FLASK_ENV=production
SECRET_KEY=your-production-secret-key
AWS_ACCESS_KEY_ID=your-aws-key
AWS_SECRET_ACCESS_KEY=your-aws-secret
PINATA_API_KEY=your-pinata-key
REDIS_URL=your-redis-url
API_KEY=your-api-key
```

## Step 4: Frontend Deployment

### 4.1 Build Frontend
```bash
cd frontend

# Install dependencies
npm install

# Build for production
npm run build
```

### 4.2 Deploy to Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

### 4.3 Configure Environment Variables in Vercel
Set these in Vercel dashboard:
```bash
VITE_ETHEREUM_RPC_URL=your-ethereum-rpc
VITE_POLYGON_RPC_URL=your-polygon-rpc
VITE_WALLETCONNECT_PROJECT_ID=your-walletconnect-id
VITE_AUTHENTICITY_REGISTRY_ADDRESS=deployed-contract-address
VITE_AUTHENTICITY_NFT_ADDRESS=deployed-nft-address
VITE_AI_SERVICE_URL=your-ai-service-url
VITE_PINATA_API_KEY=your-pinata-key
```

## Step 5: Configure Services

### 5.1 Update Smart Contract Settings
```bash
# Connect to your deployed contracts and set:
# - Verification fee
# - NFT mint fee
# - Authorize NFT contract as minter
# - Update Chainlink Functions configuration
```

### 5.2 Set Up IPFS Pinning
```bash
# Configure Pinata for production
# Set up proper pinning policies
# Configure gateway preferences
```

### 5.3 Configure Monitoring
```bash
# Set up error tracking (Sentry)
# Configure analytics (Google Analytics)
# Set up uptime monitoring
```

## Step 6: Testing Deployment

### 6.1 Test Smart Contracts
```bash
cd contracts
npx hardhat test --network sepolia
```

### 6.2 Test AI Service
```bash
# Test health endpoint
curl https://your-ai-service.railway.app/health

# Test verification endpoint
curl -X POST https://your-ai-service.railway.app/api/v1/verify \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{
    "ipfs_hash": "QmTest...",
    "media_type": "image"
  }'
```

### 6.3 Test Frontend
1. Visit deployed frontend URL
2. Connect wallet
3. Test media upload
4. Test verification flow
5. Test NFT minting

## Step 7: Production Configuration

### 7.1 Security Checklist
- [ ] All private keys secured
- [ ] Environment variables properly set
- [ ] Rate limiting configured
- [ ] CORS properly configured
- [ ] SSL certificates in place
- [ ] Contract ownership secured

### 7.2 Performance Optimization
- [ ] CDN configured for static assets
- [ ] Database connections optimized
- [ ] Caching strategies implemented
- [ ] API rate limits appropriate

### 7.3 Monitoring Setup
- [ ] Error tracking active
- [ ] Performance monitoring
- [ ] Uptime monitoring
- [ ] Log aggregation
- [ ] Alert notifications

## Step 8: Post-Deployment

### 8.1 Update Documentation
- Update contract addresses in documentation
- Update API endpoints
- Create user guides
- Document any configuration changes

### 8.2 Community Setup
- Create Discord/Telegram channels
- Set up social media accounts
- Prepare announcement materials
- Create feedback collection systems

### 8.3 Maintenance Schedule
- Regular dependency updates
- Security audits
- Performance monitoring
- User feedback review

## Troubleshooting

### Common Issues

#### Smart Contract Deployment Fails
```bash
# Check gas prices and limits
# Verify network configuration
# Ensure sufficient funds in deployer wallet
```

#### AI Service Not Responding
```bash
# Check service logs
# Verify environment variables
# Test IPFS connectivity
# Check AWS credentials
```

#### Frontend Build Errors
```bash
# Clear node_modules and reinstall
# Check TypeScript errors
# Verify environment variables
# Update dependencies
```

### Support Resources
- Documentation: `/docs`
- GitHub Issues: Repository issues page
- Community Discord: [Link]
- Support Email: support@deepfake-checker.com

## Rollback Procedures

### Contract Rollback
1. Pause current contracts
2. Deploy previous version
3. Update frontend configuration
4. Notify users of maintenance

### Service Rollback
1. Revert to previous deployment
2. Update DNS if necessary
3. Monitor for issues
4. Communicate with users

## Success Metrics

After deployment, monitor these metrics:
- Contract deployment success
- Service uptime (>99.9%)
- Average response time (<3s)
- User adoption rate
- Error rate (<1%)
- Security incidents (0)

## Next Steps

1. Monitor initial usage
2. Gather user feedback
3. Plan feature updates
4. Scale infrastructure as needed
5. Implement additional AI models
6. Expand to more blockchains

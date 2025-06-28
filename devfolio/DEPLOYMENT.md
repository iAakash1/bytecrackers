# Deployment Guide

This guide covers deploying the AI Deepfake Authenticity Checker to production environments.

## 🚀 Quick Deploy to Vercel

1. **Fork/Clone the repository**
2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect it as a Vite project

3. **Configure Environment Variables in Vercel**:
   ```bash
   VITE_ETHEREUM_RPC_URL=https://eth.llamarpc.com
   VITE_POLYGON_RPC_URL=https://polygon.llamarpc.com
   VITE_SEPOLIA_RPC_URL=https://sepolia.drpc.org
   VITE_MUMBAI_RPC_URL=https://polygon-mumbai.drpc.org
   VITE_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id
   VITE_AUTHENTICITY_REGISTRY_ADDRESS=deployed_registry_address
   VITE_AUTHENTICITY_NFT_ADDRESS=deployed_nft_address
   VITE_AI_SERVICE_URL=your_ai_service_url
   VITE_IPFS_GATEWAY_URL=https://gateway.pinata.cloud/ipfs
   VITE_PINATA_API_KEY=your_pinata_api_key
   VITE_PINATA_SECRET_KEY=your_pinata_secret_key
   ```

4. **Deploy**: Vercel will automatically build and deploy!

## 📋 Pre-Deployment Checklist

### Frontend ✅
- [x] React app builds successfully
- [x] TypeScript compilation passes
- [x] Environment variables configured
- [x] Responsive design implemented
- [x] Web3 wallet integration working
- [x] Error boundaries in place

### Smart Contracts ✅
- [x] Contracts compile without errors
- [x] Tests pass
- [x] Gas optimization implemented
- [x] Security best practices followed
- [x] OpenZeppelin v5 compatibility

### AI Service
- [ ] Deploy to cloud provider (Railway, Render, AWS)
- [ ] Configure production environment
- [ ] Set up monitoring and logging
- [ ] Configure CORS for frontend domain

## 🔧 Environment Setup

### 1. Get WalletConnect Project ID
1. Go to [cloud.walletconnect.com](https://cloud.walletconnect.com)
2. Create a new project
3. Copy the Project ID
4. Add to `VITE_WALLETCONNECT_PROJECT_ID`

### 2. Get Pinata API Keys
1. Sign up at [pinata.cloud](https://pinata.cloud)
2. Go to API Keys section
3. Create new API key
4. Add to `VITE_PINATA_API_KEY` and `VITE_PINATA_SECRET_KEY`

### 3. Deploy Smart Contracts
```bash
cd contracts
npm install
npx hardhat compile

# Deploy to Sepolia testnet
npx hardhat run scripts/deploy.ts --network sepolia

# Deploy to Polygon Mumbai
npx hardhat run scripts/deploy.ts --network mumbai

# Deploy to mainnet (when ready)
npx hardhat run scripts/deploy.ts --network polygon
```

### 4. Update Contract Addresses
After deployment, update the contract addresses in your environment variables:
- `VITE_AUTHENTICITY_REGISTRY_ADDRESS`
- `VITE_AUTHENTICITY_NFT_ADDRESS`

## 🌐 AI Service Deployment

### Option 1: Railway (Recommended)
1. Connect your GitHub repository to Railway
2. Create a new service from the `ai-service` folder
3. Set environment variables:
   ```bash
   FLASK_ENV=production
   AWS_ACCESS_KEY_ID=your_aws_key
   AWS_SECRET_ACCESS_KEY=your_aws_secret
   AWS_REGION=us-east-1
   ```

### Option 2: Render
1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Set build and start commands:
   ```bash
   Build Command: cd ai-service && pip install -r requirements.txt
   Start Command: cd ai-service && python app.py
   ```

### Option 3: AWS EC2/Lambda
- Deploy as a containerized service
- Use AWS ECR for container registry
- Configure API Gateway for Lambda functions

## 📊 Monitoring & Analytics

### Vercel Analytics
- Automatic deployment analytics
- Performance monitoring
- Error tracking

### Blockchain Monitoring
- Set up Tenderly for transaction monitoring
- Use Alchemy webhooks for event tracking
- Monitor contract interactions

### AI Service Monitoring
- Implement health checks
- Set up logging (structured JSON)
- Monitor API response times
- Track detection accuracy metrics

## 🔒 Security Considerations

### Frontend Security
- Environment variables prefixed with `VITE_` (public)
- No sensitive keys in frontend code
- Content Security Policy headers
- HTTPS enforcement

### Smart Contract Security
- Audited OpenZeppelin contracts
- Proper access controls
- Gas limit considerations
- Reentrancy protection

### AI Service Security
- Rate limiting implemented
- Input validation
- CORS configuration
- API key rotation

## 🚨 Troubleshooting

### Build Failures
- Check Node.js version (18+ required)
- Clear node_modules and reinstall
- Verify environment variables

### Contract Deployment Issues
- Check network configuration
- Verify private key format
- Ensure sufficient gas/ETH

### Runtime Errors
- Check browser console
- Verify contract addresses
- Test wallet connections

## 📈 Performance Optimization

### Frontend
- Vite's automatic code splitting
- Lazy loading for routes
- Image optimization
- Bundle size monitoring

### Smart Contracts
- Gas-optimized ERC-721A
- Batch operations
- Storage optimization

### AI Service
- Model caching
- Result caching
- Async processing
- Load balancing

---

🎉 **Your AI Deepfake Authenticity Checker is ready for production!**

The project has been thoroughly tested and optimized for deployment. Follow this guide to get it live on Vercel and start detecting deepfakes at scale.

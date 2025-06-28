# Smart Contract Documentation

## Overview

The AI Deepfake Authenticity Checker platform uses two main smart contracts:

1. **AuthenticityRegistry.sol** - Main verification contract with Chainlink Functions integration
2. **AuthenticityNFT.sol** - ERC-721A NFT contract for authenticity certificates

## AuthenticityRegistry Contract

### Main Functions

#### `requestVerification(string ipfsHash, string mediaType)`
Initiates verification request for media content.

**Parameters:**
- `ipfsHash`: IPFS hash of the media to verify
- `mediaType`: Type of media ("image", "video", "audio")

**Returns:**
- `bytes32`: Request ID for tracking verification

**Events Emitted:**
- `VerificationRequested(requestId, requester, ipfsHash, mediaType, timestamp)`

#### `mintAuthenticityNFT(string ipfsHash)`
Mints NFT certificate for verified authentic content.

**Parameters:**
- `ipfsHash`: IPFS hash of verified authentic content

**Returns:**
- `uint256`: Token ID of minted NFT

**Requirements:**
- Content must be verified as authentic
- Confidence score must be ≥ 80%
- Only original requester can mint NFT
- Pay NFT mint fee

#### `getVerificationResult(string ipfsHash)`
Returns verification result for content.

**Parameters:**
- `ipfsHash`: IPFS hash of content

**Returns:**
- `VerificationResult`: Struct containing verification details

#### `getUserRequests(address user)`
Get all verification requests made by a user.

**Parameters:**
- `user`: User address

**Returns:**
- `bytes32[]`: Array of request IDs

### Data Structures

#### VerificationRequest
```solidity
struct VerificationRequest {
    address requester;
    string ipfsHash;
    string mediaType;
    uint256 timestamp;
    bool isProcessed;
    bool isAuthentic;
    uint256 confidenceScore;
    string aiModel;
    uint256 nftTokenId;
}
```

#### VerificationResult
```solidity
struct VerificationResult {
    bytes32 requestId;
    bool isAuthentic;
    uint256 confidenceScore;
    string aiModel;
    string reasoning;
    uint256 timestamp;
}
```

### Events

#### VerificationRequested
```solidity
event VerificationRequested(
    bytes32 indexed requestId,
    address indexed requester,
    string ipfsHash,
    string mediaType,
    uint256 timestamp
);
```

#### VerificationCompleted
```solidity
event VerificationCompleted(
    bytes32 indexed requestId,
    string indexed ipfsHash,
    bool isAuthentic,
    uint256 confidenceScore,
    string aiModel,
    uint256 timestamp
);
```

#### NFTMinted
```solidity
event NFTMinted(
    string indexed ipfsHash,
    address indexed owner,
    uint256 tokenId,
    uint256 timestamp
);
```

### Access Control

- **Owner Functions**: `updateFees`, `updateChainlinkConfig`, `withdrawFunds`, `pause`, `unpause`, `emergencyFlagContent`
- **Public Functions**: `requestVerification`, `mintAuthenticityNFT`, `getVerificationResult`

## AuthenticityNFT Contract

### Main Functions

#### `mintAuthenticityNFT(address to, string ipfsHash, uint256 confidenceScore, string aiModel)`
Mints authenticity certificate NFT (only authorized minters).

**Parameters:**
- `to`: Address to mint NFT to
- `ipfsHash`: IPFS hash of verified content
- `confidenceScore`: AI confidence score (50-100)
- `aiModel`: AI model used for verification

**Returns:**
- `uint256`: Token ID

#### `getTokenMetadata(uint256 tokenId)`
Returns metadata for a token.

**Parameters:**
- `tokenId`: Token ID

**Returns:**
- `AuthenticityMetadata`: Token metadata struct

#### `getTokensByOwner(address owner)`
Get all tokens owned by an address.

**Parameters:**
- `owner`: Owner address

**Returns:**
- `uint256[]`: Array of token IDs

#### `tokenURI(uint256 tokenId)`
Returns token URI with dynamic metadata.

**Parameters:**
- `tokenId`: Token ID

**Returns:**
- `string`: Base64 encoded JSON metadata

### Data Structures

#### AuthenticityMetadata
```solidity
struct AuthenticityMetadata {
    string ipfsHash;
    uint256 confidenceScore;
    string aiModel;
    uint256 verificationTimestamp;
    address originalRequester;
    bool isRevoked;
}
```

### Token Metadata Example

```json
{
  "name": "Authenticity Certificate #123",
  "description": "This NFT certifies the authenticity of digital content verified by AI analysis.",
  "image": "https://gateway.pinata.cloud/ipfs/QmCertificate.png",
  "external_url": "https://gateway.pinata.cloud/ipfs/QmContent...",
  "attributes": [
    {
      "trait_type": "Confidence Score",
      "value": 94
    },
    {
      "trait_type": "AI Model",
      "value": "ensemble"
    },
    {
      "trait_type": "Verification Date",
      "value": 1704067200
    },
    {
      "trait_type": "Status",
      "value": "Verified Authentic"
    },
    {
      "trait_type": "IPFS Hash",
      "value": "QmContent..."
    }
  ]
}
```

## Deployment Configuration

### Network Addresses

#### Sepolia Testnet
- AuthenticityRegistry: `0x...` (to be deployed)
- AuthenticityNFT: `0x...` (to be deployed)

#### Polygon Mainnet
- AuthenticityRegistry: `0x...` (to be deployed)
- AuthenticityNFT: `0x...` (to be deployed)

### Constructor Parameters

#### AuthenticityRegistry
```solidity
constructor(
    address _router,           // Chainlink Functions router
    uint64 _subscriptionId,    // Chainlink subscription ID
    uint32 _gasLimit,          // Gas limit for Functions requests
    bytes32 _donID,            // DON ID
    string memory _sourceCode, // JavaScript source code
    address _nftContract       // AuthenticityNFT contract address
)
```

#### AuthenticityNFT
```solidity
constructor(
    string memory _name,    // "Authenticity Certificate"
    string memory _symbol,  // "AUTH"
    string memory _baseURI  // Base URI for metadata
)
```

## Gas Optimization

- Using ERC-721A for batch minting efficiency
- Packed structs to minimize storage slots
- Efficient mapping structures
- Gas-optimized loops and conditions

## Security Features

- Reentrancy protection on all state-changing functions
- Pause functionality for emergency stops
- Access control for sensitive functions
- Input validation and sanitization
- Rate limiting through fees

## Integration Guide

### 1. Deploy Contracts
```bash
npx hardhat run scripts/deploy.ts --network sepolia
```

### 2. Configure Chainlink Functions
```bash
# Set up subscription and add consumer contracts
# Fund subscription with LINK tokens
```

### 3. Initialize Settings
```solidity
// Set verification and NFT mint fees
registry.updateFees(0.001 ether, 0.01 ether);

// Authorize NFT contract as minter
nft.setAuthorizedMinter(registryAddress, true);
```

### 4. Frontend Integration
```typescript
// Request verification
const tx = await registry.requestVerification(ipfsHash, mediaType, {
  value: ethers.parseEther("0.001")
});

// Listen for completion
registry.on("VerificationCompleted", (requestId, ipfsHash, isAuthentic) => {
  // Handle verification result
});
```

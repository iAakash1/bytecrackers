<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# AI Deepfake Authenticity Checker - Copilot Instructions

This is a comprehensive full-stack decentralized application project with the following components:

## Project Structure
- `frontend/`: React 18 + TypeScript + TailwindCSS + Vite application
- `contracts/`: Solidity smart contracts with Hardhat and OpenZeppelin
- `ai-service/`: Python Flask API for AI deepfake detection
- `chainlink-functions/`: JavaScript code for Chainlink Functions integration
- `docs/`: Comprehensive project documentation

## Key Technologies
- **Frontend**: React 18, TypeScript, TailwindCSS, Vite, Wagmi, Viem, WalletConnect
- **Blockchain**: Solidity, Hardhat, OpenZeppelin, ERC-721A, Chainlink Functions
- **AI/ML**: Python, Flask, AWS Rekognition, Custom CNN models, DeepFace
- **Storage**: IPFS, Pinata
- **Testing**: Hardhat, Jest, React Testing Library, pytest

## Code Style Guidelines
- Use TypeScript for type safety across frontend and tooling
- Follow React best practices with hooks and functional components
- Implement proper error handling and loading states
- Use modern JavaScript/TypeScript features (async/await, destructuring, etc.)
- Write comprehensive tests for all components
- Follow Solidity best practices for gas optimization and security
- Use proper Python type hints and docstrings
- Implement proper logging and monitoring

## Security Considerations
- Always validate and sanitize inputs
- Implement rate limiting on API endpoints
- Use secure environment variable handling
- Follow smart contract security best practices
- Validate IPFS content before processing

## Development Patterns
- Use React Query for API state management
- Implement proper loading states and error boundaries
- Use TypeScript interfaces for type definitions
- Follow REST API conventions for the Python service
- Implement proper event handling for blockchain interactions
- Use proper file upload handling with progress tracking

## Testing Requirements
- Write unit tests for all components and functions
- Implement integration tests for API endpoints
- Create comprehensive smart contract tests
- Use React Testing Library for frontend testing
- Implement Python pytest for backend testing

When suggesting code improvements or new features, please consider:
1. Type safety and proper TypeScript usage
2. Gas optimization for smart contracts
3. User experience and accessibility
4. Security implications
5. Performance optimizations
6. Error handling and edge cases
7. Mobile responsiveness
8. Web3 integration best practices

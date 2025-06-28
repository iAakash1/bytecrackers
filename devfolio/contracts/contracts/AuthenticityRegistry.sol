// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@chainlink/contracts/src/v0.8/functions/v1_0_0/FunctionsClient.sol";
import "@chainlink/contracts/src/v0.8/functions/v1_0_0/libraries/FunctionsRequest.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "./AuthenticityNFT.sol";

/**
 * @title AuthenticityRegistry
 * @dev Smart contract for verifying media authenticity using Chainlink Functions
 * @notice This contract integrates with AI services via Chainlink Functions to detect deepfakes
 */
contract AuthenticityRegistry is FunctionsClient, Ownable, ReentrancyGuard, Pausable {
    using FunctionsRequest for FunctionsRequest.Request;

    // Struct to store verification request data
    struct VerificationRequest {
        address requester;
        string ipfsHash;
        string mediaType;
        uint256 timestamp;
        bool isProcessed;
        bool isAuthentic;
        uint256 confidenceScore; // 0-100
        string aiModel;
        uint256 nftTokenId; // 0 if no NFT minted
    }

    // Struct to store verification result
    struct VerificationResult {
        bytes32 requestId;
        bool isAuthentic;
        uint256 confidenceScore;
        string aiModel;
        string reasoning;
        uint256 timestamp;
    }

    // Contract state variables
    AuthenticityNFT public immutable authenticityNFT;
    uint64 public subscriptionId;
    uint32 public gasLimit;
    bytes32 public donID;
    string public sourceCode;
    
    // Mappings
    mapping(bytes32 => VerificationRequest) public verificationRequests;
    mapping(string => VerificationResult) public verificationResults; // ipfsHash => result
    mapping(address => bytes32[]) public userRequests;
    mapping(string => bool) public flaggedContent; // ipfsHash => flagged
    
    // Arrays for public access
    bytes32[] public allRequestIds;
    string[] public allVerifiedContent;
    string[] public allFlaggedContent;
    
    // Statistics
    uint256 public totalVerifications;
    uint256 public totalAuthentic;
    uint256 public totalFake;
    uint256 public totalNFTsMinted;
    
    // Fee structure
    uint256 public verificationFee = 0.001 ether; // Fee in native token
    uint256 public nftMintFee = 0.01 ether; // Additional fee for NFT minting
    
    // Events
    event VerificationRequested(
        bytes32 indexed requestId,
        address indexed requester,
        string ipfsHash,
        string mediaType,
        uint256 timestamp
    );
    
    event VerificationCompleted(
        bytes32 indexed requestId,
        string indexed ipfsHash,
        bool isAuthentic,
        uint256 confidenceScore,
        string aiModel,
        uint256 timestamp
    );
    
    event ContentFlagged(
        string indexed ipfsHash,
        address indexed reporter,
        uint256 timestamp
    );
    
    event NFTMinted(
        string indexed ipfsHash,
        address indexed owner,
        uint256 tokenId,
        uint256 timestamp
    );
    
    event FeesUpdated(
        uint256 verificationFee,
        uint256 nftMintFee,
        uint256 timestamp
    );
    
    event FundsWithdrawn(
        address indexed owner,
        uint256 amount,
        uint256 timestamp
    );

    /**
     * @dev Constructor to initialize the contract
     * @param _router Chainlink Functions router address
     * @param _subscriptionId Chainlink subscription ID
     * @param _gasLimit Gas limit for Functions requests
     * @param _donID Decentralized Oracle Network ID
     * @param _sourceCode JavaScript source code for Chainlink Functions
     * @param _nftContract Address of the AuthenticityNFT contract
     * @param _initialOwner Initial owner of the contract
     */
    constructor(
        address _router,
        uint64 _subscriptionId,
        uint32 _gasLimit,
        bytes32 _donID,
        string memory _sourceCode,
        address _nftContract,
        address _initialOwner
    ) FunctionsClient(_router) Ownable(_initialOwner) {
        subscriptionId = _subscriptionId;
        gasLimit = _gasLimit;
        donID = _donID;
        sourceCode = _sourceCode;
        authenticityNFT = AuthenticityNFT(_nftContract);
    }

    /**
     * @notice Request verification for media content
     * @param _ipfsHash IPFS hash of the media to verify
     * @param _mediaType Type of media (image, video, audio)
     * @return requestId The ID of the verification request
     */
    function requestVerification(
        string memory _ipfsHash,
        string memory _mediaType
    ) external payable nonReentrant whenNotPaused returns (bytes32) {
        require(msg.value >= verificationFee, "Insufficient fee");
        require(bytes(_ipfsHash).length > 0, "Invalid IPFS hash");
        require(bytes(_mediaType).length > 0, "Invalid media type");
        require(
            verificationResults[_ipfsHash].timestamp == 0,
            "Content already verified"
        );

        // Create Chainlink Functions request
        FunctionsRequest.Request memory req;
        req.initializeRequestForInlineJavaScript(sourceCode);
        
        // Set arguments: [ipfsHash, mediaType]
        string[] memory args = new string[](2);
        args[0] = _ipfsHash;
        args[1] = _mediaType;
        req.setArgs(args);

        // Send request
        bytes32 requestId = _sendRequest(
            req.encodeCBOR(),
            subscriptionId,
            gasLimit,
            donID
        );

        // Store request data
        verificationRequests[requestId] = VerificationRequest({
            requester: msg.sender,
            ipfsHash: _ipfsHash,
            mediaType: _mediaType,
            timestamp: block.timestamp,
            isProcessed: false,
            isAuthentic: false,
            confidenceScore: 0,
            aiModel: "",
            nftTokenId: 0
        });

        // Update mappings and arrays
        userRequests[msg.sender].push(requestId);
        allRequestIds.push(requestId);
        totalVerifications++;

        emit VerificationRequested(
            requestId,
            msg.sender,
            _ipfsHash,
            _mediaType,
            block.timestamp
        );

        return requestId;
    }

    /**
     * @notice Chainlink Functions callback - processes verification result
     * @param requestId The ID of the request
     * @param response The verification result from AI service
     * @param err Any error that occurred during processing
     */
    function fulfillRequest(
        bytes32 requestId,
        bytes memory response,
        bytes memory err
    ) internal override {
        VerificationRequest storage request = verificationRequests[requestId];
        require(request.timestamp > 0, "Request not found");
        require(!request.isProcessed, "Request already processed");

        if (err.length > 0) {
            // Handle error case
            request.isProcessed = true;
            return;
        }

        // Decode response: [isAuthentic, confidenceScore, aiModel, reasoning]
        (bool isAuthentic, uint256 confidenceScore, string memory aiModel, string memory reasoning) = 
            abi.decode(response, (bool, uint256, string, string));

        // Update request
        request.isProcessed = true;
        request.isAuthentic = isAuthentic;
        request.confidenceScore = confidenceScore;
        request.aiModel = aiModel;

        // Store result
        verificationResults[request.ipfsHash] = VerificationResult({
            requestId: requestId,
            isAuthentic: isAuthentic,
            confidenceScore: confidenceScore,
            aiModel: aiModel,
            reasoning: reasoning,
            timestamp: block.timestamp
        });

        // Update statistics
        if (isAuthentic) {
            totalAuthentic++;
            allVerifiedContent.push(request.ipfsHash);
        } else {
            totalFake++;
            flaggedContent[request.ipfsHash] = true;
            allFlaggedContent.push(request.ipfsHash);
        }

        emit VerificationCompleted(
            requestId,
            request.ipfsHash,
            isAuthentic,
            confidenceScore,
            aiModel,
            block.timestamp
        );
    }

    /**
     * @notice Mint NFT certificate for authentic content
     * @param _ipfsHash IPFS hash of the verified authentic content
     * @return tokenId The ID of the minted NFT
     */
    function mintAuthenticityNFT(
        string memory _ipfsHash
    ) external payable nonReentrant whenNotPaused returns (uint256) {
        require(msg.value >= nftMintFee, "Insufficient NFT mint fee");
        
        VerificationResult memory result = verificationResults[_ipfsHash];
        require(result.timestamp > 0, "Content not verified");
        require(result.isAuthentic, "Content is not authentic");
        require(result.confidenceScore >= 80, "Confidence score too low");

        // Find the original request to check ownership
        bytes32 requestId = result.requestId;
        VerificationRequest storage request = verificationRequests[requestId];
        require(request.requester == msg.sender, "Only requester can mint NFT");
        require(request.nftTokenId == 0, "NFT already minted");

        // Mint NFT
        uint256 tokenId = authenticityNFT.mintAuthenticityNFT(
            msg.sender,
            _ipfsHash,
            result.confidenceScore,
            result.aiModel
        );

        // Update request
        request.nftTokenId = tokenId;
        totalNFTsMinted++;

        emit NFTMinted(_ipfsHash, msg.sender, tokenId, block.timestamp);

        return tokenId;
    }

    /**
     * @notice Get verification result for content
     * @param _ipfsHash IPFS hash of the content
     * @return result The verification result
     */
    function getVerificationResult(
        string memory _ipfsHash
    ) external view returns (VerificationResult memory) {
        return verificationResults[_ipfsHash];
    }

    /**
     * @notice Get user's verification requests
     * @param _user Address of the user
     * @return requestIds Array of request IDs
     */
    function getUserRequests(
        address _user
    ) external view returns (bytes32[] memory) {
        return userRequests[_user];
    }

    /**
     * @notice Get all verified authentic content
     * @return Array of IPFS hashes
     */
    function getAllVerifiedContent() external view returns (string[] memory) {
        return allVerifiedContent;
    }

    /**
     * @notice Get all flagged content
     * @return Array of IPFS hashes
     */
    function getAllFlaggedContent() external view returns (string[] memory) {
        return allFlaggedContent;
    }

    /**
     * @notice Get platform statistics
     * @return totalVerifications_ Total number of verifications
     * @return totalAuthentic_ Total authentic content
     * @return totalFake_ Total fake content
     * @return totalNFTsMinted_ Total NFTs minted
     */
    function getStatistics() external view returns (
        uint256 totalVerifications_,
        uint256 totalAuthentic_,
        uint256 totalFake_,
        uint256 totalNFTsMinted_
    ) {
        return (totalVerifications, totalAuthentic, totalFake, totalNFTsMinted);
    }

    /**
     * @notice Update verification fees (owner only)
     * @param _verificationFee New verification fee
     * @param _nftMintFee New NFT mint fee
     */
    function updateFees(
        uint256 _verificationFee,
        uint256 _nftMintFee
    ) external onlyOwner {
        verificationFee = _verificationFee;
        nftMintFee = _nftMintFee;
        
        emit FeesUpdated(_verificationFee, _nftMintFee, block.timestamp);
    }

    /**
     * @notice Update Chainlink Functions configuration (owner only)
     * @param _subscriptionId New subscription ID
     * @param _gasLimit New gas limit
     * @param _donID New DON ID
     * @param _sourceCode New source code
     */
    function updateChainlinkConfig(
        uint64 _subscriptionId,
        uint32 _gasLimit,
        bytes32 _donID,
        string memory _sourceCode
    ) external onlyOwner {
        subscriptionId = _subscriptionId;
        gasLimit = _gasLimit;
        donID = _donID;
        sourceCode = _sourceCode;
    }

    /**
     * @notice Withdraw contract funds (owner only)
     */
    function withdrawFunds() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds to withdraw");
        
        (bool success, ) = payable(owner()).call{value: balance}("");
        require(success, "Withdrawal failed");
        
        emit FundsWithdrawn(owner(), balance, block.timestamp);
    }

    /**
     * @notice Pause contract (owner only)
     */
    function pause() external onlyOwner {
        _pause();
    }

    /**
     * @notice Unpause contract (owner only)
     */
    function unpause() external onlyOwner {
        _unpause();
    }

    /**
     * @notice Emergency function to flag content manually (owner only)
     * @param _ipfsHash IPFS hash of content to flag
     */
    function emergencyFlagContent(string memory _ipfsHash) external onlyOwner {
        require(!flaggedContent[_ipfsHash], "Content already flagged");
        
        flaggedContent[_ipfsHash] = true;
        allFlaggedContent.push(_ipfsHash);
        
        emit ContentFlagged(_ipfsHash, msg.sender, block.timestamp);
    }

    /**
     * @notice Get contract version
     * @return Version string
     */
    function version() external pure returns (string memory) {
        return "1.0.0";
    }
}

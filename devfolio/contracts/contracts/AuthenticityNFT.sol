// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "erc721a/contracts/ERC721A.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Base64.sol";

/**
 * @title AuthenticityNFT
 * @dev ERC721A NFT contract for authenticity certificates
 * @notice This contract creates NFT certificates for verified authentic content
 */
contract AuthenticityNFT is ERC721A, Ownable, ReentrancyGuard {
    using Strings for uint256;

    // Struct to store NFT metadata
    struct AuthenticityMetadata {
        string ipfsHash;
        uint256 confidenceScore;
        string aiModel;
        uint256 verificationTimestamp;
        address originalRequester;
        bool isRevoked;
    }

    // Contract state
    string private _baseTokenURI;
    mapping(uint256 => AuthenticityMetadata) public tokenMetadata;
    mapping(string => uint256) public ipfsToTokenId; // ipfsHash => tokenId
    mapping(address => bool) public authorizedMinters;
    
    // Statistics
    uint256 public totalMinted;
    uint256 public totalRevoked;
    
    // Events
    event AuthenticityNFTMinted(
        address indexed to,
        uint256 indexed tokenId,
        string ipfsHash,
        uint256 confidenceScore,
        string aiModel,
        uint256 timestamp
    );
    
    event NFTRevoked(
        uint256 indexed tokenId,
        string reason,
        uint256 timestamp
    );
    
    event BaseURIUpdated(
        string oldBaseURI,
        string newBaseURI,
        uint256 timestamp
    );
    
    event MinterAuthorized(
        address indexed minter,
        bool authorized,
        uint256 timestamp
    );

    /**
     * @dev Constructor
     * @param _name Token name
     * @param _symbol Token symbol
     * @param _baseURI Base URI for token metadata
     * @param _initialOwner Initial owner of the contract
     */
    constructor(
        string memory _name,
        string memory _symbol,
        string memory _baseURI,
        address _initialOwner
    ) ERC721A(_name, _symbol) Ownable(_initialOwner) {
        _baseTokenURI = _baseURI;
    }

    /**
     * @notice Mint authenticity NFT (only authorized minters)
     * @param _to Address to mint NFT to
     * @param _ipfsHash IPFS hash of verified content
     * @param _confidenceScore AI confidence score (0-100)
     * @param _aiModel AI model used for verification
     * @return tokenId The ID of the minted token
     */
    function mintAuthenticityNFT(
        address _to,
        string memory _ipfsHash,
        uint256 _confidenceScore,
        string memory _aiModel
    ) external nonReentrant returns (uint256) {
        require(authorizedMinters[msg.sender], "Not authorized to mint");
        require(_to != address(0), "Cannot mint to zero address");
        require(bytes(_ipfsHash).length > 0, "Invalid IPFS hash");
        require(_confidenceScore >= 50 && _confidenceScore <= 100, "Invalid confidence score");
        require(ipfsToTokenId[_ipfsHash] == 0, "NFT already exists for this content");

        uint256 tokenId = _nextTokenId();
        
        // Store metadata
        tokenMetadata[tokenId] = AuthenticityMetadata({
            ipfsHash: _ipfsHash,
            confidenceScore: _confidenceScore,
            aiModel: _aiModel,
            verificationTimestamp: block.timestamp,
            originalRequester: _to,
            isRevoked: false
        });

        // Update mappings
        ipfsToTokenId[_ipfsHash] = tokenId;
        totalMinted++;

        // Mint token
        _mint(_to, 1);

        emit AuthenticityNFTMinted(
            _to,
            tokenId,
            _ipfsHash,
            _confidenceScore,
            _aiModel,
            block.timestamp
        );

        return tokenId;
    }

    /**
     * @notice Revoke NFT (owner only - for emergency cases)
     * @param _tokenId Token ID to revoke
     * @param _reason Reason for revocation
     */
    function revokeNFT(
        uint256 _tokenId,
        string memory _reason
    ) external onlyOwner {
        require(_exists(_tokenId), "Token does not exist");
        require(!tokenMetadata[_tokenId].isRevoked, "Token already revoked");

        tokenMetadata[_tokenId].isRevoked = true;
        totalRevoked++;

        emit NFTRevoked(_tokenId, _reason, block.timestamp);
    }

    /**
     * @notice Get NFT metadata for a token
     * @param _tokenId Token ID
     * @return metadata The token metadata
     */
    function getTokenMetadata(
        uint256 _tokenId
    ) external view returns (AuthenticityMetadata memory) {
        require(_exists(_tokenId), "Token does not exist");
        return tokenMetadata[_tokenId];
    }

    /**
     * @notice Check if content has an NFT
     * @param _ipfsHash IPFS hash of content
     * @return tokenId Token ID (0 if no NFT exists)
     */
    function getTokenIdByIPFS(
        string memory _ipfsHash
    ) external view returns (uint256) {
        return ipfsToTokenId[_ipfsHash];
    }

    /**
     * @notice Get tokens owned by an address
     * @param _owner Owner address
     * @return tokenIds Array of token IDs
     */
    function getTokensByOwner(
        address _owner
    ) external view returns (uint256[] memory) {
        require(_owner != address(0), "Invalid owner address");
        
        uint256 balance = balanceOf(_owner);
        uint256[] memory tokenIds = new uint256[](balance);
        uint256 currentIndex = 0;
        
        uint256 totalSupply = _nextTokenId() - _startTokenId();
        
        for (uint256 i = _startTokenId(); i < _startTokenId() + totalSupply && currentIndex < balance; i++) {
            if (_exists(i) && ownerOf(i) == _owner) {
                tokenIds[currentIndex] = i;
                currentIndex++;
            }
        }
        
        return tokenIds;
    }

    /**
     * @notice Generate token URI with dynamic metadata
     * @param _tokenId Token ID
     * @return Token URI string
     */
    function tokenURI(uint256 _tokenId) public view virtual override returns (string memory) {
        require(_exists(_tokenId), "Token does not exist");

        AuthenticityMetadata memory metadata = tokenMetadata[_tokenId];
        
        if (metadata.isRevoked) {
            return _buildRevokedTokenURI(_tokenId);
        }

        return _buildTokenURI(_tokenId, metadata);
    }

    /**
     * @notice Build token URI for active tokens
     * @param _tokenId Token ID
     * @param _metadata Token metadata
     * @return URI string
     */
    function _buildTokenURI(
        uint256 _tokenId,
        AuthenticityMetadata memory _metadata
    ) internal view returns (string memory) {
        string memory json = Base64.encode(
            bytes(
                string(
                    abi.encodePacked(
                        '{"name": "Authenticity Certificate #',
                        _tokenId.toString(),
                        '", "description": "This NFT certifies the authenticity of digital content verified by AI analysis.", ',
                        '"image": "',
                        _baseTokenURI,
                        'certificate.png", ',
                        '"external_url": "https://gateway.pinata.cloud/ipfs/',
                        _metadata.ipfsHash,
                        '", ',
                        '"attributes": [',
                        '{"trait_type": "Confidence Score", "value": ',
                        _metadata.confidenceScore.toString(),
                        '}, ',
                        '{"trait_type": "AI Model", "value": "',
                        _metadata.aiModel,
                        '"}, ',
                        '{"trait_type": "Verification Date", "value": ',
                        _metadata.verificationTimestamp.toString(),
                        '}, ',
                        '{"trait_type": "Status", "value": "Verified Authentic"}, ',
                        '{"trait_type": "IPFS Hash", "value": "',
                        _metadata.ipfsHash,
                        '"}',
                        ']}'
                    )
                )
            )
        );

        return string(abi.encodePacked("data:application/json;base64,", json));
    }

    /**
     * @notice Build token URI for revoked tokens
     * @param _tokenId Token ID
     * @return URI string
     */
    function _buildRevokedTokenURI(uint256 _tokenId) internal view returns (string memory) {
        string memory json = Base64.encode(
            bytes(
                string(
                    abi.encodePacked(
                        '{"name": "Revoked Certificate #',
                        _tokenId.toString(),
                        '", "description": "This authenticity certificate has been revoked.", ',
                        '"image": "',
                        _baseTokenURI,
                        'revoked.png", ',
                        '"attributes": [',
                        '{"trait_type": "Status", "value": "Revoked"}',
                        ']}'
                    )
                )
            )
        );

        return string(abi.encodePacked("data:application/json;base64,", json));
    }

    /**
     * @notice Set base URI (owner only)
     * @param _baseURI New base URI
     */
    function setBaseURI(string memory _baseURI) external onlyOwner {
        string memory oldBaseURI = _baseTokenURI;
        _baseTokenURI = _baseURI;
        
        emit BaseURIUpdated(oldBaseURI, _baseURI, block.timestamp);
    }

    /**
     * @notice Authorize/deauthorize minter (owner only)
     * @param _minter Minter address
     * @param _authorized Authorization status
     */
    function setAuthorizedMinter(
        address _minter,
        bool _authorized
    ) external onlyOwner {
        require(_minter != address(0), "Invalid minter address");
        authorizedMinters[_minter] = _authorized;
        
        emit MinterAuthorized(_minter, _authorized, block.timestamp);
    }

    /**
     * @notice Get contract statistics
     * @return totalMinted_ Total NFTs minted
     * @return totalRevoked_ Total NFTs revoked
     * @return totalActive Total active NFTs
     */
    function getStatistics() external view returns (
        uint256 totalMinted_,
        uint256 totalRevoked_,
        uint256 totalActive
    ) {
        return (totalMinted, totalRevoked, totalMinted - totalRevoked);
    }

    /**
     * @notice Check if NFT is valid (not revoked)
     * @param _tokenId Token ID
     * @return isValid Whether the NFT is valid
     */
    function isValidNFT(uint256 _tokenId) external view returns (bool) {
        if (!_exists(_tokenId)) {
            return false;
        }
        return !tokenMetadata[_tokenId].isRevoked;
    }

    /**
     * @notice Override _startTokenId to start from 1
     */
    function _startTokenId() internal pure override returns (uint256) {
        return 1;
    }

    /**
     * @notice Override transfer functions to prevent transfers of revoked tokens
     */
    function _beforeTokenTransfers(
        address from,
        address /* to */,
        uint256 startTokenId,
        uint256 quantity
    ) internal view override {
        // Allow minting (from == address(0))
        if (from == address(0)) {
            return;
        }

        // Check if any token in the range is revoked
        for (uint256 i = 0; i < quantity; i++) {
            uint256 tokenId = startTokenId + i;
            require(!tokenMetadata[tokenId].isRevoked, "Cannot transfer revoked NFT");
        }
    }

    /**
     * @notice Get base URI
     * @return Base URI string
     */
    function baseURI() external view returns (string memory) {
        return _baseTokenURI;
    }

    /**
     * @notice Check if contract supports interface
     * @param interfaceId Interface ID
     * @return Whether interface is supported
     */
    function supportsInterface(bytes4 interfaceId) public view virtual override returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    /**
     * @notice Get contract version
     * @return Version string
     */
    function version() external pure returns (string memory) {
        return "1.0.0";
    }
}

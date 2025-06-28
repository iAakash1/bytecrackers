// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title SimpleAuthenticityNFT
 * @dev A simplified NFT contract for testing compilation
 */
contract SimpleAuthenticityNFT is ERC721, Ownable {
    uint256 private _nextTokenId;
    
    constructor(address initialOwner) 
        ERC721("Authenticity Certificate", "AUTH") 
        Ownable(initialOwner)
    {
        _nextTokenId = 1;
    }
    
    function mint(address to) external onlyOwner returns (uint256) {
        uint256 tokenId = _nextTokenId++;
        _mint(to, tokenId);
        return tokenId;
    }
    
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_ownerOf(tokenId) != address(0), "Token does not exist");
        return "https://api.deepfake-checker.com/metadata/";
    }
}

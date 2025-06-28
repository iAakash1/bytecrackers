import { expect } from "chai";
import { ethers } from "hardhat";
import { AuthenticityRegistry, AuthenticityNFT } from "../typechain-types";

describe("AI Deepfake Authenticity Checker", function () {
  let authenticityRegistry: AuthenticityRegistry;
  let authenticityNFT: AuthenticityNFT;
  let owner: any;
  let addr1: any;
  let addr2: any;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();

    // Deploy AuthenticityRegistry
    const AuthenticityRegistryFactory = await ethers.getContractFactory("AuthenticityRegistry");
    authenticityRegistry = await AuthenticityRegistryFactory.deploy();
    await authenticityRegistry.waitForDeployment();

    // Deploy AuthenticityNFT
    const AuthenticityNFTFactory = await ethers.getContractFactory("AuthenticityNFT");
    authenticityNFT = await AuthenticityNFTFactory.deploy(
      "Authenticity Certificate",
      "AUTHENTIC",
      await authenticityRegistry.getAddress()
    );
    await authenticityNFT.waitForDeployment();

    // Set NFT contract in registry
    await authenticityRegistry.setNFTContract(await authenticityNFT.getAddress());
  });

  describe("Deployment", function () {
    it("Should deploy both contracts successfully", async function () {
      expect(await authenticityRegistry.getAddress()).to.be.properAddress;
      expect(await authenticityNFT.getAddress()).to.be.properAddress;
    });

    it("Should set the right owner", async function () {
      expect(await authenticityRegistry.owner()).to.equal(owner.address);
      expect(await authenticityNFT.owner()).to.equal(owner.address);
    });

    it("Should link contracts correctly", async function () {
      expect(await authenticityRegistry.nftContract()).to.equal(await authenticityNFT.getAddress());
    });
  });

  describe("Basic functionality", function () {
    it("Should allow verification submission", async function () {
      const ipfsHash = "QmTestHash123";
      const isAuthentic = true;
      const confidenceScore = 95;

      // This test will depend on your actual contract implementation
      // Uncomment and modify based on your contract's interface
      /*
      await expect(
        authenticityRegistry.submitVerification(ipfsHash, isAuthentic, confidenceScore)
      ).to.not.be.reverted;
      */
    });
  });
});

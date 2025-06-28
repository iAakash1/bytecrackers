import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.provider.getBalance(deployer.address)).toString());

  // Deploy AuthenticityNFT contract
  const AuthenticityNFT = await ethers.getContractFactory("AuthenticityNFT");
  const authenticityNFT = await AuthenticityNFT.deploy(
    "Authenticity Certificate", // name
    "AUTHENTIC", // symbol
    "https://api.deepfake-checker.com/metadata/", // baseURI
    deployer.address // initialOwner
  );

  await authenticityNFT.waitForDeployment();

  console.log("AuthenticityNFT deployed to:", await authenticityNFT.getAddress());

  // Deploy AuthenticityRegistry contract
  const AuthenticityRegistry = await ethers.getContractFactory("AuthenticityRegistry");
  const authenticityRegistry = await AuthenticityRegistry.deploy(
    "0x6E2dc0F9DB014aE19888F539E59285D2Ea04244C", // router (example address)
    1, // subscriptionId
    300000, // gasLimit
    ethers.encodeBytes32String("fun-ethereum-sepolia-1"), // donID
    "console.log('Hello from Chainlink Functions');", // sourceCode
    await authenticityNFT.getAddress(), // nftContract
    deployer.address // initialOwner
  );

  await authenticityRegistry.waitForDeployment();

  console.log("AuthenticityRegistry deployed to:", await authenticityRegistry.getAddress());

  console.log("Deployment completed successfully!");
  console.log("Registry:", await authenticityRegistry.getAddress());
  console.log("NFT:", await authenticityNFT.getAddress());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

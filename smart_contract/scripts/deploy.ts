import { ethers } from "hardhat";

async function main() {
   //previously was hre.ethers.getContractFactory("Marketplace")
   //https://hardhat.org/hardhat-runner/docs/getting-started#deploying-your-contracts
  const Marketplace = await ethers.getContractFactory("Marketplace");
  const marketplace = await Marketplace.deploy();

  await marketplace.deployed();

  console.log("Marketplace deployed to: ", marketplace.address);
}

const runMain = async () => {
  try {
    await main();
    process.exit(0) 
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

runMain();

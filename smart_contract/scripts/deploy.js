async function main() {
  const Marketplace = await hre.ethers.getContractFactory("Marketplace");
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

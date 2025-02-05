const { ethers, upgrades } = require("hardhat");
async function deployscript() {
  const OurImplementation = "OurImplementation";
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  const simpleFactoryContractAddress =
    "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
  try {
    const OurContractImplementation =
      await ethers.getContractFactory(OurImplementation);
    const proxy = await OurContractImplementation.deploy(
      simpleFactoryContractAddress
    );
    await proxy.waitForDeployment();
    console.log(`Deployement of OurImplementation Address : ${proxy.target}`);
  } catch (error) {
    console.log("Eroor", error);
  }
}

async function main() {
  await deployscript();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

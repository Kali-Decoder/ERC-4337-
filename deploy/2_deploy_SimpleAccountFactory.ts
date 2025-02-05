const { ethers } = require("hardhat");

async function deployScript() {
  const ContractName = "SimpleAccountFactory";
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  // Deploy EntryPoint Contract
  const EntryPoint = await ethers.getContractFactory("EntryPoint");
  const entryPoint = await EntryPoint.deploy();
  await entryPoint.waitForDeployment();  // Ensure deployment completes

  console.log("EntryPoint deployed at:", await entryPoint.getAddress());

  // Deploy SimpleAccountFactory Contract
  const SimpleAccountFactory = await ethers.getContractFactory(ContractName);
  const simpleAccountFactory = await SimpleAccountFactory.deploy(await entryPoint.getAddress());
  await simpleAccountFactory.waitForDeployment();  // Ensure deployment completes

  console.log("SimpleAccountFactory deployed at:", await simpleAccountFactory.getAddress());
}

async function main() {
  await deployScript();
}

main().catch((error) => {
  console.error("Error deploying contract:", error);
  process.exit(1);
});

// Deploying contracts with the account: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
// EntryPoint deployed at: 0x5FbDB2315678afecb367f032d93F642f64180aa3
// SimpleAccountFactory deployed at: 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
// Deployement of OurImplementation Address : 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512



// import { HardhatRuntimeEnvironment } from 'hardhat/types'
// import { DeployFunction } from 'hardhat-deploy/types'
// import { ethers } from 'hardhat';

// const deployEntryPoint: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
//   const provider = ethers.provider
//   const from = await provider.getSigner().getAddress()



// export default deployEntryPoint


const { ethers } = require("hardhat");

async function deployScript() {
  const ContractName = "EntryPoint";
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  // deploy Entry point Contract 
  const SALT = '0x90d8084deab30c2a37c45e8d47f49f2f7965183cb6990a98943ef94940681de3';
  
  const EntryPoint = await ethers.getContractFactory(ContractName);
  const entryPoint = await EntryPoint.deploy();
  console.log("EntryPoint address:", entryPoint.target);

}

async function main() {
  await deployScript();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

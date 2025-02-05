const { ethers } = require("hardhat");
const { keccak256, ethers: eth } = require("ethers");

async function deployScript() {
  const ContractName = "SimpleAccountFactory";
  const sender = new ethers.Wallet(
    "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
    ethers.provider
  );
  const signer = (await ethers.getSigners())[0];
  let privateKey =
    "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
  let wallet = new ethers.Wallet(privateKey);
  const SimpleAccountFactoryAddress =
    "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

  const ourImplementationAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

  const simpleAccountFactory = await ethers.getContractAt(
    ContractName,
    SimpleAccountFactoryAddress,
    sender
  );
  const owner = sender.address;
  const salt =
    "0x90d8084deab30c2a37c45e8d47f49f2f7965183cb6990a98943ef94940681de3";
  const result = await simpleAccountFactory.createAccount(owner, salt);

  const createdAddress = await simpleAccountFactory.getAddress(owner, salt);
  console.log("Account created at:", result, createdAddress);

  const balance = await ethers.provider.getBalance(createdAddress);
  console.log("Balance of created account:", balance.toString());

  const code = await ethers.provider.getCode(createdAddress);
  console.log("Code at created address:", code);

  const OurImplementation = "OurImplementation";
  const ourImplementation = await ethers.getContractAt(
    OurImplementation,
    ourImplementationAddress,
    sender
  );

  const iface = new ethers.Interface(["function incrementCounter()"]);

  // Encode function call data
  const data = iface.encodeFunctionData("incrementCounter", []);

  const hash = keccak256(data);
  const signature = await wallet.signMessage(hash);
  console.log("📝 Signature:", signature);

  // function to execute transaction
  const tx = await ourImplementation.executeTransaction(
    data,
    signature,
    sender.address,
    salt,
    { from: sender.address }
  );
  console.log("Transaction hash:", tx);

  let count = await ourImplementation.counter();
  console.log("Counter value:", count.toString());
}

async function main() {
  await deployScript();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

// Deploying contracts with the account: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
// EntryPoint deployed at: 0x5FbDB2315678afecb367f032d93F642f64180aa3
// SimpleAccountFactory deployed at: 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
// Deployement of OurImplementation Address : 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512

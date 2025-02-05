const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const { ethers, upgrades } = require("hardhat");

describe("SimpleAccountFactory & OurImplementation", function () {
  const initContract = async () => {
    const [owner, firstAccount, secondAccount] = await ethers.getSigners();

    const salt =
      "0x90d8084deab30c2a37c45e8d47f49f2f7965183cb6990a98943ef94940681de3";
    const EntryPoint = await ethers.getContractFactory("EntryPoint");
    const entryPoint = await EntryPoint.connect(owner).deploy();
    const entryPointAddress = await entryPoint.getAddress();

    const SimpleAccountFactory = await ethers.getContractFactory(
      "SimpleAccountFactory"
    );
    const simpleAccountFactory =
      await SimpleAccountFactory.connect(owner).deploy(entryPointAddress);
    const simpleAccountFactoryAddress = await simpleAccountFactory.getAddress();

    const OurContractImplementation =
      await ethers.getContractFactory("OurImplementation");
    const ourImplementation = await OurContractImplementation.connect(
      owner
    ).deploy(simpleAccountFactoryAddress);
    const ourImplementationAddress = await ourImplementation.getAddress();
    console.log("OurImplementation deployed at:", ourImplementationAddress);

    return {
      entryPoint,
      simpleAccountFactory,
      ourImplementation,
      owner,
      firstAccount,
      secondAccount,
      salt,
    };
  };

  describe("Simple Account Factory", function () {
    it("should create an account successfully", async function () {
      const { simpleAccountFactory, owner, salt } =
        await loadFixture(initContract);
      console.log(
        "SimpleAccountFactory deployed at:",
        simpleAccountFactory,
        owner.address,
        salt
      );
      // const result = await simpleAccountFactory.connect(owner).createAccount(owner.address, salt);
      // const createdAddress = await simpleAccountFactory.getAddress(owner.address, salt);
    });
  });
});

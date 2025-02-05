import "dotenv/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-verify";
import "@openzeppelin/hardhat-upgrades";

const ACCOUNTS = process.env.DEPLOYER_ACCOUNT_PRIV_KEY
  ? [`${process.env.DEPLOYER_ACCOUNT_PRIV_KEY}`]
  : [];

module.exports = {
  defaultNetwork: "hardhat",
  gasReporter: {
    enabled: false,
  },
  networks: {
    hardhat: { chainId: 31337 },
  },
  etherscan: {
    apiKey: {},
    customChains: [],
  },
  sourcify: {
    enabled: false,
  },
  solidity: {
    compilers: [
      {
        version: "0.8.26",
        settings: { optimizer: { enabled: true, runs: 1000 },evmVersion: "cancun" }
      },
      {
        version: "0.8.27",
        settings: { optimizer: { enabled: true, runs: 1000 },evmVersion: "cancun" }
      }
    ],
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  },
  allowUnlimitedContractSize: true,
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
};

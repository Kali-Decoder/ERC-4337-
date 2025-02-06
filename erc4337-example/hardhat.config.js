require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config()

module.exports = {
  solidity: {
    version: "0.8.22"
    ,
    settings: {
      evmVersion: 'shanghai',
      optimizer: {
        enabled: true,
        runs: 200 
      }
    }
  },
  networks: {
      hardhat: {
          chainId: 31337
      }   
  },

};

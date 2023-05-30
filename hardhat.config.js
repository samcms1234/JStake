require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 31337
    },
    goerli: {
      url: `${process.env.REACT_APP_URL}`,
      accounts: [ `${process.env.REACT_APP_PRIVATE_KEY}` ]
    },
    matic: {
      url: `${process.env.REACT_APP_MUMBAI_URL}`,
      accounts: [ `${process.env.REACT_APP_PRIVATE_KEY}` ],
      chainId: 80001,
    }
  },
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
};
require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.17",
  networks: {
    mumbai: {
      url: 'https://polygon-mumbai.g.alchemy.com/v2/GVBOM-y8kCcOjilvmnKhMYXRu87jfP2U',
      accounts: ['dac48d0db66d5d24b90ba467a50b7be7c88356101d200296e84eee0774e3c49e'],
    }
  }
};

/**
 * require("@nomicfoundation/hardhat-chai-matchers");
require("@nomiclabs/hardhat-ethers");
 */
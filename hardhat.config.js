require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require('hardhat-storage-layout');
require('hardhat-contract-sizer');

// Deployment related files
const fs = require('fs');
const mnemonic = fs.readFileSync(".secret").toString().trim();
const key = fs.readFileSync(".secret.key").toString().trim();
const bsc_api_key = fs.readFileSync(".secret.api.bsc").toString().trim();
const eth_api_key = fs.readFileSync(".secret.api.eth").toString().trim();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();
  
  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  
  solidity: {
    version: "0.6.12",
    settings: {
      optimizer: {
        enabled: true,
        runs: 100
      },
      outputSelection: {
        "*": {
          "*": ["storageLayout"],
        },
      },
    }
  },
  
  etherscan: {
    apiKey: bsc_api_key,
    // apiKey: eth_api_key,
  },
  api_keys: {
    bscscan: bsc_api_key,
    ethscan: eth_api_key
  },
  
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  
  mocha: {
    timeout: 20000
  },
  
  contractSizer: {
    alphaSort: true,
    runOnCompile: true,
    disambiguatePaths: false,
  },
  
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {},
    
    development: {
      url: "127.0.0.1",     // Localhost (default: none)
      port: 7545,            // Standard BSC port (default: none)
      network_id: "*",       // Any network (default: none)
      gas: 200000000000000,
    },
    
    bsc: {
      // provider: () => new HDWalletProvider(key, `https://bsc-dataseed1.binance.org`),
      url: 'https://bsc-dataseed1.binance.org',
      accounts: [key],
      network_id: 56,
      // confirmations: 10,
      // timeoutBlocks: 200,
      // skipDryRun: false,
      production: true,
    },
    
    
    // ethereum: {
    //   url: 'https://mainnet.infura.io/v3/2d2f04f0219d4072b586e1deeb0074fc',
    //   // wss: 'wss://mainnet.infura.io/ws/v3/2d2f04f0219d4072b586e1deeb0074fc',
    //   accounts: [key],
    //   // gasPrice: 40000000000,
    //   // gas: 1000000000000000,
    //   // gasMultiplier: 2,
    // },
    
    bsctest: {
      url: `https://data-seed-prebsc-1-s3.binance.org:8545/`,
      accounts: [key],
      network_id: 97,
    },
    
    ropsten: {
      url: 'https://ropsten.infura.io/v3/2d2f04f0219d4072b586e1deeb0074fc',
      accounts: [key],
      network_id: '3',
      // gasPrice: 44,
      // gas: 1000000000000000,
      allowUnlimitedContractSize: true
      
    },
    
    goerli: {
      url: 'https://goerli.infura.io/v3/2d2f04f0219d4072b586e1deeb0074fc',
      accounts: [key],
      network_id: '3',
      
    },
  },
}

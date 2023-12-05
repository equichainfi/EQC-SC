import "@nomicfoundation/hardhat-toolbox-viem";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "dotenv/config";
import "hardhat-contract-sizer";
import "hardhat-deploy";
import "hardhat-gas-reporter";
import "solidity-coverage";

const config = {
    solidity: {
        compilers: [
            {
                version: "0.8.23",
            },
            {
                version: "0.8.7",
            },
            {
                version: "0.4.24",
            },
        ],
    },
    defaultNetwork: "hardhat",
    networks: {
        hardhat: {
            // forking: {
            //   url: MAINNET_RPC_URL
            // }
            chainId: 31337,
        },
        localhost: {
            chainId: 31337,
        },
        mainnet: {
            url: process.env.MAINNET_RPC_URL,
            accounts:
                process.env.PRIVATE_KEY !== undefined
                    ? [process.env.PRIVATE_KEY]
                    : [],
            //   accounts: {
            //     mnemonic: MNEMONIC,
            //   },
            saveDeployments: true,
            chainId: 1,
        },
    },
    namedAccounts: {
        deployer: {
            default: 0,
            1: 0,
        },
        player: {
            default: 1,
        },
    },
    contractSizer: {
        runOnCompile: false,
        only: ["Marketplace"],
    },
    gasReporter: {
        enabled: process.env.REPORT_GAS,
        currency: "USD",
        outputFile: "gas-report.txt",
        noColors: true,
        coinmarketcap: process.env.COINMARKETCAP_API_KEY,
    },
    mocha: {
        timeout: 200000, // 200 seconds max for running tests
    },
};

export default config;

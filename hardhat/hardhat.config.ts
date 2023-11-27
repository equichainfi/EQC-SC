import "@nomicfoundation/hardhat-toolbox-viem";

const config = {
    solidity: {
        compilers: [
            {
                version: "0.8.23",
            },
            {
                version: "0.4.24",
            },
        ],
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
};

export default config;

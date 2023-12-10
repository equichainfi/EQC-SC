import { developmentChains } from "../../helper-hardhat-config";
import { ethers, network } from "hardhat";
import { assert, expect } from "chai";
import { describe } from "mocha";

if (!developmentChains.includes(network.name)) {
    console.log("skipping propertyNft tests");
    describe.skip("PropertyNft Unit Tests", function () {});
} else {
    let nft, deployer;

    beforeEach(async () => {
        let accounts = await ethers.getSigners();
        let deployer = accounts[0];
    });
}

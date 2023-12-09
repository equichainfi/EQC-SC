import { developmentChains } from "../../helper-hardhat-config";
import { network } from "hardhat";
import { assert, expect } from "chai";
import { describe } from "mocha";

if (!developmentChains.includes(network.name)) {
    console.log("skipping propertyNft tests");
    describe.skip("PropertyNft Unit Tests", function () {});
} else {
    
}

import { developmentChains } from "../../helper-hardhat-config";
import { network } from "hardhat";
import { assert, expect } from "chai";
import { describe } from "mocha";

if (!developmentChains.includes(network.name)) {
    console.log("skipping propertyToken tests");
    describe.skip("PropertyToken Unit Tests", function () {});
} else {
    
}

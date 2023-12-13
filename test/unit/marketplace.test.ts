import { network } from "hardhat";
import { developmentChains } from "../../helper-hardhat-config";
import { log } from "console";

if (!developmentChains.includes(network.name)) {
    console.log("skipping marketplace tests");
    describe.skip("Marketplace Unit Tests", function () {});
} else {
    describe("================= Marketplace Unit Tests =================", function () {
        describe("Constructor", function () {
            it("Should deploy and set the owner", async function () {});
        });
    });
}

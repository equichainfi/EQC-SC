import { assert } from "chai";
import { network, deployments, ethers } from "hardhat";
import { developmentChains } from "../../helper-hardhat-config";
import { PropertyNft, PropertyNft__factory } from "../../typechain-types";

if (!developmentChains.includes(network.name)) {
    console.log("skipping propertyNft tests");
    describe.skip("PropertyNft Unit Tests", function () {});
} else {
    describe("================= PropertyNft Unit Tests =================", async function () {
        let nft: PropertyNft;
        const nftDeployer: string =
            "0x9a116E22E1247B8cbEb4693B2BcF20c21C477394";
        const nftName: string = "PropertyNft";
        const nftSymbol: string = "PNFT";

        beforeEach(async (): Promise<void> => {
            
        });

        describe("Constructor", async function () {
            it("Initializes the contract correctly", async (): Promise<void> => {});
        });

        describe("Mint", async function () {});
    });
}

/** TODO
 * 1. get all signers + deployer
 * 2. Test contract initialization
 */

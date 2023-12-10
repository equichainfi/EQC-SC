import { developmentChains } from "../../helper-hardhat-config";
import { ethers, network, deployments } from "hardhat";
import { assert, expect } from "chai";
import { describe } from "mocha";
import { PropertyNft, PropertyNft__factory } from "../../typechain-types";

if (!developmentChains.includes(network.name)) {
    console.log("skipping propertyNft tests");
    describe.skip("PropertyNft Unit Tests", function () {});
} else {
    describe("================= PropertyNft Unit Tests =================", function (): void {
        let nft: PropertyNft, deployer;

        beforeEach(async (): Promise<void> => {
            nft = (await ethers
                .getContractFactory("PropertyNft")
                .then((contract: PropertyNft__factory) =>
                    contract.deploy(
                        "0x9a116E22E1247B8cbEb4693B2BcF20c21C477394",
                        "PropertyNft",
                        "PNFT",
                    ),
                )) as PropertyNft;
            await nft.deployed();

            nft.signer.getAddress().then((address) => {
                deployer = address;
            });
        });

        describe("Constructor", () => {
            it("Initializes the contract", async () => {
                const name: string = await nft.name();
                const symbol: string = await nft.symbol();
                const initialOwner: string = await nft.ownerOf(0);
            });
        });
    });
}

/** TODO
 * 1. get all signers + deployer
 * 2. Test contract initialization
 */
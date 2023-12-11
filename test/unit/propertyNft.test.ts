import { assert } from "chai";
import { ethers, network } from "hardhat";
import { describe } from "mocha";
import { developmentChains } from "../../helper-hardhat-config";
import { PropertyNft, PropertyNft__factory } from "../../typechain-types";

if (!developmentChains.includes(network.name)) {
    console.log("skipping propertyNft tests");
    describe.skip("PropertyNft Unit Tests", function () {});
} else {
    describe("================= PropertyNft Unit Tests =================", function (): void {
        // let nft: PropertyNft;
        let nft: any, Nft: any;

        const nftDeployer: string =
            "0x9a116E22E1247B8cbEb4693B2BcF20c21C477394";
        const nftName: string = "PropertyNft";
        const nftSymbol: string = "PNFT";

        beforeEach(async (): Promise<void> => {
            // nft = (await ethers
            //     .getContractFactory("PropertyNft")
            //     .then((contract: PropertyNft__factory) =>
            //         contract.deploy(nftName, nftSymbol, nftDeployer),
            //     )) as PropertyNft;
            Nft = await ethers.getContractFactory("PropertyNft");
            nft = Nft.deploy(nftName, nftSymbol, nftDeployer);
        });

        describe("Constructor", (): void => {
            it("Initializes the contract", async (): Promise<void> => {
                const name: string = await nft.name();
                const symbol: string = await nft.symbol();
                const initialOwner: string = await nft.ownerOf(0);

                assert.equal(name, nftName);
                assert.equal(symbol, nftSymbol);
                assert.equal(initialOwner, nftDeployer);
            });
        });
    });
}

/** TODO
 * 1. get all signers + deployer
 * 2. Test contract initialization
 */

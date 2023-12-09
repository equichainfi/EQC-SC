import fs from "fs-extra";
import { ethers, network } from "hardhat";
import {
    frontEndAbiLocations,
    frontEndContractsFile,
} from "../helper-hardhat-config";
import { PropertyNft__factory } from "../typechain-types";

/**
 * @notice Updates the frontend contract information
 * @dev This function is only called when the UPDATE_FRONTEND environment variable is set to true
 */
export default async function updateFrontend(): Promise<void> {
    if (process.env.UPDATE_FRONTEND) {
        console.log("[ Updating frontend contract information ]");

        await updateContractAddresses();
        await updateAbi();

        console.log("[ Frontend contract information updated ] ✅");
    }
}

/**
 * @notice Updates the frontend contract abi
 */
async function updateAbi() {
    /// @dev 1. Deploy the contracts to get the abi
    const NftMarketplace = await ethers.getContractFactory("NftMarketplace");
    const nftMarketplace = await NftMarketplace.deploy();
    await nftMarketplace.deployed();

    /// @dev 2. Write the abi to the frontend abi locations
    const abiStringToNftMarketplace: any = nftMarketplace.interface.format(
        ethers.utils.FormatTypes.json,
    );

    fs.writeFileSync(
        `${frontEndAbiLocations}NftMarketplace.json`,
        abiStringToNftMarketplace,
    );

    const PropertyNft: PropertyNft__factory =
        await ethers.getContractFactory("PropertyNft");
    const propertyNft = await PropertyNft.deploy(
        nftMarketplace.address,
        "Property Nft",
        "PNFT",
    );
    await propertyNft.deployed();

    const abiStringToPropertyNft: any = nftMarketplace.interface.format(
        ethers.utils.FormatTypes.json,
    );

    fs.writeFileSync(
        `${frontEndAbiLocations}PropertyNft.json`,
        abiStringToPropertyNft,
    );
}

/**
 * @notice Updates the contract addresses in the frontend contracts file
 */
async function updateContractAddresses() {
    const chainId: string = network.config.chainId?.toString() ?? "";
    const NftMarketplace = await ethers.getContractFactory("NftMarketplace");
    const nftMarketplace = await NftMarketplace.deploy();
    await nftMarketplace.deployed();

    const contractAddresses = JSON.parse(
        fs.readFileSync(frontEndContractsFile, "utf8"),
    );

    /**
     * @notice If the chainId is already in the contractAddresses object, then push the new contract address to the array
     */
    if (chainId in contractAddresses) {
        if (
            !contractAddresses[chainId]["NftMarketplace"].includes(
                nftMarketplace.address,
            )
        ) {
            contractAddresses[chainId]["NftMarketplace"].push(
                nftMarketplace.address,
            );
        }
    } else {
        contractAddresses[chainId] = {
            NftMarketplace: [nftMarketplace.address],
        };
    }

    fs.writeFileSync(frontEndContractsFile, JSON.stringify(contractAddresses));
}

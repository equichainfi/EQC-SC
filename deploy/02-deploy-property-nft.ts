import { network } from "hardhat";
import {
    developmentChains,
    VERIFICATION_BLOCK_CONFIRMATIONS,
} from "../helper-hardhat-config";
import { verify } from "../utils/verify";

export default async function deployPropertyNft({
    getNamedAccounts,
    deployments,
}: {
    getNamedAccounts: any;
    deployments: any;
}): Promise<void> {
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();
    const waitBlockConfirmations: number = developmentChains.includes(
        network.name,
    )
        ? 1
        : VERIFICATION_BLOCK_CONFIRMATIONS;

    log("[ Deploying Property ]");

    // todo check if this is correct
    const args: string[] = [
        "0x9a116E22E1247B8cbEb4693B2BcF20c21C477394",
        "PropertyNft",
        "PNFT",
    ];

    const propertyNft = await deploy("PropertyNft", {
        from: deployer,
        args,
        log: true,
        waitBlockConfirmations,
    });

    if (
        !developmentChains.includes(network.name) &&
        process.env.ETHERSCAN_API_KEY
    ) {
        log("[ Verifying PropertyNft contract on Etherscan ]");

        await verify(propertyNft.address, args);
    }

    log("[ PropertyNft deployed ] ✅");
}

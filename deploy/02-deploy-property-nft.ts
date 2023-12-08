import { network } from "hardhat";
import { Network } from "hardhat/types";
import {
    developmentChains,
    VERIFICATION_BLOCK_CONFIRMATIONS,
} from "../helper-hardhat-config";
import verify from "../utils/verify";

export default async function deployProperty({
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

    log(
        "=========================== Deploying Property ===========================",
    );

    const args: any[] = [];

    const propertyNft: any = await deploy("PropertyNft", {
        from: deployer,
        args,
        log: true,
        waitBlockConfirmations,
    });

    if (
        !developmentChains.includes(network.name) &&
        process.env.ETHERSCAN_API_KEY
    ) {
        log("Verifying PropertyNft contract on Etherscan");

        await verify(propertyNft.address, args);
    }

    log(
        "=========================== Property Deployed ===========================",
    );
}

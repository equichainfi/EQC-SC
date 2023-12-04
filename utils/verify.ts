import { run } from "hardhat";

/**
 * @augments address The address of the contract to verify
 * @augments constructorArguments The constructor arguments of the contract
 */

export default async function verify(
    address: string,
    constructorArguments: any[],
): Promise<void> {
    console.log("Verifying contract...");

    try {
        await run("verify:verify", {
            address,
            constructorArguments,
        });
    } catch (error: any) {
        if (error.message.includes("Contract source code already verified")) {
            console.log("Contract already verified");
        } else {
            console.log(error);
        }
    }
}
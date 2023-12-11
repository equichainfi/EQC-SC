import { run } from "hardhat";
import { log } from "console";
import { Verify } from "../types/functions";

/**
 * @augments address The address of the contract to verify
 * @augments constructorArguments The constructor arguments of the contract
 */

export const verify: Verify = async (address, constructorArguments) => {
    log("[ Veryfing ]");

    try {
        await run("verify:verify", {
            address,
            constructorArguments,
        });
        log("[ Contract verified ] ✅");
    } catch (error: any) {
        if (error.message.includes("Contract source code already verified")) {
            log("[ Contract already verified ] ✅");
        } else {
            log("❌ [ ERROR ] ❌" + error);
        }
    }
};

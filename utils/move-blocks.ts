import { network } from "hardhat";
import { MoveBlocks, Sleep } from "../types/functions";

const sleep: Sleep = (timeInMs) => {
    return new Promise((resolve) => setTimeout(resolve, timeInMs));
};

export const moveBlocks: MoveBlocks = async (amount, sleepAmount = 0) => {
    console.log("[ Moving blocks ]");
    for (let index: number = 0; index < amount; index++) {
        await network.provider.request({ method: "evm_mine", params: [] });
        if (sleepAmount) {
            console.log(`[ Sleeping for ${sleepAmount} ]`);
            await sleep(sleepAmount);
        }
    }
    console.log(`[ Moved ${amount} blocks ] ✅`);
};

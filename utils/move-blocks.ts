import { network } from "hardhat";

function sleep(timeInMs: number): Promise<unknown> {
    return new Promise((resolve) => setTimeout(resolve, timeInMs));
}

export default async function moveBlocks(
    amount: number,
    sleepAmount: number = 0,
): Promise<number> {
    console.log("Moving blocks...");
    for (let index = 0; index < amount; index++) {
        await network.provider.request({ method: "evm_mine", params: [] });
        if (sleepAmount) {
            console.log(`Sleeping for ${sleepAmount}`);
            await sleep(sleepAmount);
        }
    }
    console.log(`Moved ${amount} blocks`);
    return amount;
}

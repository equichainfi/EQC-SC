export type Verify = (
    address: string,
    constructorArguments: string[],
) => Promise<void>;

export type MoveBlocks = (
    amount: number,
    sleepAmount?: number,
) => Promise<void>;

export type Sleep = (timeInMs: number) => Promise<unknown>;

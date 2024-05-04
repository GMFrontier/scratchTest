export function divideListByChunks<T>(inputArray: T[], chunkSize: number): T[][] {
     const tempArray: T[][] = [];

    for (let index = 0; index < inputArray.length; index += chunkSize) {
        const myChunk: T[] = inputArray.slice(index, index + chunkSize);
        tempArray.push(myChunk);
    }

    return tempArray;
}


export async function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}
import path from 'path';
import { displayDeepObject, solveWithLogs } from '../utils/logs';
import { readInput } from '../utils/readFile';

// ------------------------------
// Problem input and test inputs
// ------------------------------

type Input = string[];
export const TEST_INPUT: Input = `30373
25512
65332
33549
35390`.split('\n');
export const INPUT: Input = readInput(path.resolve(__dirname, './input.txt')).split('\n');

// -------------------
// Your functions here
// -------------------

type Tree = { height: number, visible?: boolean };
type TreeMap = Tree[][];

const scanTree = (tree: Tree, currentHeighest: number): number => {
    if (tree.visible) return -1;
    if (tree.height > currentHeighest) {
        tree.visible = true;
        currentHeighest = tree.height;
    }

    return currentHeighest;
}

export const countVisibleTrees = (input: Input): number => {
    const treeMap: TreeMap = input.map((line) => line.split('').map((char) => ({ height: +char })));
    let visibleTrees = 0;

    // Line by line
    for (let i = 0; i < treeMap.length; i++) {
        // Visible from the left
        let currentHeighest = -1;
        for (let j = 0; j < treeMap[0].length; j++) {
            const newHeighest = scanTree(treeMap[i][j], currentHeighest);
            if (newHeighest < 0) break;
            if (newHeighest > currentHeighest) {
                visibleTrees++;
                currentHeighest = newHeighest;
            }
        }
        // Visible from the right
        currentHeighest = -1;
        for (let j = treeMap[0].length - 1; j >= 0 ; j--) {
            const newHeighest = scanTree(treeMap[i][j], currentHeighest);
            if (newHeighest < 0) break;
            if (newHeighest > currentHeighest) {
                visibleTrees++;
                currentHeighest = newHeighest;
            }
        }
    }

    // Column by column
    for (let j = 0; j < treeMap[0].length; j++) {
        // Visible from the top
        let currentHeighest = -1;
        for (let i = 0; i < treeMap.length; i++) {
            const newHeighest = scanTree(treeMap[i][j], currentHeighest);
            if (newHeighest < 0) break;
            if (newHeighest > currentHeighest) {
                visibleTrees++;
                currentHeighest = newHeighest;
            }
        }
        // Visible from the bottom
        currentHeighest = -1;
        for (let i = treeMap.length - 1; i >= 0; i--) {
            const newHeighest = scanTree(treeMap[i][j], currentHeighest);
            if (newHeighest < 0) break;
            if (newHeighest > currentHeighest) {
                visibleTrees++;
                currentHeighest = newHeighest;
            }
        }
    }

    console.log(treeMap.map((line) => line.map(({ visible }) => visible ? '1' : '0').join('')).join('\n'));

    return visibleTrees;
}

// -------------
// Solve problem
// -------------

const solve1 = (): string | number => countVisibleTrees(INPUT);

// const solve2 = (): string | number => {
//     return '';
// };

// ---------------
// Display answers
// ---------------

solveWithLogs(solve1, 1);
// 1640 => Too low

// solveWithLogs(solve2, 2);

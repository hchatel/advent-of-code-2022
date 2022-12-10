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

type Tree = { height: number, visible?: boolean, score?: number };
type TreeMap = Tree[][];

const buildTreeMap = (input: Input): TreeMap =>
    input.map((line) => line.split('').map((char) => ({ height: +char })));

const scanTree = (tree: Tree, currentHeighest: number): number => {
    if (tree.height > currentHeighest) {
        tree.visible = true;
        currentHeighest = tree.height;
    }

    return currentHeighest;
}

export const countVisibleTrees = (input: Input): number => {
    const treeMap: TreeMap = buildTreeMap(input);

    // Line by line
    for (let i = 0; i < treeMap.length; i++) {
        // Visible from the left
        let currentHeighest = -1;
        for (let j = 0; j < treeMap[0].length; j++) {
            const newHeighest = scanTree(treeMap[i][j], currentHeighest);
            if (newHeighest < 0) break;
            currentHeighest = newHeighest;
        }
        // Visible from the right
        currentHeighest = -1;
        for (let j = treeMap[0].length - 1; j >= 0 ; j--) {
            const newHeighest = scanTree(treeMap[i][j], currentHeighest);
            if (newHeighest < 0) break;
            currentHeighest = newHeighest;
        }
    }

    // Column by column
    for (let j = 0; j < treeMap[0].length; j++) {
        // Visible from the top
        let currentHeighest = -1;
        for (let i = 0; i < treeMap.length; i++) {
            const newHeighest = scanTree(treeMap[i][j], currentHeighest);
            if (newHeighest < 0) break;
            currentHeighest = newHeighest;
        }
        // Visible from the bottom
        currentHeighest = -1;
        for (let i = treeMap.length - 1; i >= 0; i--) {
            const newHeighest = scanTree(treeMap[i][j], currentHeighest);
            if (newHeighest < 0) break;
            currentHeighest = newHeighest;
        }
    }

    // console.log(treeMap.map((line) => line.map(({ visible }) => visible ? '1' : '0').join('')).join('\n'));

    return treeMap.reduce((sum, line) => sum + line.reduce((lineSum, { visible }) => lineSum + (visible ? 1 : 0), 0), 0);
};

const computeTreeScenicScore = (tree: TreeMap, I: number, J: number): number => {
    const height = tree[I][J].height
    let scenicScore = 1;
    let treeView = 0;
    for (let i = I - 1; i >= 0; i--) {
        treeView++;
        if (tree[i][J].height >= height) break;
    }
    scenicScore *= treeView;
    treeView = 0;
    for (let i = I + 1; i < tree.length; i++) {
        treeView++;
        if (tree[i][J].height >= height) break;
    }
    scenicScore *= treeView;
    treeView = 0;
    for (let j = J - 1; j >= 0; j--) {
        treeView++;
        if (tree[I][j].height >= height) break;
    }
    scenicScore *= treeView;
    treeView = 0;
    for (let j = J + 1; j < tree[0].length; j++) {
        treeView++;
        if (tree[I][j].height >= height) break;
    }
    scenicScore *= treeView;
    tree[I][J].score = scenicScore;

    return scenicScore;
}

export const computeScenicScore = (input: Input): number => {
    const treeMap: TreeMap = buildTreeMap(input);
    let highestScenicScore = 0;

    for (let i = 1; i < treeMap.length - 1; i++) {
        for (let j = 1; j < treeMap[0].length - 1; j++) {
            highestScenicScore = Math.max(
                highestScenicScore, 
                computeTreeScenicScore(treeMap, i, j),
            );
        }
    }

    return highestScenicScore;
};

// -------------
// Solve problem
// -------------

const solve1 = (): string | number => countVisibleTrees(INPUT);

const solve2 = (): string | number => computeScenicScore(INPUT);

// ---------------
// Display answers
// ---------------

// solveWithLogs(solve1, 1);
// 1640 => Too low
// 1807 => Yeah !

solveWithLogs(solve2, 2);
// 480000 => Yeah !

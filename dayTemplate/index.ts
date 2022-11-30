import path from 'path';
import { solveWithLogs } from '../utils/logs';
import { readInput } from '../utils/readFile';

// ------------------------------
// Problem input and test inputs
// ------------------------------

export const TEST_INPUT = ``;
export const INPUT = readInput(path.resolve(__dirname, './input.txt'));

// -------------------
// Your functions here
// -------------------

// -------------
// Solve problem
// -------------

const solve1 = (): string | number => {
    return '';
};

// const solve2 = (): string | number => {
//     return '';
// };

// ---------------
// Display answers
// ---------------

solveWithLogs(solve1, 1);
// solveWithLogs(solve2, 2);

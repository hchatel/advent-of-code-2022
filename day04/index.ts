import path from 'path';
import { solveWithLogs } from '../utils/logs';
import { readInput } from '../utils/readFile';

// ------------------------------
// Problem input and test inputs
// ------------------------------

type Input = string[];
export const TEST_INPUT: Input = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`.split('\n');
export const INPUT: Input = readInput(path.resolve(__dirname, './input.txt')).split('\n');

// -------------------
// Your functions here
// -------------------

export const countFullOverlaps = (input: Input): number => input.reduce((sum, pair) => {
    const [a, b, A, B] = pair.split(/[-,]/).map((s) => +s);

    return sum + ((a === A || b === B || (a > A && b < B) || ( a < A && b > B)) ? 1 : 0);
}, 0);

export const countOverlaps = (input: Input): number => input.reduce((sum, pair) => {
    const [a, b, A, B] = pair.split(/[-,]/).map((s) => +s);

    return sum + (((a >= A && a <= B) || ( b >= A && b <= B) || (a < A && b > B)) ? 1 : 0);
}, 0);

// -------------
// Solve problem
// -------------

const solve1 = (): string | number => countFullOverlaps(INPUT);

const solve2 = (): string | number => countOverlaps(INPUT);

// ---------------
// Display answers
// ---------------

solveWithLogs(solve1, 1);
// 590 => Forgot to test with multiple digit numbers => forgot to cast string to number
// 571 => Yeah !

solveWithLogs(solve2, 2);
// 908 => Too low, forgot some tests and to cast some strings into numbers => start by map((s) => +s) on all strings to avoid mistakes
// 917 => Yeah !

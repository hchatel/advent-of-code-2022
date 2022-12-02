import path from 'path';
import { solveWithLogs } from '../utils/logs';
import { readInput } from '../utils/readFile';

// ------------------------------
// Problem input and test inputs
// ------------------------------

export const TEST_INPUT = `A Y
B X
C Z
`;
export const INPUT = readInput(path.resolve(__dirname, './input.txt'));

// -------------------
// Your functions here
// -------------------

// Rock (A,X): 1, Paper(B,Y) 2, Cisor(C,Z) 3
// Win: 6, Draw: 3, Loss: 0

// Figure + Score
const scoreMap = {
    "A X": 1 + 3,
    "A Y": 2 + 6,
    "A Z": 3 + 0,
    "B X": 1 + 0,
    "B Y": 2 + 3,
    "B Z": 3 + 6,
    "C X": 1 + 6,
    "C Y": 2 + 0,
    "C Z": 3 + 3,
};

const computeScore = (input: string): number => input.split('\n').reduce((sum, pair) => pair ? sum +  scoreMap[pair] : sum, 0);

// X: Loss (0), Y: Draw (3), Z: Win (6)

// Score + Figure
const scoreMap2 = {
    "A X": 0 + 3,
    "A Y": 3 + 1,
    "A Z": 6 + 2,
    "B X": 0 + 1,
    "B Y": 3 + 2,
    "B Z": 6 + 3,
    "C X": 0 + 2,
    "C Y": 3 + 3,
    "C Z": 6 + 1,
};

const computeScore2 = (input: string): number => input.split('\n').reduce((sum, pair) => pair ? sum +  scoreMap2[pair] : sum, 0);

// -------------
// Solve problem
// -------------

const solve1 = (): string | number => computeScore(INPUT);

const solve2 = (): string | number => computeScore2(INPUT);

// ---------------
// Display answers
// ---------------

// solveWithLogs(solve1, 1); 
// 14375 => Yeah !

solveWithLogs(solve2, 2);
// 10154 => Too low

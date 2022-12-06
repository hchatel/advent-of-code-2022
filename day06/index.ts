import path from 'path';
import { solveWithLogs } from '../utils/logs';
import { readInput } from '../utils/readFile';

// ------------------------------
// Problem input and test inputs
// ------------------------------

type Input = string;
export const TEST_INPUT: Input = `mjqjpqmgbljsphdztnvjfqwrcgsmlb`;
export const INPUT: Input = readInput(path.resolve(__dirname, './input.txt'));

// -------------------
// Your functions here
// -------------------

export const detectMarker = (input: string, consecutiveNb = 4): number => {
    const map = {};
    let differentChars = 0;
    for (let i = 0; i < input.length; i++) {
        const newChar = input.charAt(i);
        // Add new char
        if (map[newChar]) {
            map[newChar] += 1;
        } else {
            map[newChar] = 1;map[newChar]
            differentChars += 1;
        }
        // Remove oldest char
        if (i >= consecutiveNb) {
            const oldChar = input.charAt(i - consecutiveNb);
            map[oldChar] -= 1
            if (!map[oldChar]) differentChars -= 1;
        }
        
        if (differentChars === consecutiveNb) return i + 1;
    }
}

// -------------
// Solve problem
// -------------

const solve1 = (): string | number => detectMarker(INPUT);

const solve2 = (): string | number => detectMarker(INPUT, 14);

// const solve2 = (): string | number => {
//     return '';
// };

// ---------------
// Display answers
// ---------------

// solveWithLogs(solve1, 1);
// 1702

solveWithLogs(solve2, 2);

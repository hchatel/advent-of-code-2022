import { TEST_INPUT_2 } from 'day09';
import path from 'path';
import { solveWithLogs } from '../utils/logs';
import { readInput } from '../utils/readFile';

// ------------------------------
// Problem input and test inputs
// ------------------------------

type Input = string[];
export const TEST_INPUT: Input = `498,4 -> 498,6 -> 496,6
503,4 -> 502,4 -> 502,9 -> 494,9`.split('\n');
export const INPUT: Input = readInput(path.resolve(__dirname, './input.txt')).split('\n');

// -------------------
// Your functions here
// -------------------

type Map = Record<string, '#' | 'o'>;

const getRockMap = (input: Input): { map: Map; minX: number; maxX: number; maxY: number } => {
    const map: Map = {};
    let minX = 500;
    let maxX = 500;
    let maxY = 0;

    input.forEach((rockStructure) => {
        const rockLines = rockStructure.split(' -> ');
        let A = rockLines[0].split(',').map((v) => +v);
        minX = Math.min(A[0], minX);
        maxX = Math.max(A[0], maxX);
        maxY = Math.max(A[1], maxY);
        for (let i = 1; i < rockLines.length; i++) {
            const B = rockLines[i].split(',').map((v) => +v);
            minX = Math.min(B[0], minX);
            maxX = Math.max(B[0], maxX);
            maxY = Math.max(B[1], maxY);
            const start = (A[0] < B[0] || A[1] < B[1]) ? A : B;
            const stop = A === start ? B : A;
            for (let x = start[0]; x <= stop[0]; x++) {
                for (let y = start[1]; y <= stop[1]; y++) {
                    map[`${x},${y}`] = '#';
                }
            }
            A = B;
        }
    });

    return {
        map,
        minX,
        maxX,
        maxY,
    }
}

const dropSandGrain = (map: Map, minX: number, maxX: number, maxY: number, yLimit?: number): boolean => {
    let position = [500, 0];

    while (yLimit ? !map['500,0'] : (position[0] >= minX && position[0] <= maxX && position[1] < maxY)) {
        if (yLimit && position[1] + 1 === yLimit) {
            map[`${position[0]},${position[1]}`] = 'o';
            return true;
        }
        if (!map[`${position[0]},${position[1] + 1}`]) {
            position[1]++;
        } else if (!map[`${position[0] - 1},${position[1] + 1}`]) {
            position[0]--;
            position[1]++;
        } else if (!map[`${position[0] + 1},${position[1] + 1}`]) {
            position[0]++;
            position[1]++;
        } else {
            map[`${position[0]},${position[1]}`] = 'o';
            return true;
        }
    }
    return false;
}

const countRestingSand = (input: Input, untilBlocked = false) => {
    const { map, maxX, minX, maxY } = getRockMap(input);
    let restedSandGrain = 0;

    while (dropSandGrain(map, minX, maxX, maxY, untilBlocked && maxY + 2)) {
        restedSandGrain++;
    }

    return restedSandGrain;
}

// -------------
// Solve problem
// -------------

const solve1 = (): string | number => countRestingSand(INPUT);
const solve2 = (): string | number => countRestingSand(INPUT, true);

// ---------------
// Display answers
// ---------------

solveWithLogs(solve1, 1);
// TEST_INPUT => 24
// 825 => YEAH !

solveWithLogs(solve2, 2);
// TEST_INPUT => 93
// 26729 => Yeah !

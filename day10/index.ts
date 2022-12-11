import path from 'path';
import { solveWithLogs } from '../utils/logs';
import { readInput } from '../utils/readFile';

// ------------------------------
// Problem input and test inputs
// ------------------------------

type Input = string[];
export const TEST_INPUT: Input = `noop
addx 3
addx -5`.split('\n');
export const TEST_INPUT_2: Input = readInput(path.resolve(__dirname, './test-input.txt')).split('\n');
export const INPUT: Input = readInput(path.resolve(__dirname, './input.txt')).split('\n');

// -------------------
// Your functions here
// -------------------

const computeSignalStrength = (input: Input): number => {
    let cycle = 0;
    let register = 1;
    let signalStrengthSum = 0;
    for (let i = 0; i < input.length; i++) {
        const [command, value] = input[i].split(' ');
        const cycles = command === 'noop' ? 1 : 2;
        for (let c = 0; c < cycles; c++) {
            cycle++;
            if (!((cycle - 20) % 40)) {
                console.log({ cycle, register });
                signalStrengthSum += cycle * register;
            }1
        }
        if (value) register += +value;
    }
    
    return signalStrengthSum;
}

const drawCRT = (input: Input): string => {
    let cycle = 1;
    let register = 1;
    let CRTLines = [];
    let pixels = [];
    for (let i = 0; i < input.length; i++) {
        const [command, value] = input[i].split(' ');
        const cycles = command === 'noop' ? 1 : 2;
        for (let c = 0; c < cycles; c++) {
            const modulo = cycle % 40;
            pixels.push((modulo - 1 < register - 1 || modulo - 1 > register + 1) ? '.' : '#');
            // console.log({ modulo, register }, pixels.join(''))
            if (!modulo) {
                CRTLines.push(pixels.join(''));
                pixels = [];
            }
            cycle++;
        }
        if (value) register += +value;
    }
    
    return `\n${CRTLines.join('\n')}`;
}

// -------------
// Solve problem
// -------------

const solve1 = (): string | number => computeSignalStrength(INPUT);

const solve2 = (): string | number => drawCRT(INPUT);

// ---------------
// Display answers
// ---------------

solveWithLogs(solve1, 1);
// 13440 => Yeah !

solveWithLogs(solve2, 2);
// PBZGRAZA

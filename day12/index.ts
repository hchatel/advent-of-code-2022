import path from 'path';
import { solveWithLogs } from '../utils/logs';
import { readInput } from '../utils/readFile';

// ------------------------------
// Problem input and test inputs
// ------------------------------

type Input = string[];
export const TEST_INPUT: Input = `Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi`.split('\n');
export const INPUT: Input = readInput(path.resolve(__dirname, './input.txt')).split('\n');

// -------------------
// Your functions here
// -------------------

type Map = number[][];
type Position = [number, number];
interface StepsCell {
    pos: Position;
    steps: number;
}

const parseInput = (input: Input): Map => input.map((line) => line.split('').map((char) => {
    if (char === 'S') return 0;
    if (char === 'E') return 26;
    
    return char.charCodeAt(0) - 96;
}));

const findStartPosition = (input: Input): Position => {
    for (let i = 0; i < input.length; i++) {
        for (let j = 0; j < input.length; j++) {
            if (input[i].charAt(j) === 'S') return [i, j];
        }
    }

    return [0, 0];
}

const findPositionInOrderedArray = <T>(input: T[], callback: (value: T) => boolean): number => {
    for (let i = input.length - 1; i >= 0; i--) {
        if (callback(input[i])) {
            return i + 1;
        }
    }

    return 0;
};

const findPathSteps = (input: Input, multiStart = false): number => {
    const heightMap = parseInput(input);
    const stepsMap: Map = Array.from({ length: input.length }, () => new Array(input[0].length));
    const startPosition = findStartPosition(input);
    stepsMap[startPosition[0]][startPosition[1]] = 0;
    const positionsToinspect: StepsCell[] = [{ pos: startPosition, steps: 0 }];

    while (positionsToinspect.length) {
        const { pos: [currentI, currentJ], steps: prevSteps } = positionsToinspect.shift();

        for (let i = Math.max(0, currentI - 1); i <= Math.min(heightMap.length - 1, currentI + 1); i++) {
            for (let j = Math.max(0, currentJ - 1); j <= Math.min(heightMap[0].length - 1, currentJ + 1); j++) {
                if (Math.abs((i - j) % 2) !== Math.abs((currentI - currentJ) % 2)) {
                    const currentSteps = prevSteps + ((multiStart && heightMap[i][j] === 1) ? 0 :  1);

                    if (heightMap[i][j] <= heightMap[currentI][currentJ] + 1) {
                        if (input[i].charAt(j) === 'E') return currentSteps;
                        
                        if (undefined === stepsMap[i][j] || currentSteps < stepsMap[i][j]) {
                            stepsMap[i][j] = currentSteps;
                            const insertIndex = findPositionInOrderedArray(
                                positionsToinspect,
                                ({ steps }) => steps <= currentSteps,
                            );
                            positionsToinspect.splice(insertIndex, 0, { pos: [i, j], steps: currentSteps });
                        }
                    }
                }
            }
        }
    }

    // console.log(heightMap.map((line) => line.join('\t')).join('\n'), '\n');
    // console.log(stepsMap.map((line) => line.join('\t')).join('\n'));

    return 0;
}

// -------------
// Solve problem
// -------------

const solve1 = (): string | number => findPathSteps(INPUT);

const solve2 = (): string | number => findPathSteps(INPUT, true);

// ---------------
// Display answers
// ---------------

solveWithLogs(solve1, 1);
// 414 => Too high
// 410 => Too low
// 412 => Yeah !

solveWithLogs(solve2, 2);
// 402 => Yeah !

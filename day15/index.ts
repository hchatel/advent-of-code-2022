import path from 'path';
import { solveWithLogs } from '../utils/logs';
import { readInput } from '../utils/readFile';

// ------------------------------
// Problem input and test inputs
// ------------------------------

type Input = string[];
export const TEST_INPUT: Input = `Sensor at x=2, y=18: closest beacon is at x=-2, y=15
Sensor at x=9, y=16: closest beacon is at x=10, y=16
Sensor at x=13, y=2: closest beacon is at x=15, y=3
Sensor at x=12, y=14: closest beacon is at x=10, y=16
Sensor at x=10, y=20: closest beacon is at x=10, y=16
Sensor at x=14, y=17: closest beacon is at x=10, y=16
Sensor at x=8, y=7: closest beacon is at x=2, y=10
Sensor at x=2, y=0: closest beacon is at x=2, y=10
Sensor at x=0, y=11: closest beacon is at x=2, y=10
Sensor at x=20, y=14: closest beacon is at x=25, y=17
Sensor at x=17, y=20: closest beacon is at x=21, y=22
Sensor at x=16, y=7: closest beacon is at x=15, y=3
Sensor at x=14, y=3: closest beacon is at x=15, y=3
Sensor at x=20, y=1: closest beacon is at x=15, y=3`.split('\n');
export const INPUT: Input = readInput(path.resolve(__dirname, './input.txt')).split('\n');

// -------------------
// Your functions here
// -------------------
type Position = [number, number];

interface Sensor {
    distance: number,
    nearestBeacon: Position,
    position: Position,
}

const computeDistance = (a: Position, b: Position) => Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);

const parseInput = (input: Input): Sensor[] => input.map((line) => {
    const [_, sensorX, sensorY, beaconX, beaconY] = line.match('Sensor at x=(.+), y=(.+): closest beacon is at x=(.+), y=(.+)');

    return {
        distance: computeDistance([+beaconX, +beaconY], [+sensorX, +sensorY]),
        position: [+sensorX, +sensorY],
        nearestBeacon: [+beaconX, +beaconY],
    };
});

const checkEmptySpots = (sensor: Sensor, emptyPositions: Record<string, boolean>, lineIndex: number): void => {
    const { distance, nearestBeacon, position: [px, py] } = sensor;
    const dx = distance - Math.abs(py - lineIndex);
    for (let x = px - dx; x <= px + dx; x++) {
        emptyPositions[`${x},${lineIndex}`] = true;
    }
    delete(emptyPositions[`${nearestBeacon[0]},${nearestBeacon[1]}`]);
};

const countEmptyPositionsOnLine = (input: Input, lineIndex: number) => {
    const sensors = parseInput(input);
    const emptyPositions = {};

    sensors.forEach((sensor) => checkEmptySpots(sensor, emptyPositions, lineIndex));

    return Object.keys(emptyPositions).length;
};

const computeTunningFrequency = (input: Input, searchBound: number): number => {
    const sensors = parseInput(input);

    for (let y = 0; y < searchBound; y++) {
        for (let x = 0; x < searchBound; x++) {
            const sensorWithinReach = sensors.find(({ position, distance }) => computeDistance(position, [x, y]) <= distance);
            if (!sensorWithinReach) {
                return x * 4000000 + y;
            }
            const { distance, position } = sensorWithinReach;
            x = position[0] + distance - Math.abs(y - position[1]); 
        }
    }

    return 0;
}

// -------------
// Solve problem
// -------------

// const solve1 = (): string | number => countEmptyPositionsOnLine(TEST_INPUT, 10);
// const solve1 = (): string | number => countEmptyPositionsOnLine(INPUT, 2000000);

// const solve2 = (): string | number => computeTunningFrequency(TEST_INPUT, 20);
const solve2 = (): string | number => computeTunningFrequency(INPUT, 4000000);

// ---------------
// Display answers
// ---------------

// solveWithLogs(solve1, 1);
// TEST_INPUT => 26
// 6425133 => Yeah !

solveWithLogs(solve2, 2);
// TEST_INPUT => 56000011
// 10996191429555 => Yeah !

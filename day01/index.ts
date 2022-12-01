import path from 'path';
import { solveWithLogs } from '../utils/logs';
import { readInput } from '../utils/readFile';

// ------------------------------
// Problem input and test inputs
// ------------------------------

export const TEST_INPUT = `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000
`;
export const INPUT = readInput(path.resolve(__dirname, './input.txt'));

// -------------------
// Your functions here
// -------------------

const findMinIndex = (values: number[]) => {
    let min = values[0];
    let minIndex = 0;
    for (let i = 1; i < values.length; i++) {
        if (values[i] < min) {
            min = values[i];
            minIndex = i;
        }
    }

    return minIndex;
};

const computeMaxCalories = (input: string): number => {
    const caloriesList = input.split('\n');
    let currentElfCalories = 0;
    let maxCalories = 0;
    caloriesList.forEach((calories) => {
        if (calories) {
            currentElfCalories += +calories;
        } else {
            maxCalories = Math.max(currentElfCalories, maxCalories);
            currentElfCalories = 0;
        }
    });

    return maxCalories;
};

const computeTopThreeCalories = (input: string): number => {
    const caloriesList = input.split('\n');
    let currentElfCalories = 0;
    const maxCalories = [0, 0, 0];
    caloriesList.forEach((calories) => {
        if (calories) {
            currentElfCalories += +calories;
        } else {
            const minIndex = findMinIndex(maxCalories);
            if (minIndex !== -1) maxCalories[minIndex] = Math.max(currentElfCalories, maxCalories[minIndex]);
            currentElfCalories = 0;
        }
    });

    return maxCalories.reduce((sum, val) => sum + val, 0);
};

// -----------
// Improvement
// -----------

const computeMaxCalories2 = (input: string): number =>
    input
        .split('\n')
        .reduce(
            ({ current, max }, value) =>
                value ? { current: current + +value, max } : { current: 0, max: Math.max(current, max) },
            { current: 0, max: 0 },
        ).max;

const computeTopThreeCalories2 = (input: string): number =>
    input
        .split('\n')
        .reduce(
            ({ current, maxs }, value) => {
                if (value) return { current: current + +value, maxs };
                const minIndex = findMinIndex(maxs);
                if (minIndex !== -1 && maxs[minIndex] < current) maxs[minIndex] = current;

                return { current: 0, maxs };
            },
            { current: 0, maxs: [0, 0, 0] },
        )
        .maxs.reduce((sum, val) => sum + val, 0);

// -------------
// Solve problem
// -------------

const solve1 = (): string | number => {
    return computeMaxCalories2(INPUT);
};

const solve2 = (): string | number => {
    return computeTopThreeCalories2(INPUT);
};

// ---------------
// Display answers
// ---------------

// solveWithLogs(solve1, 1); // 74711
solveWithLogs(solve2, 2); // 209481

// 195448 => Too Low

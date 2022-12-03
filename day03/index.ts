import path from 'path';
import { solveWithLogs } from '../utils/logs';
import { readInput } from '../utils/readFile';

// ------------------------------
// Problem input and test inputs
// ------------------------------

type Input = string[];

export const TEST_INPUT: Input = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`.split('\n');
export const INPUT: Input = readInput(path.resolve(__dirname, './input.txt')).split('\n');

// -------------------
// Your functions here
// -------------------

const getPriority = (letter: string): number => {
    const code = letter.charCodeAt(0);
    return code > 96 ? code - 96 : code - 38;
};

// -------------
// Solve problem
// -------------

const solve1 = (): string | number => INPUT.reduce((sum, list) => {
    const end = list.slice(list.length / 2);
    for (let i = 0; i < list.length / 2; i++) {
        if (end.includes(list.charAt(i))) return sum + getPriority(list.charAt(i));
    }
    return sum;
}, 0);

const priorityArray: number[] = (new Array(53)).fill(0);

const solve2 = (): string | number => INPUT.reduce(({ list, sum }, line, index) => {
    const counts = [];
    line.split('').forEach((l) => counts[getPriority(l)] = 1);
    counts.forEach((_,i) => list[i] += 1);
    
    return (index + 1) % 3 ?{ list, sum } : {
        list: [...priorityArray],
        sum: sum + list.findIndex((v) => v === 3)
    };
}, { list: [...priorityArray], sum: 0 } as { list: number[], sum: number }).sum;

// ---------------
// Display answers
// ---------------

solveWithLogs(solve1, 1);
// 8089

// solveWithLogs(solve2, 2);
// 2510

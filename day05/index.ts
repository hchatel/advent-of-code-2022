import path from 'path';
import { solveWithLogs } from '../utils/logs';
import { readInput } from '../utils/readFile';

// ------------------------------
// Problem input and test inputs
// ------------------------------

type Input = [string, string];
export const TEST_INPUT = `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2
`.split('\n\n') as Input;
export const INPUT = readInput(path.resolve(__dirname, './input.txt'), false).split('\n\n') as Input;

// -------------------
// Your functions here
// -------------------

type Stack = string[];
type Move = [number, number, number];
interface ParsedInput {
    stacks: Stack[];
    moves: Move[];
}

const parseInput = ([cratesStr, movesStr]: Input): ParsedInput => {
    // Parse crates
    const cratesLines = cratesStr.split('\n').reverse();
    const columnsNb = Math.floor((cratesLines[0].length + 1) / 4);
    const stacks = cratesLines.reduce((crates, cratesLine, index) => {
        if (index) {
            for (let i = 0; i < columnsNb; i++) {
                const char = cratesLine.charAt(i*4+1);
                if (char.trim()) crates[i].push(char);
            }
        }

        return crates;
    }, (new Array(columnsNb)).fill(0).map(() => []) as Stack[]);

    // Parse moves
    const moves = movesStr.trim().split('\n').map<Move>((line) => {
        const words = line.split(' ');
        return [+words[1], +words[3], +words[5]];
    });

    return { stacks, moves }
};

const moveCrates = ({ stacks, moves }: ParsedInput, moveMultiple = false): Stack[] => {
    moves.forEach(([nb, origin, dest]) => {
        if (moveMultiple) {
            stacks[dest - 1].push(...(stacks[origin - 1].splice(-nb)));
        } else {
            for(let i = 0; i < nb; i++) {
                stacks[dest - 1].push(stacks[origin - 1].pop());
            }
        }
    });
    
    return stacks;
};

// -------------
// Solve problem
// -------------

const solve1 = (): string | number => {
    const stacks = moveCrates(parseInput(INPUT));
    return stacks.reduce((result, stack) => result + stack[stack.length - 1], '');
};

const solve2 = (): string | number => {
    const stacks = moveCrates(parseInput(INPUT), true);
    return stacks.reduce((result, stack) => result + stack[stack.length - 1], '');
};

// ---------------
// Display answers
// ---------------

solveWithLogs(solve1, 1);
// FCVRLMVQP => Yeah !

solveWithLogs(solve2, 2);
// RWLWGJGFD => Yeah !

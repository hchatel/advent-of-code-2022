import path from 'path';
import { solveWithLogs } from '../utils/logs';
import { readInput } from '../utils/readFile';

// ------------------------------
// Problem input and test inputs
// ------------------------------

type Input = string[];
export const TEST_INPUT: Input = `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`.split('\n');
export const TEST_INPUT_2: Input = `R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`.split('\n');
export const INPUT: Input = readInput(path.resolve(__dirname, './input.txt')).split('\n');

// -------------------
// Your functions here
// -------------------
type VisitedPlaces = Record<string, boolean>;
type Position = [number, number];
type Direction = 'D' | 'L' | 'R' | 'U';
type Move = [Direction, number];

export const moveHead = ([x, y]: Position, [dir, steps]: Move): Position => {
    switch (dir) {
        case 'D':
            return [x, y - steps];
        case 'L':
            return [x - steps, y];
        case 'R':
            return [x + steps, y];
        case 'U':
            return [x, y + steps];
    }
};

const getSteps = (delta: number) => (delta === 0 || Math.abs(delta) === 1)
    ? delta
    : delta - delta / Math.abs(delta);

export const moveTail = (tail: Position, head: Position): Position => {
    const [tx, ty] = tail;
    const [hx, hy] = head;
    const dx = hx - tx;
    const dy = hy - ty;

    if (Math.abs(dx) <= 1 && Math.abs(dy)  <= 1) {
        return tail;
    }
    
    return [tx + getSteps(dx), ty + getSteps(dy)];
};

// const computeVisitedPlace = (input: Input, ropeLength = 1): number => {
//     const visitedPlaces: VisitedPlaces = {};
//     let H: Position = [0, 0];
//     let T: Position = [0, 0];

//     visitedPlaces[T.join(';')] = true;

//     input.forEach((move) => {
//         const [direrction, stepsStr] = move.split(' ');
//         for (let step = 0; step < +stepsStr; step++) {
//             H = moveHead(H, [direrction as Direction, 1]);
//             T = moveTail(T, H);
//             visitedPlaces[T.join(';')] = true;
//         }
//     });

//     return Object.keys(visitedPlaces).length;
// };

const computeVisitedPlace = (input: Input, knots = 2): number => {
    const visitedPlaces: VisitedPlaces = {};
    
    const knotsPositions = (new Array(knots)).fill([0, 0]);

    visitedPlaces[knotsPositions[knots - 1].join(';')] = true;

    input.forEach((move) => {
        const [direrction, stepsStr] = move.split(' ');
        for (let step = 0; step < +stepsStr; step++) {
            knotsPositions[0] = moveHead(knotsPositions[0], [direrction as Direction, 1]);
            for (let knotIndex = 1; knotIndex < knots; knotIndex++) {
                knotsPositions[knotIndex] = moveTail(knotsPositions[knotIndex], knotsPositions[knotIndex - 1]);
            }
            visitedPlaces[knotsPositions[knots - 1].join(';')] = true;
        }
    });

    return Object.keys(visitedPlaces).length;
};

// -------------
// Solve problem
// -------------

const solve1 = (): string | number => computeVisitedPlace(INPUT);
const solve2 = (): string | number => computeVisitedPlace(INPUT, 10);

// ---------------
// Display answers
// ---------------

// solveWithLogs(solve1, 1);
// 6384 => Yeah !

solveWithLogs(solve2, 2);
// 2734 => Yeah !

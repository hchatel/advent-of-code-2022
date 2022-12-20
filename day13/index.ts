import path from 'path';
import { solveWithLogs } from '../utils/logs';
import { readInput } from '../utils/readFile';

// ------------------------------
// Problem input and test inputs
// ------------------------------

type Input = string[];
export const TEST_INPUT: Input = `[1,1,3,1,1]
[1,1,5,1,1]

[[1],[2,3,4]]
[[1],4]

[9]
[[8,7,6]]

[[4,4],4,4]
[[4,4],4,4,4]

[7,7,7,7]
[7,7,7]

[]
[3]

[[[]]]
[[]]

[1,[2,[3,[4,[5,6,7]]]],8,9]
[1,[2,[3,[4,[5,6,0]]]],8,9]`.split('\n\n');
export const INPUT: Input = readInput(path.resolve(__dirname, './input.txt')).split('\n\n');

// -------------------
// Your functions here
// -------------------
type ListItem = List | number;
type List = ListItem[];

const parseLine = (listStr: string): List => eval(listStr);

const parseInput = (input: Input): [List, List][] => input.map((pair) => {
    const [list1Str, list2Str] = pair.split('\n');

    return [parseLine(list1Str), parseLine(list2Str)];
});
    
export const compare = (a: ListItem, b: ListItem): number => {
    const aIsNumber = typeof a === 'number';
    const bIsNumber = typeof b === 'number';

    if (aIsNumber && bIsNumber) {
        return a - b;
    }
    const aArray = aIsNumber ? [a] : a;
    const bArray = bIsNumber ? [b] : b;


    let order = 0;
    for (let i = 0; i < aArray.length && !order; i++) {
        if (bArray.length === i) {
            order = 1;
        } else {
            order = compare(aArray[i], bArray[i]);
        }
    }

    return order || aArray.length - bArray.length;
}

export const countRightOrderIndices = (input: Input): number =>
    parseInput(input)
    .reduce((indicesSum, [list1, list2], index) => indicesSum + (compare(list1, list2) <= 0 ? index + 1 : 0), 0);

const computeDecoderKey = (input: Input): number => {
    const lists = [...parseInput(input).flat(1), [[2]], [[6]]].sort(compare);
    let key = 1;
    for (let i = 0; i < lists.length; i++) {
        if (!compare(lists[i], [[2]])) {
            key *= i + 1;
        } else if (!compare(lists[i], [[6]])) {!compare(lists[i], [[2]])
            return key * (i + 1);
        }
    }

    return 0;
}

// -------------
// Solve problem
// -------------

const solve1 = (): string | number => countRightOrderIndices(INPUT);

const solve2 = (): string | number => computeDecoderKey(INPUT);

// ---------------
// Display answers
// ---------------

// solveWithLogs(solve1, 1);
// 4203 => Too low
// 5852 => Yeah !

solveWithLogs(solve2, 2);

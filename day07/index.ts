import path from 'path';
import { solveWithLogs } from '../utils/logs';
import { readInput } from '../utils/readFile';
import util from 'util';

// ------------------------------
// Problem input and test inputs
// ------------------------------

type Input = string[];
export const TEST_INPUT: Input = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`.split('\n');
export const INPUT: Input = readInput(path.resolve(__dirname, './input.txt')).split('\n');

// -------------------
// Your functions here
// -------------------
type Directory = { subfolders?: Record<string, Directory>, size: number };

const getNode = (dir: Directory, path: string[]): Directory => path.length ? getNode(dir.subfolders[path[0]], path.slice(1)) : dir;
const computeDirectorySize = (dir: Directory): number => {
    if (!dir.subfolders) return dir.size;
    dir.size = Object.values(dir.subfolders).reduce((sum, node) => sum + computeDirectorySize(node), 0);

    return dir.size;
};

const buildDirectory = (input: Input): Directory => {
    const dir: Directory = { subfolders: {}, size : 0 };
    let path: string[] = [];

    // Build directory
    for (let i = 0; i < input.length; i++) {
        const [_, command, option] = input[i].split(' ');
        if (command === 'cd') {
            if (option === '/') {
                path = [];
            } else if (option === '..') {
                path.pop();
            } else {
                path.push(option);
            }
        } else {
            i++
            while (i < input.length && input[i][0] !== '$') {
                const [info, name] = input[i].split(' ');
                const node = getNode(dir, path);
                if (info === 'dir') {
                    node.subfolders[name] = { subfolders: {}, size : 0 };
                } else {
                    node.subfolders[name] = { size : +info };
                }
                i++;
            }
            i--;
        }
    }

    // Compute node weights
    computeDirectorySize(dir);

    return dir;
};

const sumOfSmallSizes = (dir: Directory, lowerLimit: number): number =>
    dir.subfolders ? 
        (dir.size < lowerLimit ? dir.size : 0) + 
        Object.values(dir.subfolders).reduce(
            (sum, node) => sum + sumOfSmallSizes(node, lowerLimit),
            0,
        )
        : 0;


const findSmallestDirToDelete = (dir: Directory, spaceNeeded: number): number | null => 
    (dir.size < spaceNeeded || !dir.subfolders)
        ? null
        : Math.min(
            dir.size,
            ...Object.values(dir.subfolders)
                .map((node) => findSmallestDirToDelete(node, spaceNeeded))
                .filter((s) => s),
         );


// -------------
// Solve problem
// -------------

const solve1 = (): string | number => {
    const dir = buildDirectory(INPUT);
    // console.log(util.inspect(dir, true, null))

    return sumOfSmallSizes(dir, 100000);
};

const solve2 = (): string | number => {
    const dir = buildDirectory(INPUT);

    return findSmallestDirToDelete(dir, dir.size - 40000000);
};

// ---------------
// Display answers
// ---------------

solveWithLogs(solve1, 1);
// 1427048 => Yeah !

solveWithLogs(solve2, 2);
// 42536714 => Too high
// 2940614 => Yeah !

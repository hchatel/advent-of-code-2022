import path from 'path';
import { solveWithLogs } from '../utils/logs';
import { readInput } from '../utils/readFile';

// ------------------------------
// Problem input and test inputs
// ------------------------------

type Input = string[];
export const TEST_INPUT: Input = `Monkey 0:
Starting items: 79, 98
Operation: new = old * 19
Test: divisible by 23
  If true: throw to monkey 2
  If false: throw to monkey 3

Monkey 1:
Starting items: 54, 65, 75, 74
Operation: new = old + 6
Test: divisible by 19
  If true: throw to monkey 2
  If false: throw to monkey 0

Monkey 2:
Starting items: 79, 60, 97
Operation: new = old * old
Test: divisible by 13
  If true: throw to monkey 1
  If false: throw to monkey 3

Monkey 3:
Starting items: 74
Operation: new = old + 3
Test: divisible by 17
  If true: throw to monkey 0
  If false: throw to monkey 1`.split('\n\n');
export const INPUT: Input = readInput(path.resolve(__dirname, './input.txt')).split('\n\n');

// -------------------
// Your functions here
// -------------------
type Operator = '+' | '*';
interface Monkey {
    items: number[];
    inspected: number;
    operator: Operator;
    operand: string;
    testModulo: number;
    truthyMonkey: number;
    falsyMonkey: number;
}

const getLastNumber = (line: string): number => +line.split(' ').pop();

export const parseMonkey = (monkeyStr: string): Monkey => {
    const monkeyLines = monkeyStr.split('\n');

    const itemsStr = monkeyLines[1].split(': ')[1];
    const operatorStr = monkeyLines[2].split('= old ')[1];
    const [operator, operand] = operatorStr.split(' ');

    return {
        items: itemsStr.split(', ').map((v) => +v),
        inspected: 0,
        operand,
        operator: operator as Operator,
        testModulo: getLastNumber(monkeyLines[3]),
        truthyMonkey: getLastNumber(monkeyLines[4]),
        falsyMonkey: getLastNumber(monkeyLines[5]),
    };
};

const computeWorryLevel = (initialWorry: number, operator: Operator, operand: string, applyWorryReliefModulo?: number) => {
    const value: number = operand === 'old' ? initialWorry : +operand;
    const newValue = operator === '+' ? initialWorry + value : initialWorry * value;
    
    return applyWorryReliefModulo ? newValue % applyWorryReliefModulo : Math.floor((newValue) / 3);
}

const monkeyTurn = (monkeys: Monkey[], monkeyIndex: number, applyWorryReliefModulo?: number) => {
    const monkey = monkeys[monkeyIndex];
    const itemsToInspect = monkey.items.length;
    for (let i = 0; i < itemsToInspect; i++) {
        const worry = monkey.items.shift();
        const newWorry = computeWorryLevel(worry, monkey.operator, monkey.operand, applyWorryReliefModulo);
        if (!(newWorry % monkey.testModulo)) {
            // console.log('Monkey', i, 'throws item', newWorry, 'to monkey', monkey.truthyMonkey);
            monkeys[monkey.truthyMonkey].items.push(newWorry);
        } else {
            // console.log('Monkey', i, 'throws item', newWorry, 'to monkey', monkey.falsyMonkey);
            monkeys[monkey.falsyMonkey].items.push(newWorry);
        }
        monkey.inspected++;
    }
}

const monkeyRound = (monkeys: Monkey[], applyWorryReliefModulo?: number) => {
    for (let i = 0; i < monkeys.length; i++) {
        monkeyTurn(monkeys, i, applyWorryReliefModulo);
    }
}

const computeMonkeyBusiness = (input: Input, rounds: number, withRelief = true): number => {
    const monkeys: Monkey[] = input.map((monkeyDescription) => parseMonkey(monkeyDescription));
    const commonModulo = monkeys.reduce((m, { testModulo }) => m * testModulo, 1);
    for (let i = 1; i <= rounds; i++) {
        monkeyRound(monkeys, !withRelief && commonModulo);
        // if (i === 1 || i === 20) {
        //     console.log('Round', i)
        //     monkeys.forEach(({ inspected }, index) => console.info('   Monkey', index, 'inspceted', inspected, 'items'))
        //     // console.log(monkeys)
        // }
    }

    const inspectedList = monkeys.map(({ inspected }) => inspected).sort((a, b) => b - a);

    return inspectedList[0] * inspectedList[1];
};

// -------------
// Solve problem
// -------------

const solve1 = (): string | number => computeMonkeyBusiness(INPUT, 20);

const solve2 = (): string | number => computeMonkeyBusiness(INPUT, 10000, false);

// ---------------
// Display answers
// ---------------

// solveWithLogs(solve1, 1);
// TEST_INPUT => 10605
// 8127 => Too low
// 102399 => Yeah !

solveWithLogs(solve2, 2);
// 23641658401 => Yeah !

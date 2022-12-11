import { parseMonkey, TEST_INPUT } from './index';

describe('Parse monkey description', () => {
    it('parses monkey description correctly', () => {
        const description = `Monkey 0:
        Starting items: 79, 98
        Operation: new = old * 19
        Test: divisible by 23
          If true: throw to monkey 2
          If false: throw to monkey 3`
        expect(parseMonkey(description)).toEqual({
            items: [79, 98],
            inspected: 0,
            operand: '19',
            operator: '*',
            testModulo: 23,
            truthyMonkey: 2,
            falsyMonkey: 3,
        });
    });
});

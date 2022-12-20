import { compare, countRightOrderIndices, TEST_INPUT } from './index';

describe('Compare function', () => {
    describe('Identical pairs', () => {
        it('compares numbers', () => {
            expect(compare(1, 1)).toBe(0);
        });
        it('compares arrays', () => {
            expect(compare([], [])).toBe(0);
            expect(compare([1], [1])).toBe(0);
            expect(compare([5, 3, 9, -1], [5, 3, 9, -1])).toBe(0);
        });
        it('compares nested arrays', () => {
            expect(compare([[[], [[]]]], [[[], [[]]]])).toBe(0);
        });
        it('compares lists with array and number mix', () => {
            expect(compare([1], 1)).toBe(0);
            expect(compare([5, 3, 9, -1], [[5], 3, 9, -1])).toBe(0);
        });
    });
    describe('Different pairs', () => {
        it('compares numbers', () => {
            expect(compare(1, 2)).toBeLessThan(0);
            expect(compare(9, -2)).toBeGreaterThan(0);
        });
        it('compares arrays with same length', () => {
            expect(compare([1, 2, 3, 4], [1, 2, 2, 4])).toBeGreaterThan(0);
        });
        it('compares arrays with different lengths', () => {
            expect(compare([1, 2, 3, 4], [1, 2, 3])).toBeGreaterThan(0);
            expect(compare([1, 2, 3], [1, 2, 3, 4])).toBeLessThan(0);
        });
    })
});

describe('solve1 function', () => {
    it('works with test input', () => {
        expect(countRightOrderIndices(TEST_INPUT)).toBe(13);
    });
})

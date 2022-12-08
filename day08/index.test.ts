import { TEST_INPUT, countVisibleTrees } from './index';

describe('Counts the right number of trees', () => {
    it('with the same number only (3x3)', () => {
        expect(countVisibleTrees(['000', '000', '000'])).toBe(8);
    });
    it('with the same number only (5x5)', () => {
        expect(countVisibleTrees(['55555', '55555', '55555', '55555', '55555'])).toBe(16);
    });
    it('with the same number only (5x7)', () => {
        expect(countVisibleTrees(['55555', '55555', '55555', '55555', '55555', '55555', '55555'])).toBe(20);
    });
    it('with 1 higher in the middle (3x3)', () => {
        expect(countVisibleTrees(['000', '010', '000'])).toBe(9);
    });
    it('with 1 higher in the middle (5x5)', () => {
        expect(countVisibleTrees(['55555', '55555', '55655', '55555', '55555'])).toBe(17);
    });
    it('with higher center', () => {
        expect(countVisibleTrees(['55555', '56665', '56665', '56665', '55555'])).toBe(24);
    });
    it('with lower center', () => {
        expect(countVisibleTrees(['55555', '54445', '54445', '54445', '55555'])).toBe(16);
    });
    it('with higher inner ring', () => {
        expect(countVisibleTrees(['55555', '56665', '56565', '56665', '55555'])).toBe(24);
    });
    it('with higher inner pyramid', () => {
        expect(countVisibleTrees(['55555', '56665', '56765', '56665', '55555'])).toBe(25);
    });
    it('with TEST_INPUT', () => {
        expect(countVisibleTrees(TEST_INPUT)).toBe(21);
    });
});

import { moveHead, moveTail } from './index';

describe('moveHead', () => {
    it('Moves 1 step', () => {
        expect(moveHead([0, 0], ['D', 1])).toEqual([0, -1]);
        expect(moveHead([0, 0], ['L', 1])).toEqual([-1, 0]);
        expect(moveHead([0, 0], ['R', 1])).toEqual([1, 0]);
        expect(moveHead([0, 0], ['U', 1])).toEqual([0, 1]);
    });

    it('Moves 5 steps', () => {
        expect(moveHead([0, 0], ['D', 5])).toEqual([0, -5]);
        expect(moveHead([0, 0], ['L', 5])).toEqual([-5, 0]);
        expect(moveHead([0, 0], ['R', 5])).toEqual([5, 0]);
        expect(moveHead([0, 0], ['U', 5])).toEqual([0, 5]);
    });
});

describe('moveTail', () => {
    it('does not move when close enough', () => {
        expect(moveTail([0, 0], [0, 1])).toEqual([0, 0]);
        expect(moveTail([0, 0], [1, 1])).toEqual([0, 0]);
        expect(moveTail([0, 0], [-1, 0])).toEqual([0, 0]);
        expect(moveTail([0, 0], [0, 0])).toEqual([0, 0]);
    });

    it('follows on the same line / columns', () => {
        expect(moveTail([4, -3], [4, 6])).toEqual([4, 5]);
        expect(moveTail([4, -3], [-2, -3])).toEqual([-1, -3]);
    });

    it('follows in diagonal', () => {
        expect(moveTail([4, -3], [5, 5])).toEqual([5, 4]);
        expect(moveTail([4, -3], [0, -2])).toEqual([1, -2]);
    });
});

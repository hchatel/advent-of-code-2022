import { countFullOverlaps, countOverlaps, TEST_INPUT } from './index';

describe('Count full overlaps', () => {
    describe('Failing cases', () => {
        it('Fails with no overlap', () => {
            expect(countFullOverlaps(['1-2,3-4'])).toBe(0);
        });
        it('Fails with partial overlap', () => {
            expect(countFullOverlaps(['1-3,3-4'])).toBe(0);
        });
    });

    describe('Working cases', () => {
        it('Works with first index in common', () => {
            expect(countOverlaps(['1-2,1-4'])).toBe(1);
            expect(countOverlaps(['1-4,1-2'])).toBe(1);
        });

        it('Works with last index in common', () => {
            expect(countOverlaps(['1-4,3-4'])).toBe(1);
            expect(countOverlaps(['3-4,1-4'])).toBe(1);
        });

        it('Works with no index in common', () => {
            expect(countOverlaps(['1-4,2-3'])).toBe(1);
            expect(countOverlaps(['2-3,1-4'])).toBe(1);
        });

        it('Works with both index in common', () => {
            expect(countOverlaps(['12-23,12-23'])).toBe(1);
        });

        it('Works with index repetition', () => {
            expect(countOverlaps(['12-12,8-23'])).toBe(1);
            expect(countOverlaps(['8-23,12-12'])).toBe(1);
        });

        it('Works with too digits numbers', () => {
            expect(countOverlaps(['12-24,3-36'])).toBe(1);
            expect(countOverlaps(['3-36,12-24'])).toBe(1);
        });


        it('Works with bigger number', () => {
            expect(countFullOverlaps(['12-24,3-36'])).toBe(1);
        });
    });

    it('Finds the right answer with TEST_INPUT', () => {
        expect(countFullOverlaps(TEST_INPUT)).toBe(2);
    });
});

describe('Count partial overlaps', () => {
    describe('Failing cases', () => {
        it('Fails with no overlap', () => {
            expect(countOverlaps(['1-2,3-4'])).toBe(0);
        });
    });

    describe('Working cases', () => {
        it('Still works with full overlaps examples', () => {
            // First index in common
            expect(countOverlaps(['1-2,1-4'])).toBe(1);
            expect(countOverlaps(['1-4,1-2'])).toBe(1);
            // Last index in common
            expect(countOverlaps(['1-4,3-4'])).toBe(1);
            expect(countOverlaps(['3-4,1-4'])).toBe(1);
            // No index in common
            expect(countOverlaps(['1-4,2-3'])).toBe(1);
            expect(countOverlaps(['2-3,1-4'])).toBe(1);
            // Both index in common
            expect(countOverlaps(['12-23,12-23'])).toBe(1);
            // Index repetition
            expect(countOverlaps(['12-12,8-23'])).toBe(1);
            expect(countOverlaps(['8-23,12-12'])).toBe(1);
            // Too digits numbers
            expect(countOverlaps(['12-24,3-36'])).toBe(1);
            expect(countOverlaps(['3-36,12-24'])).toBe(1);
        });
        it('Works with partial overlaps', () => {
            // One index in common
            expect(countOverlaps(['1-3,3-4'])).toBe(1);
            expect(countOverlaps(['3-4,1-3'])).toBe(1);
            // No index in common
            expect(countOverlaps(['4-7,1-6'])).toBe(1);
            expect(countOverlaps(['1-6,4-7'])).toBe(1);
        });
        it('Works with bigger number', () => {
            expect(countOverlaps(['12-24,21-36'])).toBe(1);
            expect(countOverlaps(['21-36,12-24'])).toBe(1);
        });
    });

    it('Finds the right answer with TEST_INPUT', () => {
        expect(countOverlaps(TEST_INPUT)).toBe(4);
    });
});

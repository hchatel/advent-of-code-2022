import { TEST_INPUT, detectMarker } from './index';

const testsFor4: [string, number][] = [
    [TEST_INPUT, 7],
    ['bvwbjplbgvbhsrlpgdmjqwftvncz', 5],
    ['nppdvjthqldpwncqszvftbrmjlhg', 6],
    ['nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg', 10],
    ['zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw', 11],
];

const testsFor14: [string, number][] = [
    [TEST_INPUT, 19],
    ['bvwbjplbgvbhsrlpgdmjqwftvncz', 23],
    ['nppdvjthqldpwncqszvftbrmjlhg', 23],
    ['nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg', 29],
    ['zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw', 26],
];

describe('Unit tests', () => {
    testsFor4.forEach(([input, output]) => {
        it('Detect the first 4 consecutive different chars', () => {
            expect(detectMarker(input)).toBe(output);
        });
    });

    testsFor14.forEach(([input, output]) => {
        it('Detect the first 4 consecutive different chars', () => {
            expect(detectMarker(input, 14)).toBe(output);
        });
    })
});

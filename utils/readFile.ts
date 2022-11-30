import { readFileSync } from 'fs';

export const readInput = (filename: string): string => readFileSync(filename, { encoding: 'utf8' }).trim();

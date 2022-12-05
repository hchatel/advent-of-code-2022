import { readFileSync } from 'fs';

export const readInput = (filename: string, trim = true): string => trim 
    ? readFileSync(filename, { encoding: 'utf8' }).trim()
    : readFileSync(filename, { encoding: 'utf8' });

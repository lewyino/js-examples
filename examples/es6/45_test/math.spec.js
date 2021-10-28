import {add, diff, multi, div} from './math';

describe('math functions', () => {
    describe('add', () => {
        test('should add two numbers', () => {
            expect(add(2, 3)).toEqual(5);
        });
    });
    describe('diff', () => {
        test('should diff two numbers', () => {
            expect(diff(3, 1)).toEqual(2);
        });
    });
    describe('multi', () => {
        test('should multi two numbers', () => {
            expect(multi(3, 2)).toEqual(6);
        });
    });
    describe('div', () => {
        test('should div two numbers', () => {
            expect(div(3, 2)).toEqual(1.5);
        });
        test('should throw error "div by 0!" for 0 as second parameter', () => {
            expect(() => { div(3, 0) }).toThrow("div by 0!");
        });
    });
});

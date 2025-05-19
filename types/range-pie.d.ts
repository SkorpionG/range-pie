declare module "range-pie" {
  export class PyRange implements Iterable<number> {
    constructor(...args: number[]);

    readonly length: number;
    readonly start: number;
    readonly stop: number;
    readonly step: number;

    at(index: number): number;
    toString(): string;
    toArray(): number[];

    map<T>(callback: (value: number, index: number, range: PyRange) => T): T[];
    filter(callback: (value: number, index: number, range: PyRange) => boolean): number[];
    reduce<T>(
      callback: (accumulator: T, value: number, index: number, range: PyRange) => T,
      initialValue?: T
    ): T;
    some(callback: (value: number, index: number, range: PyRange) => boolean): boolean;
    every(callback: (value: number, index: number, range: PyRange) => boolean): boolean;
    find(callback: (value: number, index: number, range: PyRange) => boolean): number | undefined;
    findIndex(callback: (value: number, index: number, range: PyRange) => boolean): number;
    findLastIndex(callback: (value: number, index: number, range: PyRange) => boolean): number;
    forEach(callback: (value: number, index: number, range: PyRange) => void): void;
    includes(value: any): boolean;
    indexOf(value: any): number;
    lastIndexOf(value: any): number;
    reverse(): PyRange;

    [Symbol.iterator](): Iterator<number>;
    asProxy(): any;
  }

  export default PyRange;
}

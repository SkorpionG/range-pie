/**
 * A class that simulates Python's range function, combined with several useful JavaScript array methods.
 */
class PyRange implements Iterable<number> {
  private _start: number;
  private _stop: number;
  private _step: number;
  private _length: number;

  private static toIntegerOrInfinity(value: number): number {
    const numeric = +value;
    return Number.isNaN(numeric) ? 0 : Math.trunc(numeric);
  }

  private static isArrayIndexProperty(prop: string): boolean {
    const index = Number(prop);
    return (
      prop !== "" &&
      Number.isInteger(index) &&
      index >= 0 &&
      index < 2 ** 32 - 1 &&
      String(index) === prop
    );
  }

  /**
   * Creates a new PyRange instance.
   * @param {...number} args - The arguments of the range. The possible forms are
   *   - `PyRange(stop)`
   *   - `PyRange(start, stop)`
   *   - `PyRange(start, stop, step)`
   * @throws {TypeError} If any of the arguments is not a number.
   * @throws {TypeError} If any of the arguments is not an integer.
   * @throws {Error} If the step is zero.
   * @throws {Error} If the arguments count is not between 1 and 3.
   * @property {number} start - The start of the range, inclusive.
   * @property {number} stop - The stop of the range, exclusive.
   * @property {number} step - The step of the range.
   * @property {number} length - The length of the range.
   */
  constructor(stop: number);
  constructor(start: number, stop: number);
  constructor(start: number, stop: number, step: number);
  constructor(...args: number[]) {
    if (!args.every((arg) => typeof arg === "number")) {
      throw new TypeError("All arguments must be numbers");
    }

    if (!args.every(Number.isInteger)) {
      throw new TypeError("All arguments must be integers");
    }

    const [start, stop, step] =
      args.length === 1
        ? [0, args[0], 1]
        : args.length === 2
          ? [args[0], args[1], 1]
          : args.length === 3
            ? [args[0], args[1], args[2]]
            : (() => {
                throw new Error("Invalid arguments count: must between 1 and 3");
              })();

    if (step === 0) {
      throw new Error("Step cannot be zero");
    }

    this._start = start;
    this._stop = stop;
    this._step = stop < start && args.length !== 3 ? -step : step;

    const diff = this._step > 0 ? stop - start : start - stop;
    this._length = Math.max(Math.ceil(diff / Math.abs(this._step)), 0);
  }

  /**
   * Gets the length of this range.
   *
   * @returns {number} the length of this range
   * @readonly
   */
  get length(): number {
    return this._length;
  }

  /**
   * Gets the starting value of the range.
   *
   * @returns {number} The starting value of the range.
   * @readonly
   */
  get start(): number {
    return this._start;
  }

  /**
   * Gets the ending value of the range.
   *
   * @returns {number} The ending value of the range.
   * @readonly
   */
  get stop(): number {
    return this._stop;
  }

  /**
   * Gets the step value of the range.
   *
   * @returns {number} The step value of the range.
   * @readonly
   */
  get step(): number {
    return this._step;
  }

  /**
   * Gets the value at the specified index in this range.
   *
   * Negative indices are supported and wrap from the end, matching the
   * behaviour of `Array.prototype.at()`. For example, `at(-1)` returns the
   * last element.
   *
   * @param {number} index - The index of the value to retrieve. Negative
   *   indices count from the end of the range.
   * @returns {number|undefined} The value at the specified index, or
   *   undefined when the normalised index is out of range.
   */
  at(index: number): number | undefined {
    const relativeIndex = PyRange.toIntegerOrInfinity(index);
    const normalised = relativeIndex < 0 ? this._length + relativeIndex : relativeIndex;
    if (normalised < 0 || normalised >= this._length) {
      return undefined;
    }
    return this._start + normalised * this._step;
  }

  /**
   * Converts the range to a string.
   * @returns {string} A string of the form `Range(start, stop, step)`.
   */
  toString(): string {
    return `PyRange(${this._start}, ${this._stop}, ${this._step})`;
  }

  /**
   * Converts the range to an array.
   * @returns {number[]} An array of numbers with the same elements as this range.
   */
  toArray(): number[] {
    return [...this];
  }

  /**
   * Validates that the callback is a function.
   * @param {Function} cb - The callback to validate.
   * @throws {TypeError} If the callback is not a function.
   * @internal
   */
  private static validateCb(cb: unknown): asserts cb is (...args: unknown[]) => unknown {
    if (typeof cb !== "function") {
      throw new TypeError("Callback must be a function");
    }
  }

  /**
   * Creates a new array with the results of applying the given callback
   * function to every element in this range.
   * @param {function(number, number, PyRange): T} callback - The callback
   * function to apply to every element.
   * @returns {T[]} A new array of the same length as this range.
   * @template T
   */
  map<T>(callback: (value: number, index: number, range: PyRange) => T): T[] {
    PyRange.validateCb(callback);

    const result = new Array<T>(this._length);

    for (let i = 0; i < this._length; i++) {
      result[i] = callback(this.at(i) as number, i, this);
    }

    return result;
  }

  /**
   * Creates a new array with all elements that pass the test implemented by
   * the provided function.
   * @param {function(number, number, PyRange): boolean} callback - The
   * predicate function to apply to every element
   * @returns {number[]} A new array of elements that pass the test
   */
  filter(callback: (value: number, index: number, range: PyRange) => boolean): number[] {
    PyRange.validateCb(callback);

    const result: number[] = [];

    for (let i = 0; i < this._length; i++) {
      const value = this.at(i) as number;
      if (callback(value, i, this)) {
        result.push(value);
      }
    }

    return result;
  }

  /**
   * Reduces the range to a single value.
   *
   * Uses rest parameters to reliably distinguish between "no initial value
   * provided" and "explicit `undefined` passed as initial value", matching
   * the behaviour of `Array.prototype.reduce()`.
   *
   * @param {function(T, number, number, PyRange): T} callback - The callback
   * function to apply to every element. The callback should take four
   * arguments: the accumulator, the current value, the index of the current
   * value, and the range object.
   * @param {T} [initialValue] - The initial value of the accumulator.
   * @returns {T} The final value of the accumulator.
   * @throws {TypeError} If the range is empty and no initial value is provided.
   * @template T
   */
  reduce(
    callback: (accumulator: number, value: number, index: number, range: PyRange) => number
  ): number;
  reduce(
    callback: (accumulator: number, value: number, index: number, range: PyRange) => number,
    initialValue: number
  ): number;
  reduce<U>(
    callback: (accumulator: U, value: number, index: number, range: PyRange) => U,
    initialValue: U
  ): U;
  reduce<U>(
    callback: (accumulator: U, value: number, index: number, range: PyRange) => U,
    ...args: [] | [U]
  ): U {
    PyRange.validateCb(callback);

    const hasInitial = args.length > 0;

    if (this._length === 0 && !hasInitial) {
      throw new TypeError("Reduce of empty range with no initial value");
    }

    let accumulator: U;
    let startIndex: number;

    if (hasInitial) {
      accumulator = args[0] as U;
      startIndex = 0;
    } else {
      accumulator = this.at(0) as number as unknown as U;
      startIndex = 1;
    }

    for (let i = startIndex; i < this._length; i++) {
      accumulator = callback(accumulator, this.at(i) as number, i, this);
    }

    return accumulator;
  }

  /**
   * Determines whether at least one element of the range satisfies the
   * provided test.
   * @param {function(number, number, PyRange): boolean} callback - The
   * predicate function to apply to every element
   * @returns {boolean} True if at least one element of the range passes the
   * test, false otherwise.
   */
  some(callback: (value: number, index: number, range: PyRange) => boolean): boolean {
    PyRange.validateCb(callback);

    for (let i = 0; i < this._length; i++) {
      if (callback(this.at(i) as number, i, this)) {
        return true;
      }
    }
    return false;
  }

  /**
   * Determines whether all elements of the range satisfy the provided test.
   * @param {function(number, number, PyRange): boolean} callback - The
   * predicate function to apply to every element
   * @returns {boolean} True if all elements of the range pass the test,
   * false otherwise.
   */
  every(callback: (value: number, index: number, range: PyRange) => boolean): boolean {
    PyRange.validateCb(callback);

    for (let i = 0; i < this._length; i++) {
      if (!callback(this.at(i) as number, i, this)) {
        return false;
      }
    }
    return true;
  }

  /**
   * Finds the first element in this range that satisfies the provided test.
   * @param {function(number, number, PyRange): boolean} callback - The
   * predicate function to apply to every element
   * @returns {number|undefined} The first element that passes the test,
   * or undefined if no element passes the test.
   */
  find(callback: (value: number, index: number, range: PyRange) => boolean): number | undefined {
    PyRange.validateCb(callback);

    for (let i = 0; i < this._length; i++) {
      if (callback(this.at(i) as number, i, this)) {
        return this.at(i) as number;
      }
    }
    return undefined;
  }

  /**
   * Finds the index of the first element in this range that satisfies the provided test.
   * @param {function(number, number, PyRange): boolean} callback - The predicate function to apply to each element.
   * @returns {number} The index of the first element that passes the test, or -1 if no element passes the test.
   */
  findIndex(callback: (value: number, index: number, range: PyRange) => boolean): number {
    PyRange.validateCb(callback);

    for (let i = 0; i < this._length; i++) {
      if (callback(this.at(i) as number, i, this)) {
        return i;
      }
    }
    return -1;
  }

  /**
   * Finds the index of the last element in this range that satisfies the provided test.
   * @param {function(number, number, PyRange): boolean} callback - The predicate function to apply to each element.
   * @returns {number} The index of the last element that passes the test, or -1 if no element passes the test.
   */
  findLastIndex(callback: (value: number, index: number, range: PyRange) => boolean): number {
    PyRange.validateCb(callback);

    for (let i = this._length - 1; i >= 0; i--) {
      if (callback(this.at(i) as number, i, this)) {
        return i;
      }
    }
    return -1;
  }

  /**
   * Executes a provided function once for each element in this range.
   * @param {function(number, number, PyRange): void} callback - The
   * function to execute for each element.
   */
  forEach(callback: (value: number, index: number, range: PyRange) => void): void {
    PyRange.validateCb(callback);

    for (let i = 0; i < this._length; i++) {
      callback(this.at(i) as number, i, this);
    }
  }

  /**
   * Determines whether the given value is present in this range.
   * @param {any} value - The value to search for.
   * @returns {boolean} True if the value is present, false otherwise.
   */
  includes(value: unknown): boolean {
    return this.some((item) => item === value);
  }

  /**
   * Returns the index of the first occurrence of the specified value, or -1 if it is not present.
   * @param {any} value - The value to search for.
   * @returns {number} The index of the value, or -1 if it is not present.
   */
  indexOf(value: unknown): number {
    for (let i = 0; i < this._length; i++) {
      if ((this.at(i) as number) === value) {
        return i;
      }
    }
    return -1;
  }

  /**
   * Returns the index of the last occurrence of the specified value, or -1 if it is not present.
   * @param {any} value - The value to search for.
   * @returns {number} The index of the last occurrence of the value, or -1 if it is not present.
   */
  lastIndexOf(value: unknown): number {
    for (let i = this._length - 1; i >= 0; i--) {
      if ((this.at(i) as number) === value) {
        return i;
      }
    }
    return -1;
  }

  /**
   * Removes the last element from the range and returns it.
   *
   * This method behaves similarly to `Array.prototype.pop`. It decreases the
   * `stop` value by the step size, shortens the range length by one, and returns
   * the removed value. If the range is empty, `undefined` is returned and the
   * range remains unchanged.
   *
   * @returns {number|undefined} The removed last value, or `undefined` if the
   * range is empty.
   */
  pop(): number | undefined {
    if (this._length === 0) {
      return undefined;
    }

    const lastValue = this.at(this._length - 1) as number;
    this._stop -= this._step;
    this._length--;
    return lastValue;
  }

  /**
   * Returns a new PyRange instance containing elements from the specified indices.
   *
   * This method behaves similarly to `Array.prototype.slice`. It creates a new
   * PyRange with elements from `begin` to `end` (exclusive) based on the given
   * parameters. Negative indices are supported. The original range is not modified.
   *
   * @param {number} [begin=0] - Zero-based index at which to begin slicing.
   * @param {number} [end=this.length] - Zero-based index at which to end slicing
   *   (exclusive).
   * @returns {PyRange} A new PyRange instance containing the sliced elements.
   */
  slice(begin: number = 0, end: number = this._length): PyRange {
    if (typeof begin !== "number" || typeof end !== "number") {
      throw new TypeError("Indices must be numbers");
    }
    if (!Number.isInteger(begin) || !Number.isInteger(end)) {
      throw new TypeError("Indices must be integers");
    }

    const len = this._length;
    let startIdx = begin;
    let endIdx = end;

    if (startIdx < 0) {
      startIdx = Math.max(len + startIdx, 0);
    } else {
      startIdx = Math.min(startIdx, len);
    }

    if (endIdx < 0) {
      endIdx = Math.max(len + endIdx, 0);
    } else {
      endIdx = Math.min(endIdx, len);
    }

    const origStart = this._start;
    const step = this._step;

    if (startIdx >= endIdx) {
      // Return an empty range
      const emptyStart = origStart + startIdx * step;
      const result = new PyRange(emptyStart, emptyStart, step);
      return result;
    }

    const newStart = origStart + startIdx * step;
    const newStop = origStart + endIdx * step;

    // Create a new PyRange instance with the calculated bounds
    const result = new PyRange(newStart, newStop, step);
    return result;
  }

  /**
   * Reverses the order of the elements in this range, returning a new PyRange object.
   *
   * The new range starts at the last actual element of this range and steps
   * in the opposite direction. The original range is not modified.
   *
   * @returns {PyRange} A new PyRange object with the elements in reverse order.
   */
  reverse(): PyRange {
    if (this._length === 0) {
      // Return an empty range with the same step direction — nothing to reverse
      return new PyRange(this._start, this._start, this._step);
    }
    // The new start is the last actual element (not _stop which is exclusive)
    const newStart = this.at(this._length - 1) as number;
    // The new stop is one step past the first element in the new direction
    const newStop = this._start - this._step;
    return new PyRange(newStart, newStop, -this._step);
  }

  /**
   * Returns an iterator of `[index, value]` pairs for each element in the range.
   *
   * This method behaves like `Array.prototype.entries()` and is useful for
   * iterating over both the index and value of each item.
   *
   * @returns {IterableIterator<[number, number]>} Iterator of index/value pairs.
   */
  *entries(): IterableIterator<[number, number]> {
    for (let i = 0; i < this._length; i++) {
      yield [i, this.at(i) as number];
    }
  }

  /**
   * Returns an iterator of the indices for each element in the range.
   *
   * Works the same as `Array.prototype.keys()`.
   *
   * @returns {IterableIterator<number>} Iterator of indices.
   */
  *keys(): IterableIterator<number> {
    for (let i = 0; i < this._length; i++) {
      yield i;
    }
  }

  /**
   * Returns an iterator of the values in the range.
   *
   * Equivalent to `Array.prototype.values()`.
   *
   * @returns {IterableIterator<number>} Iterator of values.
   */
  *values(): IterableIterator<number> {
    yield* this;
  }

  /**
   * Implements the iterable protocol for this range.
   * @returns {IterableIterator<number>} An iterator for this range.
   */
  [Symbol.iterator](): IterableIterator<number> {
    let index = 0;
    let current = this._start;
    const { _step: step, _length: length } = this;

    return {
      next: (): IteratorResult<number> => {
        if (index >= length) {
          return { done: true, value: undefined };
        } else {
          const value = current;
          current += step;
          index++;
          return { value, done: false };
        }
      },
      [Symbol.iterator]() {
        return this;
      },
    };
  }

  /**
   * Returns a Proxy for this range, allowing indexed access.
   * This proxy enables accessing range elements via array-like indexing.
   * If the property is a number, it will return the element at that index.
   *
   * @returns {PyRange & { [key: number]: number | undefined }} A proxy for the PyRange instance.
   */
  asProxy(): PyRange & { [key: number]: number | undefined } {
    return new Proxy(this, {
      get(target: PyRange, prop: string | symbol, receiver: object): unknown {
        if (typeof prop === "symbol") {
          return Reflect.get(target, prop, receiver);
        }
        if (PyRange.isArrayIndexProperty(prop)) {
          const idx = Number(prop);
          // Match Array behaviour: out-of-bounds returns undefined, not throw
          if (idx >= target.length) return undefined;
          return target.at(idx);
        }
        return Reflect.get(target, prop, receiver);
      },
    }) as PyRange & { [key: number]: number | undefined };
  }
}

// Export the class for both CommonJS and ES Module usage
export { PyRange };
export default PyRange;

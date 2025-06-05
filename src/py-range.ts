/**
 * A class that simulates Python's range function, combined with several useful JavaScript array methods.
 */
class PyRange implements Iterable<number> {
  private _start: number;
  private _stop: number;
  private _step: number;
  private _length: number;

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
   * @param {number} index - The index of the value to retrieve
   * @returns {number} The value at the specified index
   * @throws {RangeError} If the index is out of range
   */
  at(index: number): number {
    if (index < 0 || index >= this._length) {
      throw new RangeError("Index out of range");
    }
    return this._start + index * this._step;
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
   */
  private static validateCb(cb: Function): void {
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
      result[i] = callback(this.at(i), i, this);
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
      const value = this.at(i);
      if (callback(value, i, this)) {
        result.push(value);
      }
    }

    return result;
  }

  /**
   * Reduces the range to a single value.
   * @param {function(T, number, number, PyRange): T} callback - The callback
   * function to apply to every element. The callback should take four
   * arguments: the accumulator, the current value, the index of the current
   * value, and the range object.
   * @param {T} [initialValue] - The initial value of the accumulator.
   * @returns {T} The final value of the accumulator.
   * @template T
   */
  reduce<T>(
    callback: (accumulator: T, value: number, index: number, range: PyRange) => T,
    initialValue?: T
  ): T {
    PyRange.validateCb(callback);

    if (this._length === 0 && initialValue === undefined) {
      throw new TypeError("Reduce of empty range with no initial value");
    }

    let accumulator: T;
    let startIndex: number;

    if (initialValue !== undefined) {
      accumulator = initialValue;
      startIndex = 0;
    } else {
      accumulator = this.at(0) as unknown as T;
      startIndex = 1;
    }

    for (let i = startIndex; i < this._length; i++) {
      accumulator = callback(accumulator, this.at(i), i, this);
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
      if (callback(this.at(i), i, this)) {
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
      if (!callback(this.at(i), i, this)) {
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
      if (callback(this.at(i), i, this)) {
        return this.at(i);
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
      if (callback(this.at(i), i, this)) {
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
      if (callback(this.at(i), i, this)) {
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
      callback(this.at(i), i, this);
    }
  }

  /**
   * Determines whether the given value is present in this range.
   * @param {any} value - The value to search for.
   * @returns {boolean} True if the value is present, false otherwise.
   */
  includes(value: any): boolean {
    return this.some((item) => item === value);
  }

  /**
   * Returns the index of the first occurrence of the specified value, or -1 if it is not present.
   * @param {any} value - The value to search for.
   * @returns {number} The index of the value, or -1 if it is not present.
   */
  indexOf(value: any): number {
    for (let i = 0; i < this._length; i++) {
      if (this.at(i) === value) {
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
  lastIndexOf(value: any): number {
    for (let i = this._length - 1; i >= 0; i--) {
      if (this.at(i) === value) {
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

    const lastValue = this.at(this._length - 1);
    this._stop -= this._step;
    this._length--;
    return lastValue;
  }

  /**
   * Changes the bounds of the range according to the provided indices.
   *
   * This method behaves similarly to `Array.prototype.slice`. It updates the
   * `start`, `stop` and `length` values based on the given `begin` and `end`
   * parameters. Negative indices are supported. The range is modified in place
   * and the same instance is returned.
   *
   * @param {number} [begin=0] - Zero-based index at which to begin slicing.
   * @param {number} [end=this.length] - Zero-based index at which to end slicing
   *   (exclusive).
   * @returns {PyRange} The current PyRange instance after slicing.
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
      const empty = origStart + startIdx * step;
      this._start = empty;
      this._stop = empty;
      this._length = 0;
      return this;
    }

    this._start = origStart + startIdx * step;
    this._stop = origStart + endIdx * step;
    this._length = endIdx - startIdx;

    return this;
  }

  /**
   * Reverses the order of the elements in this range, returning a new PyRange object.
   * @returns {PyRange} A new PyRange object with the elements in reverse order.
   */
  reverse(): PyRange {
    const result = new PyRange(this._stop, this._start, -this._step);
    // Force the length to be the same as the original range
    (result as any)._length = this._length;
    return result;
  }

  /**
   * Implements the iterable protocol for this range.
   * @returns {Iterator<number>} An iterator for this range.
   */
  [Symbol.iterator](): Iterator<number> {
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
    };
  }

  /**
   * Returns a Proxy for this range, allowing indexed access.
   * This proxy enables accessing range elements via array-like indexing.
   * If the property is a number, it will return the element at that index.
   *
   * @returns {any} A proxy for the PyRange instance.
   */
  asProxy(): any {
    return new Proxy(this, {
      get(target: PyRange, prop: string | symbol): any {
        if (typeof prop === "symbol") {
          return (target as any)[prop];
        }
        if (!isNaN(Number(prop))) {
          return target.at(parseInt(String(prop), 10));
        }
        return (target as any)[prop];
      },
    });
  }
}

// Export the class for both CommonJS and ES Module usage
export { PyRange };
export default PyRange;

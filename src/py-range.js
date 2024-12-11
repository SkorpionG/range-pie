"use strict";

class PyRange {
  /**
   * A class that simulate Python's range function, combined with several useful JavaScript array methods.
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
  constructor(...args) {
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
  get length() {
    return this._length;
  }

  /**
   * Gets the starting value of the range.
   *
   * @returns {number} The starting value of the range.
   * @readonly
   */
  get start() {
    return this._start;
  }

  /**
   * Gets the ending value of the range.
   *
   * @returns {number} The ending value of the range.
   * @readonly
   */
  get stop() {
    return this._stop;
  }

  /**
   * Gets the step value of the range.
   *
   * @returns {number} The step value of the range.
   * @readonly
   */
  get step() {
    return this._step;
  }

  /**
   * Gets the value at the specified index in this range.
   * @param {number} index - The index of the value to retrieve
   * @returns {number} The value at the specified index
   * @throws {RangeError} If the index is out of range
   */
  at(index) {
    if (index < 0 || index >= this._length) {
      throw new RangeError("Index out of range");
    }
    return this._start + index * this._step;
  }

  /**
   * Converts the range to a string.
   * @returns {string} A string of the form `Range(start, stop, step)`.
   */
  toString() {
    return `PyRange(${this._start}, ${this._stop}, ${this._step})`;
  }

  /**
   * Converts the range to an array.
   * @returns {number[]} An array of numbers with the same elements as this range.
   */
  toArray() {
    return [...this];
  }

  static #validateCb(cb) {
    if (typeof cb !== "function") {
      throw new TypeError("Callback must be a function");
    }
  }

  /**
   * Creates a new array with the results of applying the given callback
   * function to every element in this range.
   * @param {function(number, number, PyRange): *} callback - The callback
   * function to apply to every element.
   * @returns {Array.<*>} A new array of the same length as this range.
   */
  map(callback) {
    PyRange.#validateCb(callback);

    const result = new Array(this._length);

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
  filter(callback) {
    PyRange.#validateCb(callback);

    const result = [];

    for (let i = 0; i < this._length; i++) {
      if (callback(this.at(i), i, this)) {
        result.push(this.at(i));
      }
    }

    return result;
  }

  /**
   * Reduces the range to a single value.
   * @param {function(*, number, number, PyRange): *} callback - The callback
   * function to apply to every element. The callback should take four
   * arguments: the accumulator, the current value, the index of the current
   * value, and the range object.
   * @param {*} [initialValue] - The initial value of the accumulator.
   * @returns {*} The final value of the accumulator.
   */
  reduce(callback, initialValue) {
    PyRange.#validateCb(callback);

    let accumulator = initialValue;

    for (let i = 0; i < this._length; i++) {
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
  some(callback) {
    PyRange.#validateCb(callback);

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
  every(callback) {
    PyRange.#validateCb(callback);

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
  find(callback) {
    PyRange.#validateCb(callback);

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
  findIndex(callback) {
    PyRange.#validateCb(callback);

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
  findLastIndex(callback) {
    PyRange.#validateCb(callback);

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
  forEach(callback) {
    PyRange.#validateCb(callback);

    for (let i = 0; i < this._length; i++) {
      callback(this.at(i), i, this);
    }
  }

  /**
   * Determines whether the given value is present in this range.
   * @param {*} value - The value to search for.
   * @returns {boolean} True if the value is present, false otherwise.
   */
  includes(value) {
    return this.some((item) => item === value);
  }

  /**
   * Returns the index of the first occurrence of the specified value, or -1 if it is not present.
   * @param {*} value - The value to search for.
   * @returns {number} The index of the value, or -1 if it is not present.
   */
  indexOf(value) {
    for (let i = 0; i < this._length; i++) {
      if (this.at(i) === value) {
        return i;
      }
    }
    return -1;
  }

  /**
   * Returns the index of the last occurrence of the specified value, or -1 if it is not present.
   * @param {*} value - The value to search for.
   * @returns {number} The index of the last occurrence of the value, or -1 if it is not present.
   */
  lastIndexOf(value) {
    for (let i = this._length - 1; i >= 0; i--) {
      if (this.at(i) === value) {
        return i;
      }
    }
    return -1;
  }

  /**
   * Reverses the order of the elements in this range, returning a new PyRange object.
   * @returns {PyRange} A new PyRange object with the elements in reverse order.
   */
  reverse() {
    const result = new PyRange(this._stop, this._start, -this._step);
    result._length = this._length;
    return result;
  }

  [Symbol.iterator]() {
    let index = 0;
    let current = this._start;
    const { _stop: _, _step: step, _length: length } = this;

    return {
      next: () => {
        if (index >= length) {
          return { done: true };
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
   * @returns {Proxy} A proxy for the PyRange instance.
   */
  asProxy() {
    return new Proxy(this, {
      get(target, prop) {
        if (typeof prop === "symbol") {
          return target[prop];
        }
        if (!isNaN(prop)) {
          return target.at(parseInt(prop));
        }
        return target[prop];
      },
    });
  }
}

module.exports = PyRange;
module.exports.PyRange = PyRange;

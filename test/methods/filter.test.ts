import { getDiverseRanges } from "../utils/array-compare";
import { describe, test, expect } from "@jest/globals";
import { PyRange } from "range-pie";

describe("PyRange filter() method", () => {
  // ── Core filtering ──────────────────────────────────────────────────────
  test("filters even numbers", () => {
    const range = new PyRange(1, 6); // [1,2,3,4,5]
    expect(range.filter((x) => x % 2 === 0)).toEqual([2, 4]);
  });

  test("filters odd numbers", () => {
    const range = new PyRange(1, 6); // [1,2,3,4,5]
    expect(range.filter((x) => x % 2 !== 0)).toEqual([1, 3, 5]);
  });

  test("filters positive numbers from cross-zero range", () => {
    const range = new PyRange(-3, 4); // [-3,-2,-1,0,1,2,3]
    expect(range.filter((x) => x > 0)).toEqual([1, 2, 3]);
  });

  test("filters elements greater than threshold", () => {
    const range = new PyRange(0, 10, 2); // [0,2,4,6,8]
    expect(range.filter((x) => x > 4)).toEqual([6, 8]);
  });

  // ── All / none pass ────────────────────────────────────────────────────
  test("returns all elements when all pass", () => {
    const range = new PyRange(1, 5); // [1,2,3,4]
    expect(range.filter(() => true)).toEqual([1, 2, 3, 4]);
  });

  test("returns empty array when none pass", () => {
    const range = new PyRange(1, 5); // [1,2,3,4]
    expect(range.filter(() => false)).toEqual([]);
  });

  // ── Callback receives correct arguments ────────────────────────────────
  test("callback receives value, index, and range", () => {
    const range = new PyRange(1, 4); // [1,2,3]
    const calls: Array<[number, number]> = [];
    range.filter((v, i) => {
      calls.push([v, i]);
      return true;
    });
    expect(calls).toEqual([
      [1, 0],
      [2, 1],
      [3, 2],
    ]);
  });

  test("callback third argument is the range instance", () => {
    const range = new PyRange(1, 3);
    const ranges: PyRange[] = [];
    range.filter((v, _i, r) => {
      ranges.push(r as PyRange);
      return true;
    });
    expect(ranges.every((r) => r === range)).toBe(true);
  });

  // ── Range types ─────────────────────────────────────────────────────────
  test("descending range", () => {
    const range = new PyRange(5, 0, -1); // [5,4,3,2,1]
    expect(range.filter((x) => x > 3)).toEqual([5, 4]);
  });

  test("stepped range", () => {
    const range = new PyRange(0, 10, 2); // [0,2,4,6,8]
    expect(range.filter((x) => x < 5)).toEqual([0, 2, 4]);
  });

  test("negative-value range", () => {
    const range = new PyRange(-5, -1); // [-5,-4,-3,-2]
    expect(range.filter((x) => x < -3)).toEqual([-5, -4]);
  });

  // ── Empty and single-element ranges ────────────────────────────────────
  test("empty range returns empty array", () => {
    const empty = new PyRange(0);
    expect(empty.filter(() => true)).toEqual([]);
  });

  test("single-element range — passes", () => {
    const range = new PyRange(7, 8); // [7]
    expect(range.filter((x) => x === 7)).toEqual([7]);
  });

  test("single-element range — fails", () => {
    const range = new PyRange(7, 8); // [7]
    expect(range.filter((x) => x === 99)).toEqual([]);
  });

  // ── Return type and immutability ────────────────────────────────────────
  test("returns a plain array", () => {
    const range = new PyRange(1, 4);
    const result = range.filter(() => true);
    expect(Array.isArray(result)).toBe(true);
    expect(result).not.toBeInstanceOf(PyRange);
  });

  test("does not mutate the original range", () => {
    const range = new PyRange(1, 6); // [1,2,3,4,5]
    const original = [...range];
    range.filter((x) => x % 2 === 0);
    expect([...range]).toEqual(original);
  });

  // ── Comparison with Array.prototype.filter ─────────────────────────────
  test("matches Array.prototype.filter output", () => {
    const range = new PyRange(1, 10); // [1..9]
    const arr = [...range];
    const pred = (x: number) => x % 3 === 0;
    expect(range.filter(pred)).toEqual(arr.filter(pred));
  });

  // ── Callback validation ─────────────────────────────────────────────────
  test("throws TypeError when callback is not a function", () => {
    const range = new PyRange(1, 4);
    expect(() => range.filter(null as unknown as () => boolean)).toThrow(TypeError);
    expect(() => range.filter(null as unknown as () => boolean)).toThrow(
      "Callback must be a function"
    );
  });
  // ── Comprehensive Array Comparison ──────────────────────────────────────
  test("comprehensive array comparison", () => {
    for (const range of getDiverseRanges()) {
      const arr = [...range];
      const filterFn = (x: number) => Math.abs(x) > 2;
      expect(range.filter(filterFn)).toEqual(arr.filter(filterFn));
    }
  });
});

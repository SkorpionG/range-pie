import { getDiverseRanges } from "../utils/array-compare";
import { describe, test, expect } from "@jest/globals";
import { PyRange } from "range-pie";

describe("PyRange map() method", () => {
  // ── Core transformation ─────────────────────────────────────────────────
  test("doubles each element", () => {
    const range = new PyRange(1, 5); // [1,2,3,4]
    expect(range.map((x) => x * 2)).toEqual([2, 4, 6, 8]);
  });

  test("squares each element", () => {
    const range = new PyRange(1, 6); // [1,2,3,4,5]
    expect(range.map((x) => x * x)).toEqual([1, 4, 9, 16, 25]);
  });

  test("converts to string", () => {
    const range = new PyRange(1, 4); // [1,2,3]
    expect(range.map((x) => String(x))).toEqual(["1", "2", "3"]);
  });

  test("maps to object", () => {
    const range = new PyRange(0, 3); // [0,1,2]
    expect(range.map((x) => ({ value: x }))).toEqual([{ value: 0 }, { value: 1 }, { value: 2 }]);
  });

  // ── Callback receives correct arguments ────────────────────────────────
  test("callback receives value, index, and range", () => {
    const range = new PyRange(1, 4); // [1,2,3]
    const calls: Array<[number, number]> = [];
    range.map((v, i) => {
      calls.push([v, i]);
      return v;
    });
    expect(calls).toEqual([
      [1, 0],
      [2, 1],
      [3, 2],
    ]);
  });

  test("callback third argument is the range instance", () => {
    const range = new PyRange(1, 3); // [1,2]
    const ranges: PyRange[] = [];
    range.map((v, _i, r) => {
      ranges.push(r as PyRange);
      return v;
    });
    expect(ranges.every((r) => r === range)).toBe(true);
  });

  // ── Range types ────────────────────────────────────────────────────────
  test("descending range", () => {
    const range = new PyRange(5, 0, -1); // [5,4,3,2,1]
    expect(range.map((x) => x * 2)).toEqual([10, 8, 6, 4, 2]);
  });

  test("stepped range", () => {
    const range = new PyRange(0, 10, 2); // [0,2,4,6,8]
    expect(range.map((x) => x + 1)).toEqual([1, 3, 5, 7, 9]);
  });

  test("negative-value range", () => {
    const range = new PyRange(-3, 0); // [-3,-2,-1]
    expect(range.map((x) => Math.abs(x))).toEqual([3, 2, 1]);
  });

  test("cross-zero range", () => {
    const range = new PyRange(-2, 3); // [-2,-1,0,1,2]
    expect(range.map((x) => x >= 0)).toEqual([false, false, true, true, true]);
  });

  // ── Empty and single-element ranges ────────────────────────────────────
  test("empty range returns empty array", () => {
    const empty = new PyRange(0);
    expect(empty.map((x) => x * 2)).toEqual([]);
  });

  test("single-element range", () => {
    const range = new PyRange(7, 8); // [7]
    expect(range.map((x) => x * 3)).toEqual([21]);
  });

  // ── Return type and immutability ────────────────────────────────────────
  test("returns a plain array, not a PyRange", () => {
    const range = new PyRange(1, 4);
    const result = range.map((x) => x);
    expect(Array.isArray(result)).toBe(true);
    expect(result).not.toBeInstanceOf(PyRange);
  });

  test("does not mutate the original range", () => {
    const range = new PyRange(1, 4); // [1,2,3]
    const original = [...range];
    range.map((x) => x * 99);
    expect([...range]).toEqual(original);
  });

  // ── Comparison with Array.prototype.map ────────────────────────────────
  test("matches Array.prototype.map output", () => {
    const range = new PyRange(1, 6); // [1,2,3,4,5]
    const arr = [...range];
    expect(range.map((x) => x * 2)).toEqual(arr.map((x) => x * 2));
  });

  // ── Callback validation ─────────────────────────────────────────────────
  test("throws TypeError when callback is not a function", () => {
    const range = new PyRange(1, 4);
    expect(() => range.map(null as unknown as () => number)).toThrow(TypeError);
    expect(() => range.map(null as unknown as () => number)).toThrow("Callback must be a function");
  });
  // ── Comprehensive Array Comparison ──────────────────────────────────────
  test("comprehensive array comparison", () => {
    for (const range of getDiverseRanges()) {
      const arr = [...range];
      const mapFn = (x: number, i: number) => x * i;
      expect(range.map(mapFn)).toEqual(arr.map(mapFn));
    }
  });
});

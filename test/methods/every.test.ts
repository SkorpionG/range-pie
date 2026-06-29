import { getDiverseRanges } from "../utils/array-compare";
import { describe, test, expect } from "@jest/globals";
import { PyRange } from "range-pie";

describe("PyRange every() method", () => {
  test("returns true when all elements match", () => {
    const range = new PyRange(1, 6); // [1,2,3,4,5]
    expect(range.every((x) => x > 0)).toBe(true);
  });

  test("returns false when at least one element does not match", () => {
    const range = new PyRange(1, 6); // [1,2,3,4,5]
    expect(range.every((x) => x > 3)).toBe(false);
  });

  test("returns false on first mismatch (short-circuits)", () => {
    const range = new PyRange(1, 100);
    let callCount = 0;
    const result = range.every((x) => {
      callCount++;
      return x < 2; // fails at x=2
    });
    expect(result).toBe(false);
    expect(callCount).toBe(2); // checked 1 (pass), then 2 (fail, stop)
  });

  test("returns true for empty range (vacuous truth)", () => {
    const empty = new PyRange(0);
    expect(empty.every(() => false)).toBe(true);
  });

  test("returns true for single-element range when element matches", () => {
    const range = new PyRange(5, 6); // [5]
    expect(range.every((x) => x === 5)).toBe(true);
  });

  test("returns false for single-element range when element doesn't match", () => {
    const range = new PyRange(5, 6); // [5]
    expect(range.every((x) => x === 99)).toBe(false);
  });

  test("works on descending range", () => {
    const range = new PyRange(5, 0, -1); // [5,4,3,2,1]
    expect(range.every((x) => x > 0)).toBe(true);
    expect(range.every((x) => x > 3)).toBe(false);
  });

  test("works on negative-value range", () => {
    const range = new PyRange(-5, -1); // [-5,-4,-3,-2]
    expect(range.every((x) => x < 0)).toBe(true);
    expect(range.every((x) => x < -3)).toBe(false);
  });

  test("works on stepped range", () => {
    const range = new PyRange(0, 10, 2); // [0,2,4,6,8]
    expect(range.every((x) => x % 2 === 0)).toBe(true);
    expect(range.every((x) => x < 8)).toBe(false);
  });

  test("works on cross-zero range", () => {
    const range = new PyRange(-2, 3); // [-2,-1,0,1,2]
    expect(range.every((x) => x >= -2)).toBe(true);
    expect(range.every((x) => x > 0)).toBe(false);
  });

  test("callback receives value, index, and range", () => {
    const range = new PyRange(1, 3); // [1,2]
    const calls: Array<[number, number]> = [];
    range.every((v, i) => {
      calls.push([v, i]);
      return true;
    });
    expect(calls).toEqual([
      [1, 0],
      [2, 1],
    ]);
  });

  test("does not mutate the original range", () => {
    const range = new PyRange(1, 4);
    const original = [...range];
    range.every(() => true);
    expect([...range]).toEqual(original);
  });

  test("matches Array.prototype.every behavior", () => {
    const range = new PyRange(2, 10, 2); // [2,4,6,8]
    const arr = [...range];
    const pred = (x: number) => x % 2 === 0;
    expect(range.every(pred)).toBe(arr.every(pred));
  });

  test("throws TypeError when callback is not a function", () => {
    const range = new PyRange(1, 4);
    expect(() => range.every(null as unknown as () => boolean)).toThrow(TypeError);
    expect(() => range.every(null as unknown as () => boolean)).toThrow(
      "Callback must be a function"
    );
  });
  // ── Comprehensive Array Comparison ──────────────────────────────────────
  test("comprehensive array comparison", () => {
    for (const range of getDiverseRanges()) {
      const arr = [...range];
      const everyFn = (x: number) => Math.abs(x) < 50;
      expect(range.every(everyFn)).toBe(arr.every(everyFn));
      const failFn = (x: number) => x > 999;
      expect(range.every(failFn)).toBe(arr.every(failFn));
    }
  });
});

import { getDiverseRanges } from "../utils/array-compare";
import { describe, test, expect } from "@jest/globals";
import { PyRange } from "range-pie";

describe("PyRange some() method", () => {
  test("returns true when at least one element matches", () => {
    const range = new PyRange(1, 6); // [1,2,3,4,5]
    expect(range.some((x) => x > 3)).toBe(true);
  });

  test("returns false when no element matches", () => {
    const range = new PyRange(1, 6); // [1,2,3,4,5]
    expect(range.some((x) => x > 10)).toBe(false);
  });

  test("returns true on first match (short-circuits)", () => {
    const range = new PyRange(1, 100);
    let callCount = 0;
    const result = range.some((x) => {
      callCount++;
      return x === 1; // matches immediately
    });
    expect(result).toBe(true);
    expect(callCount).toBe(1); // stops after first match
  });

  test("returns false for empty range", () => {
    const empty = new PyRange(0);
    expect(empty.some(() => true)).toBe(false);
  });

  test("returns true for single-element range when element matches", () => {
    const range = new PyRange(5, 6); // [5]
    expect(range.some((x) => x === 5)).toBe(true);
  });

  test("returns false for single-element range when element doesn't match", () => {
    const range = new PyRange(5, 6); // [5]
    expect(range.some((x) => x === 99)).toBe(false);
  });

  test("works on descending range", () => {
    const range = new PyRange(5, 0, -1); // [5,4,3,2,1]
    expect(range.some((x) => x === 1)).toBe(true);
    expect(range.some((x) => x === 0)).toBe(false); // 0 excluded
  });

  test("works on negative-value range", () => {
    const range = new PyRange(-5, -1); // [-5,-4,-3,-2]
    expect(range.some((x) => x === -3)).toBe(true);
    expect(range.some((x) => x > 0)).toBe(false);
  });

  test("works on cross-zero range", () => {
    const range = new PyRange(-2, 3); // [-2,-1,0,1,2]
    expect(range.some((x) => x === 0)).toBe(true);
    expect(range.some((x) => x > 5)).toBe(false);
  });

  test("callback receives value, index, and range", () => {
    const range = new PyRange(1, 3); // [1,2]
    const calls: Array<[number, number]> = [];
    range.some((v, i) => {
      calls.push([v, i]);
      return false;
    });
    expect(calls).toEqual([
      [1, 0],
      [2, 1],
    ]);
  });

  test("does not mutate the original range", () => {
    const range = new PyRange(1, 4);
    const original = [...range];
    range.some(() => true);
    expect([...range]).toEqual(original);
  });

  test("matches Array.prototype.some behavior", () => {
    const range = new PyRange(1, 10);
    const arr = [...range];
    const pred = (x: number) => x > 7;
    expect(range.some(pred)).toBe(arr.some(pred));
  });

  test("throws TypeError when callback is not a function", () => {
    const range = new PyRange(1, 4);
    expect(() => range.some(null as unknown as () => boolean)).toThrow(TypeError);
    expect(() => range.some(null as unknown as () => boolean)).toThrow(
      "Callback must be a function"
    );
  });
  // ── Comprehensive Array Comparison ──────────────────────────────────────
  test("comprehensive array comparison", () => {
    for (const range of getDiverseRanges()) {
      const arr = [...range];
      const someFn = (x: number) => x === 0 || x === 5;
      expect(range.some(someFn)).toBe(arr.some(someFn));
    }
  });
});

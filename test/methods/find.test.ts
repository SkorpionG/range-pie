import { getDiverseRanges } from "../utils/array-compare";
import { describe, test, expect } from "@jest/globals";
import { PyRange } from "range-pie";

describe("PyRange find() method", () => {
  test("returns the first element that matches", () => {
    const range = new PyRange(1, 6); // [1,2,3,4,5]
    expect(range.find((x) => x > 3)).toBe(4);
  });

  test("returns undefined when no element matches", () => {
    const range = new PyRange(1, 6); // [1,2,3,4,5]
    expect(range.find((x) => x > 10)).toBeUndefined();
  });

  test("returns first element when all match", () => {
    const range = new PyRange(1, 5); // [1,2,3,4]
    expect(range.find(() => true)).toBe(1);
  });

  test("stops at first match (short-circuits)", () => {
    const range = new PyRange(1, 100);
    let callCount = 0;
    const result = range.find((x) => {
      callCount++;
      return x === 5;
    });
    expect(result).toBe(5);
    expect(callCount).toBe(5); // checked 1,2,3,4,5
  });

  test("returns undefined for empty range", () => {
    const empty = new PyRange(0);
    expect(empty.find(() => true)).toBeUndefined();
  });

  test("single-element range — matches", () => {
    const range = new PyRange(42, 43); // [42]
    expect(range.find((x) => x === 42)).toBe(42);
  });

  test("single-element range — does not match", () => {
    const range = new PyRange(42, 43); // [42]
    expect(range.find((x) => x === 99)).toBeUndefined();
  });

  test("works on descending range", () => {
    const range = new PyRange(5, 0, -1); // [5,4,3,2,1]
    expect(range.find((x) => x < 4)).toBe(3);
  });

  test("works on stepped range", () => {
    const range = new PyRange(0, 10, 2); // [0,2,4,6,8]
    expect(range.find((x) => x > 5)).toBe(6);
  });

  test("works on negative-value range", () => {
    const range = new PyRange(-5, -1); // [-5,-4,-3,-2]
    expect(range.find((x) => x > -4)).toBe(-3);
  });

  test("works on cross-zero range", () => {
    const range = new PyRange(-3, 4); // [-3,-2,-1,0,1,2,3]
    expect(range.find((x) => x >= 0)).toBe(0);
  });

  test("callback receives value, index, and range", () => {
    const range = new PyRange(1, 4); // [1,2,3]
    const calls: Array<[number, number]> = [];
    range.find((v, i) => {
      calls.push([v, i]);
      return false;
    });
    expect(calls).toEqual([
      [1, 0],
      [2, 1],
      [3, 2],
    ]);
  });

  test("callback third argument is the range instance", () => {
    const range = new PyRange(1, 3);
    let receivedRange: PyRange | null = null;
    range.find((_v, _i, r) => {
      receivedRange = r as PyRange;
      return true;
    });
    expect(receivedRange).toBe(range);
  });

  test("does not mutate the original range", () => {
    const range = new PyRange(1, 4);
    const original = [...range];
    range.find(() => false);
    expect([...range]).toEqual(original);
  });

  test("matches Array.prototype.find behavior", () => {
    const range = new PyRange(1, 10);
    const arr = [...range];
    const pred = (x: number) => x > 6;
    expect(range.find(pred)).toBe(arr.find(pred));
  });

  test("throws TypeError when callback is not a function", () => {
    const range = new PyRange(1, 4);
    expect(() => range.find(null as unknown as () => boolean)).toThrow(TypeError);
    expect(() => range.find(null as unknown as () => boolean)).toThrow(
      "Callback must be a function"
    );
  });
  // ── Comprehensive Array Comparison ──────────────────────────────────────
  test("comprehensive array comparison", () => {
    for (const range of getDiverseRanges()) {
      const arr = [...range];
      const findFn = (x: number) => Math.abs(x) === 2 || Math.abs(x) === 3;
      expect(range.find(findFn)).toBe(arr.find(findFn));
    }
  });
});

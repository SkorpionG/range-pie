import { getDiverseRanges } from "../utils/array-compare";
import { describe, test, expect } from "@jest/globals";
import { PyRange } from "range-pie";

describe("PyRange findIndex() method", () => {
  test("returns index of first matching element", () => {
    const range = new PyRange(1, 6); // [1,2,3,4,5]
    expect(range.findIndex((x) => x > 3)).toBe(3); // 4 is at index 3
  });

  test("returns -1 when no element matches", () => {
    const range = new PyRange(1, 6); // [1,2,3,4,5]
    expect(range.findIndex((x) => x > 10)).toBe(-1);
  });

  test("returns 0 when first element matches", () => {
    const range = new PyRange(1, 5); // [1,2,3,4]
    expect(range.findIndex(() => true)).toBe(0);
  });

  test("returns index of last element when it is the only match", () => {
    const range = new PyRange(1, 6); // [1,2,3,4,5]
    expect(range.findIndex((x) => x === 5)).toBe(4);
  });

  test("stops at first match (short-circuits)", () => {
    const range = new PyRange(1, 100);
    let callCount = 0;
    const result = range.findIndex((x) => {
      callCount++;
      return x === 3;
    });
    expect(result).toBe(2);
    expect(callCount).toBe(3); // checked 1,2,3
  });

  test("returns -1 for empty range", () => {
    const empty = new PyRange(0);
    expect(empty.findIndex(() => true)).toBe(-1);
  });

  test("single-element range — matches at index 0", () => {
    const range = new PyRange(42, 43); // [42]
    expect(range.findIndex((x) => x === 42)).toBe(0);
  });

  test("single-element range — does not match returns -1", () => {
    const range = new PyRange(42, 43); // [42]
    expect(range.findIndex((x) => x === 99)).toBe(-1);
  });

  test("works on descending range", () => {
    const range = new PyRange(5, 0, -1); // [5,4,3,2,1]
    expect(range.findIndex((x) => x === 2)).toBe(3);
  });

  test("works on stepped range", () => {
    const range = new PyRange(0, 10, 2); // [0,2,4,6,8]
    expect(range.findIndex((x) => x > 5)).toBe(3); // 6 is at index 3
  });

  test("works on negative-value range", () => {
    const range = new PyRange(-5, -1); // [-5,-4,-3,-2]
    expect(range.findIndex((x) => x === -3)).toBe(2);
  });

  test("works on cross-zero range", () => {
    const range = new PyRange(-3, 4); // [-3,-2,-1,0,1,2,3]
    expect(range.findIndex((x) => x >= 0)).toBe(3); // 0 is at index 3
  });

  test("callback receives value, index, and range", () => {
    const range = new PyRange(1, 4); // [1,2,3]
    const calls: Array<[number, number]> = [];
    range.findIndex((v, i) => {
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
    range.findIndex((_v, _i, r) => {
      receivedRange = r as PyRange;
      return true;
    });
    expect(receivedRange).toBe(range);
  });

  test("does not mutate the original range", () => {
    const range = new PyRange(1, 4);
    const original = [...range];
    range.findIndex(() => false);
    expect([...range]).toEqual(original);
  });

  test("matches Array.prototype.findIndex behavior", () => {
    const range = new PyRange(1, 10);
    const arr = [...range];
    const pred = (x: number) => x > 6;
    expect(range.findIndex(pred)).toBe(arr.findIndex(pred));
  });

  // ── findIndex vs findLastIndex ──────────────────────────────────────────
  test("findIndex returns first, findLastIndex returns last for multi-match", () => {
    const range = new PyRange(0, 10); // [0,1,2,3,4,5,6,7,8,9]
    const pred = (x: number) => x % 4 === 0; // 0,4,8
    expect(range.findIndex(pred)).toBe(0); // 0 is at index 0
    expect(range.findLastIndex(pred)).toBe(8); // 8 is at index 8
  });

  test("throws TypeError when callback is not a function", () => {
    const range = new PyRange(1, 4);
    expect(() => range.findIndex(null as unknown as () => boolean)).toThrow(TypeError);
    expect(() => range.findIndex(null as unknown as () => boolean)).toThrow(
      "Callback must be a function"
    );
  });
  // ── Comprehensive Array Comparison ──────────────────────────────────────
  test("comprehensive array comparison", () => {
    for (const range of getDiverseRanges()) {
      const arr = [...range];
      const findIndexFn = (x: number) => Math.abs(x) === 2 || Math.abs(x) === 3;
      expect(range.findIndex(findIndexFn)).toBe(arr.findIndex(findIndexFn));
    }
  });
});

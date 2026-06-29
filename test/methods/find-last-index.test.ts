import { getDiverseRanges } from "../utils/array-compare";
import { describe, test, expect } from "@jest/globals";
import { PyRange } from "range-pie";

describe("PyRange findLastIndex() method", () => {
  // ── Basic functionality ─────────────────────────────────────────────────
  test("returns last index matching predicate", () => {
    const range = new PyRange(1, 6); // [1,2,3,4,5]
    expect(range.findLastIndex((x) => x % 2 === 0)).toBe(3); // 4 is at index 3
  });

  test("returns -1 when no element matches", () => {
    const range = new PyRange(1, 6); // [1,2,3,4,5]
    expect(range.findLastIndex((x) => x > 10)).toBe(-1);
  });

  test("returns last index when multiple elements match", () => {
    const range = new PyRange(0, 10, 2); // [0,2,4,6,8]
    // All elements are even; last even is 8 at index 4
    expect(range.findLastIndex((x) => x % 2 === 0)).toBe(4);
  });

  test("returns 0 when only first element matches", () => {
    const range = new PyRange(1, 6); // [1,2,3,4,5]
    expect(range.findLastIndex((x) => x === 1)).toBe(0);
  });

  test("returns length-1 when only last element matches", () => {
    const range = new PyRange(1, 6); // [1,2,3,4,5]
    expect(range.findLastIndex((x) => x === 5)).toBe(4);
  });

  // ── Empty range ─────────────────────────────────────────────────────────
  test("returns -1 for empty range", () => {
    const empty = new PyRange(0);
    expect(empty.findLastIndex(() => true)).toBe(-1);
  });

  // ── Single element range ────────────────────────────────────────────────
  test("returns 0 when single element matches", () => {
    const range = new PyRange(7, 8); // [7]
    expect(range.findLastIndex((x) => x === 7)).toBe(0);
  });

  test("returns -1 when single element does not match", () => {
    const range = new PyRange(7, 8); // [7]
    expect(range.findLastIndex((x) => x === 99)).toBe(-1);
  });

  // ── Descending ranges ───────────────────────────────────────────────────
  test("works on descending range", () => {
    const range = new PyRange(5, 0, -1); // [5,4,3,2,1]
    // Last element > 2 is 3 at index 2
    expect(range.findLastIndex((x) => x > 2)).toBe(2);
  });

  // ── Negative-value ranges ───────────────────────────────────────────────
  test("works on negative-value range", () => {
    const range = new PyRange(-5, -1); // [-5,-4,-3,-2]
    expect(range.findLastIndex((x) => x < -3)).toBe(1); // -4 is at index 1
  });

  // ── Cross-zero ranges ───────────────────────────────────────────────────
  test("works on cross-zero range", () => {
    const range = new PyRange(-3, 4); // [-3,-2,-1,0,1,2,3]
    // Last negative is -1 at index 2
    expect(range.findLastIndex((x) => x < 0)).toBe(2);
  });

  // ── Callback receives correct arguments ────────────────────────────────
  test("callback receives value, index, and range object", () => {
    const range = new PyRange(1, 4); // [1,2,3]
    const calls: Array<[number, number]> = [];
    range.findLastIndex((value, index) => {
      calls.push([value, index]);
      return false;
    });
    // Should be called in reverse order from last to first
    expect(calls).toEqual([
      [3, 2],
      [2, 1],
      [1, 0],
    ]);
  });

  test("callback receives the range instance as third argument", () => {
    const range = new PyRange(1, 4); // [1,2,3]
    let receivedRange: PyRange | null = null;
    range.findLastIndex((_, __, r) => {
      receivedRange = r as PyRange;
      return true; // stop at first (last) match
    });
    expect(receivedRange).toBe(range);
  });

  // ── Stops after first match from the right ─────────────────────────────
  test("stops searching after first match from the right", () => {
    const range = new PyRange(0, 5); // [0,1,2,3,4]
    let callCount = 0;
    range.findLastIndex((x) => {
      callCount++;
      return x === 3; // match at index 3 (second from right)
    });
    // Should call: index 4 (no match), index 3 (match, stop)
    expect(callCount).toBe(2);
  });

  // ── Callback validation ─────────────────────────────────────────────────
  test("throws TypeError when callback is not a function", () => {
    const range = new PyRange(1, 4);
    expect(() => range.findLastIndex(null as unknown as () => boolean)).toThrow(TypeError);
    expect(() => range.findLastIndex("cb" as unknown as () => boolean)).toThrow(TypeError);
  });

  // ── Consistency with findIndex ─────────────────────────────────────────
  test("findLastIndex >= findIndex when element exists", () => {
    const range = new PyRange(0, 10); // [0,1,2,3,4,5,6,7,8,9]
    const pred = (x: number) => x % 3 === 0; // 0,3,6,9
    const first = range.findIndex(pred); // 0
    const last = range.findLastIndex(pred); // 9 at index 9
    expect(last).toBeGreaterThanOrEqual(first);
    expect(first).toBe(0);
    expect(last).toBe(9);
  });

  test("findLastIndex equals findIndex when only one element matches", () => {
    const range = new PyRange(1, 6); // [1,2,3,4,5]
    const pred = (x: number) => x === 3; // only one match
    expect(range.findIndex(pred)).toBe(range.findLastIndex(pred));
  });

  // ── Comparison with Array.prototype.findLastIndex ──────────────────────
  test("matches Array.prototype.findLastIndex behavior", () => {
    const range = new PyRange(0, 8); // [0,1,2,3,4,5,6,7]
    const arr = [...range];
    const pred = (x: number) => x % 2 === 1; // odd numbers
    expect(range.findLastIndex(pred)).toBe(arr.findLastIndex(pred));
  });
  // ── Comprehensive Array Comparison ──────────────────────────────────────
  test("comprehensive array comparison", () => {
    for (const range of getDiverseRanges()) {
      const arr = [...range];
      const pred = (x: number) => Math.abs(x) % 2 === 0;
      expect(range.findLastIndex(pred)).toBe(arr.findLastIndex(pred));
      expect(range.findLastIndex((x) => x === 999)).toBe(arr.findLastIndex((x) => x === 999));
    }
  });
});

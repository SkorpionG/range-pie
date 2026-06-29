import { getDiverseRanges } from "../utils/array-compare";
import { describe, test, expect } from "@jest/globals";
import { PyRange } from "range-pie";

describe("PyRange at() method", () => {
  // ── Basic positive-index access ──────────────────────────────────────────
  test("positive indices on ascending range", () => {
    const range = new PyRange(1, 6); // [1,2,3,4,5]
    expect(range.at(0)).toBe(1);
    expect(range.at(1)).toBe(2);
    expect(range.at(4)).toBe(5);
  });

  test("positive indices on descending range", () => {
    const range = new PyRange(5, 0, -1); // [5,4,3,2,1]
    expect(range.at(0)).toBe(5);
    expect(range.at(4)).toBe(1);
  });

  test("positive indices on stepped range", () => {
    const range = new PyRange(0, 10, 2); // [0,2,4,6,8]
    expect(range.at(0)).toBe(0);
    expect(range.at(2)).toBe(4);
    expect(range.at(4)).toBe(8);
  });

  test("positive index on single-element range", () => {
    const range = new PyRange(7, 8); // [7]
    expect(range.at(0)).toBe(7);
  });

  // ── Out-of-bounds positive index ───────────────────────────────────────
  test("returns undefined when positive index >= length", () => {
    const range = new PyRange(1, 6); // length 5
    expect(range.at(5)).toBeUndefined();
    expect(range.at(100)).toBeUndefined();
  });

  test("returns undefined on empty range", () => {
    const empty = new PyRange(0);
    expect(empty.at(0)).toBeUndefined();
  });

  // ── Negative index support ─────────────────────────────────────────────
  test("at(-1) returns last element like Array.prototype.at", () => {
    const range = new PyRange(1, 6); // [1,2,3,4,5]
    expect(range.at(-1)).toBe(5);
  });

  test("at(-2) returns second-to-last element", () => {
    const range = new PyRange(1, 6); // [1,2,3,4,5]
    expect(range.at(-2)).toBe(4);
  });

  test("at(-length) returns first element", () => {
    const range = new PyRange(1, 6); // [1,2,3,4,5], length=5
    expect(range.at(-5)).toBe(1);
  });

  test("at(-1) on descending range returns last element", () => {
    const range = new PyRange(5, 0, -1); // [5,4,3,2,1]
    expect(range.at(-1)).toBe(1);
  });

  test("at(-1) on stepped range returns last element", () => {
    const range = new PyRange(0, 10, 3); // [0,3,6,9]
    expect(range.at(-1)).toBe(9);
  });

  test("at(-1) on single-element range returns that element", () => {
    const range = new PyRange(42, 43); // [42]
    expect(range.at(-1)).toBe(42);
  });

  // ── Out-of-bounds negative index ───────────────────────────────────────
  test("returns undefined when negative index exceeds -(length)", () => {
    const range = new PyRange(1, 6); // length 5
    expect(range.at(-6)).toBeUndefined();
    expect(range.at(-100)).toBeUndefined();
  });

  test("returns undefined on empty range with negative index", () => {
    const empty = new PyRange(0);
    expect(empty.at(-1)).toBeUndefined();
  });

  // ── Cross-range type coverage ───────────────────────────────────────────
  test("at() works on negative-value ranges with negative indices", () => {
    const range = new PyRange(-5, -1); // [-5,-4,-3,-2]
    expect(range.at(0)).toBe(-5);
    expect(range.at(3)).toBe(-2);
    expect(range.at(-1)).toBe(-2);
    expect(range.at(-4)).toBe(-5);
  });

  test("at() works on cross-zero ranges with negative indices", () => {
    const range = new PyRange(-3, 4); // [-3,-2,-1,0,1,2,3]
    expect(range.at(3)).toBe(0);
    expect(range.at(-1)).toBe(3);
    expect(range.at(-7)).toBe(-3);
  });

  // ── Consistency: at(i) == [...range][i] for all valid indices ──────────
  test("positive at(i) matches spread array index", () => {
    const range = new PyRange(2, 12, 3); // [2,5,8,11]
    const arr = [...range];
    for (let i = 0; i < range.length; i++) {
      expect(range.at(i)).toBe(arr[i]);
    }
  });

  test("negative at(-i) matches Array.prototype.at(-i)", () => {
    const range = new PyRange(1, 6); // [1,2,3,4,5]
    const arr = [...range];
    for (let i = 1; i <= range.length; i++) {
      expect(range.at(-i)).toBe(arr.at(-i));
    }
  });

  test("non-integer and special numeric indices match Array.prototype.at", () => {
    const range = new PyRange(10, 20, 2); // [10,12,14,16,18]
    const arr = [...range];
    const indices = [1.9, -1.9, 0.9, -0.9, NaN, Infinity, -Infinity];

    for (const index of indices) {
      expect(range.at(index)).toBe(arr.at(index));
    }
  });

  // ── Comprehensive Array Comparison ──────────────────────────────────────
  test("comprehensive array comparison", () => {
    for (const range of getDiverseRanges()) {
      const arr = [...range];
      // Test all valid indices
      arr.forEach((_, i) => expect(range.at(i)).toBe(arr.at(i)));
      // Test negative indices
      arr.forEach((_, i) => expect(range.at(-i)).toBe(arr.at(-i)));
      // Test out of bounds
      expect(range.at(999)).toBe(arr.at(999));
      expect(range.at(-999)).toBe(arr.at(-999));
    }
  });
});

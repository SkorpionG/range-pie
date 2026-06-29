import { getDiverseRanges } from "../utils/array-compare";
import { describe, test, expect } from "@jest/globals";
import { PyRange } from "range-pie";

describe("PyRange includes() method", () => {
  test("returns true for element in ascending range", () => {
    const range = new PyRange(1, 6); // [1,2,3,4,5]
    expect(range.includes(3)).toBe(true);
    expect(range.includes(1)).toBe(true); // first
    expect(range.includes(5)).toBe(true); // last
  });

  test("returns false for element not in range", () => {
    const range = new PyRange(1, 6); // [1,2,3,4,5]
    expect(range.includes(0)).toBe(false); // before start
    expect(range.includes(6)).toBe(false); // stop is exclusive
    expect(range.includes(10)).toBe(false);
  });

  test("works on stepped range — step gaps are excluded", () => {
    const range = new PyRange(0, 10, 2); // [0,2,4,6,8]
    expect(range.includes(4)).toBe(true);
    expect(range.includes(3)).toBe(false); // in gap
    expect(range.includes(9)).toBe(false); // not a multiple of step from start
  });

  test("works on descending range", () => {
    const range = new PyRange(5, 0, -1); // [5,4,3,2,1]
    expect(range.includes(3)).toBe(true);
    expect(range.includes(0)).toBe(false); // stop is exclusive
  });

  test("works on negative-value range", () => {
    const range = new PyRange(-5, -1); // [-5,-4,-3,-2]
    expect(range.includes(-3)).toBe(true);
    expect(range.includes(-1)).toBe(false); // stop is exclusive
  });

  test("works on cross-zero range", () => {
    const range = new PyRange(-2, 3); // [-2,-1,0,1,2]
    expect(range.includes(0)).toBe(true);
    expect(range.includes(3)).toBe(false);
  });

  test("returns false for all values on empty range", () => {
    const empty = new PyRange(0);
    expect(empty.includes(0)).toBe(false);
    expect(empty.includes(1)).toBe(false);
  });

  test("works on single-element range", () => {
    const range = new PyRange(7, 8); // [7]
    expect(range.includes(7)).toBe(true);
    expect(range.includes(8)).toBe(false);
  });

  test("returns false for non-number types", () => {
    const range = new PyRange(1, 5); // [1,2,3,4]
    expect(range.includes("1" as unknown as number)).toBe(false);
    expect(range.includes(null as unknown as number)).toBe(false);
    expect(range.includes(undefined as unknown as number)).toBe(false);
  });

  test("returns false for NaN (NaN !== NaN)", () => {
    const range = new PyRange(1, 5);
    expect(range.includes(NaN)).toBe(false);
  });

  test("does not mutate the original range", () => {
    const range = new PyRange(1, 4);
    const original = [...range];
    range.includes(2);
    expect([...range]).toEqual(original);
  });

  test("matches manual Array.prototype.includes behavior", () => {
    const range = new PyRange(0, 10);
    const arr = [...range];
    for (const v of arr) {
      expect(range.includes(v)).toBe(arr.includes(v));
    }
    expect(range.includes(99)).toBe(arr.includes(99));
  });
  // ── Comprehensive Array Comparison ──────────────────────────────────────
  test("comprehensive array comparison", () => {
    for (const range of getDiverseRanges()) {
      const arr = [...range];
      arr.forEach((x) => expect(range.includes(x)).toBe(arr.includes(x)));
      expect(range.includes(999)).toBe(arr.includes(999));
      expect(range.includes(-999)).toBe(arr.includes(-999));
    }
  });
});

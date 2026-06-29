import { getDiverseRanges } from "../utils/array-compare";
import { describe, test, expect } from "@jest/globals";
import { PyRange } from "range-pie";

describe("PyRange indexOf() method", () => {
  test("returns index of existing element", () => {
    const range = new PyRange(1, 6); // [1,2,3,4,5]
    expect(range.indexOf(3)).toBe(2);
    expect(range.indexOf(1)).toBe(0); // first element
    expect(range.indexOf(5)).toBe(4); // last element
  });

  test("returns -1 for element not in range", () => {
    const range = new PyRange(1, 6); // [1,2,3,4,5]
    expect(range.indexOf(0)).toBe(-1); // before start
    expect(range.indexOf(6)).toBe(-1); // stop is exclusive
    expect(range.indexOf(99)).toBe(-1);
  });

  test("returns -1 for element in a step gap", () => {
    const range = new PyRange(0, 10, 2); // [0,2,4,6,8]
    expect(range.indexOf(3)).toBe(-1); // in gap
    expect(range.indexOf(7)).toBe(-1);
  });

  test("returns correct index on stepped range", () => {
    const range = new PyRange(0, 10, 2); // [0,2,4,6,8]
    expect(range.indexOf(0)).toBe(0);
    expect(range.indexOf(4)).toBe(2);
    expect(range.indexOf(8)).toBe(4);
  });

  test("works on descending range", () => {
    const range = new PyRange(5, 0, -1); // [5,4,3,2,1]
    expect(range.indexOf(5)).toBe(0);
    expect(range.indexOf(1)).toBe(4);
    expect(range.indexOf(0)).toBe(-1); // stop is exclusive
  });

  test("works on negative-value range", () => {
    const range = new PyRange(-5, -1); // [-5,-4,-3,-2]
    expect(range.indexOf(-5)).toBe(0);
    expect(range.indexOf(-2)).toBe(3);
    expect(range.indexOf(-1)).toBe(-1);
  });

  test("works on cross-zero range", () => {
    const range = new PyRange(-2, 3); // [-2,-1,0,1,2]
    expect(range.indexOf(0)).toBe(2);
    expect(range.indexOf(3)).toBe(-1);
  });

  test("returns -1 on empty range", () => {
    const empty = new PyRange(0);
    expect(empty.indexOf(0)).toBe(-1);
  });

  test("works on single-element range", () => {
    const range = new PyRange(42, 43); // [42]
    expect(range.indexOf(42)).toBe(0);
    expect(range.indexOf(43)).toBe(-1);
  });

  test("returns -1 for non-number types", () => {
    const range = new PyRange(1, 5);
    expect(range.indexOf("1" as unknown as number)).toBe(-1);
    expect(range.indexOf(null as unknown as number)).toBe(-1);
  });

  test("does not mutate the original range", () => {
    const range = new PyRange(1, 4);
    const original = [...range];
    range.indexOf(2);
    expect([...range]).toEqual(original);
  });

  test("matches Array.prototype.indexOf behavior", () => {
    const range = new PyRange(1, 10);
    const arr = [...range];
    for (const v of arr) {
      expect(range.indexOf(v)).toBe(arr.indexOf(v));
    }
    expect(range.indexOf(99)).toBe(arr.indexOf(99));
  });
});

describe("PyRange lastIndexOf() method", () => {
  test("returns index of last occurrence of element", () => {
    const range = new PyRange(1, 6); // [1,2,3,4,5] — all unique
    expect(range.lastIndexOf(3)).toBe(2);
    expect(range.lastIndexOf(1)).toBe(0);
    expect(range.lastIndexOf(5)).toBe(4);
  });

  test("returns -1 for element not in range", () => {
    const range = new PyRange(1, 6); // [1,2,3,4,5]
    expect(range.lastIndexOf(0)).toBe(-1);
    expect(range.lastIndexOf(6)).toBe(-1);
    expect(range.lastIndexOf(99)).toBe(-1);
  });

  test("works on stepped range", () => {
    const range = new PyRange(0, 10, 2); // [0,2,4,6,8]
    expect(range.lastIndexOf(4)).toBe(2);
    expect(range.lastIndexOf(3)).toBe(-1); // in gap
  });

  test("works on descending range", () => {
    const range = new PyRange(5, 0, -1); // [5,4,3,2,1]
    expect(range.lastIndexOf(1)).toBe(4);
    expect(range.lastIndexOf(0)).toBe(-1);
  });

  test("works on negative-value range", () => {
    const range = new PyRange(-5, -1); // [-5,-4,-3,-2]
    expect(range.lastIndexOf(-3)).toBe(2);
    expect(range.lastIndexOf(-1)).toBe(-1);
  });

  test("returns -1 on empty range", () => {
    const empty = new PyRange(0);
    expect(empty.lastIndexOf(0)).toBe(-1);
  });

  test("works on single-element range", () => {
    const range = new PyRange(42, 43); // [42]
    expect(range.lastIndexOf(42)).toBe(0);
    expect(range.lastIndexOf(99)).toBe(-1);
  });

  test("since PyRange values are unique, indexOf == lastIndexOf for existing values", () => {
    const range = new PyRange(1, 10, 2); // [1,3,5,7,9]
    const arr = [...range];
    for (const v of arr) {
      expect(range.indexOf(v)).toBe(range.lastIndexOf(v));
    }
  });

  test("matches Array.prototype.lastIndexOf behavior", () => {
    const range = new PyRange(1, 10);
    const arr = [...range];
    for (const v of arr) {
      expect(range.lastIndexOf(v)).toBe(arr.lastIndexOf(v));
    }
    expect(range.lastIndexOf(99)).toBe(arr.lastIndexOf(99));
  });
  // ── Comprehensive Array Comparison ──────────────────────────────────────
  test("comprehensive array comparison", () => {
    for (const range of getDiverseRanges()) {
      const arr = [...range];
      arr.forEach((x) => {
        expect(range.indexOf(x)).toBe(arr.indexOf(x));
        expect(range.lastIndexOf(x)).toBe(arr.lastIndexOf(x));
      });
      expect(range.indexOf(999)).toBe(arr.indexOf(999));
      expect(range.lastIndexOf(999)).toBe(arr.lastIndexOf(999));
    }
  });
});

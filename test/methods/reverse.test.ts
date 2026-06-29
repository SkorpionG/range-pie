import { getDiverseRanges } from "../utils/array-compare";
import { describe, test, expect } from "@jest/globals";
import { PyRange } from "range-pie";

describe("PyRange reverse() method", () => {
  // ── BUG CONFIRMATION: reverse() uses _stop as new start (off by one) ───

  test("reverse of ascending range produces correct elements (BUG)", () => {
    const r = new PyRange(1, 6); // [1,2,3,4,5]
    const rev = r.reverse();
    // BUG: currently gives [6,5,4,3,2] because _stop (6) is used as start
    expect([...rev]).toEqual([5, 4, 3, 2, 1]);
    expect(rev.start).toBe(5);
    expect(rev.step).toBe(-1);
    expect(rev.length).toBe(5);
  });

  test("reverse of stepped range produces correct elements (BUG)", () => {
    const r = new PyRange(1, 10, 2); // [1,3,5,7,9]
    const rev = r.reverse();
    // BUG: currently gives [10,8,6,4,2]
    expect([...rev]).toEqual([9, 7, 5, 3, 1]);
    expect(rev.start).toBe(9);
    expect(rev.step).toBe(-2);
    expect(rev.length).toBe(5);
  });

  test("reverse of descending range gives correct ascending result (BUG)", () => {
    const r = new PyRange(5, 0, -1); // [5,4,3,2,1]
    const rev = r.reverse();
    // BUG: currently gives [0,1,2,3,4] because _stop (0) is used as start
    expect([...rev]).toEqual([1, 2, 3, 4, 5]);
    expect(rev.start).toBe(1);
    expect(rev.step).toBe(1);
    expect(rev.length).toBe(5);
  });

  test("reverse of descending stepped range gives correct result (BUG)", () => {
    const r = new PyRange(10, 0, -3); // [10,7,4,1]
    const rev = r.reverse();
    // BUG: currently gives [0,3,6,9]
    expect([...rev]).toEqual([1, 4, 7, 10]);
    expect(rev.start).toBe(1);
    expect(rev.step).toBe(3);
    expect(rev.length).toBe(4);
  });

  // ── Empty range reversal ────────────────────────────────────────────────
  test("reverse of empty range returns empty range", () => {
    const empty = new PyRange(5, 2, 1); // [] (step positive but start > stop)
    const rev = empty.reverse();
    expect([...rev]).toEqual([]);
    expect(rev.length).toBe(0);
  });

  test("reverse of zero-stop range", () => {
    const empty = new PyRange(0); // []
    const rev = empty.reverse();
    expect([...rev]).toEqual([]);
    expect(rev.length).toBe(0);
  });

  // ── Single-element reversal ─────────────────────────────────────────────
  test("reverse of single-element range returns same single element", () => {
    const r = new PyRange(7, 8); // [7]
    const rev = r.reverse();
    expect([...rev]).toEqual([7]);
    expect(rev.length).toBe(1);
    expect(rev.step).toBe(-1);
  });

  // ── Double reversal equals original ────────────────────────────────────
  test("double reverse returns same values as original", () => {
    const ranges = [
      new PyRange(1, 6), // [1,2,3,4,5]
      new PyRange(0, 10, 2), // [0,2,4,6,8]
      new PyRange(5, 0, -1), // [5,4,3,2,1]
      new PyRange(-3, 4), // [-3,-2,-1,0,1,2,3]
    ];
    for (const r of ranges) {
      const original = [...r];
      expect([...r.reverse().reverse()]).toEqual(original);
    }
  });

  // ── Immutability: original must not change ──────────────────────────────
  test("reverse does not mutate the original range", () => {
    const r = new PyRange(1, 6); // [1,2,3,4,5]
    const originalValues = [...r];
    const originalStart = r.start;
    const originalStop = r.stop;
    const originalStep = r.step;
    const originalLength = r.length;

    r.reverse();

    expect([...r]).toEqual(originalValues);
    expect(r.start).toBe(originalStart);
    expect(r.stop).toBe(originalStop);
    expect(r.step).toBe(originalStep);
    expect(r.length).toBe(originalLength);
  });

  // ── Various range types ─────────────────────────────────────────────────
  test("reverse of negative-value range", () => {
    const r = new PyRange(-5, -1); // [-5,-4,-3,-2]
    const rev = r.reverse();
    expect([...rev]).toEqual([-2, -3, -4, -5]);
    expect(rev.length).toBe(4);
  });

  test("reverse of cross-zero range", () => {
    const r = new PyRange(-3, 4); // [-3,-2,-1,0,1,2,3]
    const rev = r.reverse();
    expect([...rev]).toEqual([3, 2, 1, 0, -1, -2, -3]);
    expect(rev.length).toBe(7);
  });

  test("reverse matches Array.prototype.reverse behavior", () => {
    const range = new PyRange(1, 6);
    const arr = [...range];
    expect([...range.reverse()]).toEqual([...arr].reverse());
  });

  test("reverse of large step range", () => {
    const r = new PyRange(0, 100, 25); // [0,25,50,75]
    const rev = r.reverse();
    expect([...rev]).toEqual([75, 50, 25, 0]);
    expect(rev.step).toBe(-25);
    expect(rev.length).toBe(4);
  });
  // ── Comprehensive Array Comparison ──────────────────────────────────────
  test("comprehensive array comparison", () => {
    for (const range of getDiverseRanges()) {
      const arr = [...range];
      expect([...range.reverse()]).toEqual([...arr].reverse());
    }
  });
});

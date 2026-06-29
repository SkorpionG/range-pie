import { getDiverseRanges } from "../utils/array-compare";
import { describe, test, expect } from "@jest/globals";
import { PyRange } from "range-pie";

describe("PyRange forEach() method", () => {
  // ── Core iteration ──────────────────────────────────────────────────────
  test("iterates over all elements in ascending range", () => {
    const range = new PyRange(1, 5); // [1,2,3,4]
    const collected: number[] = [];
    range.forEach((v) => collected.push(v));
    expect(collected).toEqual([1, 2, 3, 4]);
  });

  test("iterates over descending range in order", () => {
    const range = new PyRange(5, 0, -1); // [5,4,3,2,1]
    const collected: number[] = [];
    range.forEach((v) => collected.push(v));
    expect(collected).toEqual([5, 4, 3, 2, 1]);
  });

  test("iterates over stepped range", () => {
    const range = new PyRange(0, 10, 3); // [0,3,6,9]
    const collected: number[] = [];
    range.forEach((v) => collected.push(v));
    expect(collected).toEqual([0, 3, 6, 9]);
  });

  // ── Callback receives correct arguments ─────────────────────────────────
  test("callback receives value, index, and range", () => {
    const range = new PyRange(1, 4); // [1,2,3]
    const calls: Array<[number, number]> = [];
    range.forEach((v, i) => calls.push([v, i]));
    expect(calls).toEqual([
      [1, 0],
      [2, 1],
      [3, 2],
    ]);
  });

  test("callback third argument is the range instance", () => {
    const range = new PyRange(1, 3);
    const ranges: PyRange[] = [];
    range.forEach((_v, _i, r) => ranges.push(r as PyRange));
    expect(ranges.every((r) => r === range)).toBe(true);
  });

  test("callback is called exactly length times", () => {
    const range = new PyRange(0, 7); // length 7
    let count = 0;
    range.forEach(() => count++);
    expect(count).toBe(range.length);
  });

  // ── Empty and single-element ranges ────────────────────────────────────
  test("does not call callback for empty range", () => {
    const empty = new PyRange(0);
    const spy: number[] = [];
    empty.forEach((v) => spy.push(v));
    expect(spy).toEqual([]);
  });

  test("calls callback once for single-element range", () => {
    const range = new PyRange(42, 43); // [42]
    const collected: number[] = [];
    range.forEach((v) => collected.push(v));
    expect(collected).toEqual([42]);
  });

  // ── Range types ────────────────────────────────────────────────────────
  test("works on negative-value range", () => {
    const range = new PyRange(-3, 0); // [-3,-2,-1]
    const collected: number[] = [];
    range.forEach((v) => collected.push(v));
    expect(collected).toEqual([-3, -2, -1]);
  });

  test("works on cross-zero range", () => {
    const range = new PyRange(-2, 3); // [-2,-1,0,1,2]
    const collected: number[] = [];
    range.forEach((v) => collected.push(v));
    expect(collected).toEqual([-2, -1, 0, 1, 2]);
  });

  // ── Return value ────────────────────────────────────────────────────────
  test("returns void (undefined)", () => {
    const range = new PyRange(1, 4);
    const result = range.forEach(() => {});
    expect(result).toBeUndefined();
  });

  // ── Immutability ────────────────────────────────────────────────────────
  test("does not mutate the original range", () => {
    const range = new PyRange(1, 6); // [1,2,3,4,5]
    const original = [...range];
    range.forEach(() => {});
    expect([...range]).toEqual(original);
  });

  // ── Side-effect ordering ────────────────────────────────────────────────
  test("elements are visited in range order", () => {
    const range = new PyRange(1, 6); // [1,2,3,4,5]
    const arr = [...range];
    const forEachOrder: number[] = [];
    range.forEach((v) => forEachOrder.push(v));
    expect(forEachOrder).toEqual(arr);
  });

  // ── Comparison with Array.prototype.forEach ─────────────────────────────
  test("visits same elements in same order as Array.prototype.forEach", () => {
    const range = new PyRange(2, 12, 2); // [2,4,6,8,10]
    const arr = [...range];
    const fromRange: number[] = [];
    const fromArray: number[] = [];
    range.forEach((v) => fromRange.push(v));
    arr.forEach((v) => fromArray.push(v));
    expect(fromRange).toEqual(fromArray);
  });

  // ── Callback validation ─────────────────────────────────────────────────
  test("throws TypeError when callback is not a function", () => {
    const range = new PyRange(1, 4);
    expect(() => range.forEach(null as unknown as () => void)).toThrow(TypeError);
    expect(() => range.forEach(null as unknown as () => void)).toThrow(
      "Callback must be a function"
    );
  });
  // ── Comprehensive Array Comparison ──────────────────────────────────────
  test("comprehensive array comparison", () => {
    for (const range of getDiverseRanges()) {
      const arr = [...range];
      const fromRange: number[] = [];
      const fromArr: number[] = [];
      range.forEach((x, i) => fromRange.push(x * i));
      arr.forEach((x, i) => fromArr.push(x * i));
      expect(fromRange).toEqual(fromArr);
    }
  });
});

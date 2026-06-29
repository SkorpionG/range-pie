import { getDiverseRanges } from "../utils/array-compare";
import { describe, test, expect } from "@jest/globals";
import { PyRange } from "range-pie";

describe("PyRange pop() method", () => {
  // ── Basic pop on ascending range ────────────────────────────────────────
  test("pops the last element from ascending range", () => {
    const range = new PyRange(1, 5); // [1,2,3,4]
    expect(range.pop()).toBe(4);
    expect([...range]).toEqual([1, 2, 3]);
    expect(range.length).toBe(3);
  });

  test("pops the last element from descending range", () => {
    const range = new PyRange(5, 1, -1); // [5,4,3,2]
    expect(range.pop()).toBe(2);
    expect([...range]).toEqual([5, 4, 3]);
    expect(range.length).toBe(3);
  });

  test("pops the last element from stepped range", () => {
    const range = new PyRange(0, 10, 2); // [0,2,4,6,8]
    expect(range.pop()).toBe(8);
    expect([...range]).toEqual([0, 2, 4, 6]);
    expect(range.length).toBe(4);
  });

  // ── Multiple pops ───────────────────────────────────────────────────────
  test("multiple pops reduce range correctly", () => {
    const range = new PyRange(1, 6); // [1,2,3,4,5]
    expect(range.pop()).toBe(5);
    expect(range.pop()).toBe(4);
    expect(range.pop()).toBe(3);
    expect([...range]).toEqual([1, 2]);
    expect(range.length).toBe(2);
  });

  test("pop until empty then pop again returns undefined", () => {
    const range = new PyRange(1, 3); // [1,2]
    expect(range.pop()).toBe(2);
    expect(range.pop()).toBe(1);
    expect(range.length).toBe(0);
    expect([...range]).toEqual([]);
    // Pop again from empty
    expect(range.pop()).toBeUndefined();
    expect(range.length).toBe(0);
    expect([...range]).toEqual([]);
  });

  // ── Empty range returns undefined ───────────────────────────────────────
  test("pop on empty range returns undefined", () => {
    const empty = new PyRange(0);
    expect(empty.pop()).toBeUndefined();
    expect(empty.length).toBe(0);
  });

  test("pop on already-empty range leaves it empty", () => {
    const empty = new PyRange(5, 5); // empty, start==stop
    expect(empty.pop()).toBeUndefined();
    expect(empty.length).toBe(0);
    expect([...empty]).toEqual([]);
  });

  // ── Single element ranges ───────────────────────────────────────────────
  test("pop from single-element ascending range", () => {
    const range = new PyRange(7, 8); // [7]
    expect(range.pop()).toBe(7);
    expect(range.length).toBe(0);
    expect([...range]).toEqual([]);
  });

  test("pop from single-element descending range", () => {
    const range = new PyRange(3, 2, -1); // [3]
    expect(range.pop()).toBe(3);
    expect(range.length).toBe(0);
    expect([...range]).toEqual([]);
  });

  // ── State consistency after pop ─────────────────────────────────────────
  test("start and step are unchanged after pop", () => {
    const range = new PyRange(1, 6); // [1,2,3,4,5]
    const originalStart = range.start;
    const originalStep = range.step;
    range.pop();
    expect(range.start).toBe(originalStart);
    expect(range.step).toBe(originalStep);
  });

  test("stop decrements by step after each pop", () => {
    const range = new PyRange(1, 6, 1); // [1,2,3,4,5]
    expect(range.stop).toBe(6);
    range.pop();
    expect(range.stop).toBe(5);
    range.pop();
    expect(range.stop).toBe(4);
  });

  test("stop increments by |step| after pop on descending range", () => {
    const range = new PyRange(5, 1, -1); // [5,4,3,2]
    expect(range.stop).toBe(1);
    range.pop();
    expect(range.stop).toBe(2); // stop -= step = 1 - (-1) = 2
  });

  // ── Negative-value ranges ───────────────────────────────────────────────
  test("pop on negative-value range", () => {
    const range = new PyRange(-5, -1); // [-5,-4,-3,-2]
    expect(range.pop()).toBe(-2);
    expect([...range]).toEqual([-5, -4, -3]);
  });

  // ── Cross-zero ranges ───────────────────────────────────────────────────
  test("pop on cross-zero range", () => {
    const range = new PyRange(-2, 3); // [-2,-1,0,1,2]
    expect(range.pop()).toBe(2);
    expect([...range]).toEqual([-2, -1, 0, 1]);
  });

  // ── Mutation: remaining elements are still iterable ────────────────────
  test("remaining elements are iterable after pop", () => {
    const range = new PyRange(1, 5); // [1,2,3,4]
    range.pop();
    const result: number[] = [];
    for (const v of range) {
      result.push(v);
    }
    expect(result).toEqual([1, 2, 3]);
  });
});

describe("PyRange forEach() and lastIndexOf() coverage", () => {
  // ── forEach loop body coverage (lines 332-333) ─────────────────────────
  test("forEach calls callback for each element in ascending range", () => {
    const range = new PyRange(1, 4); // [1,2,3]
    const collected: number[] = [];
    range.forEach((v) => collected.push(v));
    expect(collected).toEqual([1, 2, 3]);
  });

  test("forEach provides correct value, index, and range", () => {
    const range = new PyRange(0, 3); // [0,1,2]
    const calls: Array<[number, number]> = [];
    range.forEach((v, i) => calls.push([v, i]));
    expect(calls).toEqual([
      [0, 0],
      [1, 1],
      [2, 2],
    ]);
  });

  test("forEach does not call callback on empty range", () => {
    const empty = new PyRange(0);
    let called = false;
    empty.forEach(() => {
      called = true;
    });
    expect(called).toBe(false);
  });

  // ── lastIndexOf returns -1 when value not found (line 371) ─────────────
  test("lastIndexOf returns -1 for value not in range", () => {
    const range = new PyRange(1, 5); // [1,2,3,4]
    expect(range.lastIndexOf(99)).toBe(-1);
    expect(range.lastIndexOf(0)).toBe(-1);
    expect(range.lastIndexOf(5)).toBe(-1); // stop is exclusive
  });

  test("lastIndexOf returns -1 on empty range", () => {
    const empty = new PyRange(0);
    expect(empty.lastIndexOf(0)).toBe(-1);
  });

  test("lastIndexOf returns correct index for existing value", () => {
    const range = new PyRange(1, 5); // [1,2,3,4]
    expect(range.lastIndexOf(3)).toBe(2);
    expect(range.lastIndexOf(1)).toBe(0);
    expect(range.lastIndexOf(4)).toBe(3);
  });
  // ── Comprehensive Array Comparison ──────────────────────────────────────
  test("comprehensive array comparison", () => {
    for (const range of getDiverseRanges()) {
      const arr = [...range];
      const poppedRange = range.pop();
      const poppedArr = arr.pop();
      expect(poppedRange).toBe(poppedArr);
      expect([...range]).toEqual(arr);
    }
  });
});

import { getDiverseRanges } from "../utils/array-compare";
import { describe, test, expect } from "@jest/globals";
import { PyRange } from "range-pie";

describe("PyRange reduce() method", () => {
  // ── Basic usage with initialValue ───────────────────────────────────────
  test("sums all elements with initial value 0", () => {
    const range = new PyRange(1, 6); // [1,2,3,4,5]
    expect(range.reduce((acc, v) => acc + v, 0)).toBe(15);
  });

  test("multiplies all elements", () => {
    const range = new PyRange(1, 5); // [1,2,3,4]
    expect(range.reduce((acc, v) => acc * v, 1)).toBe(24);
  });

  test("collects values into array using initialValue", () => {
    const range = new PyRange(1, 4); // [1,2,3]
    expect(range.reduce<number[]>((acc, v) => [...acc, v * 2], [])).toEqual([2, 4, 6]);
  });

  test("reduce passes correct index and range arguments", () => {
    const range = new PyRange(0, 3); // [0,1,2]
    const calls: Array<[number, number, number]> = [];
    range.reduce((acc, v, i) => {
      calls.push([acc, v, i]);
      return acc + v;
    }, 0);
    expect(calls).toEqual([
      [0, 0, 0],
      [0, 1, 1],
      [1, 2, 2],
    ]);
  });

  // ── Without initialValue: uses first element as accumulator ────────────
  test("reduce without initialValue uses first element as accumulator", () => {
    const range = new PyRange(1, 5); // [1,2,3,4]
    // accumulator starts at 1, then adds 2, 3, 4
    expect(range.reduce((acc, v) => acc + v)).toBe(10);
  });

  test("reduce without initialValue starts iteration from index 1", () => {
    const range = new PyRange(1, 4); // [1,2,3]
    const callIndices: number[] = [];
    range.reduce((acc, v, i) => {
      callIndices.push(i);
      return acc + v;
    });
    // Should start at index 1 (first element is accumulator seed)
    expect(callIndices).toEqual([1, 2]);
  });

  test("single-element range without initialValue returns that element", () => {
    const range = new PyRange(42, 43); // [42]
    expect(range.reduce((acc, v) => acc + v)).toBe(42);
  });

  // ── Empty range behaviour ──────────────────────────────────────────────
  test("empty range with initialValue returns initialValue", () => {
    const empty = new PyRange(0);
    expect(empty.reduce((acc, v) => acc + v, 99)).toBe(99);
  });

  test("empty range without initialValue throws TypeError", () => {
    const empty = new PyRange(0);
    expect(() => empty.reduce((acc, v) => acc + v)).toThrow(TypeError);
    expect(() => empty.reduce((acc, v) => acc + v)).toThrow(
      "Reduce of empty range with no initial value"
    );
  });

  // ── Undefined explicit initialValue is treated as a provided value ────
  test("empty range with explicit undefined initialValue uses it as the initial value", () => {
    const empty = new PyRange(0);
    // This matches how Array.prototype.reduce behaves:
    // [].reduce(() => 0, undefined) → undefined (no throw)
    const result = empty.reduce<number | undefined>((_acc, v) => v, undefined);
    expect(result).toBeUndefined();
  });

  test("empty range with no argument still throws TypeError", () => {
    const empty = new PyRange(0);
    // This still throws — no argument at all means no initial value
    expect(() => empty.reduce((acc, v) => acc + v)).toThrow(TypeError);
    expect(() => empty.reduce((acc, v) => acc + v)).toThrow(
      "Reduce of empty range with no initial value"
    );
  });

  // ── Descending range ────────────────────────────────────────────────────
  test("reduce on descending range", () => {
    const range = new PyRange(5, 0, -1); // [5,4,3,2,1]
    expect(range.reduce((acc, v) => acc + v, 0)).toBe(15);
  });

  // ── Non-numeric accumulator types ───────────────────────────────────────
  test("reduce can build a string", () => {
    const range = new PyRange(1, 4); // [1,2,3]
    expect(range.reduce<string>((acc, v) => acc + String(v), "")).toBe("123");
  });

  // ── Callback validation ─────────────────────────────────────────────────
  test("throws TypeError when callback is not a function", () => {
    const range = new PyRange(1, 4);
    expect(() => range.reduce(null as unknown as () => number)).toThrow(TypeError);
    expect(() => range.reduce("cb" as unknown as () => number)).toThrow(TypeError);
    expect(() => range.reduce(42 as unknown as () => number)).toThrow(TypeError);
  });

  // ── Edge: range with one element and initialValue ──────────────────────
  test("single-element range with initialValue", () => {
    const range = new PyRange(5, 6); // [5]
    expect(range.reduce((acc, v) => acc + v, 10)).toBe(15);
  });

  test("range reduce is consistent with Array.prototype.reduce", () => {
    const range = new PyRange(1, 6); // [1,2,3,4,5]
    const arr = [...range];
    expect(range.reduce((acc, v) => acc + v, 0)).toBe(arr.reduce((acc, v) => acc + v, 0));
    expect(range.reduce((acc, v) => acc + v)).toBe(arr.reduce((acc, v) => acc + v));
  });
  // ── Comprehensive Array Comparison ──────────────────────────────────────
  test("comprehensive array comparison", () => {
    for (const range of getDiverseRanges()) {
      const arr = [...range];
      // With initial value
      expect(range.reduce((a, b) => a + b, 10)).toBe(arr.reduce((a, b) => a + b, 10));
      // Without initial value (only if not empty)
      if (arr.length > 0) {
        expect(range.reduce((a, b) => a + b)).toBe(arr.reduce((a, b) => a + b));
      } else {
        expect(() => range.reduce((a, b) => a + b)).toThrow(TypeError);
      }
    }
  });
});

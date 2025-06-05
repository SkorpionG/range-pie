import { describe, test, expect } from "@jest/globals";
import { PyRange } from "range-pie";

describe("PyRange slice method", () => {
  test("basic slicing functionality", () => {
    const range = new PyRange(0, 10, 2); // [0, 2, 4, 6, 8]
    expect([...range]).toEqual([0, 2, 4, 6, 8]);

    // Test basic slicing
    const sliced1 = range.slice(1, 4); // Should be [2, 4, 6]
    expect([...sliced1]).toEqual([2, 4, 6]);
    expect(sliced1.start).toBe(2);
    expect(sliced1.stop).toBe(8);
    expect(sliced1.step).toBe(2);
    expect(sliced1.length).toBe(3);
  });

  test("original range remains unchanged after slicing", () => {
    const range = new PyRange(0, 10, 2); // [0, 2, 4, 6, 8]
    const originalValues = [...range];
    const originalStart = range.start;
    const originalStop = range.stop;
    const originalStep = range.step;
    const originalLength = range.length;

    // Perform slice operation
    range.slice(1, 4);

    // Verify original range is unchanged
    expect([...range]).toEqual(originalValues);
    expect(range.start).toBe(originalStart);
    expect(range.stop).toBe(originalStop);
    expect(range.step).toBe(originalStep);
    expect(range.length).toBe(originalLength);
  });

  test("negative indices support", () => {
    const range = new PyRange(0, 10, 2); // [0, 2, 4, 6, 8]

    // Test negative indices
    const sliced2 = range.slice(-3, -1); // Should be [4, 6]
    expect([...sliced2]).toEqual([4, 6]);
    expect(sliced2.start).toBe(4);
    expect(sliced2.stop).toBe(8);
    expect(sliced2.step).toBe(2);
    expect(sliced2.length).toBe(2);

    // Test original range is unchanged
    expect([...range]).toEqual([0, 2, 4, 6, 8]);
  });

  test("edge cases", () => {
    const range = new PyRange(0, 10, 2); // [0, 2, 4, 6, 8]

    // Test slice beyond range bounds
    const sliced3 = range.slice(10, 20); // Should be empty
    expect([...sliced3]).toEqual([]);
    expect(sliced3.length).toBe(0);

    // Test slice with same start and end
    const sliced4 = range.slice(2, 2); // Should be empty
    expect([...sliced4]).toEqual([]);
    expect(sliced4.length).toBe(0);

    // Test original range is unchanged
    expect([...range]).toEqual([0, 2, 4, 6, 8]);
  });

  test("slice with only begin parameter", () => {
    const range = new PyRange(1, 10, 2); // [1, 3, 5, 7, 9]

    // Slice from index 2 to end
    const sliced = range.slice(2); // Should be [5, 7, 9]
    expect([...sliced]).toEqual([5, 7, 9]);
    expect(sliced.length).toBe(3);

    // Test original range is unchanged
    expect([...range]).toEqual([1, 3, 5, 7, 9]);
  });

  test("slice with no parameters (full copy)", () => {
    const range = new PyRange(1, 6, 2); // [1, 3, 5]

    // Slice with no parameters should create a copy
    const sliced = range.slice();
    expect([...sliced]).toEqual([...range]);
    expect(sliced.start).toBe(range.start);
    expect(sliced.step).toBe(range.step);
    expect(sliced.length).toBe(range.length);

    // Verify they are different instances
    expect(sliced).not.toBe(range);

    // Values should be identical
    expect([...sliced]).toEqual([1, 3, 5]);
  });

  test("slice with negative step range", () => {
    const range = new PyRange(10, 0, -2); // [10, 8, 6, 4, 2]

    // Slice a portion
    const sliced = range.slice(1, 4); // Should be [8, 6, 4]
    expect([...sliced]).toEqual([8, 6, 4]);
    expect(sliced.step).toBe(-2);
    expect(sliced.length).toBe(3);

    // Test original range is unchanged
    expect([...range]).toEqual([10, 8, 6, 4, 2]);
  });

  test("slice method parameter validation", () => {
    const range = new PyRange(5);

    // Test with non-number parameters
    expect(() => range.slice("1" as any)).toThrow(TypeError);
    expect(() => range.slice(0, "2" as any)).toThrow(TypeError);

    // Test with non-integer parameters
    expect(() => range.slice(1.5)).toThrow(TypeError);
    expect(() => range.slice(0, 2.7)).toThrow(TypeError);
  });

  test("comparison with Array.prototype.slice behavior", () => {
    const range = new PyRange(0, 10); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    const array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    // Test various slice operations
    expect([...range.slice(2, 5)]).toEqual(array.slice(2, 5));
    expect([...range.slice(-3, -1)]).toEqual(array.slice(-3, -1));
    expect([...range.slice(7)]).toEqual(array.slice(7));
    expect([...range.slice()]).toEqual(array.slice());

    // Verify originals are unchanged
    expect([...range]).toEqual(array);
  });
});

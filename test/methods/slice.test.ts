import { describe, test, expect } from "@jest/globals";
import { PyRange } from "range-pie";

describe("PyRange slice method", () => {
  // 1. Positive Range Types (1-4)
  test("positive range", () => {
    const positiveRange = new PyRange(1, 5); // [1, 2, 3, 4]
    const sliced = positiveRange.slice(1, 3); // [2, 3]
    expect([...sliced]).toEqual([2, 3]);
    expect(sliced.start).toBe(2);
    expect(sliced.stop).toBe(4);
    expect(sliced.step).toBe(1);
    expect(sliced.length).toBe(2);

    // Test slice with negative indices
    const slicedNeg = positiveRange.slice(-2); // [3, 4]
    expect([...slicedNeg]).toEqual([3, 4]);
  });

  test("positive reverse range", () => {
    const positiveReverseRange = new PyRange(5, 0, -1); // [5, 4, 3, 2, 1]
    const sliced = positiveReverseRange.slice(1, 4); // [4, 3, 2]
    expect([...sliced]).toEqual([4, 3, 2]);
    expect(sliced.step).toBe(-1);
    expect(sliced.length).toBe(3);

    // Test slice with negative indices
    const slicedNeg = positiveReverseRange.slice(-3, -1); // [3, 2]
    expect([...slicedNeg]).toEqual([3, 2]);
  });

  test("positive range with steps", () => {
    const positiveStepRange = new PyRange(0, 10, 2); // [0, 2, 4, 6, 8]
    const sliced = positiveStepRange.slice(1, 4); // [2, 4, 6]
    expect([...sliced]).toEqual([2, 4, 6]);
    expect(sliced.start).toBe(2);
    expect(sliced.step).toBe(2);
    expect(sliced.length).toBe(3);

    // Test slice from beginning
    const slicedBegin = positiveStepRange.slice(2); // [4, 6, 8]
    expect([...slicedBegin]).toEqual([4, 6, 8]);
  });

  test("positive reverse range with steps", () => {
    const positiveReverseStepRange = new PyRange(10, 0, -3); // [10, 7, 4, 1]
    const sliced = positiveReverseStepRange.slice(1, 3); // [7, 4]
    expect([...sliced]).toEqual([7, 4]);
    expect(sliced.step).toBe(-3);
    expect(sliced.length).toBe(2);

    // Test slice with only start
    const slicedStart = positiveReverseStepRange.slice(2); // [4, 1]
    expect([...slicedStart]).toEqual([4, 1]);
  });

  // 2. Negative Range Types (5-8)
  test("negative range", () => {
    const negativeRange = new PyRange(-5, -1); // [-5, -4, -3, -2]
    const sliced = negativeRange.slice(1, 3); // [-4, -3]
    expect([...sliced]).toEqual([-4, -3]);
    expect(sliced.start).toBe(-4);
    expect(sliced.step).toBe(1);
    expect(sliced.length).toBe(2);

    // Test negative indexing
    const slicedNeg = negativeRange.slice(-3); // [-4, -3, -2]
    expect([...slicedNeg]).toEqual([-4, -3, -2]);
  });

  test("negative reverse range", () => {
    const negativeReverseRange = new PyRange(-1, -6, -1); // [-1, -2, -3, -4, -5]
    const sliced = negativeReverseRange.slice(1, 4); // [-2, -3, -4]
    expect([...sliced]).toEqual([-2, -3, -4]);
    expect(sliced.step).toBe(-1);
    expect(sliced.length).toBe(3);

    // Test slice with negative indices
    const slicedNeg = negativeReverseRange.slice(-2); // [-4, -5]
    expect([...slicedNeg]).toEqual([-4, -5]);
  });

  test("negative range with steps", () => {
    const negativeStepRange = new PyRange(-10, -2, 3); // [-10, -7, -4]
    const sliced = negativeStepRange.slice(1, 3); // [-7, -4]
    expect([...sliced]).toEqual([-7, -4]);
    expect(sliced.step).toBe(3);
    expect(sliced.length).toBe(2);

    // Test slice from middle
    const slicedMid = negativeStepRange.slice(1); // [-7, -4]
    expect([...slicedMid]).toEqual([-7, -4]);
  });

  test("negative reverse range with steps", () => {
    const negativeReverseStepRange = new PyRange(-2, -12, -4); // [-2, -6, -10]
    const sliced = negativeReverseStepRange.slice(0, 2); // [-2, -6]
    expect([...sliced]).toEqual([-2, -6]);
    expect(sliced.step).toBe(-4);
    expect(sliced.length).toBe(2);

    // Test slice with negative index
    const slicedNeg = negativeReverseStepRange.slice(-2); // [-6, -10]
    expect([...slicedNeg]).toEqual([-6, -10]);
  });

  // 3. Cross-Zero Range Types (9-12)
  test("negative to positive range", () => {
    const negToPositiveRange = new PyRange(-3, 4); // [-3, -2, -1, 0, 1, 2, 3]
    const sliced = negToPositiveRange.slice(2, 5); // [-1, 0, 1]
    expect([...sliced]).toEqual([-1, 0, 1]);
    expect(sliced.length).toBe(3);

    // Test crossing zero boundary
    const slicedCross = negToPositiveRange.slice(3, 6); // [0, 1, 2]
    expect([...slicedCross]).toEqual([0, 1, 2]);
  });

  test("positive to negative range", () => {
    const posToNegativeRange = new PyRange(3, -4, -1); // [3, 2, 1, 0, -1, -2, -3]
    const sliced = posToNegativeRange.slice(1, 4); // [2, 1, 0]
    expect([...sliced]).toEqual([2, 1, 0]);
    expect(sliced.step).toBe(-1);
    expect(sliced.length).toBe(3);

    // Test negative indices crossing zero
    const slicedNeg = posToNegativeRange.slice(-4, -1); // [0, -1, -2]
    expect([...slicedNeg]).toEqual([0, -1, -2]);
  });

  test("negative to positive range with step", () => {
    const negToPositiveStepRange = new PyRange(-6, 6, 3); // [-6, -3, 0, 3]
    const sliced = negToPositiveStepRange.slice(1, 3); // [-3, 0]
    expect([...sliced]).toEqual([-3, 0]);
    expect(sliced.step).toBe(3);
    expect(sliced.length).toBe(2);

    // Test slice crossing zero
    const slicedCross = negToPositiveStepRange.slice(2); // [0, 3]
    expect([...slicedCross]).toEqual([0, 3]);
  });

  test("positive to negative range with step", () => {
    const posToNegativeStepRange = new PyRange(5, -8, -4); // [5, 1, -3, -7]
    const sliced = posToNegativeStepRange.slice(1, 3); // [1, -3]
    expect([...sliced]).toEqual([1, -3]);
    expect(sliced.step).toBe(-4);
    expect(sliced.length).toBe(2);

    // Test slice with negative index
    const slicedNeg = posToNegativeStepRange.slice(-2); // [-3, -7]
    expect([...slicedNeg]).toEqual([-3, -7]);
  });

  // 4. Special Cases (13)
  test("empty range", () => {
    const emptyRange = new PyRange(5, 2, 1); // [] - empty because start > stop with positive step
    const sliced = emptyRange.slice(0, 1);
    expect([...sliced]).toEqual([]);
    expect(sliced.length).toBe(0);

    // Test any slice of empty range
    const slicedAny = emptyRange.slice(-1);
    expect([...slicedAny]).toEqual([]);
  });

  // Additional tests for edge cases and comparison
  test("original range remains unchanged after slicing", () => {
    const range = new PyRange(0, 10, 2); // [0, 2, 4, 6, 8]
    const originalValues = [...range];
    const originalStart = range.start;
    const originalStop = range.stop;
    const originalStep = range.step;
    const originalLength = range.length;

    // Perform slice operation
    const sliced = range.slice(1, 4);
    expect([...sliced]).toEqual([2, 4, 6]);

    // Verify original range is unchanged
    expect([...range]).toEqual(originalValues);
    expect(range.start).toBe(originalStart);
    expect(range.stop).toBe(originalStop);
    expect(range.step).toBe(originalStep);
    expect(range.length).toBe(originalLength);
  });

  test("slice with no parameters creates full copy", () => {
    const range = new PyRange(1, 6, 2); // [1, 3, 5]
    const sliced = range.slice();

    expect([...sliced]).toEqual([...range]);
    expect(sliced.start).toBe(range.start);
    expect(sliced.step).toBe(range.step);
    expect(sliced.length).toBe(range.length);
    expect(sliced).not.toBe(range); // Different instances
  });

  test("slice method parameter validation", () => {
    const range = new PyRange(5);

    // Test with non-number parameters
    expect(() => range.slice("1" as unknown as number)).toThrow(TypeError);
    expect(() => range.slice(0, "2" as unknown as number)).toThrow(TypeError);

    // Test with non-integer parameters
    expect(() => range.slice(1.5)).toThrow(TypeError);
    expect(() => range.slice(0, 2.7)).toThrow(TypeError);
  });

  // 5. Additional Testing (14+) - Edge Cases and Boundary Conditions
  test("single element range", () => {
    const singleRange = new PyRange(5, 6); // [5]
    const sliced = singleRange.slice(0, 1); // [5]
    expect([...sliced]).toEqual([5]);
    expect(sliced.length).toBe(1);

    // Test slice beyond bounds
    const slicedEmpty = singleRange.slice(1, 2); // []
    expect([...slicedEmpty]).toEqual([]);
  });

  test("zero-based single element", () => {
    const zeroSingleRange = new PyRange(0, 1); // [0]
    const sliced = zeroSingleRange.slice(); // [0] - full copy
    expect([...sliced]).toEqual([0]);
    expect(sliced).not.toBe(zeroSingleRange); // Different instances
  });

  test("large step sizes", () => {
    const largeStepRange = new PyRange(0, 100, 50); // [0, 50]
    const sliced = largeStepRange.slice(1); // [50]
    expect([...sliced]).toEqual([50]);
    expect(sliced.step).toBe(50);
  });

  test("very negative ranges", () => {
    const veryNegativeRange = new PyRange(-100, -95); // [-100, -99, -98, -97, -96]
    const sliced = veryNegativeRange.slice(1, 4); // [-99, -98, -97]
    expect([...sliced]).toEqual([-99, -98, -97]);
    expect(sliced.length).toBe(3);
  });

  test("edge cases - out of bounds and same indices", () => {
    const range = new PyRange(0, 5); // [0, 1, 2, 3, 4]

    // Test slice beyond range bounds
    const slicedBeyond = range.slice(10, 20);
    expect([...slicedBeyond]).toEqual([]);
    expect(slicedBeyond.length).toBe(0);

    // Test slice with same start and end
    const slicedSame = range.slice(2, 2);
    expect([...slicedSame]).toEqual([]);
    expect(slicedSame.length).toBe(0);
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

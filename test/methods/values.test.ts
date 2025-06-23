import { describe, test, expect } from "@jest/globals";
import { PyRange } from "range-pie";

describe("PyRange values method", () => {
  // 1. Positive Range Types (1-4)
  test("positive range", () => {
    const positiveRange = new PyRange(1, 5); // [1, 2, 3, 4]
    expect([...positiveRange.values()]).toEqual([1, 2, 3, 4]);
    expect([...positiveRange.values()]).toEqual([...positiveRange]);
  });

  test("positive reverse range", () => {
    const positiveReverseRange = new PyRange(5, 0, -1); // [5, 4, 3, 2, 1]
    expect([...positiveReverseRange.values()]).toEqual([5, 4, 3, 2, 1]);
    expect([...positiveReverseRange.values()]).toEqual([...positiveReverseRange]);
  });

  test("positive range with steps", () => {
    const positiveStepRange = new PyRange(0, 10, 2); // [0, 2, 4, 6, 8]
    expect([...positiveStepRange.values()]).toEqual([0, 2, 4, 6, 8]);
    expect([...positiveStepRange.values()]).toEqual([...positiveStepRange]);
  });

  test("positive reverse range with steps", () => {
    const positiveReverseStepRange = new PyRange(10, 0, -3); // [10, 7, 4, 1]
    expect([...positiveReverseStepRange.values()]).toEqual([10, 7, 4, 1]);
    expect([...positiveReverseStepRange.values()]).toEqual([...positiveReverseStepRange]);
  });

  // 2. Negative Range Types (5-8)
  test("negative range", () => {
    const negativeRange = new PyRange(-5, -1); // [-5, -4, -3, -2]
    expect([...negativeRange.values()]).toEqual([-5, -4, -3, -2]);
    expect([...negativeRange.values()]).toEqual([...negativeRange]);
  });

  test("negative reverse range", () => {
    const negativeReverseRange = new PyRange(-1, -6, -1); // [-1, -2, -3, -4, -5]
    expect([...negativeReverseRange.values()]).toEqual([-1, -2, -3, -4, -5]);
    expect([...negativeReverseRange.values()]).toEqual([...negativeReverseRange]);
  });

  test("negative range with steps", () => {
    const negativeStepRange = new PyRange(-10, -2, 3); // [-10, -7, -4]
    expect([...negativeStepRange.values()]).toEqual([-10, -7, -4]);
    expect([...negativeStepRange.values()]).toEqual([...negativeStepRange]);
  });

  test("negative reverse range with steps", () => {
    const negativeReverseStepRange = new PyRange(-2, -12, -4); // [-2, -6, -10]
    expect([...negativeReverseStepRange.values()]).toEqual([-2, -6, -10]);
    expect([...negativeReverseStepRange.values()]).toEqual([...negativeReverseStepRange]);
  });

  // 3. Cross-Zero Range Types (9-12)
  test("negative to positive range", () => {
    const negToPositiveRange = new PyRange(-3, 4); // [-3, -2, -1, 0, 1, 2, 3]
    expect([...negToPositiveRange.values()]).toEqual([-3, -2, -1, 0, 1, 2, 3]);
    expect([...negToPositiveRange.values()]).toEqual([...negToPositiveRange]);
  });

  test("positive to negative range", () => {
    const posToNegativeRange = new PyRange(3, -4, -1); // [3, 2, 1, 0, -1, -2, -3]
    expect([...posToNegativeRange.values()]).toEqual([3, 2, 1, 0, -1, -2, -3]);
    expect([...posToNegativeRange.values()]).toEqual([...posToNegativeRange]);
  });

  test("negative to positive range with step", () => {
    const negToPositiveStepRange = new PyRange(-6, 6, 3); // [-6, -3, 0, 3]
    expect([...negToPositiveStepRange.values()]).toEqual([-6, -3, 0, 3]);
    expect([...negToPositiveStepRange.values()]).toEqual([...negToPositiveStepRange]);
  });

  test("positive to negative range with step", () => {
    const posToNegativeStepRange = new PyRange(5, -8, -4); // [5, 1, -3, -7]
    expect([...posToNegativeStepRange.values()]).toEqual([5, 1, -3, -7]);
    expect([...posToNegativeStepRange.values()]).toEqual([...posToNegativeStepRange]);
  });

  // 4. Special Cases (13)
  test("empty range", () => {
    const emptyRange = new PyRange(5, 2, 1); // [] - empty because start > stop with positive step
    expect([...emptyRange.values()]).toEqual([]);
    expect([...emptyRange.values()]).toEqual([...emptyRange]);
  });

  // 5. Additional Testing (14+) - Edge Cases and Boundary Conditions
  test("single element range", () => {
    const singleRange = new PyRange(5, 6); // [5]
    expect([...singleRange.values()]).toEqual([5]);
    expect([...singleRange.values()]).toEqual([...singleRange]);
  });

  test("zero-based single element", () => {
    const zeroSingleRange = new PyRange(0, 1); // [0]
    expect([...zeroSingleRange.values()]).toEqual([0]);
    expect([...zeroSingleRange.values()]).toEqual([...zeroSingleRange]);
  });

  test("large step sizes", () => {
    const largeStepRange = new PyRange(0, 100, 50); // [0, 50]
    expect([...largeStepRange.values()]).toEqual([0, 50]);
    expect([...largeStepRange.values()]).toEqual([...largeStepRange]);
  });

  test("very negative ranges", () => {
    const veryNegativeRange = new PyRange(-100, -95); // [-100, -99, -98, -97, -96]
    expect([...veryNegativeRange.values()]).toEqual([-100, -99, -98, -97, -96]);
    expect([...veryNegativeRange.values()]).toEqual([...veryNegativeRange]);
  });

  // Additional tests for edge cases and comparison
  test("comparison with Array.prototype.values", () => {
    const range = new PyRange(1, 4); // [1, 2, 3]
    const arr = [1, 2, 3];
    expect([...range.values()]).toEqual([...arr.values()]);
    expect([...range.values()]).toEqual(arr);
  });

  test("immutability - original range unchanged", () => {
    const range = new PyRange(2, 6); // [2, 3, 4, 5]
    const originalValues = [...range];

    // Use values method
    const values = [...range.values()];

    // Verify original range is unchanged
    expect([...range]).toEqual(originalValues);
    expect(values).toEqual([2, 3, 4, 5]);
    expect(values).toEqual(originalValues);
  });

  test("iterator protocol", () => {
    const range = new PyRange(1, 4); // [1, 2, 3]
    const iterator = range.values();

    expect(iterator.next().value).toBe(1);
    expect(iterator.next().value).toBe(2);
    expect(iterator.next().value).toBe(3);
    expect(iterator.next().done).toBe(true);
  });

  test("values method returns actual range values", () => {
    const range1 = new PyRange(100, 103); // [100, 101, 102]
    const range2 = new PyRange(-10, -7); // [-10, -9, -8]
    const range3 = new PyRange(5, 1, -1); // [5, 4, 3, 2]

    expect([...range1.values()]).toEqual([100, 101, 102]);
    expect([...range2.values()]).toEqual([-10, -9, -8]);
    expect([...range3.values()]).toEqual([5, 4, 3, 2]);
  });

  test("values method equivalent to range iteration", () => {
    const ranges = [
      new PyRange(3), // [0, 1, 2]
      new PyRange(1, 5), // [1, 2, 3, 4]
      new PyRange(10, 0, -2), // [10, 8, 6, 4, 2]
      new PyRange(-3, 3), // [-3, -2, -1, 0, 1, 2]
      new PyRange(0, 10, 3), // [0, 3, 6, 9]
    ];

    ranges.forEach((range) => {
      expect([...range.values()]).toEqual([...range]);
    });
  });
});

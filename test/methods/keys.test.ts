import { describe, test, expect } from "@jest/globals";
import { PyRange } from "range-pie";

describe("PyRange keys method", () => {
  // 1. Positive Range Types (1-4)
  test("positive range", () => {
    const positiveRange = new PyRange(1, 5); // [1, 2, 3, 4]
    expect([...positiveRange.keys()]).toEqual([0, 1, 2, 3]);
  });

  test("positive reverse range", () => {
    const positiveReverseRange = new PyRange(5, 0, -1); // [5, 4, 3, 2, 1]
    expect([...positiveReverseRange.keys()]).toEqual([0, 1, 2, 3, 4]);
  });

  test("positive range with steps", () => {
    const positiveStepRange = new PyRange(0, 10, 2); // [0, 2, 4, 6, 8]
    expect([...positiveStepRange.keys()]).toEqual([0, 1, 2, 3, 4]);
  });

  test("positive reverse range with steps", () => {
    const positiveReverseStepRange = new PyRange(10, 0, -3); // [10, 7, 4, 1]
    expect([...positiveReverseStepRange.keys()]).toEqual([0, 1, 2, 3]);
  });

  // 2. Negative Range Types (5-8)
  test("negative range", () => {
    const negativeRange = new PyRange(-5, -1); // [-5, -4, -3, -2]
    expect([...negativeRange.keys()]).toEqual([0, 1, 2, 3]);
  });

  test("negative reverse range", () => {
    const negativeReverseRange = new PyRange(-1, -6, -1); // [-1, -2, -3, -4, -5]
    expect([...negativeReverseRange.keys()]).toEqual([0, 1, 2, 3, 4]);
  });

  test("negative range with steps", () => {
    const negativeStepRange = new PyRange(-10, -2, 3); // [-10, -7, -4]
    expect([...negativeStepRange.keys()]).toEqual([0, 1, 2]);
  });

  test("negative reverse range with steps", () => {
    const negativeReverseStepRange = new PyRange(-2, -12, -4); // [-2, -6, -10]
    expect([...negativeReverseStepRange.keys()]).toEqual([0, 1, 2]);
  });

  // 3. Cross-Zero Range Types (9-12)
  test("negative to positive range", () => {
    const negToPositiveRange = new PyRange(-3, 4); // [-3, -2, -1, 0, 1, 2, 3]
    expect([...negToPositiveRange.keys()]).toEqual([0, 1, 2, 3, 4, 5, 6]);
  });

  test("positive to negative range", () => {
    const posToNegativeRange = new PyRange(3, -4, -1); // [3, 2, 1, 0, -1, -2, -3]
    expect([...posToNegativeRange.keys()]).toEqual([0, 1, 2, 3, 4, 5, 6]);
  });

  test("negative to positive range with step", () => {
    const negToPositiveStepRange = new PyRange(-6, 6, 3); // [-6, -3, 0, 3]
    expect([...negToPositiveStepRange.keys()]).toEqual([0, 1, 2, 3]);
  });

  test("positive to negative range with step", () => {
    const posToNegativeStepRange = new PyRange(5, -8, -4); // [5, 1, -3, -7]
    expect([...posToNegativeStepRange.keys()]).toEqual([0, 1, 2, 3]);
  });

  // 4. Special Cases (13)
  test("empty range", () => {
    const emptyRange = new PyRange(5, 2, 1); // [] - empty because start > stop with positive step
    expect([...emptyRange.keys()]).toEqual([]);
  });

  // 5. Additional Testing (14+) - Edge Cases and Boundary Conditions
  test("single element range", () => {
    const singleRange = new PyRange(5, 6); // [5]
    expect([...singleRange.keys()]).toEqual([0]);
  });

  test("zero-based single element", () => {
    const zeroSingleRange = new PyRange(0, 1); // [0]
    expect([...zeroSingleRange.keys()]).toEqual([0]);
  });

  test("large step sizes", () => {
    const largeStepRange = new PyRange(0, 100, 50); // [0, 50]
    expect([...largeStepRange.keys()]).toEqual([0, 1]);
  });

  test("very negative ranges", () => {
    const veryNegativeRange = new PyRange(-100, -95); // [-100, -99, -98, -97, -96]
    expect([...veryNegativeRange.keys()]).toEqual([0, 1, 2, 3, 4]);
  });

  // Additional tests for edge cases and comparison
  test("comparison with Array.prototype.keys", () => {
    const range = new PyRange(1, 4); // [1, 2, 3]
    const arr = [1, 2, 3];
    expect([...range.keys()]).toEqual([...arr.keys()]);
  });

  test("immutability - original range unchanged", () => {
    const range = new PyRange(2, 6); // [2, 3, 4, 5]
    const originalValues = [...range];

    // Use keys method
    const keys = [...range.keys()];

    // Verify original range is unchanged
    expect([...range]).toEqual(originalValues);
    expect(keys).toEqual([0, 1, 2, 3]);
  });

  test("iterator protocol", () => {
    const range = new PyRange(1, 4); // [1, 2, 3]
    const iterator = range.keys();

    expect(iterator.next().value).toBe(0);
    expect(iterator.next().value).toBe(1);
    expect(iterator.next().value).toBe(2);
    expect(iterator.next().done).toBe(true);
  });

  test("keys always start from 0 regardless of range values", () => {
    const range1 = new PyRange(100, 103); // [100, 101, 102]
    const range2 = new PyRange(-10, -7); // [-10, -9, -8]
    const range3 = new PyRange(5, 1, -1); // [5, 4, 3, 2]

    expect([...range1.keys()]).toEqual([0, 1, 2]);
    expect([...range2.keys()]).toEqual([0, 1, 2]);
    expect([...range3.keys()]).toEqual([0, 1, 2, 3]);
  });
});

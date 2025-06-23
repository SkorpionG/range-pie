import { describe, test, expect } from "@jest/globals";
import { PyRange } from "range-pie";

describe("PyRange entries method", () => {
  // 1. Positive Range Types (1-4)
  test("positive range", () => {
    const positiveRange = new PyRange(1, 5); // [1, 2, 3, 4]
    expect([...positiveRange.entries()]).toEqual([
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
    ]);
  });

  test("positive reverse range", () => {
    const positiveReverseRange = new PyRange(5, 0, -1); // [5, 4, 3, 2, 1]
    expect([...positiveReverseRange.entries()]).toEqual([
      [0, 5],
      [1, 4],
      [2, 3],
      [3, 2],
      [4, 1],
    ]);
  });

  test("positive range with steps", () => {
    const positiveStepRange = new PyRange(0, 10, 2); // [0, 2, 4, 6, 8]
    expect([...positiveStepRange.entries()]).toEqual([
      [0, 0],
      [1, 2],
      [2, 4],
      [3, 6],
      [4, 8],
    ]);
  });

  test("positive reverse range with steps", () => {
    const positiveReverseStepRange = new PyRange(10, 0, -3); // [10, 7, 4, 1]
    expect([...positiveReverseStepRange.entries()]).toEqual([
      [0, 10],
      [1, 7],
      [2, 4],
      [3, 1],
    ]);
  });

  // 2. Negative Range Types (5-8)
  test("negative range", () => {
    const negativeRange = new PyRange(-5, -1); // [-5, -4, -3, -2]
    expect([...negativeRange.entries()]).toEqual([
      [0, -5],
      [1, -4],
      [2, -3],
      [3, -2],
    ]);
  });

  test("negative reverse range", () => {
    const negativeReverseRange = new PyRange(-1, -6, -1); // [-1, -2, -3, -4, -5]
    expect([...negativeReverseRange.entries()]).toEqual([
      [0, -1],
      [1, -2],
      [2, -3],
      [3, -4],
      [4, -5],
    ]);
  });

  test("negative range with steps", () => {
    const negativeStepRange = new PyRange(-10, -2, 3); // [-10, -7, -4]
    expect([...negativeStepRange.entries()]).toEqual([
      [0, -10],
      [1, -7],
      [2, -4],
    ]);
  });

  test("negative reverse range with steps", () => {
    const negativeReverseStepRange = new PyRange(-2, -12, -4); // [-2, -6, -10]
    expect([...negativeReverseStepRange.entries()]).toEqual([
      [0, -2],
      [1, -6],
      [2, -10],
    ]);
  });

  // 3. Cross-Zero Range Types (9-12)
  test("negative to positive range", () => {
    const negToPositiveRange = new PyRange(-3, 4); // [-3, -2, -1, 0, 1, 2, 3]
    expect([...negToPositiveRange.entries()]).toEqual([
      [0, -3],
      [1, -2],
      [2, -1],
      [3, 0],
      [4, 1],
      [5, 2],
      [6, 3],
    ]);
  });

  test("positive to negative range", () => {
    const posToNegativeRange = new PyRange(3, -4, -1); // [3, 2, 1, 0, -1, -2, -3]
    expect([...posToNegativeRange.entries()]).toEqual([
      [0, 3],
      [1, 2],
      [2, 1],
      [3, 0],
      [4, -1],
      [5, -2],
      [6, -3],
    ]);
  });

  test("negative to positive range with step", () => {
    const negToPositiveStepRange = new PyRange(-6, 6, 3); // [-6, -3, 0, 3]
    expect([...negToPositiveStepRange.entries()]).toEqual([
      [0, -6],
      [1, -3],
      [2, 0],
      [3, 3],
    ]);
  });

  test("positive to negative range with step", () => {
    const posToNegativeStepRange = new PyRange(5, -8, -4); // [5, 1, -3, -7]
    expect([...posToNegativeStepRange.entries()]).toEqual([
      [0, 5],
      [1, 1],
      [2, -3],
      [3, -7],
    ]);
  });

  // 4. Special Cases (13)
  test("empty range", () => {
    const emptyRange = new PyRange(5, 2, 1); // [] - empty because start > stop with positive step
    expect([...emptyRange.entries()]).toEqual([]);
  });

  // 5. Additional Testing (14+) - Edge Cases and Boundary Conditions
  test("single element range", () => {
    const singleRange = new PyRange(5, 6); // [5]
    expect([...singleRange.entries()]).toEqual([[0, 5]]);
  });

  test("zero-based single element", () => {
    const zeroSingleRange = new PyRange(0, 1); // [0]
    expect([...zeroSingleRange.entries()]).toEqual([[0, 0]]);
  });

  test("large step sizes", () => {
    const largeStepRange = new PyRange(0, 100, 50); // [0, 50]
    expect([...largeStepRange.entries()]).toEqual([
      [0, 0],
      [1, 50],
    ]);
  });

  test("very negative ranges", () => {
    const veryNegativeRange = new PyRange(-100, -95); // [-100, -99, -98, -97, -96]
    expect([...veryNegativeRange.entries()]).toEqual([
      [0, -100],
      [1, -99],
      [2, -98],
      [3, -97],
      [4, -96],
    ]);
  });

  // Additional tests for edge cases and comparison
  test("comparison with Array.prototype.entries", () => {
    const range = new PyRange(0, 5); // [0, 1, 2, 3, 4]
    const arr = [0, 1, 2, 3, 4];
    expect([...range.entries()]).toEqual([...arr.entries()]);
  });

  test("immutability - original range unchanged", () => {
    const range = new PyRange(1, 4); // [1, 2, 3]
    const originalValues = [...range];

    // Use entries method
    const entries = [...range.entries()];

    // Verify original range is unchanged
    expect([...range]).toEqual(originalValues);
    expect(entries).toEqual([
      [0, 1],
      [1, 2],
      [2, 3],
    ]);
  });

  test("iterator protocol", () => {
    const range = new PyRange(2, 5); // [2, 3, 4]
    const iterator = range.entries();

    expect(iterator.next().value).toEqual([0, 2]);
    expect(iterator.next().value).toEqual([1, 3]);
    expect(iterator.next().value).toEqual([2, 4]);
    expect(iterator.next().done).toBe(true);
  });
});

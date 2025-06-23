/**
 * slice() method demonstration
 *
 * This file demonstrates how the slice() method works with PyRange,
 * showing its behavior similar to JavaScript's Array.prototype.slice().
 */

import { PyRange } from "range-pie";

console.log("=== slice() method demonstration ===\n");

// 1. Positive range (basic range)
console.log("1. Positive range (1 to 5):");
const positiveRange = new PyRange(1, 5); // [1, 2, 3, 4]
console.log("  Original:", [...positiveRange]);
console.log("  slice(1, 3):", [...positiveRange.slice(1, 3)]); // [2, 3]
console.log("  slice(-2):", [...positiveRange.slice(-2)]); // [3, 4]
console.log();

// 2. Positive reverse range
console.log("2. Positive reverse range (5 down to 1, step -1):");
const positiveReverseRange = new PyRange(5, 0, -1); // [5, 4, 3, 2, 1]
console.log("  Original:", [...positiveReverseRange]);
console.log("  slice(1, 4):", [...positiveReverseRange.slice(1, 4)]); // [4, 3, 2]
console.log("  slice(-3, -1):", [...positiveReverseRange.slice(-3, -1)]); // [3, 2]
console.log();

// 3. Positive range with steps
console.log("3. Positive range with steps (0 to 10, step 2):");
const positiveStepRange = new PyRange(0, 10, 2); // [0, 2, 4, 6, 8]
console.log("  Original:", [...positiveStepRange]);
console.log("  slice(1, 4):", [...positiveStepRange.slice(1, 4)]); // [2, 4, 6]
console.log("  slice(2):", [...positiveStepRange.slice(2)]); // [4, 6, 8]
console.log();

// 4. Positive reverse range with steps
console.log("4. Positive reverse range with steps (10 down to 0, step -3):");
const positiveReverseStepRange = new PyRange(10, 0, -3); // [10, 7, 4, 1]
console.log("  Original:", [...positiveReverseStepRange]);
console.log("  slice(1, 3):", [...positiveReverseStepRange.slice(1, 3)]); // [7, 4]
console.log("  slice(-2):", [...positiveReverseStepRange.slice(-2)]); // [4, 1]
console.log();

// 5. Negative range
console.log("5. Negative range (-5 to -1):");
const negativeRange = new PyRange(-5, -1); // [-5, -4, -3, -2]
console.log("  Original:", [...negativeRange]);
console.log("  slice(1, 3):", [...negativeRange.slice(1, 3)]); // [-4, -3]
console.log("  slice(-3):", [...negativeRange.slice(-3)]); // [-4, -3, -2]
console.log();

// 6. Negative reverse range
console.log("6. Negative reverse range (-1 down to -6, step -1):");
const negativeReverseRange = new PyRange(-1, -6, -1); // [-1, -2, -3, -4, -5]
console.log("  Original:", [...negativeReverseRange]);
console.log("  slice(1, 4):", [...negativeReverseRange.slice(1, 4)]); // [-2, -3, -4]
console.log("  slice(-2):", [...negativeReverseRange.slice(-2)]); // [-4, -5]
console.log();

// 7. Negative range with steps
console.log("7. Negative range with steps (-10 to -2, step 3):");
const negativeStepRange = new PyRange(-10, -2, 3); // [-10, -7, -4]
console.log("  Original:", [...negativeStepRange]);
console.log("  slice(1, 3):", [...negativeStepRange.slice(1, 3)]); // [-7, -4]
console.log("  slice(1):", [...negativeStepRange.slice(1)]); // [-7, -4]
console.log();

// 8. Negative reverse range with steps
console.log("8. Negative reverse range with steps (-2 down to -12, step -4):");
const negativeReverseStepRange = new PyRange(-2, -12, -4); // [-2, -6, -10]
console.log("  Original:", [...negativeReverseStepRange]);
console.log("  slice(0, 2):", [...negativeReverseStepRange.slice(0, 2)]); // [-2, -6]
console.log("  slice(-2):", [...negativeReverseStepRange.slice(-2)]); // [-6, -10]
console.log();

// 9. Negative to positive range
console.log("9. Negative to positive range (-3 to 4):");
const negToPositiveRange = new PyRange(-3, 4); // [-3, -2, -1, 0, 1, 2, 3]
console.log("  Original:", [...negToPositiveRange]);
console.log("  slice(2, 5):", [...negToPositiveRange.slice(2, 5)]); // [-1, 0, 1]
console.log("  slice(-3):", [...negToPositiveRange.slice(-3)]); // [1, 2, 3]
console.log();

// 10. Positive to negative range (reverse)
console.log("10. Positive to negative range (3 down to -4, step -1):");
const posToNegativeRange = new PyRange(3, -4, -1); // [3, 2, 1, 0, -1, -2, -3]
console.log("  Original:", [...posToNegativeRange]);
console.log("  slice(1, 4):", [...posToNegativeRange.slice(1, 4)]); // [2, 1, 0]
console.log("  slice(-4, -1):", [...posToNegativeRange.slice(-4, -1)]); // [0, -1, -2]
console.log();

// 11. Negative to positive range with step
console.log("11. Negative to positive range with step (-6 to 6, step 3):");
const negToPositiveStepRange = new PyRange(-6, 6, 3); // [-6, -3, 0, 3]
console.log("  Original:", [...negToPositiveStepRange]);
console.log("  slice(1, 3):", [...negToPositiveStepRange.slice(1, 3)]); // [-3, 0]
console.log("  slice(-3):", [...negToPositiveStepRange.slice(-3)]); // [-3, 0, 3]
console.log();

// 12. Positive to negative range with step
console.log("12. Positive to negative range with step (5 down to -8, step -4):");
const posToNegativeStepRange = new PyRange(5, -8, -4); // [5, 1, -3, -7]
console.log("  Original:", [...posToNegativeStepRange]);
console.log("  slice(1, 3):", [...posToNegativeStepRange.slice(1, 3)]); // [1, -3]
console.log("  slice(-2):", [...posToNegativeStepRange.slice(-2)]); // [-3, -7]
console.log();

// 13. Empty range
console.log("13. Empty range (5 to 2, positive step):");
const emptyRange = new PyRange(5, 2, 1); // [] - empty because start > stop with positive step
console.log("  Original:", [...emptyRange]);
console.log("  slice(0, 1):", [...emptyRange.slice(0, 1)]); // []
console.log("  slice(-1):", [...emptyRange.slice(-1)]); // []
console.log();

console.log("=== Comparison with JavaScript Array.slice ===");
const exampleArray: number[] = [1, 3, 5, 7, 9];
const exampleRange = new PyRange(1, 10, 2);
console.log("Array original:", exampleArray);
console.log("Range original:", [...exampleRange]);
console.log("Array slice(1, 4):", exampleArray.slice(1, 4));
console.log("Range slice(1, 4):", [...exampleRange.slice(1, 4)]);
console.log("Array slice(-3, -1):", exampleArray.slice(-3, -1));
console.log("Range slice(-3, -1):", [...exampleRange.slice(-3, -1)]);

console.log("\n=== End of demonstration ===");

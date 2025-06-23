/**
 * values() method demonstration
 *
 * This file shows how the values() method works with PyRange,
 * returning an iterator of the range's values.
 */

import { PyRange } from "range-pie";

console.log("=== values() method demonstration ===\n");

// 1. Positive range (basic range)
console.log("1. Positive range (1 to 5):");
const positiveRange = new PyRange(1, 5); // [1, 2, 3, 4]
console.log("  Values:", [...positiveRange.values()]);
console.log();

// 2. Positive reverse range
console.log("2. Positive reverse range (5 down to 1, step -1):");
const positiveReverseRange = new PyRange(5, 0, -1); // [5, 4, 3, 2, 1]
console.log("  Values:", [...positiveReverseRange.values()]);
console.log();

// 3. Positive range with steps
console.log("3. Positive range with steps (0 to 10, step 2):");
const positiveStepRange = new PyRange(0, 10, 2); // [0, 2, 4, 6, 8]
console.log("  Values:", [...positiveStepRange.values()]);
console.log();

// 4. Positive reverse range with steps
console.log("4. Positive reverse range with steps (10 down to 0, step -3):");
const positiveReverseStepRange = new PyRange(10, 0, -3); // [10, 7, 4, 1]
console.log("  Values:", [...positiveReverseStepRange.values()]);
console.log();

// 5. Negative range
console.log("5. Negative range (-5 to -1):");
const negativeRange = new PyRange(-5, -1); // [-5, -4, -3, -2]
console.log("  Values:", [...negativeRange.values()]);
console.log();

// 6. Negative reverse range
console.log("6. Negative reverse range (-1 down to -6, step -1):");
const negativeReverseRange = new PyRange(-1, -6, -1); // [-1, -2, -3, -4, -5]
console.log("  Values:", [...negativeReverseRange.values()]);
console.log();

// 7. Negative range with steps
console.log("7. Negative range with steps (-10 to -2, step 3):");
const negativeStepRange = new PyRange(-10, -2, 3); // [-10, -7, -4]
console.log("  Values:", [...negativeStepRange.values()]);
console.log();

// 8. Negative reverse range with steps
console.log("8. Negative reverse range with steps (-2 down to -12, step -4):");
const negativeReverseStepRange = new PyRange(-2, -12, -4); // [-2, -6, -10]
console.log("  Values:", [...negativeReverseStepRange.values()]);
console.log();

// 9. Negative to positive range
console.log("9. Negative to positive range (-3 to 4):");
const negToPositiveRange = new PyRange(-3, 4); // [-3, -2, -1, 0, 1, 2, 3]
console.log("  Values:", [...negToPositiveRange.values()]);
console.log();

// 10. Positive to negative range (reverse)
console.log("10. Positive to negative range (3 down to -4, step -1):");
const posToNegativeRange = new PyRange(3, -4, -1); // [3, 2, 1, 0, -1, -2, -3]
console.log("  Values:", [...posToNegativeRange.values()]);
console.log();

// 11. Negative to positive range with step
console.log("11. Negative to positive range with step (-6 to 6, step 3):");
const negToPositiveStepRange = new PyRange(-6, 6, 3); // [-6, -3, 0, 3]
console.log("  Values:", [...negToPositiveStepRange.values()]);
console.log();

// 12. Positive to negative range with step
console.log("12. Positive to negative range with step (5 down to -8, step -4):");
const posToNegativeStepRange = new PyRange(5, -8, -4); // [5, 1, -3, -7]
console.log("  Values:", [...posToNegativeStepRange.values()]);
console.log();

// 13. Empty range
console.log("13. Empty range (5 to 2, positive step):");
const emptyRange = new PyRange(5, 2, 1); // [] - empty because start > stop with positive step
const emptyValues = [...emptyRange.values()];
if (emptyValues.length === 0) {
  console.log("  Values: [] (no values - empty range)");
} else {
  console.log("  Values:", emptyValues);
}
console.log();

console.log("=== End of demonstration ===");

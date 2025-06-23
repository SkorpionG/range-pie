/**
 * entries() method demonstration
 *
 * This file shows how the entries() method works with PyRange,
 * returning an iterator of [index, value] pairs.
 */

import { PyRange } from "range-pie";

console.log("=== entries() method demonstration ===\n");

// 1. Positive range (basic range)
console.log("1. Positive range (1 to 5):");
const positiveRange = new PyRange(1, 5); // [1, 2, 3, 4]
for (const [index, value] of positiveRange.entries()) {
  console.log(`  index: ${index}, value: ${value}`);
}
console.log();

// 2. Positive reverse range
console.log("2. Positive reverse range (5 down to 1, step -1):");
const positiveReverseRange = new PyRange(5, 0, -1); // [5, 4, 3, 2, 1]
for (const [index, value] of positiveReverseRange.entries()) {
  console.log(`  index: ${index}, value: ${value}`);
}
console.log();

// 3. Positive range with steps
console.log("3. Positive range with steps (0 to 10, step 2):");
const positiveStepRange = new PyRange(0, 10, 2); // [0, 2, 4, 6, 8]
for (const [index, value] of positiveStepRange.entries()) {
  console.log(`  index: ${index}, value: ${value}`);
}
console.log();

// 4. Positive reverse range with steps
console.log("4. Positive reverse range with steps (10 down to 0, step -3):");
const positiveReverseStepRange = new PyRange(10, 0, -3); // [10, 7, 4, 1]
for (const [index, value] of positiveReverseStepRange.entries()) {
  console.log(`  index: ${index}, value: ${value}`);
}
console.log();

// 5. Negative range
console.log("5. Negative range (-5 to -1):");
const negativeRange = new PyRange(-5, -1); // [-5, -4, -3, -2]
for (const [index, value] of negativeRange.entries()) {
  console.log(`  index: ${index}, value: ${value}`);
}
console.log();

// 6. Negative reverse range
console.log("6. Negative reverse range (-1 down to -6, step -1):");
const negativeReverseRange = new PyRange(-1, -6, -1); // [-1, -2, -3, -4, -5]
for (const [index, value] of negativeReverseRange.entries()) {
  console.log(`  index: ${index}, value: ${value}`);
}
console.log();

// 7. Negative range with steps
console.log("7. Negative range with steps (-10 to -2, step 3):");
const negativeStepRange = new PyRange(-10, -2, 3); // [-10, -7, -4]
for (const [index, value] of negativeStepRange.entries()) {
  console.log(`  index: ${index}, value: ${value}`);
}
console.log();

// 8. Negative reverse range with steps
console.log("8. Negative reverse range with steps (-2 down to -12, step -4):");
const negativeReverseStepRange = new PyRange(-2, -12, -4); // [-2, -6, -10]
for (const [index, value] of negativeReverseStepRange.entries()) {
  console.log(`  index: ${index}, value: ${value}`);
}
console.log();

// 9. Negative to positive range
console.log("9. Negative to positive range (-3 to 4):");
const negToPositiveRange = new PyRange(-3, 4); // [-3, -2, -1, 0, 1, 2, 3]
for (const [index, value] of negToPositiveRange.entries()) {
  console.log(`  index: ${index}, value: ${value}`);
}
console.log();

// 10. Positive to negative range (reverse)
console.log("10. Positive to negative range (3 down to -4, step -1):");
const posToNegativeRange = new PyRange(3, -4, -1); // [3, 2, 1, 0, -1, -2, -3]
for (const [index, value] of posToNegativeRange.entries()) {
  console.log(`  index: ${index}, value: ${value}`);
}
console.log();

// 11. Negative to positive range with step
console.log("11. Negative to positive range with step (-6 to 6, step 3):");
const negToPositiveStepRange = new PyRange(-6, 6, 3); // [-6, -3, 0, 3]
for (const [index, value] of negToPositiveStepRange.entries()) {
  console.log(`  index: ${index}, value: ${value}`);
}
console.log();

// 12. Positive to negative range with step
console.log("12. Positive to negative range with step (5 down to -8, step -4):");
const posToNegativeStepRange = new PyRange(5, -8, -4); // [5, 1, -3, -7]
for (const [index, value] of posToNegativeStepRange.entries()) {
  console.log(`  index: ${index}, value: ${value}`);
}
console.log();

// 13. Empty range
console.log("13. Empty range (5 to 2, positive step):");
const emptyRange = new PyRange(5, 2, 1); // [] - empty because start > stop with positive step
let hasEntries = false;
for (const [index, value] of emptyRange.entries()) {
  console.log(`  index: ${index}, value: ${value}`);
  hasEntries = true;
}
if (!hasEntries) {
  console.log("  (no entries - empty range)");
}
console.log();

console.log("=== End of demonstration ===");

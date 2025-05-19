/**
 * Advanced usage examples for range-pie
 *
 * This file demonstrates more advanced features of the PyRange class
 */

const { PyRange } = require("range-pie");

console.log("\n--- Advanced PyRange Examples ---");

// Example 1: Using the reverse method
const range1 = new PyRange(1, 6);
console.log("Original range:", [...range1]); // [1, 2, 3, 4, 5]

const reversed = range1.reverse();
console.log("Reversed range:", [...reversed]); // [5, 4, 3, 2, 1]

// Example 2: Using the asProxy method for array-like access
const range2 = new PyRange(10).asProxy();
console.log("range2[0]:", range2[0]); // 0
console.log("range2[5]:", range2[5]); // 5

// Create an array using proxy access
const firstThree = [range2[0], range2[1], range2[2]];
console.log("firstThree:", firstThree); // [0, 1, 2]

// Example 3: Method chaining
const range3 = new PyRange(1, 10);
const result = range3
  .filter((x) => x % 2 === 0) // Get even numbers
  .map((x) => x * x) // Square them
  .filter((x) => x > 10); // Filter values greater than 10

console.log("Chained methods result:", result); // [16, 36, 64]

// Example 4: Using PyRange with other array methods
const range4 = new PyRange(5);
const array = [...range4]; // Convert to array: [0, 1, 2, 3, 4]

// Now we can use native array methods
const sorted = array.sort((a, b) => b - a); // Sort in descending order
console.log("Sorted array:", sorted); // [4, 3, 2, 1, 0]

// Example 5: Creating a range with custom step
const range5 = new PyRange(0, 11, 2);
console.log("Range with step 2:", [...range5]); // [0, 2, 4, 6, 8, 10]

// Example 6: Combining multiple ranges
const range6a = new PyRange(0, 3);
const range6b = new PyRange(5, 8);
const combined = [...range6a, ...range6b];
console.log("Combined ranges:", combined); // [0, 1, 2, 5, 6, 7]

// Example 7: Using PyRange for iteration
console.log("\nIteration example:");
for (const num of new PyRange(3)) {
  console.log(`Current number: ${num}`);
}
// Current number: 0
// Current number: 1
// Current number: 2

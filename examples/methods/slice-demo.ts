/**
 * slice() method demonstration
 *
 * This file demonstrates how the slice() method works with PyRange,
 * showing its behavior similar to JavaScript's Array.prototype.slice().
 */

import { PyRange } from "range-pie";

console.log("=== Updated slice() method demonstration ===\n");

// Create a range
const range = new PyRange(1, 10, 2); // [1, 3, 5, 7, 9]
console.log("Original range:", [...range]);

// Test slice with positive indices
const sliced1 = range.slice(1, 4); // Should get [3, 5, 7]
console.log("Sliced (1, 4):", [...sliced1]);
console.log("Original after slice:", [...range]); // Should be unchanged

// Test slice with negative indices
const sliced2 = range.slice(-3, -1); // Should get [5, 7]
console.log("Sliced (-3, -1):", [...sliced2]);
console.log("Original after slice:", [...range]); // Should be unchanged

// Test slice with only begin parameter
const sliced3 = range.slice(2); // Should get [5, 7, 9]
console.log("Sliced (2):", [...sliced3]);
console.log("Original after slice:", [...range]); // Should be unchanged

// Test empty slice
const sliced4 = range.slice(10, 20); // Should be empty
console.log("Sliced (10, 20):", [...sliced4]);
console.log("Original after slice:", [...range]); // Should be unchanged

console.log("\n=== Comparison with JavaScript Array.slice ===");
const arr: number[] = [1, 3, 5, 7, 9];
console.log("Array original:", arr);
console.log("Array sliced (1, 4):", arr.slice(1, 4));
console.log("Array after slice:", arr); // Should be unchanged

/**
 * Array method examples for range-pie
 *
 * This file demonstrates how to use the array-like methods provided by PyRange
 */

const { PyRange } = require("range-pie");

console.log("\n--- Array Method Examples ---");

// Create a range to work with
const range = new PyRange(1, 10);
console.log("Original range:", [...range]); // [1, 2, 3, 4, 5, 6, 7, 8, 9]

// Map: Double each value
const doubled = range.map((x) => x * 2);
console.log("map(x => x * 2):", doubled); // [2, 4, 6, 8, 10, 12, 14, 16, 18]

// Filter: Get only even numbers
const evens = range.filter((x) => x % 2 === 0);
console.log("filter(x => x % 2 === 0):", evens); // [2, 4, 6, 8]

// Reduce: Sum all values
const sum = range.reduce((acc, curr) => acc + curr, 0);
console.log("reduce((acc, curr) => acc + curr, 0):", sum); // 45

// Some: Check if any value meets a condition
const hasEven = range.some((x) => x % 2 === 0);
console.log("some(x => x % 2 === 0):", hasEven); // true

// Every: Check if all values meet a condition
const allPositive = range.every((x) => x > 0);
console.log("every(x => x > 0):", allPositive); // true

// Find: Get the first value that meets a condition
const firstEven = range.find((x) => x % 2 === 0);
console.log("find(x => x % 2 === 0):", firstEven); // 2

// FindIndex: Get the index of the first value that meets a condition
const firstEvenIndex = range.findIndex((x) => x % 2 === 0);
console.log("findIndex(x => x % 2 === 0):", firstEvenIndex); // 1

// FindLastIndex: Get the index of the last value that meets a condition
const lastEvenIndex = range.findLastIndex((x) => x % 2 === 0);
console.log("findLastIndex(x => x % 2 === 0):", lastEvenIndex); // 7

// Includes: Check if a value exists in the range
const includesFive = range.includes(5);
console.log("includes(5):", includesFive); // true

// IndexOf: Get the index of a value
const indexOfFive = range.indexOf(5);
console.log("indexOf(5):", indexOfFive); // 4

// LastIndexOf: Get the last index of a value
const lastIndexOfFive = range.lastIndexOf(5);
console.log("lastIndexOf(5):", lastIndexOfFive); // 4

// ForEach: Execute a function for each value
console.log("\nforEach example:");
range.forEach((x) => {
  if (x % 3 === 0) {
    console.log(`${x} is divisible by 3`);
  }
});
// 3 is divisible by 3
// 6 is divisible by 3
// 9 is divisible by 3

// Pop: Remove the last value
const popped = range.pop();
console.log("pop():", popped); // 9
console.log("After pop:", [...range]); // [1, 2, 3, 4, 5, 6, 7, 8]

// Slice: Get a subset of the range (returns new instance)
const sliced = range.slice(2, 5);
console.log("slice(2, 5):", [...sliced]); // [3, 4, 5]
console.log("Original after slice:", [...range]); // [1, 2, 3, 4, 5, 6, 7, 8] (unchanged)

// Entries: Iterate over index/value pairs
console.log("\nentries() example:");
for (const [i, v] of range.entries()) {
  if (i < 3) {
    console.log(i, v);
  }
}

// Keys and values helpers
console.log("keys():", [...range.keys()].slice(0, 3)); // [0,1,2]
console.log("values():", [...range.values()].slice(0, 3)); // [1,2,3]

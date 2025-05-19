/**
 * TypeScript usage examples for range-pie
 *
 * This file demonstrates how to use the PyRange class with TypeScript,
 * taking advantage of type safety and generics.
 */

// ES Module import
import { PyRange } from "range-pie";

console.log("\n--- TypeScript PyRange Examples ---");

// Basic usage is the same as JavaScript
const range = new PyRange(1, 10);
console.log("Basic range:", [...range]); // [1, 2, 3, 4, 5, 6, 7, 8, 9]

// TypeScript provides type safety
// This would cause a compile-time error:
// const badRange = new PyRange("not a number");

// Type inference with generics
// TypeScript knows this returns number[]
const numbers = range.map((x) => x * 2);
console.log("Doubled numbers:", numbers); // [2, 4, 6, 8, 10, 12, 14, 16, 18]

// TypeScript knows this returns string[]
const strings = range.map((x) => `Number: ${x}`);
console.log("First string:", strings[0]); // "Number: 1"

// TypeScript knows this returns boolean[]
const booleans = range.map((x) => x % 2 === 0);
console.log("Is even:", booleans); // [false, true, false, true, false, true, false, true, false]

// Type safety with callbacks
range.forEach((value: number, index: number) => {
  console.log(`Value at index ${index}: ${value}`);
});

// Using reduce with proper typing
const sum: number = range.reduce((acc, curr) => acc + curr, 0);
console.log("Sum:", sum); // 45

// Creating a custom object with map
interface NumberInfo {
  value: number;
  isEven: boolean;
  square: number;
}

const infoArray: NumberInfo[] = range.map((x) => ({
  value: x,
  isEven: x % 2 === 0,
  square: x * x,
}));

console.log("First object:", infoArray[0]); // { value: 1, isEven: false, square: 1 }

// Chaining methods with type safety
const evenSquares: number[] = range.filter((x) => x % 2 === 0).map((x) => x * x);

console.log("Even squares:", evenSquares); // [4, 16, 36, 64]

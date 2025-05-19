/**
 * Basic usage examples for range-pie
 * 
 * This file demonstrates the fundamental ways to use the PyRange class
 * with JavaScript.
 */

// CommonJS import
const { PyRange } = require('range-pie');

console.log('\n--- Basic PyRange Examples ---');

// Example 1: Simple range with just stop value
const range1 = new PyRange(5);
console.log('PyRange(5):', [...range1]);  // [0, 1, 2, 3, 4]

// Example 2: Range with start and stop
const range2 = new PyRange(2, 8);
console.log('PyRange(2, 8):', [...range2]);  // [2, 3, 4, 5, 6, 7]

// Example 3: Range with start, stop, and step
const range3 = new PyRange(1, 10, 2);
console.log('PyRange(1, 10, 2):', [...range3]);  // [1, 3, 5, 7, 9]

// Example 4: Negative step
const range4 = new PyRange(10, 0, -2);
console.log('PyRange(10, 0, -2):', [...range4]);  // [10, 8, 6, 4, 2]

console.log('\n--- Accessing Properties ---');
console.log('range3.start:', range3.start);  // 1
console.log('range3.stop:', range3.stop);    // 10
console.log('range3.step:', range3.step);    // 2
console.log('range3.length:', range3.length);  // 5

console.log('\n--- Using at() Method ---');
console.log('range3.at(0):', range3.at(0));  // 1
console.log('range3.at(2):', range3.at(2));  // 5
// console.log(range3.at(10));  // Would throw RangeError: Index out of range

console.log('\n--- Converting to Array ---');
const array = range3.toArray();
console.log('range3.toArray():', array);  // [1, 3, 5, 7, 9]

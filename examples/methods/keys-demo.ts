/**
 * keys() method demonstration
 *
 * This file shows how the keys() method works with PyRange,
 * providing an iterator of indices.
 */

import { PyRange } from "range-pie";

console.log("=== keys() method demonstration ===\n");

const range = new PyRange(3); // [0, 1, 2]
console.log([...range.keys()]);

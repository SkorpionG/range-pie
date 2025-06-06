/**
 * values() method demonstration
 *
 * This file shows how the values() method works with PyRange,
 * returning an iterator of the range's values.
 */

import { PyRange } from "range-pie";

console.log("=== values() method demonstration ===\n");

const range = new PyRange(3); // [0, 1, 2]
console.log([...range.values()]);

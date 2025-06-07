/**
 * entries() method demonstration
 *
 * This file shows how the entries() method works with PyRange,
 * returning an iterator of [index, value] pairs.
 */

import { PyRange } from "range-pie";

console.log("=== entries() method demonstration ===\n");

const range = new PyRange(1, 4); // [1, 2, 3]
for (const [index, value] of range.entries()) {
  console.log(index, value);
}

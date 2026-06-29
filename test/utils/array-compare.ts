import { PyRange } from "range-pie";

/**
 * Returns an array of diverse range configurations to test against Array methods.
 */
export function getDiverseRanges(): PyRange[] {
  return [
    new PyRange(1, 10), // Ascending
    new PyRange(10, 1, -1), // Descending
    new PyRange(0, 20, 3), // Stepped
    new PyRange(-10, -5), // Negative ascending
    new PyRange(-5, -10, -1), // Negative descending
    new PyRange(-5, 5), // Cross-zero ascending
    new PyRange(5, -5, -2), // Cross-zero descending
    new PyRange(0), // Empty
    new PyRange(5, 0, 1), // Empty (impossible step direction)
    new PyRange(42, 43), // Single element
  ];
}

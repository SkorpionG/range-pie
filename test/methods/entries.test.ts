import { describe, test, expect } from "@jest/globals";
import { PyRange } from "range-pie";

describe("PyRange entries method", () => {
  test("basic functionality", () => {
    const range = new PyRange(3); // [0,1,2]
    expect([...range.entries()]).toEqual([
      [0, 0],
      [1, 1],
      [2, 2],
    ]);
  });

  test("works with negative step", () => {
    const range = new PyRange(5, 0, -2); // [5,3,1]
    expect([...range.entries()]).toEqual([
      [0, 5],
      [1, 3],
      [2, 1],
    ]);
  });

  test("empty range yields no pairs", () => {
    const range = new PyRange(0);
    expect([...range.entries()]).toEqual([]);
  });

  test("comparison with Array.prototype.entries", () => {
    const range = new PyRange(0, 5); // [0,1,2,3,4]
    const arr = [0, 1, 2, 3, 4];
    expect([...range.entries()]).toEqual([...arr.entries()]);
  });
});

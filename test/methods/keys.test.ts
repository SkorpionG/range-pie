import { describe, test, expect } from "@jest/globals";
import { PyRange } from "range-pie";

describe("PyRange keys method", () => {
  test("returns indices", () => {
    const range = new PyRange(3);
    expect([...range.keys()]).toEqual([0, 1, 2]);
  });

  test("handles negative step", () => {
    const range = new PyRange(5, 0, -2); // length 3
    expect([...range.keys()]).toEqual([0, 1, 2]);
  });

  test("empty range", () => {
    expect([...new PyRange(0).keys()]).toEqual([]);
  });

  test("comparison with Array.prototype.keys", () => {
    const array = [1, 2, 3];
    const range = new PyRange(1, 4); // [1,2,3]
    expect([...range.keys()]).toEqual([...array.keys()]);
  });
});

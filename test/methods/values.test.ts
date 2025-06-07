import { describe, test, expect } from "@jest/globals";
import { PyRange } from "range-pie";

describe("PyRange values method", () => {
  test("basic values output", () => {
    const range = new PyRange(1, 5); // [1,2,3,4]
    expect([...range.values()]).toEqual([1, 2, 3, 4]);
    expect([...range.values()]).toEqual([...range]);
  });

  test("works with negative step", () => {
    const range = new PyRange(5, 0, -2); // [5,3,1]
    expect([...range.values()]).toEqual([5, 3, 1]);
  });

  test("empty range", () => {
    expect([...new PyRange(0).values()]).toEqual([]);
  });
});

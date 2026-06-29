import { describe, test, expect } from "@jest/globals";
import { PyRange } from "range-pie";

describe("PyRange toString() method", () => {
  test("ascending range", () => {
    expect(new PyRange(1, 6).toString()).toBe("PyRange(1, 6, 1)");
  });

  test("single-arg constructor", () => {
    expect(new PyRange(5).toString()).toBe("PyRange(0, 5, 1)");
  });

  test("two-arg constructor", () => {
    expect(new PyRange(2, 8).toString()).toBe("PyRange(2, 8, 1)");
  });

  test("three-arg constructor with positive step", () => {
    expect(new PyRange(0, 10, 2).toString()).toBe("PyRange(0, 10, 2)");
  });

  test("descending range", () => {
    expect(new PyRange(5, 0, -1).toString()).toBe("PyRange(5, 0, -1)");
  });

  test("negative-value range", () => {
    expect(new PyRange(-5, -1).toString()).toBe("PyRange(-5, -1, 1)");
  });

  test("cross-zero range", () => {
    expect(new PyRange(-3, 4).toString()).toBe("PyRange(-3, 4, 1)");
  });

  test("empty range shows start==stop", () => {
    expect(new PyRange(0).toString()).toBe("PyRange(0, 0, 1)");
  });

  test("auto-negated step when stop < start (two-arg)", () => {
    const r = new PyRange(5, 1); // auto-negates to step=-1
    expect(r.toString()).toBe("PyRange(5, 1, -1)");
  });
});

describe("PyRange toArray() method", () => {
  test("ascending range matches spread", () => {
    const range = new PyRange(1, 6); // [1,2,3,4,5]
    expect(range.toArray()).toEqual([...range]);
    expect(range.toArray()).toEqual([1, 2, 3, 4, 5]);
  });

  test("descending range", () => {
    const range = new PyRange(5, 0, -1); // [5,4,3,2,1]
    expect(range.toArray()).toEqual([5, 4, 3, 2, 1]);
  });

  test("stepped range", () => {
    const range = new PyRange(0, 10, 3); // [0,3,6,9]
    expect(range.toArray()).toEqual([0, 3, 6, 9]);
  });

  test("empty range returns empty array", () => {
    expect(new PyRange(0).toArray()).toEqual([]);
  });

  test("single-element range", () => {
    expect(new PyRange(7, 8).toArray()).toEqual([7]);
  });

  test("returns a new array (not the range itself)", () => {
    const range = new PyRange(1, 4);
    const arr1 = range.toArray();
    const arr2 = range.toArray();
    expect(arr1).not.toBe(arr2); // different array instances
    expect(arr1).toEqual(arr2);
  });

  test("negative-value range", () => {
    expect(new PyRange(-3, 0).toArray()).toEqual([-3, -2, -1]);
  });

  test("cross-zero range", () => {
    expect(new PyRange(-2, 3).toArray()).toEqual([-2, -1, 0, 1, 2]);
  });

  test("does not mutate the range", () => {
    const range = new PyRange(1, 4); // [1,2,3]
    const before = [...range];
    range.toArray();
    expect([...range]).toEqual(before);
  });
});

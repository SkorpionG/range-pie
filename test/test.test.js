const { test, expect } = require("@jest/globals");
const { PyRange } = require("range-pie");

describe("PyRange", () => {
  test("constructor with one argument", () => {
    const range = new PyRange(5);
    expect(range.length).toBe(5);
    expect(range.start).toBe(0);
    expect(range.stop).toBe(5);
    expect(range.step).toBe(1);
  });

  test("constructor with two arguments", () => {
    const range = new PyRange(1, 5);
    expect(range.length).toBe(4);
    expect(range.start).toBe(1);
    expect(range.stop).toBe(5);
    expect(range.step).toBe(1);
  });

  test("constructor with three arguments", () => {
    const range = new PyRange(1, 10, 2);
    expect(range.length).toBe(5);
    expect(range.start).toBe(1);
    expect(range.stop).toBe(10);
    expect(range.step).toBe(2);
  });
});

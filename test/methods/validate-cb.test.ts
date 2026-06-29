import { describe, test, expect } from "@jest/globals";
import { PyRange } from "range-pie";

/**
 * Tests that all methods accepting callbacks properly validate
 * that the callback is a function (via the private validateCb helper).
 */
describe("PyRange callback validation (validateCb)", () => {
  const range = new PyRange(1, 4); // [1,2,3]
  const nonFunctions = [null, undefined, 42, "string", true, {}, []];

  const errorMsg = "Callback must be a function";

  // ── map ─────────────────────────────────────────────────────────────────
  describe("map()", () => {
    for (const cb of nonFunctions) {
      test(`throws TypeError when callback is ${JSON.stringify(cb)}`, () => {
        expect(() => range.map(cb as unknown as () => number)).toThrow(TypeError);
        expect(() => range.map(cb as unknown as () => number)).toThrow(errorMsg);
      });
    }
  });

  // ── filter ──────────────────────────────────────────────────────────────
  describe("filter()", () => {
    for (const cb of nonFunctions) {
      test(`throws TypeError when callback is ${JSON.stringify(cb)}`, () => {
        expect(() => range.filter(cb as unknown as () => boolean)).toThrow(TypeError);
        expect(() => range.filter(cb as unknown as () => boolean)).toThrow(errorMsg);
      });
    }
  });

  // ── reduce ──────────────────────────────────────────────────────────────
  describe("reduce()", () => {
    for (const cb of nonFunctions) {
      test(`throws TypeError when callback is ${JSON.stringify(cb)}`, () => {
        expect(() => range.reduce(cb as unknown as () => number, 0)).toThrow(TypeError);
        expect(() => range.reduce(cb as unknown as () => number, 0)).toThrow(errorMsg);
      });
    }
  });

  // ── some ────────────────────────────────────────────────────────────────
  describe("some()", () => {
    for (const cb of nonFunctions) {
      test(`throws TypeError when callback is ${JSON.stringify(cb)}`, () => {
        expect(() => range.some(cb as unknown as () => boolean)).toThrow(TypeError);
        expect(() => range.some(cb as unknown as () => boolean)).toThrow(errorMsg);
      });
    }
  });

  // ── every ───────────────────────────────────────────────────────────────
  describe("every()", () => {
    for (const cb of nonFunctions) {
      test(`throws TypeError when callback is ${JSON.stringify(cb)}`, () => {
        expect(() => range.every(cb as unknown as () => boolean)).toThrow(TypeError);
        expect(() => range.every(cb as unknown as () => boolean)).toThrow(errorMsg);
      });
    }
  });

  // ── find ────────────────────────────────────────────────────────────────
  describe("find()", () => {
    for (const cb of nonFunctions) {
      test(`throws TypeError when callback is ${JSON.stringify(cb)}`, () => {
        expect(() => range.find(cb as unknown as () => boolean)).toThrow(TypeError);
        expect(() => range.find(cb as unknown as () => boolean)).toThrow(errorMsg);
      });
    }
  });

  // ── findIndex ───────────────────────────────────────────────────────────
  describe("findIndex()", () => {
    for (const cb of nonFunctions) {
      test(`throws TypeError when callback is ${JSON.stringify(cb)}`, () => {
        expect(() => range.findIndex(cb as unknown as () => boolean)).toThrow(TypeError);
        expect(() => range.findIndex(cb as unknown as () => boolean)).toThrow(errorMsg);
      });
    }
  });

  // ── findLastIndex ───────────────────────────────────────────────────────
  describe("findLastIndex()", () => {
    for (const cb of nonFunctions) {
      test(`throws TypeError when callback is ${JSON.stringify(cb)}`, () => {
        expect(() => range.findLastIndex(cb as unknown as () => boolean)).toThrow(TypeError);
        expect(() => range.findLastIndex(cb as unknown as () => boolean)).toThrow(errorMsg);
      });
    }
  });

  // ── forEach ─────────────────────────────────────────────────────────────
  describe("forEach()", () => {
    for (const cb of nonFunctions) {
      test(`throws TypeError when callback is ${JSON.stringify(cb)}`, () => {
        expect(() => range.forEach(cb as unknown as () => void)).toThrow(TypeError);
        expect(() => range.forEach(cb as unknown as () => void)).toThrow(errorMsg);
      });
    }
  });

  // ── Error is thrown BEFORE iteration begins ─────────────────────────────
  test("map throws before any iteration occurs", () => {
    const empty = new PyRange(0); // empty range
    // Even on an empty range, passing a non-function should throw
    expect(() => empty.map(null as unknown as () => number)).toThrow(TypeError);
  });

  test("filter throws before any iteration occurs", () => {
    const empty = new PyRange(0);
    expect(() => empty.filter(null as unknown as () => boolean)).toThrow(TypeError);
  });

  test("forEach throws before any iteration occurs", () => {
    const empty = new PyRange(0);
    expect(() => empty.forEach(null as unknown as () => void)).toThrow(TypeError);
  });
});

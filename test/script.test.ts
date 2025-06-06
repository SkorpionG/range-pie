import { describe, test, expect, beforeEach } from "@jest/globals";
import { PyRange } from "range-pie";

describe("PyRange", () => {
  // 建構函式測試
  describe("constructor", () => {
    test("建構函式參數驗證", () => {
      expect(() => new PyRange("1" as any)).toThrow(TypeError);
      expect(() => new PyRange(1.5)).toThrow(TypeError);
      expect(() => new PyRange(1, 5, 0)).toThrow("Step cannot be zero");
      expect(() => new PyRange()).toThrow("Invalid arguments count");
      expect(() => new PyRange(1, 2, 3, 4)).toThrow("Invalid arguments count");
    });

    test("負步進值處理", () => {
      const range = new PyRange(5, 1, -1);
      expect(range.length).toBe(4);
      expect(range.step).toBe(-1);
      expect([...range]).toEqual([5, 4, 3, 2]);
    });
  });

  // 屬性存取測試
  describe("properties", () => {
    const range = new PyRange(1, 10, 2);

    test("基本屬性", () => {
      expect(range.start).toBe(1);
      expect(range.stop).toBe(10);
      expect(range.step).toBe(2);
      expect(range.length).toBe(5);
    });
  });

  // 方法測試
  describe("methods", () => {
    let range: PyRange;

    beforeEach(() => {
      range = new PyRange(1, 6);
    });

    test("at() 方法", () => {
      expect(range.at(0)).toBe(1);
      expect(range.at(4)).toBe(5);
      expect(() => range.at(5)).toThrow("Index out of range");
      expect(() => range.at(-1)).toThrow("Index out of range");
    });

    test("toString() 方法", () => {
      expect(range.toString()).toBe("PyRange(1, 6, 1)");
    });

    test("toArray() 方法", () => {
      expect(range.toArray()).toEqual([1, 2, 3, 4, 5]);
    });

    test("map() 方法", () => {
      expect(range.map((x) => x * 2)).toEqual([2, 4, 6, 8, 10]);
    });

    test("filter() 方法", () => {
      expect(range.filter((x) => x % 2 === 0)).toEqual([2, 4]);
    });

    test("reduce() 方法", () => {
      expect(range.reduce((acc, curr) => acc + curr, 0)).toBe(15);
    });

    test("some() 方法", () => {
      expect(range.some((x) => x > 3)).toBe(true);
      expect(range.some((x) => x > 5)).toBe(false);
    });

    test("every() 方法", () => {
      expect(range.every((x) => x > 0)).toBe(true);
      expect(range.every((x) => x > 3)).toBe(false);
    });

    test("find() 方法", () => {
      expect(range.find((x) => x > 3)).toBe(4);
      expect(range.find((x) => x > 5)).toBeUndefined();
    });

    test("findIndex() 方法", () => {
      expect(range.findIndex((x) => x > 3)).toBe(3);
      expect(range.findIndex((x) => x > 5)).toBe(-1);
    });

    test("includes() 方法", () => {
      expect(range.includes(3)).toBe(true);
      expect(range.includes(6)).toBe(false);
    });

    test("indexOf() 和 lastIndexOf() 方法", () => {
      expect(range.indexOf(3)).toBe(2);
      expect(range.indexOf(6)).toBe(-1);
      expect(range.lastIndexOf(3)).toBe(2);
    });

    test("pop() 方法", () => {
      const rangePop = new PyRange(1, 5); // [1,2,3,4]
      expect(rangePop.pop()).toBe(4);
      expect([...rangePop]).toEqual([1, 2, 3]);

      const rangeNeg = new PyRange(5, 1, -1); // [5,4,3,2]
      expect(rangeNeg.pop()).toBe(2);
      expect([...rangeNeg]).toEqual([5, 4, 3]);

      // Test popping from an empty range
      const emptyRange = new PyRange(0); // Or new PyRange(5, 5) or similar
      expect(emptyRange.pop()).toBeUndefined();
      expect(emptyRange.length).toBe(0);
      expect([...emptyRange]).toEqual([]);

      // Test popping until empty
      const singleElementRange = new PyRange(1, 2); // Represents [1]
      expect(singleElementRange.pop()).toBe(1);
      expect(singleElementRange.length).toBe(0);
      expect([...singleElementRange]).toEqual([]);
      expect(singleElementRange.pop()).toBeUndefined(); // Pop again from now empty range
      expect(singleElementRange.length).toBe(0);
    });

    test("slice() 方法", () => {
      const range = new PyRange(0, 10); // [0,1,2,3,4,5,6,7,8,9]
      const sliced = range.slice(2, 5);
      expect([...sliced]).toEqual([2, 3, 4]);
      expect(sliced.start).toBe(2);
      expect(sliced.stop).toBe(5);
      expect(sliced.length).toBe(3);

      expect([...range]).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
      expect(range.start).toBe(0);
      expect(range.stop).toBe(10);
      expect(range.length).toBe(10);

      // Negative indices
      const neg = new PyRange(0, 10);
      const negSliced = neg.slice(-3, -1);
      expect([...negSliced]).toEqual([7, 8]);
      expect([...neg]).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

      // Stop index > start index
      const empty = new PyRange(0, 5);
      const emptySliced = empty.slice(4, 2);
      expect(emptySliced.length).toBe(0);
      expect([...emptySliced]).toEqual([]);
      expect([...empty]).toEqual([0, 1, 2, 3, 4]);

      // Start index out of bounds
      const out = new PyRange(0, 5);
      const outSliced = out.slice(10);
      expect(outSliced.length).toBe(0);
      expect(out.length).toBe(5);

      // End index out of bounds
      const outEnd = new PyRange(0, 5);
      const outEndSliced = outEnd.slice(0, 10);
      expect(outEndSliced.length).toBe(5);
      expect(outEnd.length).toBe(5);

      // Start and stop out of bounds
      const outOfBounds = new PyRange(0, 5);
      const outOfBoundsSliced = outOfBounds.slice(10, 20);
      expect(outOfBoundsSliced.length).toBe(0);

      expect(() => new PyRange(5).slice(null as any)).toThrow(TypeError);
      expect(() => new PyRange(5).slice(0, 1.5)).toThrow(TypeError);
    });
  });

  // 迭代器測試
  describe("iterator", () => {
    test("for...of 迴圈", () => {
      const range = new PyRange(1, 4);
      const result: number[] = [];
      for (const num of range) {
        result.push(num);
      }
      expect(result).toEqual([1, 2, 3]);
    });

    test("展開運算子", () => {
      const range = new PyRange(1, 4);
      expect([...range]).toEqual([1, 2, 3]);
    });
  });

  // Proxy 測試
  describe("asProxy", () => {
    test("透過索引存取", () => {
      const range = new PyRange(1, 4).asProxy();
      expect(range[0]).toBe(1);
      expect(range[1]).toBe(2);
      expect(range[2]).toBe(3);
    });
  });
});

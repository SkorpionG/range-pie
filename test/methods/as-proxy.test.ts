import { describe, test, expect } from "@jest/globals";
import { PyRange } from "range-pie";

describe("PyRange asProxy() method", () => {
  // ── Basic numeric access ────────────────────────────────────────────────
  test("accesses elements by positive integer index", () => {
    const proxy = new PyRange(1, 4).asProxy(); // [1,2,3]
    expect(proxy[0]).toBe(1);
    expect(proxy[1]).toBe(2);
    expect(proxy[2]).toBe(3);
  });

  test("accesses elements on descending range by index", () => {
    const proxy = new PyRange(5, 0, -1).asProxy(); // [5,4,3,2,1]
    expect(proxy[0]).toBe(5);
    expect(proxy[4]).toBe(1);
  });

  test("accesses elements on stepped range by index", () => {
    const proxy = new PyRange(0, 10, 2).asProxy(); // [0,2,4,6,8]
    expect(proxy[0]).toBe(0);
    expect(proxy[2]).toBe(4);
    expect(proxy[4]).toBe(8);
  });

  test("only treats canonical array-index property names as indices", () => {
    const proxy = new PyRange(10, 20, 2).asProxy(); // [10,12,14,16,18]

    expect(Reflect.get(proxy, "1")).toBe(12);
    expect(Reflect.get(proxy, "1.0")).toBeUndefined();
    expect(Reflect.get(proxy, "01")).toBeUndefined();
    expect(Reflect.get(proxy, "1e0")).toBeUndefined();
    expect(Reflect.get(proxy, "-0")).toBeUndefined();
    expect(Reflect.get(proxy, "-1")).toBeUndefined();
  });

  // ── Out-of-bounds numeric access ───────────────────────────────────────
  test("returns undefined for out-of-bounds positive index", () => {
    const proxy = new PyRange(1, 4).asProxy(); // [1,2,3], length=3
    expect(proxy[3]).toBeUndefined();
    expect(proxy[100]).toBeUndefined();
  });

  test("returns undefined for out-of-bounds on empty range", () => {
    const proxy = new PyRange(0).asProxy(); // []
    expect(proxy[0]).toBeUndefined();
  });

  // ── Non-numeric string property access ─────────────────────────────────
  test("forwards named properties to the PyRange instance", () => {
    const proxy = new PyRange(1, 4).asProxy(); // [1,2,3]
    expect(proxy.length).toBe(3);
    expect(proxy.start).toBe(1);
    expect(proxy.stop).toBe(4);
    expect(proxy.step).toBe(1);
  });

  test("forwards methods to the PyRange instance", () => {
    const proxy = new PyRange(1, 4).asProxy(); // [1,2,3]
    expect(typeof proxy.map).toBe("function");
    expect(proxy.toArray()).toEqual([1, 2, 3]);
    expect([...proxy]).toEqual([1, 2, 3]);
  });

  // ── Symbol property access ──────────────────────────────────────────────
  test("forwards Symbol.iterator through proxy", () => {
    const proxy = new PyRange(1, 4).asProxy();
    const values: number[] = [];
    for (const v of proxy) {
      values.push(v);
    }
    expect(values).toEqual([1, 2, 3]);
  });

  test("spread works on proxy", () => {
    const proxy = new PyRange(1, 4).asProxy();
    expect([...proxy]).toEqual([1, 2, 3]);
  });

  // ── Returns a different instance ────────────────────────────────────────
  test("asProxy returns a proxy object, not the original range", () => {
    const range = new PyRange(1, 4);
    const proxy = range.asProxy();
    expect(proxy).not.toBe(range);
  });

  // ── Proxy on various range types ────────────────────────────────────────
  test("proxy works on single-element range", () => {
    const proxy = new PyRange(42, 43).asProxy(); // [42]
    expect(proxy[0]).toBe(42);
    expect(proxy[1]).toBeUndefined();
  });

  test("proxy works on negative-value range", () => {
    const proxy = new PyRange(-3, 0).asProxy(); // [-3,-2,-1]
    expect(proxy[0]).toBe(-3);
    expect(proxy[2]).toBe(-1);
    expect(proxy[3]).toBeUndefined(); // OOB
  });

  // ── Proxy index matches at() ────────────────────────────────────────────
  test("proxy numeric access is consistent with at()", () => {
    const range = new PyRange(10, 20, 2); // [10,12,14,16,18]
    const proxy = range.asProxy();
    for (let i = 0; i < range.length; i++) {
      expect(proxy[i]).toBe(range.at(i));
    }
  });
});

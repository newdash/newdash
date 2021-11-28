import { cacheIt } from "../src/cacheIt";

describe("cacheIt", () => {

  it("should support cache function", () => {

    let idx = 0;
    const f = cacheIt((value: number) => (++idx) + value);

    expect(f(0)).toBe(1);
    expect(f(0)).toBe(1);
    expect(f(1)).toBe(3);
    expect(f(1)).toBe(3);
    expect(f(0)).toBe(1);
    expect(f(0)).toBe(1);

  });

  it("should support operate with cache", () => {

    let idx = 0;
    const f = cacheIt((value: number) => (++idx) + value);

    expect(f(0)).toBe(1);
    expect(f(0)).toBe(1);
    f.__cache_clear(0); // clean cache
    expect(f(0)).toBe(2);
    expect(f(0)).toBe(2);
    f.__cache_clear(1);
    expect(f(0)).toBe(2);
    expect(f(0)).toBe(2);

  });

  it("should support create cache provider with parameter", () => {
    let idx = 0;

    // set max cache size
    const f = cacheIt((value: number) => (++idx) + value, { providerArgs: [2] });
    expect(f.__cache_storage["maxSize"]).toBe(2);

    expect(f(0)).toBe(1);
    expect(f(0)).toBe(1);
    expect(f(1)).toBe(3);
    expect(f(1)).toBe(3);
    expect(f(2)).toBe(5); // cache exceed, remove '0'
    expect(f(2)).toBe(5);
    expect(f(0)).toBe(4);
    expect(f(0)).toBe(4);

  });


  it("should support cache async function", async () => {
    let idx = 0;
    const f = cacheIt(async (value: number) => (++idx) + value);

    expect(await f(0)).toBe(1);
    expect(await f(0)).toBe(1);
    // param different, re-cache with parameters
    expect(await f(1)).toBe(3);
    expect(await f(1)).toBe(3);
  });

  it("should support cache object", () => {

    class A {
      constructor() { this.idx = 0; }
      private idx: number
      public add(value: number) {
        return (++this.idx) + value;
      }
    }
    const a = cacheIt(new A);
    expect(a.add(0)).toBe(1);
    expect(a.add(0)).toBe(1);

    expect(a.add(1)).toBe(3);
    expect(a.add(1)).toBe(3);

  });

  it("should support cache class", () => {

    class A {
      constructor(idx = 0) { this.idx = idx; }
      private idx: number
      public add(value: number) {
        return (++this.idx) + value;
      }
    }
    const CachedA = cacheIt(A);
    const a = new CachedA(1);
    expect(a.add(0)).toBe(2);
    expect(a.add(0)).toBe(2);

    expect(a.add(1)).toBe(4);
    expect(a.add(1)).toBe(4);

  });


  it("should support cache object with async methods", async () => {

    class A {
      constructor() { this.idx = 0; }
      private idx: number
      public async add(value: number) {
        return (++this.idx) + value;
      }
    }
    const a = cacheIt(new A);
    expect(await a.add(0)).toBe(1);
    expect(await a.add(0)).toBe(1);
    expect(a.add(0)).not.toBeInstanceOf(Promise);

    expect(await a.add(1)).toBe(3);
    expect(await a.add(1)).toBe(3);

    expect(a.add(3)).toBeInstanceOf(Promise);


  });

  it("should support cache fibonacci", () => {
    let callNumber = 0;
    const f = cacheIt((n: number = 0): number => {
      callNumber++;
      return n > 1 ? f(n - 1) + f(n - 2) : n;
    });
    expect(f.__cache_storage.size).toBe(0);
    expect(callNumber).toBe(0);
    expect(f(0)).toBe(0);
    expect(f.__cache_storage.size).toBe(1);
    expect(callNumber).toBe(1);
    expect(f(1)).toBe(1);
    expect(f.__cache_storage.size).toBe(2);
    expect(callNumber).toBe(2);
    expect(f(5)).toBe(5);
    expect(f.__cache_storage.size).toBe(6);
    expect(callNumber).toBe(6);
    expect(f(6)).toBe(8);
    expect(f.__cache_storage.size).toBe(7);
    expect(callNumber).toBe(7);

    expect(f(4)).toBe(3);
    expect(f.__cache_storage.size).toBe(7);
    expect(callNumber).toBe(7);

  });

});

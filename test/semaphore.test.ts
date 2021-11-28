import { Mutex, range, sleep } from "../src";
import { MutexMap } from "../src/functional/MutexMap";
import { Semaphore } from "../src/functional/Semaphore";
import { SemaphoreMap } from "../src/functional/SemaphoreMap";


describe("Semaphore", () => {

  it("should execute semaphore correctly", async () => {

    let count = 0;
    const sem = new Semaphore(5);
    const f = () => new Promise(async (resolve) => {
      count++;
      await sleep(50);
      resolve(undefined);
    });
    await Promise.all(range(0, 10).map(() => sem.use(f)));
    expect(count).toBe(10);

  });

  it("should execute semaphore correctly with exception", async () => {
    let count = 0;
    const sem = new Semaphore(5);
    const f = () => new Promise(async (resolve, reject) => {
      count++;
      await sleep(50);
      reject(new Error);
    });
    try {
      await Promise.all(range(0, 10).map(() => sem.use(f).catch((error) => { })));
    } catch (error) {

    }
    expect(count).toBe(10);
  });

  it("should execute SemaphoreMap correctly with exception", async () => {
    let count = 0;
    const f = SemaphoreMap.wrap(5, 5, () => new Promise(async (resolve, reject) => {
      count++;
      await sleep(50);
      reject(new Error);
    }));
    try {
      await Promise.all(range(0, 10).map(() => f().catch((error) => { })));
    } catch (error) {

    }
    expect(count).toBe(10);
  });

  it("should support mutex", async () => {

    const m = new Mutex();
    const rs = {};
    const ac = async (k) => {
      rs[k] = await m.acquire();
    };

    const p1 = ac("1").then(() => {
      expect(rs["2"]).toBeUndefined();
      setTimeout(() => {
        rs["1"]();
      }, 100);
    });
    const p2 = ac("2").then(() => {
      expect(rs["1"]).not.toBeUndefined();
      rs["2"]();
    });

    await Promise.all([p1, p2]);

    // @ts-ignore
    expect(m.tasks).toHaveLength(0);
    // @ts-ignore
    expect(m.count).toBe(1);


  });

  it("should support MutexMap", async () => {
    const mm = new MutexMap();
    const values = [];

    await Promise.all([
      mm.execute("v1", async () => {
        await sleep(300);
        values.push("1");
      }),
      mm.execute("v1", async () => {
        await sleep(100);
        values.push("2");
      })
    ]);

    expect(values).toStrictEqual(["1", "2"]);


  });

  it("should support timeout", async () => {

    const m = new Mutex();
    const r1 = await m.acquire(500);
    await expect(() => m.acquire(100)).rejects.toThrow("timeout");
    // @ts-ignore
    expect(m.tasks.length).toBe(1);
    r1();
    // @ts-ignore
    expect(m.tasks.length).toBe(0);
    const r2 = await m.acquire(500);
    r2();
    // @ts-ignore
    expect(m.count).toBe(1);


  });

});

import { range, sleep } from '../src';
import { Semaphore } from '../src/functional/Semaphore';
import { SemaphoreMap } from '../src/functional/SemaphoreMap';


describe('Semaphore', () => {

  it('should execute semaphore correctly', async () => {

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

  it('should execute semaphore correctly with exception', async () => {
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

  it('should execute SemaphoreMap correctly with exception', async () => {
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


});

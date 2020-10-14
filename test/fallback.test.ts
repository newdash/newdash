import { sleep } from '../src';
import { fallback } from '../src/fallback';
import { TemporaryUnAvailableError } from '../src/fallback/circuit';

describe('fallback', () => {

  it('should support fallback.cache', async () => {

    let idx = 0;
    const runner = fallback.cache(async (param) => {
      idx++;
      if (idx > 1) { throw new TypeError(); }
      return idx;
    });

    expect(await runner('p1')).toBe(1);
    expect(await runner('p1')).toBe(1); // get value from cache
    expect(idx).toBe(2);

    // param with 'p2' is not have cache
    await expect(runner('p2')).rejects.toThrow(TypeError);

  });

  it('should support fallback.retry', async () => {

    let idx = 0;
    const runner = fallback.retry(async () => {
      idx++;
      if (idx < 5) { throw new TypeError(); }
      return idx;
    }, 10);

    expect(await runner()).toBe(5);

  });

  it('should support fallback.circuit', async () => {
    const openDuration = 300;
    let idx = 0;
    const runner = fallback.circuit(async (value?: any) => {
      idx++;
      if (idx <= 1) {
        throw new TypeError();
      }
      return idx;
    }, openDuration);

    await expect(runner()).rejects.toThrow(TypeError);
    // circuit breaker is open
    await expect(runner()).rejects.toThrow(TemporaryUnAvailableError);
    await expect(runner()).rejects.toThrow(TemporaryUnAvailableError);
    try {
      await runner();
    } catch (error) {
      expect(error.causeError).toBeInstanceOf(TypeError);
    }
    // but for different parameter, the circuit breaker is standalone
    expect(await runner(1)).toBe(2);

    await sleep(openDuration);
    expect(await runner()).toBe(3);

  });

});

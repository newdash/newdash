import { fallback } from '../src/fallback';

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

});

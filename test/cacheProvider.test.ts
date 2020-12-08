import { platform } from 'os';
import { sleep } from '../src';
import { TTLCacheProvider } from '../src/cacheProvider';

let describe2 = describe;
if (platform() !== 'linux') {
  // setTimeout is Unstable on MacOS/Windows,
  // maybe caused by resource schedule,
  // so skip these tests
  describe2 = describe.skip;
}

describe2('cacheProviders', () => {

  it('should support TTL CacheProvider', async () => {

    const ttlCache = new TTLCacheProvider(500, 1000);
    ttlCache.set('v', 1);
    expect(ttlCache.has('v')).toBeTruthy();
    await sleep(510);
    expect(ttlCache.has('v')).toBeFalsy();
    expect(ttlCache.set('v2', '123'));
    await sleep(100);
    expect(ttlCache.has('v2')).toBeTruthy();
    await sleep(410);
    expect(ttlCache.has('v2')).toBeFalsy();
    ttlCache.clear();
    expect(ttlCache['timer']).toBeUndefined();
    expect(ttlCache.size).toBe(0);


  });

  it('should process cache corret on error', async () => {
    const ttlCache = new TTLCacheProvider(500, 1000);

    await expect(() => ttlCache.getOrCreate('v1', async () => { throw new Error('e1'); })).rejects.toThrowError('e1');

    expect(ttlCache.has('v1')).toBe(false);

    await ttlCache.getOrCreate('v1', async () => 'f1');
    expect(ttlCache.get('v1')).toBe('f1');

    ttlCache.clear();

  });

});

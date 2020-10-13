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

describe2('CacheProviders', () => {

  it('should support TTL CacheProvider', async () => {

    const ttlCache = new TTLCacheProvider(500, 2000);
    ttlCache.set('v', 1);
    expect(ttlCache.has('v')).toBeTruthy();
    await sleep(500);
    expect(ttlCache.has('v')).toBeFalsy();
    expect(ttlCache.set('v2', '123'));
    await sleep(100);
    expect(ttlCache.has('v2')).toBeTruthy();
    await sleep(400);
    expect(ttlCache.has('v2')).toBeFalsy();
    ttlCache.clear();
    expect(ttlCache['timer']).toBeUndefined();
    expect(ttlCache.size).toBe(0);


  });

});

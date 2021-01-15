import { sleep } from '../src';
import { LRUCacheProvider, TTLCacheProvider } from '../src/cacheProvider';

let describe2 = describe;

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

  it('should support TTL CacheProvider (new)', async () => {

    const ttlCache = new TTLCacheProvider({ params: { ttl: 500, checkInterval: 1000 } });

    ttlCache.set('v', 1);
    expect(ttlCache.has('v')).toBeTruthy();
    expect(Array.from(ttlCache.keys())).toEqual(['v']);
    expect(Array.from(ttlCache.values())).toEqual([1]);
    expect(Array.from(ttlCache.entries())).toEqual([['v', 1]]);

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

    ttlCache.clear();

  });

  it('should process cache correct on error', async () => {
    const ttlCache = new TTLCacheProvider(500, 1000);

    await expect(() => ttlCache.getOrCreate('v1', async () => { throw new Error('e1'); })).rejects.toThrowError('e1');

    expect(ttlCache.has('v1')).toBe(false);

    await ttlCache.getOrCreate('v1', async () => 'f1');
    expect(ttlCache.get('v1')).toBe('f1');

    ttlCache.clear();

  });

  it('should support cache policy', async () => {

    const cache = new LRUCacheProvider();
    let count = 0;
    const runner2 = async () => { count++; return null; };
    const runner3 = async () => { count++; return undefined; };
    const runner4 = async () => { count++; throw new Error(); };


    await cache.getOrCreate('f2', runner2);
    await cache.getOrCreate('f2', runner2);
    expect(count).toBe(2);
    expect(cache.size).toBe(0);

    await cache.getOrCreate('f3', runner3);
    await cache.getOrCreate('f3', runner3);
    expect(count).toBe(4);
    expect(cache.size).toBe(0);

    await expect(async () => cache.getOrCreate('f4', runner4)).rejects.toThrow();
    await expect(async () => cache.getOrCreate('f4', runner4)).rejects.toThrow();
    expect(count).toBe(6);
    expect(cache.size).toBe(0);

    cache.clear();
    count = 0;

    const cache2 = new LRUCacheProvider({ policy: { cacheNull: true, cacheUndefined: true, cacheThrow: true } });

    await cache2.getOrCreate('f2', runner2);
    expect(await cache2.getOrCreate('f2', runner2)).toBeNull();
    expect(count).toBe(1);
    expect(cache2.size).toBe(1);

    await cache2.getOrCreate('f3', runner3);
    expect(await cache2.getOrCreate('f3', runner3)).toBeUndefined();
    expect(count).toBe(2);
    expect(cache2.size).toBe(2);

    await expect(async () => cache2.getOrCreate('f4', runner4)).rejects.toThrow();
    await expect(async () => cache2.getOrCreate('f4', runner4)).rejects.toThrow();
    expect(count).toBe(3);
    expect(cache2.size).toBe(3);

    cache2.clear();


  });

});

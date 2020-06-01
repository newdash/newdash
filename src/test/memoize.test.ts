import assert from 'assert';
import identity from '../.internal/identity';
import find from "../find";
import isFunction from '../isFunction';
import map from "../map";
import memoize from '../memoize';
import some from "../some";
import times from "../times";
import { stubTrue } from "./stubs";
import { noop } from './utils';


describe('memoize', () => {

  class CustomCache {

    constructor() { }

    protected __data__: any[] = []

    // mock
    delete(...args): boolean {
      return true
    }

    // mock
    forEach(...args) {

    }

    clear() {
      this.__data__ = []
      return this
    }

    get(key) {
      // @ts-ignore
      const entry = find(this.__data__, ['key', key])
      return entry && entry.value
    }

    has(key) {
      return some(this.__data__, ['key', key])
    }

    set(key, value) {
      this.__data__.push({ 'key': key, 'value': value })
      return this
    }

  }

  class ImmutableCache extends CustomCache {
    constructor() {
      super()
      this.__data__ = []
    }
    // @ts-ignore
    clear() {
      return new ImmutableCache
    }
    // @ts-ignore
    set(key, value) {
      const result = new ImmutableCache
      result.__data__ = this.__data__.concat({ 'key': key, 'value': value })
      return result
    }
  }

  it('should memoize results based on the first argument given', () => {
    const memoized = memoize((a: number, b: number, c: number): number => a + b + c)
    assert.strictEqual(memoized(1, 2, 3), 6)
    assert.strictEqual(memoized(1, 3, 5), 6)
  })

  it('should support a `resolver`', () => {
    const fn = function (a, b, c) { return a + b + c },
      memoized = memoize(fn, fn)

    assert.strictEqual(memoized(1, 2, 3), 6)
    assert.strictEqual(memoized(1, 3, 5), 9)
  })

  it('should use `this` binding of function for `resolver`', () => {
    const fn = function (a, b, c) { return a + this.b + this.c },
      memoized = memoize(fn, fn)

    const object = { 'memoized': memoized, 'b': 2, 'c': 3 }
    // @ts-ignore
    assert.strictEqual(object.memoized(1), 6)

    object.b = 3
    object.c = 5
    // @ts-ignore
    assert.strictEqual(object.memoized(1), 9)
  })

  it('should throw a TypeError if `resolve` is truthy and not a function', () => {
    // @ts-ignore
    assert.throws(() => { memoize(noop, true) }, TypeError)
  })

  it('should not error if `resolver` is nullish', () => {
    const values = [, null, undefined],
      expected = map(values, stubTrue)

    const actual = map(values, (resolver, index) => {
      try {
        return isFunction(index ? memoize(noop, resolver) : memoize(noop))
      } catch (e) { }
    })

    assert.deepStrictEqual(actual, expected)
  })

  it('should check cache for own properties', () => {
    const props = [
      'constructor',
      'hasOwnProperty',
      'isPrototypeOf',
      'propertyIsEnumerable',
      'toLocaleString',
      'toString',
      'valueOf'
    ]

    const memoized = memoize(identity)

    const actual = map(props, (value) => memoized(value))

    assert.deepStrictEqual(actual, props)
  })

  it('should cache the `__proto__` key', () => {
    const array = [],
      key = '__proto__'

    times(2, (index) => {
      let count = 0,
        resolver = index ? identity : undefined

      const memoized = memoize((param) => {
        count++
        return array
      }, resolver)

      const cache = memoized.cache

      memoized(key)
      memoized(key)

      assert.strictEqual(count, 1)
      assert.strictEqual(cache.get(key), array)
      // @ts-ignore
      assert.ok(!(cache.__data__ instanceof Array))
      assert.strictEqual(cache.delete(key), true)
    })
  })

  it('should allow `_.memoize.Cache` to be customized', () => {
    const oldCache = memoize.Cache
    memoize.Cache = CustomCache

    const memoized = memoize((object) => object.id)

    const cache = memoized.cache,
      key1 = { 'id': 'a' },
      key2 = { 'id': 'b' }

    assert.strictEqual(memoized(key1), 'a')
    assert.strictEqual(cache.has(key1), true)

    assert.strictEqual(memoized(key2), 'b')
    assert.strictEqual(cache.has(key2), true)

    memoize.Cache = oldCache
  })

  it('should works with an immutable `_.memoize.Cache` ', () => {
    const oldCache = memoize.Cache
    // @ts-ignore
    memoize.Cache = ImmutableCache

    const memoized = memoize((object) => object.id)

    const key1 = { 'id': 'a' },
      key2 = { 'id': 'b' }

    memoized(key1)
    memoized(key2)

    const cache = memoized.cache
    assert.strictEqual(cache.has(key1), true)
    assert.strictEqual(cache.has(key2), true)

    memoize.Cache = oldCache
  })
})

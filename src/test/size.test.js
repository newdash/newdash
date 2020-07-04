import assert from 'assert'
import { falsey, stubZero, args, push, arrayProto, MAX_SAFE_INTEGER } from './utils'
import size from '../size'
import map from '../map'
import each from '../each'

describe('size', () => {

  const array = [1, 2, 3]

  it('should return the number of own enumerable string keyed properties of an object', () => {
    assert.strictEqual(size({ 'one': 1, 'two': 2, 'three': 3 }), 3)
  })

  it('should return the length of an array', () => {
    assert.strictEqual(size(array), 3)
  })

  it('should accept a falsey `object`', () => {
    const expected = map(falsey, stubZero)

    const actual = map(falsey, (object, index) => {
      try {
        return index ? size(object) : size()
      } catch (e) { }
    })

    assert.deepStrictEqual(actual, expected)
  })

  it('should work with `arguments` objects', () => {
    assert.strictEqual(size(args), 3)
  })

  it('should work with jQuery/MooTools DOM query collections', () => {
    function Foo(elements) {
      push.apply(this, elements)
    }
    Foo.prototype = { 'length': 0, 'splice': arrayProto.splice }

    assert.strictEqual(size(new Foo(array)), 3)
  })

  it('should work with maps', () => {
    if (Map) {
      each([new Map], (map) => {
        map.set('a', 1)
        map.set('b', 2)
        assert.strictEqual(size(map), 2)
        map.clear()
      })
    }
  })

  it('should work with sets', () => {
    if (Set) {
      each([new Set], (set) => {
        set.add(1)
        set.add(2)
        assert.strictEqual(size(set), 2)
        set.clear()
      })
    }
  })

  it('should not treat objects with negative lengths as array-like', () => {
    assert.strictEqual(size({ 'length': -1 }), 1)
  })

  it('should not treat objects with lengths larger than `MAX_SAFE_INTEGER` as array-like', () => {
    assert.strictEqual(size({ 'length': MAX_SAFE_INTEGER + 1 }), 1)
  })

  it('should not treat objects with non-number lengths as array-like', () => {
    assert.strictEqual(size({ 'length': '0' }), 1)
  })

  it('should return zero for weak map/set', () => {
    const wm = new WeakMap()
    const ws = new WeakSet()
    wm.set({}, 1)
    ws.add({})
    assert.strictEqual(size(wm), 0)
    assert.strictEqual(size(ws), 0)
  });

  it('should support Typed Array', () => {

    if (typeof Uint8Array == "function") {
      const len = 100
      const a = new Uint8Array(len)
      assert.strictEqual(size(a), len)
    }

  });

})

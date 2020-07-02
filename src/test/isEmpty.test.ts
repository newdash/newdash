import assert from 'assert'

import { empties, stubTrue, slice, symbol, args, push, arrayProto, realm, MAX_SAFE_INTEGER } from './utils'

import map from "../map";
import isEmpty from '../isEmpty'
import each from "../each";


describe('isEmpty', () => {
  it('should return `true` for empty values', () => {
    const expected = map(empties, stubTrue),
      actual = map(empties, isEmpty)

    assert.deepStrictEqual(actual, expected)

    assert.strictEqual(isEmpty(true), true)
    assert.strictEqual(isEmpty(slice), true)
    assert.strictEqual(isEmpty(1), true)
    assert.strictEqual(isEmpty(NaN), true)
    assert.strictEqual(isEmpty(/x/), true)
    assert.strictEqual(isEmpty(symbol), true)
    assert.strictEqual(isEmpty(), true)

    if (typeof Buffer == "object") {
      assert.strictEqual(isEmpty(Buffer.alloc(0)), true)
      assert.strictEqual(isEmpty(Buffer.alloc(1)), false)
    }
  })

  it('should return `false` for non-empty values', () => {
    assert.strictEqual(isEmpty([0]), false)
    assert.strictEqual(isEmpty({ 'a': 0 }), false)
    assert.strictEqual(isEmpty('a'), false)
  })

  it('should work with an object that has a `length` property', () => {
    assert.strictEqual(isEmpty({ 'length': 0 }), false)
  })

  it('should work with `arguments` objects', () => {
    assert.strictEqual(isEmpty(args), false)
  })

  it('should work with prototype objects', () => {
    function Foo() { }
    Foo.prototype = { 'constructor': Foo }

    assert.strictEqual(isEmpty(Foo.prototype), true)

    Foo.prototype.a = 1
    assert.strictEqual(isEmpty(Foo.prototype), false)
  })

  it('should work with jQuery/MooTools DOM query collections', () => {
    function Foo(elements) {
      push.apply(this, elements)
    }
    Foo.prototype = { 'length': 0, 'splice': arrayProto.splice }

    assert.strictEqual(isEmpty(new Foo([])), true)
  })

  it('should work with maps', () => {
    if (Map) {
      each([new Map], (map) => {
        assert.strictEqual(isEmpty(map), true)
        map.set('a', 1)
        assert.strictEqual(isEmpty(map), false)
        map.clear()
      })
    }
  })

  it('should work with sets', () => {
    if (Set) {
      each([new Set], (set) => {
        assert.strictEqual(isEmpty(set), true)
        set.add(1)
        assert.strictEqual(isEmpty(set), false)
        set.clear()
      })
    }
  })

  it('should not treat objects with negative lengths as array-like', () => {
    function Foo() { }
    Foo.prototype.length = -1

    assert.strictEqual(isEmpty(new Foo), true)
  })

  it('should not treat objects with lengths larger than `MAX_SAFE_INTEGER` as array-like', () => {
    function Foo() { }
    Foo.prototype.length = MAX_SAFE_INTEGER + 1

    assert.strictEqual(isEmpty(new Foo), true)
  })

  it('should not treat objects with non-number lengths as array-like', () => {
    assert.strictEqual(isEmpty({ 'length': '0' }), false)
  })


})

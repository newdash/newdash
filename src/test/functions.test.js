import assert from 'assert'
import { identity, noop } from './utils'
import functions from '../functions'

describe('functions', () => {
  it('should return the function names of an object', () => {
    const object = { 'a': 'a', 'b': identity, 'c': /x/, 'd': noop },
      actual = functions(object).sort()

    assert.deepStrictEqual(actual, ['b', 'd'])
  })

  it('should not include inherited functions', () => {
    function Foo() {
      this.a = identity
      this.b = 'b'
    }
    Foo.prototype.c = noop

    assert.deepStrictEqual(functions(new Foo), ['a'])
  })

  it('should return empty function when give nothing', () => {
    assert.deepStrictEqual(functions(null), [])
  });
})

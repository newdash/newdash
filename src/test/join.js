import assert from 'assert'
import join from '../join.js'

describe('join', () => {
  const array = ['a', 'b', 'c']

  it('should return join all array elements into a string', () => {
    assert.strictEqual(join(array, '~'), 'a~b~c')
  })

  it('should return an unwrapped value when implicitly chaining', () => {
    const wrapped = _(array)
    assert.strictEqual(wrapped.join('~'), 'a~b~c')
    assert.strictEqual(wrapped.value(), array)
  })

  it('should return a wrapped value when explicitly chaining', () => {
    assert.ok(_(array).chain().join('~') instanceof _)
  })
})

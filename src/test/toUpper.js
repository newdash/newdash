import assert from 'assert'
import toUpper from '../toUpper.js'

describe('toUpper', () => {
  it('should convert whole string to upper case', () => {
    assert.deepStrictEqual(toUpper('--Foo-Bar'), '--FOO-BAR')
    assert.deepStrictEqual(toUpper('fooBar'), 'FOOBAR')
    assert.deepStrictEqual(toUpper('__FOO_BAR__'), '__FOO_BAR__')
  })
})

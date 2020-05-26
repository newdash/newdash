import assert from 'assert'
import lodashStable from 'lodash'
import partialRight from '../partialRight.js'
import mergeWith from '../mergeWith.js'

describe('partialRight', () => {
  it('should work as a deep `_.defaults`', () => {
    const object = { 'a': { 'b': 2 } },
      source = { 'a': { 'b': 3, 'c': 3 } },
      expected = { 'a': { 'b': 2, 'c': 3 } }

    const defaultsDeep = partialRight(mergeWith, function deep(value, other) {
      return lodashStable.isObject(value) ? mergeWith(value, other, deep) : value
    })

    assert.deepStrictEqual(defaultsDeep(object, source), expected)
  })
})

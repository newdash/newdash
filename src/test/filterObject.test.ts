import assert from 'assert'
import filterObject from '../filterObject'

describe('filterObject', () => {

  const object = { 'a': 5, 'b': 8, 'c': 10 }
  const array = [5, 8, 10]

  it('should filter an object', () => {

    assert.deepStrictEqual(filterObject(object, v => v % 5 == 0), [5, 10])
    assert.deepStrictEqual(filterObject(object, v => v % 3 == 0), [])
    assert.deepStrictEqual(filterObject(object, (v, k) => k == "a"), [5])

  });

  it('should filter an array', () => {

    assert.deepStrictEqual(filterObject(array, v => v % 5 == 0), [5, 10])
    assert.deepStrictEqual(filterObject(array, v => v % 3 == 0), [])
    assert.deepStrictEqual(filterObject(array, (v, k) => k == '0'), [5])


  });

})

import assert from 'assert'
import each from '../each'
import forEach from '../forEach'

describe('forEach', () => {

  it('should be aliased', () => {
    assert.strictEqual(each, forEach)
  })

  it('should sum', () => {
    const arr = [1, 2, 3]
    let sum = 0

    forEach(arr, value => sum += value)
    assert.strictEqual(sum, 6)

  });

  it('should sum object', () => {
    const obj = { a: 1, b: 2, c: 3 }
    let sum = 0
    let label = ''

    forEach(obj, (value, key) => {
      sum += value
      label += key
    })

    assert.strictEqual(sum, 6)
    assert.strictEqual(label, 'abc')

  });

})

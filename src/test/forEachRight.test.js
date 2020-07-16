import assert from 'assert'
import { eachRight } from '../eachRight'
import { forEachRight } from '../forEachRight'

describe('forEachRight', () => {

  it('should be aliased', () => {
    assert.strictEqual(eachRight, forEachRight)
  })


  it('should sum', () => {
    const arr = [1, 2, 3]
    let sum = 0

    forEachRight(arr, value => sum += value)
    assert.strictEqual(sum, 6)

  });

  it('should sum object', () => {
    const obj = { a: 1, b: 2, c: 3 }
    let sum = 0
    let label = ''

    forEachRight(obj, (value, key) => {
      sum += value
      label += key
    })

    assert.strictEqual(sum, 6)
    assert.strictEqual(label, 'cba')

  })

})

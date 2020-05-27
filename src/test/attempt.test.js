import assert from 'assert'
import { errors, stubTrue, CustomError, realm } from './utils.js'
import constant from '../constant.js'
import attempt from '../attempt.js'
import map from '../map.js'
import isEqual from '../eqDeep.js'

describe('attempt', () => {
  it('should return the result of `func`', () => {
    assert.strictEqual(attempt(constant('x')), 'x')
  })

  it('should provide additional arguments to `func`', () => {
    const actual = attempt(function() { return Array.prototype.slice.call(arguments) }, 1, 2)
    assert.deepStrictEqual(actual, [1, 2])
  })

  it('should return the caught error', () => {
    const expected = map(errors, stubTrue)

    const actual = map(errors, (error) => attempt(() => { throw error }) === error)

    assert.deepStrictEqual(actual, expected)
  })

  it('should coerce errors to error objects', () => {
    const actual = attempt(() => { throw 'x' })
    assert.ok(isEqual(actual, Error('x')))
  })

  it('should preserve custom errors', () => {
    const actual = attempt(() => { throw new CustomError('x') })
    assert.ok(actual instanceof CustomError)
  })

  it('should work with an error object from another realm', () => {
    if (realm.errors) {
      const expected = map(realm.errors, stubTrue)

      const actual = map(realm.errors, (error) => attempt(() => { throw error }) === error)

      assert.deepStrictEqual(actual, expected)
    }
  })


})

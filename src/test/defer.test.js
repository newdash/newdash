import assert from 'assert'
import { slice } from './utils'
import defer from '../defer'
import { assertShouldThrowError } from "./helpers";

describe('defer', () => {

  it('should defer `func` execution', (done) => {
    let pass = false
    defer(() => { pass = true })

    setTimeout(() => {
      assert.ok(pass)
      done()
    }, 32)
  })

  it('should provide additional arguments to `func`', (done) => {
    let args

    defer(function () {
      args = slice.call(arguments)
    }, 1, 2)

    setTimeout(() => {
      assert.deepStrictEqual(args, [1, 2])
      done()
    }, 32)
  })

  it('should be cancelable', (done) => {
    let pass = true,
      timerId = defer(() => { pass = false })

    clearTimeout(timerId)

    setTimeout(() => {
      assert.ok(pass)
      done()
    }, 32)
  })

  it('should throw error when type error', async () => {

    await assertShouldThrowError(() => {
      defer(1)
    })

  });

})

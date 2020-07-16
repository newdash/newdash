import assert from 'assert'
import { _, noop, push, isModularize } from './utils'
import each from '../each'
import { platform } from "os";
import debounce from '../debounce'
import throttle from '../throttle'
import times from '../times'
import constant from '../constant'
import map from '../map'

let describe2 = describe
if (platform() == "darwin") {
  // setTimeout is Unstable on MacOS,
  // maybe caused by resource schedule,
  // so skip these tests
  describe2 = describe.skip
}

describe('debounce and throttle', () => {

  each([['debounce', debounce], ['throttle', throttle]], ([methodName, func]) => {
    const isDebounce = methodName == 'debounce'

    it(`\`_.${methodName}\` should not error for non-object \`options\` values`, () => {
      func(noop, 32, 1)
      assert.ok(true)
    })

    it(`\`_.${methodName}\` should use a default \`wait\` of \`0\``, (done) => {
      let callCount = 0,
        funced = func(() => { callCount++ })

      funced()

      setTimeout(() => {
        funced()
        assert.strictEqual(callCount, isDebounce ? 1 : 2)
        done()
      }, 32)
    })

    it(`\`_.${methodName}\` should invoke \`func\` with the correct \`this\` binding`, (done) => {
      const actual = [],
        object = { 'funced': func(function () { actual.push(this) }, 32) },
        expected = times(isDebounce ? 1 : 2, constant(object))

      object.funced()
      if (!isDebounce) {
        object.funced()
      }
      setTimeout(() => {
        assert.deepStrictEqual(actual, expected)
        done()
      }, 64)
    })

    it(`\`_.${methodName}\` supports recursive calls`, (done) => {
      const actual = [],
        args = map(['a', 'b', 'c'], (chr) => [{}, chr]),
        expected = args.slice(),
        queue = args.slice()

      var funced = func(function () {
        const current = [this]
        push.apply(current, arguments)
        actual.push(current)

        const next = queue.shift()
        if (next) {
          funced.call(next[0], next[1])
        }
      }, 32)

      const next = queue.shift()
      funced.call(next[0], next[1])
      assert.deepStrictEqual(actual, expected.slice(0, isDebounce ? 0 : 1))

      setTimeout(() => {
        assert.deepStrictEqual(actual, expected.slice(0, actual.length))
        done()
      }, 256)
    })


    it(`\`_.${methodName}\` should support cancelling delayed calls`, (done) => {
      let callCount = 0

      const funced = func(() => {
        callCount++
      }, 32, { 'leading': false })

      funced()
      funced.cancel()

      setTimeout(() => {
        assert.strictEqual(callCount, 0)
        done()
      }, 64)
    })

    it(`\`_.${methodName}\` should reset \`lastCalled\` after cancelling`, (done) => {
      let callCount = 0

      const funced = func(() => ++callCount, 32, { 'leading': true })

      assert.strictEqual(funced(), 1)
      funced.cancel()

      assert.strictEqual(funced(), 2)
      funced()

      setTimeout(() => {
        assert.strictEqual(callCount, 3)
        done()
      }, 64)
    })

    it(`\`_.${methodName}\` should support flushing delayed calls`, (done) => {
      let callCount = 0

      const funced = func(() => ++callCount, 32, { 'leading': false })

      funced()
      assert.strictEqual(funced.flush(), 1)

      setTimeout(() => {
        assert.strictEqual(callCount, 1)
        done()
      }, 64)
    })

    it(`\`_.${methodName}\` should noop \`cancel\` and \`flush\` when nothing is queued`, (done) => {
      let callCount = 0,
        funced = func(() => { callCount++ }, 32)

      funced.cancel()
      assert.strictEqual(funced.flush(), undefined)

      setTimeout(() => {
        assert.strictEqual(callCount, 0)
        done()
      }, 64)
    })
  })
})

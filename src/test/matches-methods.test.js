import assert from 'assert'
import { _, stubTrue, noop, numberProto, stubFalse, empties } from './utils'
import { isMatch } from '../isMatch'
import { matches } from "../matches";
import each from '../each';
import map from '../map';
import assign from '../assign';
import filter from '../filter';
import identity from '../.internal/identity';


describe('matches methods', () => {

  each([['matches', matches], ['isMatch', isMatch]], ([methodName, func]) => {

    const isMatches = methodName == 'matches'

    function testFunc(source) {
      return isMatches ? func(source) : function (object) {
        return func(object, source)
      }
    }

    it(`\`_.${methodName}\` should perform a deep comparison between \`source\` and \`object\``, () => {
      let object = { 'a': 1, 'b': 2, 'c': 3 },
        par = testFunc({ 'a': 1 })

      assert.strictEqual(par(object), true)

      par = testFunc({ 'b': 1 })
      assert.strictEqual(par(object), false)

      par = testFunc({ 'a': 1, 'c': 3 })
      assert.strictEqual(par(object), true)

      par = testFunc({ 'c': 3, 'd': 4 })
      assert.strictEqual(par(object), false)

      object = { 'a': { 'b': { 'c': 1, 'd': 2 }, 'e': 3 }, 'f': 4 }
      par = testFunc({ 'a': { 'b': { 'c': 1 } } })

      assert.strictEqual(par(object), true)
    })

    it(`\`_.${methodName}\` should match inherited string keyed \`object\` properties`, () => {
      function Foo() {
        this.a = 1
      }
      Foo.prototype.b = 2

      const object = { 'a': new Foo },
        par = testFunc({ 'a': { 'b': 2 } })

      assert.strictEqual(par(object), true)
    })

    it(`\`_.${methodName}\` should not match by inherited \`source\` properties`, () => {
      function Foo() {
        this.a = 1
      }
      Foo.prototype.b = 2

      const objects = [{ 'a': 1 }, { 'a': 1, 'b': 2 }],
        source = new Foo,
        actual = map(objects, testFunc(source)),
        expected = map(objects, stubTrue)

      assert.deepStrictEqual(actual, expected)
    })

    it(`\`_.${methodName}\` should compare a variety of \`source\` property values`, () => {
      const object1 = { 'a': false, 'b': true, 'c': '3', 'd': 4, 'e': [5], 'f': { 'g': 6 } },
        object2 = { 'a': 0, 'b': 1, 'c': 3, 'd': '4', 'e': ['5'], 'f': { 'g': '6' } },
        par = testFunc(object1)

      assert.strictEqual(par(object1), true)
      assert.strictEqual(par(object2), false)
    })

    it(`\`_.${methodName}\` should match \`-0\` as \`0\``, () => {
      let object1 = { 'a': -0 },
        object2 = { 'a': 0 },
        par = testFunc(object1)

      assert.strictEqual(par(object2), true)

      par = testFunc(object2)
      assert.strictEqual(par(object1), true)
    })

    it(`\`_.${methodName}\` should compare functions by reference`, () => {
      const object1 = { 'a': noop },
        object2 = { 'a': identity }, // another function
        object3 = { 'a': {} },
        par = testFunc(object1)

      assert.strictEqual(par(object1), true)
      assert.strictEqual(par(object2), false)
      assert.strictEqual(par(object3), false)
    })

    it(`\`_.${methodName}\` should work with a function for \`object\``, () => {
      function Foo() { }
      Foo.a = { 'b': 2, 'c': 3 }

      const par = testFunc({ 'a': { 'b': 2 } })
      assert.strictEqual(par(Foo), true)
    })

    it(`\`_.${methodName}\` should work with a function for \`source\``, () => {
      function Foo() { }
      Foo.a = 1
      Foo.b = function () { }
      Foo.c = 3

      const objects = [{ 'a': 1 }, { 'a': 1, 'b': Foo.b, 'c': 3 }],
        actual = map(objects, testFunc(Foo))

      assert.deepStrictEqual(actual, [false, true])
    })

    it(`\`_.${methodName}\` should work with a non-plain \`object\``, () => {
      function Foo(object) { assign(this, object) }

      const object = new Foo({ 'a': new Foo({ 'b': 2, 'c': 3 }) }),
        par = testFunc({ 'a': { 'b': 2 } })

      assert.strictEqual(par(object), true)
    })

    it(`\`_.${methodName}\` should partial match arrays`, () => {
      let objects = [{ 'a': ['b'] }, { 'a': ['c', 'd'] }],
        actual = filter(objects, testFunc({ 'a': ['d'] }))

      assert.deepStrictEqual(actual, [objects[1]])

      actual = filter(objects, testFunc({ 'a': ['b', 'd'] }))
      assert.deepStrictEqual(actual, [])

      actual = filter(objects, testFunc({ 'a': ['d', 'b'] }))
      assert.deepStrictEqual(actual, [])
    })

    it(`\`_.${methodName}\` should partial match arrays with duplicate values`, () => {
      const objects = [{ 'a': [1, 2] }, { 'a': [2, 2] }],
        actual = filter(objects, testFunc({ 'a': [2, 2] }))

      assert.deepStrictEqual(actual, [objects[1]])
    })

    it('should partial match arrays of objects', () => {
      const objects = [
        { 'a': [{ 'b': 1, 'c': 2 }, { 'b': 4, 'c': 5, 'd': 6 }] },
        { 'a': [{ 'b': 1, 'c': 2 }, { 'b': 4, 'c': 6, 'd': 7 }] }
      ]

      const actual = filter(objects, testFunc({ 'a': [{ 'b': 1 }, { 'b': 4, 'c': 5 }] }))
      assert.deepStrictEqual(actual, [objects[0]])
    })

    it(`\`_.${methodName}\` should partial match maps`, () => {
      if (Map) {
        const objects = [{ 'a': new Map }, { 'a': new Map }]
        objects[0].a.set('a', 1)
        objects[1].a.set('a', 1)
        objects[1].a.set('b', 2)

        const map = new Map
        map.set('b', 2)
        let actual = filter(objects, testFunc({ 'a': map }))

        assert.deepStrictEqual(actual, [objects[1]])

        map.delete('b')
        actual = filter(objects, testFunc({ 'a': map }))

        assert.deepStrictEqual(actual, objects)

        map.set('c', 3)
        actual = filter(objects, testFunc({ 'a': map }))

        assert.deepStrictEqual(actual, [])
      }
    })

    it(`\`_.${methodName}\` should partial match sets`, () => {
      if (Set) {
        const objects = [{ 'a': new Set }, { 'a': new Set }]
        objects[0].a.add(1)
        objects[1].a.add(1)
        objects[1].a.add(2)

        const set = new Set
        set.add(2)
        let actual = filter(objects, testFunc({ 'a': set }))

        assert.deepStrictEqual(actual, [objects[1]])

        set.delete(2)
        actual = filter(objects, testFunc({ 'a': set }))

        assert.deepStrictEqual(actual, objects)

        set.add(3)
        actual = filter(objects, testFunc({ 'a': set }))

        assert.deepStrictEqual(actual, [])
      }
    })

    it(`\`_.${methodName}\` should match \`undefined\` values`, () => {
      let objects = [{ 'a': 1 }, { 'a': 1, 'b': 1 }, { 'a': 1, 'b': undefined }],
        actual = map(objects, testFunc({ 'b': undefined })),
        expected = [false, false, true]

      assert.deepStrictEqual(actual, expected)

      actual = map(objects, testFunc({ 'a': 1, 'b': undefined }))

      assert.deepStrictEqual(actual, expected)

      objects = [{ 'a': { 'b': 2 } }, { 'a': { 'b': 2, 'c': 3 } }, { 'a': { 'b': 2, 'c': undefined } }]
      actual = map(objects, testFunc({ 'a': { 'c': undefined } }))

      assert.deepStrictEqual(actual, expected)
    })

    it(`\`_.${methodName}\` should match \`undefined\` values on primitives`, () => {
      numberProto.a = 1
      numberProto.b = undefined

      try {
        var par = testFunc({ 'b': undefined })
        assert.strictEqual(par(1), true)
      } catch (e) {
        assert.ok(false, e.message)
      }
      try {
        par = testFunc({ 'a': 1, 'b': undefined })
        assert.strictEqual(par(1), true)
      } catch (e) {
        assert.ok(false, e.message)
      }
      numberProto.a = { 'b': 1, 'c': undefined }
      try {
        par = testFunc({ 'a': { 'c': undefined } })
        assert.strictEqual(par(1), true)
      } catch (e) {
        assert.ok(false, e.message)
      }
      delete numberProto.a
      delete numberProto.b
    })

    it(`\`_.${methodName}\` should return \`false\` when \`object\` is nullish`, () => {
      const values = [, null, undefined],
        expected = map(values, stubFalse),
        par = testFunc({ 'a': 1 })

      const actual = map(values, (value, index) => {
        try {
          return index ? par(value) : par()
        } catch (e) { }
      })

      assert.deepStrictEqual(actual, expected)
    })

    it(`\`_.${methodName}\` should return \`true\` when comparing an empty \`source\``, () => {
      const object = { 'a': 1 },
        expected = map(empties, stubTrue)

      const actual = map(empties, (value) => {
        const par = testFunc(value)
        return par(object)
      })

      assert.deepStrictEqual(actual, expected)
    })

    it(`\`_.${methodName}\` should return \`true\` when comparing an empty \`source\` to a nullish \`object\``, () => {
      const values = [, null, undefined],
        expected = map(values, stubTrue),
        par = testFunc({})

      const actual = map(values, (value, index) => {
        try {
          return index ? par(value) : par()
        } catch (e) { }
      })

      assert.deepStrictEqual(actual, expected)
    })

    it(`\`_.${methodName}\` should return \`true\` when comparing a \`source\` of empty arrays and objects`, () => {
      const objects = [{ 'a': [1], 'b': { 'c': 1 } }, { 'a': [2, 3], 'b': { 'd': 2 } }],
        actual = filter(objects, testFunc({ 'a': [], 'b': {} }))

      assert.deepStrictEqual(actual, objects)
    })
  })
})

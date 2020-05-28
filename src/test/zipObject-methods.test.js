import assert from 'assert'
import each from '../each'
import zipObject from "../zipObject";
import zipObjectDeep from "../zipObjectDeep";

describe('zipObject methods', () => {

  const methodName = "zipObject";
  const func = zipObject;
  const object = { 'barney': 36, 'fred': 40 };
  const isDeep = false

  it(`\`_.${methodName}\` should zip together key/value arrays into an object`, () => {
    const actual = func(['barney', 'fred'], [36, 40])
    assert.deepStrictEqual(actual, object)
  })

  it(`\`_.${methodName}\` should ignore extra \`values\``, () => {
    assert.deepStrictEqual(func(['a'], [1, 2]), { 'a': 1 })
  })

  it(`\`_.${methodName}\` should assign \`undefined\` values for extra \`keys\``, () => {
    assert.deepStrictEqual(func(['a', 'b'], [1]), { 'a': 1, 'b': undefined })
  })

  it(`\`_.${methodName}\` should ${isDeep ? '' : 'not '}support deep paths`, () => {
    each(['a.b.c', ['a', 'b', 'c']], (path, index) => {
      const expected = isDeep ? ({ 'a': { 'b': { 'c': 1 } } }) : (index ? { 'a,b,c': 1 } : { 'a.b.c': 1 })
      assert.deepStrictEqual(func([path], [1]), expected)
    })
  })


})

describe('zipObjectDeep', () => {

  const methodName = "zipObjectDeep";
  const func = zipObjectDeep;
  const object = { 'barney': 36, 'fred': 40 };
  const isDeep = true;

  it(`\`_.${methodName}\` should zip together key/value arrays into an object`, () => {
    const actual = func(['barney', 'fred'], [36, 40])
    assert.deepStrictEqual(actual, object)
  })

  it(`\`_.${methodName}\` should ignore extra \`values\``, () => {
    assert.deepStrictEqual(func(['a'], [1, 2]), { 'a': 1 })
  })

  it(`\`_.${methodName}\` should assign \`undefined\` values for extra \`keys\``, () => {
    assert.deepStrictEqual(func(['a', 'b'], [1]), { 'a': 1, 'b': undefined })
  })

  it(`\`_.${methodName}\` should ${isDeep ? '' : 'not '}support deep paths`, () => {
    each(['a.b.c', ['a', 'b', 'c']], (path, index) => {
      const expected = isDeep ? ({ 'a': { 'b': { 'c': 1 } } }) : (index ? { 'a,b,c': 1 } : { 'a.b.c': 1 })
      assert.deepStrictEqual(func([path], [1]), expected)
    })
  })


})

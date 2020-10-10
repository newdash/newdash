// @ts-nocheck
import * as assert from 'assert';
import root from '../src/.internal/root';
import assign from '../src/assign';
import assignIn from '../src/assignIn';
import defaults from '../src/defaults';
import defaultsDeep from '../src/defaultsDeep';
import difference from '../src/difference';
import each from '../src/each';
import groupBy from '../src/groupBy';
import intersection from '../src/intersection';
import map from '../src/map';
import merge from '../src/merge';
import times from '../src/times';
import uniq from '../src/uniq';
import without from '../src/without';
import zipObjectDeep from '../src/zipObjectDeep';
import { create, funcProto, isEven, LARGE_ARRAY_SIZE, objectProto, stubFalse } from './utils';

describe('`__proto__` property bugs', () => {

  it('should work with the "__proto__" key in internal data objects', () => {
    const stringLiteral = '__proto__',
      stringObject = Object(stringLiteral),
      expected = [stringLiteral, stringObject];

    const largeArray = times(LARGE_ARRAY_SIZE, (count) => isEven(count) ? stringLiteral : stringObject);

    assert.deepStrictEqual(difference(largeArray, largeArray), []);
    assert.deepStrictEqual(intersection(largeArray, largeArray), expected);
    assert.deepStrictEqual(uniq(largeArray), expected);
    assert.deepStrictEqual(without.apply(_, [largeArray].concat(largeArray)), []);
  });

  it('should treat "__proto__" as a regular key in assignments', () => {
    const methods = [
      assign,
      defaults,
      merge,
      assign,
      assignIn,
      defaults,
      defaultsDeep
    ];

    const source = create(null);
    source.__proto__ = [];

    const expected = map(methods, stubFalse);

    let actual = map(methods, (m) => {
      const result = m({}, source);
      return result instanceof Array;
    });

    assert.deepStrictEqual(actual, expected);

    actual = groupBy([{ 'a': '__proto__' }], 'a');
    assert.ok(!(actual instanceof Array));
  });

  it('should not merge "__proto__" properties', () => {
    if (JSON) {

      merge({}, JSON.parse('{"__proto__":{"a":1}}'));

      const actual = 'a' in objectProto;
      delete objectProto.a;

      assert.ok(!actual);

    }
  });

  it('should not indirectly merge builtin prototype properties', () => {
    merge({}, { 'toString': { 'constructor': { 'prototype': { 'a': 1 } } } });

    let actual = 'a' in funcProto;
    delete funcProto.a;

    assert.ok(!actual);

    merge({}, { 'constructor': { 'prototype': { 'a': 1 } } });

    actual = 'a' in objectProto;
    delete objectProto.a;

    assert.ok(!actual);
  });

  it('should not indirectly merge `Object` properties', () => {
    merge({}, { 'constructor': { 'a': 1 } });

    const actual = 'a' in Object;
    delete Object.a;

    assert.ok(!actual);
  });

  each(['__proto__', 'constructor', 'prototype'], (keyToTest) => {

    it(`zipObjectDeep is not setting ${keyToTest} on global`, () => {

      zipObjectDeep([`${keyToTest}.a`], ['newValue']);
      // Can't access plain `a` as it's not defined and test fails
      assert.notEqual(root['a'], 'newValue');

    });

    it(`zipObjectDeep is not overwriting ${keyToTest} on vars`, () => {

      const b = 'oldValue';
      zipObjectDeep([`${keyToTest}.b`], ['newValue']);
      assert.strictEqual(b, 'oldValue');
      assert.notEqual(root['b'], 'newValue');

      // ensure nothing was created
      assert.ok(!('b' in root));

    });

    it(`zipObjectDeep is not overwriting global.${keyToTest}`, () => {

      zipObjectDeep([`${root}.${keyToTest}.c`], ['newValue']);
      assert.notEqual(root['c'], 'newValue');

      // ensure nothing was created
      assert.ok(!('c' in root));

    });

  });

  it('should not have prototype pollution', () => {

    const testValue = 42;

    const notExistKey = 'not_exist_key';

    zipObjectDeep([`__proto__.${notExistKey}`], [testValue]); // try to prototype pollution

    if (typeof global == 'object') {
      assert.strictEqual(global[notExistKey], undefined);
    }

  });


});

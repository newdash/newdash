import * as assert from 'assert';
import { slice, stubOne } from './utils';
import invokeMap from '../src/invokeMap';
import map from '../src/map';
import each from '../src/each';

describe('invokeMap', () => {
  it('should invoke a methods on each element of `collection`', () => {
    const array = ['a', 'b', 'c'],
      actual = invokeMap(array, 'toUpperCase');

    assert.deepStrictEqual(actual, ['A', 'B', 'C']);
  });

  it('should support invoking with arguments', () => {
    const array = [function() { return slice.call(arguments); }],
      actual = invokeMap(array, 'call', null, 'a', 'b', 'c');

    assert.deepStrictEqual(actual, [['a', 'b', 'c']]);
  });

  it('should work with a function for `methodName`', () => {
    const array = ['a', 'b', 'c'];

    const actual = invokeMap(array, function(left, right): string {
      return left + this.toUpperCase() + right;
    }, '(', ')');

    assert.deepStrictEqual(actual, ['(A)', '(B)', '(C)']);
  });

  it('should work with an object for `collection`', () => {
    const object = { 'a': 1, 'b': 2, 'c': 3 },
      actual = invokeMap(object, 'toFixed', 1);

    assert.deepStrictEqual(actual, ['1.0', '2.0', '3.0']);
  });

  it('should treat number values for `collection` as empty', () => {
    assert.deepStrictEqual(invokeMap(1), []);
  });

  it('should not error on nullish elements', () => {
    const array = ['a', null, undefined, 'd'];

    try {
      var actual = invokeMap(array, 'toUpperCase');
    } catch (e) { }

    assert.deepStrictEqual(actual, ['A', undefined, undefined, 'D']);
  });

  it('should not error on elements with missing properties', () => {
    const objects = map([null, undefined, stubOne], (value) => ({ 'a': value }));

    const expected = map(objects, (object) => object.a ? object.a() : undefined);

    try {
      var actual = invokeMap(objects, 'a');
    } catch (e) { }

    assert.deepStrictEqual(actual, expected);
  });

  it('should invoke deep property methods with the correct `this` binding', () => {
    const object = { 'a': { 'b': function() { return this.c; }, 'c': 1 } };

    each(['a.b', ['a', 'b']], (path) => {
      assert.deepStrictEqual(invokeMap([object], path), [1]);
    });
  });


});

import assert from 'assert';
import { arrayProto } from './utils.js';
import toArray from '../toArray.js';

describe('toArray', function() {
  it('should convert objects to arrays', function() {
    assert.deepStrictEqual(toArray({ 'a': 1, 'b': 2 }), [1, 2]);
  });

  it('should convert iterables to arrays', function() {
    if (Symbol && Symbol.iterator) {
      var object = { '0': 'a', 'length': 1 };
      object[Symbol.iterator] = arrayProto[Symbol.iterator];

      assert.deepStrictEqual(toArray(object), ['a']);
    }
  });

  it('should convert maps to arrays', function() {
    if (Map) {
      var map = new Map;
      map.set('a', 1);
      map.set('b', 2);
      assert.deepStrictEqual(toArray(map), [['a', 1], ['b', 2]]);
    }
  });

  it('should convert strings to arrays', function() {
    assert.deepStrictEqual(toArray(''), []);
    assert.deepStrictEqual(toArray('ab'), ['a', 'b']);
    assert.deepStrictEqual(toArray(Object('ab')), ['a', 'b']);
  });

});

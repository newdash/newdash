import assert from 'assert';
import lodashStable from 'lodash';
import { falsey, LARGE_ARRAY_SIZE, isEven } from './utils.js';
import { map, each, drop } from "../index"

describe('drop', function() {
  var array = [1, 2, 3];

  it('should drop the first two elements', function() {
    assert.deepStrictEqual(drop(array, 2), [3]);
  });

  it('should treat falsey `n` values, except `undefined`, as `0`', function() {
    var expected = map(falsey, function(value) {
      return value === undefined ? [2, 3] : array;
    });

    var actual = map(falsey, function(n) {
      return drop(array, n);
    });

    assert.deepStrictEqual(actual, expected);
  });

  it('should return all elements when `n` < `1`', function() {
    each([0, -1, -Infinity], function(n) {
      assert.deepStrictEqual(drop(array, n), array);
    });
  });

  it('should return an empty array when `n` >= `length`', function() {
    each([3, 4, Math.pow(2, 32), Infinity], function(n) {
      assert.deepStrictEqual(drop(array, n), []);
    });
  });

  it('should coerce `n` to an integer', function() {
    assert.deepStrictEqual(drop(array, 1.6), [2, 3]);
  });

});

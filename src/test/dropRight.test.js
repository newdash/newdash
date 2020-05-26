import assert from 'assert';
import { falsey } from './utils.js';
import { map, each, dropRight } from "../index"


describe('dropRight', function () {
  var array = [1, 2, 3];

  it('should drop the last two elements', function () {
    assert.deepStrictEqual(dropRight(array, 2), [1]);
  });

  it('should treat falsey `n` values, except `undefined`, as `0`', function () {
    var expected = map(falsey, function (value) {
      return value === undefined ? [1, 2] : array;
    });

    var actual = map(falsey, function (n) {
      return dropRight(array, n);
    });

    assert.deepStrictEqual(actual, expected);
  });

  it('should return all elements when `n` < `1`', function () {
    each([0, -1, -Infinity], function (n) {
      assert.deepStrictEqual(dropRight(array, n), array);
    });
  });

  it('should return an empty array when `n` >= `length`', function () {
    each([3, 4, Math.pow(2, 32), Infinity], function (n) {
      assert.deepStrictEqual(dropRight(array, n), []);
    });
  });

  it('should coerce `n` to an integer', function () {
    assert.deepStrictEqual(dropRight(array, 1.6), [1, 2]);
  });

});

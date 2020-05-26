import assert from 'assert';
import { empties, stubOne, falsey, args, LARGE_ARRAY_SIZE, square, identity } from './utils.js';
import { at, map, reject, isArray, transform, range, constant, each } from "../index";

describe('at', function () {

  var array = ['a', 'b', 'c'],
    object = { 'a': [{ 'b': { 'c': 3 } }, 4] };

  it('should return the elements corresponding to the specified keys', function () {
    var actual = at(array, [0, 2]);
    assert.deepStrictEqual(actual, ['a', 'c']);
  });

  it('should return `undefined` for nonexistent keys', function () {
    var actual = at(array, [2, 4, 0]);
    assert.deepStrictEqual(actual, ['c', undefined, 'a']);
  });

  it('should work with non-index keys on array values', function () {
    var values = reject(empties, function (value) {
      return (value === 0) || isArray(value);
    }).concat(-1, 1.1);

    var array = transform(values, function (result, value) {
      result[value] = 1;
    }, []);

    var expected = map(values, stubOne),
      actual = at(array, values);

    assert.deepStrictEqual(actual, expected);
  });

  it('should return an empty array when no keys are given', function () {
    assert.deepStrictEqual(at(array), []);
    assert.deepStrictEqual(at(array, [], []), []);
  });

  it('should accept multiple key arguments', function () {
    var actual = at(['a', 'b', 'c', 'd'], 3, 0, 2);
    assert.deepStrictEqual(actual, ['d', 'a', 'c']);
  });

  it('should work with a falsey `object` when keys are given', function () {
    var expected = map(falsey, constant(Array(4).fill(undefined)));

    var actual = map(falsey, function (object) {
      try {
        return at(object, 0, 1, 'pop', 'push');
      } catch (e) { }
    });

    assert.deepStrictEqual(actual, expected);
  });

  it('should work with an `arguments` object for `object`', function () {
    var actual = at(args, [2, 0]);
    assert.deepStrictEqual(actual, [3, 1]);
  });

  it('should work with `arguments` object as secondary arguments', function () {
    var actual = at([1, 2, 3, 4, 5], args);
    assert.deepStrictEqual(actual, [2, 3, 4]);
  });

  it('should work with an object for `object`', function () {
    var actual = at(object, ['a[0].b.c', 'a[1]']);
    assert.deepStrictEqual(actual, [3, 4]);
  });

  it('should pluck inherited property values', function () {
    function Foo() {
      this.a = 1;
    }
    Foo.prototype.b = 2;

    var actual = at(new Foo, 'b');
    assert.deepStrictEqual(actual, [2]);
  });

});

import assert from 'assert';
import { slice, errors, stubTrue, CustomError, realm } from './utils.js';
import { attempt, constant, map, isEqual } from "../index"

describe('attempt', function () {
  it('should return the result of `func`', function () {
    assert.strictEqual(attempt(constant('x')), 'x');
  });

  it('should provide additional arguments to `func`', function () {
    var actual = attempt(function () { return slice.call(arguments); }, 1, 2);
    assert.deepStrictEqual(actual, [1, 2]);
  });

  it('should return the caught error', function () {
    var expected = map(errors, stubTrue);

    var actual = map(errors, function (error) {
      return attempt(function () { throw error; }) === error;
    });

    assert.deepStrictEqual(actual, expected);
  });

  it('should coerce errors to error objects', function () {
    var actual = attempt(function () { throw 'x'; });
    assert.ok(isEqual(actual, Error('x')));
  });

  it('should preserve custom errors', function () {
    var actual = attempt(function () { throw new CustomError('x'); });
    assert.ok(actual instanceof CustomError);
  });

  it('should work with an error object from another realm', function () {
    if (realm.errors) {
      var expected = map(realm.errors, stubTrue);

      var actual = map(realm.errors, function (error) {
        return attempt(function () { throw error; }) === error;
      });

      assert.deepStrictEqual(actual, expected);
    }
  });


});

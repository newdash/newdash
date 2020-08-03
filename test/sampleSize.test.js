import * as assert from 'assert';
import { falsey, empties, stubArray } from './utils';
import sampleSize from '../src/sampleSize';
import { difference } from '../src/difference';
import map from '../src/map';
import each from '../src/each';
import values from '../src/values';
import transform from '../src/transform';


describe('sampleSize', () => {
  const array = [1, 2, 3];

  it('should return an array of random elements', () => {
    const actual = sampleSize(array, 2);

    assert.strictEqual(actual.length, 2);
    assert.deepStrictEqual(difference(actual, array), []);
  });

  it('should contain elements of the collection', () => {
    const actual = sampleSize(array, array.length).sort();

    assert.deepStrictEqual(actual, array);
  });

  it('should treat falsey `size` values, except `undefined`, as `0`', () => {
    const expected = map(falsey, (value) => value === undefined ? ['a'] : []);

    const actual = map(falsey, (size, index) => index ? sampleSize(['a'], size) : sampleSize(['a']));

    assert.deepStrictEqual(actual, expected);
  });

  it('should return an empty array when `n` < `1` or `NaN`', () => {
    each([0, -1, -Infinity], (n) => {
      assert.deepStrictEqual(sampleSize(array, n), []);
    });
  });

  it('should return all elements when `n` >= `length`', () => {
    each([3, 4, Math.pow(2, 32), Infinity], (n) => {
      const actual = sampleSize(array, n).sort();
      assert.deepStrictEqual(actual, array);
    });
  });

  it('should coerce `n` to an integer', () => {
    const actual = sampleSize(array, 1.6);
    assert.strictEqual(actual.length, 1);
  });

  it('should return an empty array for empty collections', () => {
    const expected = map(empties, stubArray);

    const actual = transform(empties, (result, value) => {
      try {
        result.push(sampleSize(value, 1));
      } catch (e) {}
    });

    assert.deepStrictEqual(actual, expected);
  });

  it('should sample an object', () => {
    const object = { 'a': 1, 'b': 2, 'c': 3 },
      actual = sampleSize(object, 2);

    assert.strictEqual(actual.length, 2);
    assert.deepStrictEqual(difference(actual, values(object)), []);
  });

  it('should work as an iteratee for methods like `_.map`', () => {
    const actual = map([['a']], sampleSize);
    assert.deepStrictEqual(actual, [['a']]);
  });
});

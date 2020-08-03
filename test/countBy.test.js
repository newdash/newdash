import * as assert from 'assert';
import countBy from '../src/countBy';
import map from '../src/map';
import constant from '../src/constant';

describe('countBy', () => {

  const array = [6.1, 4.2, 6.3];

  it('should transform keys by `iteratee`', () => {
    const actual = countBy(array, Math.floor);
    assert.deepStrictEqual(actual, { '4': 1, '6': 2 });
  });

  it('should use `_.identity` when `iteratee` is nullish', () => {
    const array = [4, 6, 6],
      values = [, null, undefined],
      expected = map(values, constant({ '4': 1, '6':  2 }));

    const actual = map(values, (value, index) => index ? countBy(array, value) : countBy(array));

    assert.deepStrictEqual(actual, expected);
  });

  it('should work with `_.property` shorthands', () => {
    const actual = countBy(['one', 'two', 'three'], 'length');
    assert.deepStrictEqual(actual, { '3': 2, '5': 1 });
  });

  it('should only add values to own, not inherited, properties', () => {
    const actual = countBy(array, (n) => Math.floor(n) > 4 ? 'hasOwnProperty' : 'constructor');

    assert.deepStrictEqual(actual.constructor, 1);
    assert.deepStrictEqual(actual.hasOwnProperty, 2);
  });

  it('should work with a number for `iteratee`', () => {
    const array = [
      [1, 'a'],
      [2, 'a'],
      [2, 'b']
    ];

    assert.deepStrictEqual(countBy(array, 0), { '1': 1, '2': 2 });
    assert.deepStrictEqual(countBy(array, 1), { 'a': 2, 'b': 1 });
  });

  it('should work with an object for `collection`', () => {
    const actual = countBy({ 'a': 6.1, 'b': 4.2, 'c': 6.3 }, Math.floor);
    assert.deepStrictEqual(actual, { '4': 1, '6': 2 });
  });


});

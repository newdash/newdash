// @ts-nocheck
import * as assert from 'assert';
import map from '../src/map';
import max from '../src/max';
import maxBy from '../src/maxBy';
import { falsey, noop } from './utils';

describe('max', () => {

  it('should return the largest value from a collection', () => {
    assert.strictEqual(max([1, 2, 3]), 3);
  });

  it('should return `undefined` for empty collections', () => {
    const values = falsey.concat([[]]),
      expected = map(values, noop);

    const actual = map(values, (value, index) => {
      try {
        return index ? max(value) : max();
      } catch (e) { }
    });

    assert.deepStrictEqual(actual, expected);
  });

  it('should work with non-numeric collection values', () => {
    assert.strictEqual(max(['a', 'b']), 'b');
  });

  it('should work with maxBy', () => {
    const items = [
      { name: 'v1', age: 10 },
      { name: 'v2', age: 5 }
    ];
    assert.strictEqual(maxBy(items, 'age').name, 'v1');
  });

});

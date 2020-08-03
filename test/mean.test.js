import * as assert from 'assert';
import { empties, stubNaN } from './utils';
import mean from '../src/mean';
import map from '../src/map';

describe('mean', () => {

  it('should return the mean of an array of numbers', () => {
    const array = [4, 2, 8, 6];
    assert.strictEqual(mean(array), 5);
  });

  it('should return `NaN` when passing empty `array` values', () => {
    const expected = map(empties, stubNaN),
      actual = map(empties, mean);

    assert.deepStrictEqual(actual, expected);
  });

});

import * as assert from 'assert';
import includes from '../src/includes';
import empties from '../src/.internal/empties';
import { stubFalse } from './stubs';
import map from '../src/map';
import each from '../src/each';
import every from '../src/every';
import partial from '../src/partial';

describe('includes', () => {
  (function() {
    each({
      'an `arguments` object': arguments,
      'an array': [1, 2, 3, 4],
      'an object': { 'a': 1, 'b': 2, 'c': 3, 'd': 4 },
      'a string': '1234'
    },
    (collection, key) => {
      it(`should work with ${key} and  return \`true\` for  matched values`, () => {
        assert.strictEqual(includes(collection, 3), true);
      });

      it(`should work with ${key} and  return \`false\` for unmatched values`, () => {
        assert.strictEqual(includes(collection, 5), false);
      });

      it(`should work with ${key} and floor \`position\` values`, () => {
        assert.strictEqual(includes(collection, 2, 1.2), true);
      });

    });

    each({
      'literal': 'abc',
      'object': Object('abc')
    },
    (collection, key) => {
      it(`should work with a string ${key} for \`collection\``, () => {
        assert.strictEqual(includes(collection, 'bc'), true);
        assert.strictEqual(includes(collection, 'd'), false);
      });
    });

    it('should return `false` for empty collections', () => {
      const expected = map(empties, stubFalse);

      const actual = map(empties, (value) => {
        try {
          return includes(value);
        } catch (e) { }
      });

      assert.deepStrictEqual(actual, expected);
    });

    it('should work with a string and a `fromIndex` >= `length`', () => {
      const string = '1234',
        length = string.length,
        indexes = [4, 6, Math.pow(2, 32), Infinity];

      const expected = map(indexes, (index) => [false, false, index == length]);

      const actual = map(indexes, (fromIndex) => [
        includes(string, 1, fromIndex),
        includes(string, undefined, fromIndex),
        includes(string, '', fromIndex)
      ]);

      assert.deepStrictEqual(actual, expected);
    });

    it('should match `NaN`', () => {
      assert.strictEqual(includes([1, NaN, 3], NaN), true);
    });

    it('should match `-0` as `0`', () => {
      assert.strictEqual(includes([-0], 0), true);
      assert.strictEqual(includes([0], -0), true);
    });

    it('should work as an iteratee for methods like `_.every`', () => {
      const array = [2, 3, 1],
        values = [1, 2, 3];

      assert.ok(every(values, partial(includes, array)));
    });
  })(1, 2, 3, 4);
});

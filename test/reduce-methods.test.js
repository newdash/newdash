import * as assert from 'assert';
import { _, empties, noop, add } from './utils';
import each from '../src/each';
import map from '../src/map';
import constant from '../src/constant';
import { reduce } from '../src/reduce';
import { reduceRight } from '../src/reduceRight';


describe('reduce methods', () => {
  each([['reduce', reduce], ['reduceRight', reduceRight]], ([methodName, func]) => {
    const array = [1, 2, 3];
    const isReduce = methodName == 'reduce';

    it(`\`_.${methodName}\` should reduce a collection to a single value`, () => {
      const actual = func(['a', 'b', 'c'], (accumulator, value) => accumulator + value, '');

      assert.strictEqual(actual, isReduce ? 'abc' : 'cba');
    });

    it(`\`_.${methodName}\` should support empty collections without an initial \`accumulator\` value`, () => {
      const actual = [],
        expected = map(empties, noop);

      each(empties, (value) => {
        try {
          actual.push(func(value, noop));
        } catch (e) { }
      });

      assert.deepStrictEqual(actual, expected);
    });

    it(`\`_.${methodName}\` should support empty collections with an initial \`accumulator\` value`, () => {
      const expected = map(empties, constant('x'));

      const actual = map(empties, (value) => {
        try {
          return func(value, noop, 'x');
        } catch (e) { }
      });

      assert.deepStrictEqual(actual, expected);
    });

    it(`\`_.${methodName}\` should handle an initial \`accumulator\` value of \`undefined\``, () => {
      const actual = func([], noop, undefined);
      assert.strictEqual(actual, undefined);
    });

    it(`\`_.${methodName}\` should return \`undefined\` for empty collections when no \`accumulator\` is given (test in IE > 9 and modern browsers)`, () => {
      const array = [],
        object = { '0': 1, 'length': 0 };

      if ('__proto__' in array) {
        array.__proto__ = object;
        assert.strictEqual(func(array, noop), undefined);
      }
      assert.strictEqual(func(object, noop), undefined);
    });


  });
});

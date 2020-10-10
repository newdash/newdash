// @ts-nocheck
import * as assert from 'assert';
import constant from '../src/constant';
import each from '../src/each';
import has from '../src/has';
import hasIn from '../src/hasIn';
import map from '../src/map';
import times from '../src/times';
import { args, defineProperty, stubFalse, stubTrue, symbol, toArgs } from './utils';

describe('has methods', () => {

  each([['has', has], ['hasIn', hasIn]], ([methodName, func]) => {
    const isHas = methodName == 'has';
    const sparseArgs = toArgs([1]);
    const sparseArray = Array(1);
    const sparseString = Object('a');

    delete sparseArgs[0];

    it(`\`_.${methodName}\` should check for own properties`, () => {
      const object = { 'a': 1 };

      each(['a', ['a']], (path) => {
        assert.strictEqual(func(object, path), true);
      });
    });

    it(`\`_.${methodName}\` should not use the \`hasOwnProperty\` method of \`object\``, () => {
      const object = { 'hasOwnProperty': null, 'a': 1 };
      assert.strictEqual(func(object, 'a'), true);
    });

    it(`\`_.${methodName}\` should support deep paths`, () => {
      const object = { 'a': { 'b': 2 } };

      each(['a.b', ['a', 'b']], (path) => {
        assert.strictEqual(func(object, path), true);
      });

      each(['a.a', ['a', 'a']], (path) => {
        assert.strictEqual(func(object, path), false);
      });
    });

    it(`\`_.${methodName}\` should coerce \`path\` to a string`, () => {
      function fn() { }
      fn.toString = constant('fn');

      const object = { 'null': 1, 'undefined': 2, 'fn': 3, '[object Object]': 4 },
        paths = [null, undefined, fn, {}],
        expected = map(paths, stubTrue);

      times(2, (index) => {
        const actual = map(paths, (path) => func(object, index ? [path] : path));

        assert.deepStrictEqual(actual, expected);
      });
    });

    it(`\`_.${methodName}\` should work with \`arguments\` objects`, () => {
      assert.strictEqual(func(args, 1), true);
    });

    it(`\`_.${methodName}\` should work with a non-string \`path\``, () => {
      const array = [1, 2, 3];

      each([1, [1]], (path) => {
        assert.strictEqual(func(array, path), true);
      });
    });

    it(`\`_.${methodName}\` should preserve the sign of \`0\``, () => {
      const object = { '-0': 'a', '0': 'b' },
        props = [-0, Object(-0), 0, Object(0)],
        expected = map(props, stubTrue);

      const actual = map(props, (key) => func(object, key));

      assert.deepStrictEqual(actual, expected);
    });

    it(`\`_.${methodName}\` should work with a symbol \`path\``, () => {
      function Foo() { }

      if (Symbol) {
        Foo.prototype[symbol] = 1;

        const symbol2 = Symbol('b');
        defineProperty(Foo.prototype, symbol2, {
          'configurable': true,
          'enumerable': false,
          'writable': true,
          'value': 2
        });

        const object = isHas ? Foo.prototype : new Foo;
        assert.strictEqual(func(object, symbol), true);
        assert.strictEqual(func(object, symbol2), true);
      }
    });

    it(`\`_.${methodName}\` should check for a key over a path`, () => {
      const object = { 'a.b': 1 };

      each(['a.b', ['a.b']], (path) => {
        assert.strictEqual(func(object, path), true);
      });
    });

    it(`\`_.${methodName}\` should return \`true\` for indexes of sparse values`, () => {
      const values = [sparseArgs, sparseArray, sparseString],
        expected = map(values, stubTrue);

      const actual = map(values, (value) => func(value, 0));

      assert.deepStrictEqual(actual, expected);
    });

    it(`\`_.${methodName}\` should return \`true\` for indexes of sparse values with deep paths`, () => {
      const values = [sparseArgs, sparseArray, sparseString],
        expected = map(values, constant([true, true]));

      const actual = map(values, (value) => map(['a[0]', ['a', '0']], (path) => func({ 'a': value }, path)));

      assert.deepStrictEqual(actual, expected);
    });

    it(`\`_.${methodName}\` should return \`${isHas ? 'false' : 'true'}\` for inherited properties`, () => {
      function Foo() { }
      Foo.prototype.a = 1;

      each(['a', ['a']], (path) => {
        assert.strictEqual(func(new Foo, path), !isHas);
      });
    });

    it(`\`_.${methodName}\` should return \`${isHas ? 'false' : 'true'}\` for nested inherited properties`, () => {
      function Foo() { }
      Foo.prototype.a = { 'b': 1 };

      each(['a.b', ['a', 'b']], (path) => {
        assert.strictEqual(func(new Foo, path), !isHas);
      });
    });

    it(`\`_.${methodName}\` should return \`false\` when \`object\` is nullish`, () => {
      const values = [null, undefined],
        expected = map(values, stubFalse);

      each(['constructor', ['constructor']], (path) => {
        const actual = map(values, (value) => func(value, path));

        assert.deepStrictEqual(actual, expected);
      });
    });

    it(`\`_.${methodName}\` should return \`false\` for deep paths when \`object\` is nullish`, () => {
      const values = [null, undefined],
        expected = map(values, stubFalse);

      each(['constructor.prototype.valueOf', ['constructor', 'prototype', 'valueOf']], (path) => {
        const actual = map(values, (value) => func(value, path));

        assert.deepStrictEqual(actual, expected);
      });
    });

    it(`\`_.${methodName}\` should return \`false\` for nullish values of nested objects`, () => {
      const values = [, null, undefined],
        expected = map(values, stubFalse);

      each(['a.b', ['a', 'b']], (path) => {
        const actual = map(values, (value, index) => {
          const object = index ? { 'a': value } : {};
          return func(object, path);
        });

        assert.deepStrictEqual(actual, expected);
      });
    });

    it(`\`_.${methodName}\` should return \`false\` over sparse values of deep paths`, () => {
      const values = [sparseArgs, sparseArray, sparseString],
        expected = map(values, constant([false, false]));

      const actual = map(values, (value) => map(['a[0].b', ['a', '0', 'b']], (path) => func({ 'a': value }, path)));

      assert.deepStrictEqual(actual, expected);
    });
  });
});

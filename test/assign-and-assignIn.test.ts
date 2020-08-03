// @ts-nocheck
import * as assert from 'assert';
import { defineProperty, stubOne, noop, stubNaN } from './utils';
import assign from '../src/assign';
import assignIn from '../src/assignIn';
import each from '../src/each';
import constant from '../src/constant';

describe('assign and assignIn', () => {

  each([[assign, 'assign'], [assignIn, 'assignIn']], ([func, methodName]) => {

    it(`\`_.${methodName}\` should assign source properties to \`object\``, () => {
      assert.deepStrictEqual(func({ 'a': 1 }, { 'b': 2 }), { 'a': 1, 'b': 2 });
    });

    it(`\`_.${methodName}\` should accept multiple sources`, () => {
      const expected = { 'a': 1, 'b': 2, 'c': 3 };
      assert.deepStrictEqual(func({ 'a': 1 }, { 'b': 2 }, { 'c': 3 }), expected);
      assert.deepStrictEqual(func({ 'a': 1 }, { 'b': 2, 'c': 2 }, { 'c': 3 }), expected);
    });

    it(`\`_.${methodName}\` should overwrite destination properties`, () => {
      const expected = { 'a': 3, 'b': 2, 'c': 1 };
      assert.deepStrictEqual(func({ 'a': 1, 'b': 2 }, expected), expected);
    });

    it(`\`_.${methodName}\` should assign source properties with nullish values`, () => {
      const expected = { 'a': null, 'b': undefined, 'c': null };
      assert.deepStrictEqual(func({ 'a': 1, 'b': 2 }, expected), expected);
    });

    it(`\`_.${methodName}\` should skip assignments if values are the same`, () => {
      const object = {};

      const descriptor = {
        'configurable': true,
        'enumerable': true,
        'set': function() { throw new Error; }
      };

      const source = {
        'a': 1,
        'b': undefined,
        'c': NaN,
        'd': undefined,
        'constructor': Object,
        'toString': constant('source')
      };

      defineProperty(object, 'a', assign({}, descriptor, {
        'get': stubOne
      }));

      defineProperty(object, 'b', assign({}, descriptor, {
        'get': noop
      }));

      defineProperty(object, 'c', assign({}, descriptor, {
        'get': stubNaN
      }));

      defineProperty(object, 'constructor', assign({}, descriptor, {
        'get': constant(Object)
      }));

      try {
        var actual = func(object, source);
      } catch (e) { }

      assert.deepStrictEqual(actual, source);
    });

    it(`\`_.${methodName}\` should treat sparse array sources as dense`, () => {
      const array = [1];
      array[2] = 3;

      assert.deepStrictEqual(func({}, array), { '0': 1, '1': undefined, '2': 3 });
    });

    it(`\`_.${methodName}\` should assign values of prototype objects`, () => {
      function Foo() { }
      Foo.prototype.a = 1;

      assert.deepStrictEqual(func({}, Foo.prototype), { 'a': 1 });
    });

    it(`\`_.${methodName}\` should coerce string sources to objects`, () => {
      assert.deepStrictEqual(func({}, 'a'), { '0': 'a' });
    });

  });
});

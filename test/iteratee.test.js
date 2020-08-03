import * as assert from 'assert';
import { slice, isNpm, push, stubFalse } from './utils';
import partial from '../src/partial';
import partialRight from '../src/partialRight';
import map from '../src/map';
import iteratee from '../src/iteratee';
import constant from '../src/constant';
import identity from '../src/.internal/identity';
import each from '../src/each';
import cloneDeep from '../src/cloneDeep';


describe('iteratee', () => {

  it('should provide arguments to `func`', () => {
    const fn = function() { return slice.call(arguments); };
    const rIteratee = iteratee(fn);
    const actual = rIteratee('a', 'b', 'c', 'd', 'e', 'f');
    assert.deepStrictEqual(actual, ['a', 'b', 'c', 'd', 'e', 'f']);
  });

  it('should return `_.identity` when `func` is nullish', () => {
    const object = {},
      values = [, null, undefined],
      expected = map(values, constant([!isNpm && identity, object]));

    const actual = map(values, (value, index) => {
      const identity = index ? iteratee(value) : iteratee();
      return [!isNpm && identity, identity(object)];
    });

    assert.deepStrictEqual(actual, expected);
  });

  it('should return an iteratee created by `_.matches` when `func` is an object', () => {
    const matches = iteratee({ 'a': 1, 'b': 2 });
    assert.strictEqual(matches({ 'a': 1, 'b': 2, 'c': 3 }), true);
    assert.strictEqual(matches({ 'b': 2 }), false);
  });

  it('should not change `_.matches` behavior if `source` is modified', () => {
    const sources = [
      { 'a': { 'b': 2, 'c': 3 } },
      { 'a': 1, 'b': 2 },
      { 'a': 1 }
    ];

    each(sources, (source, index) => {
      const object = cloneDeep(source),
        matches = iteratee(source);

      assert.strictEqual(matches(object), true);

      if (index) {
        source.a = 2;
        source.b = 1;
        source.c = 3;
      } else {
        source.a.b = 1;
        source.a.c = 2;
        source.a.d = 3;
      }
      assert.strictEqual(matches(object), true);
      assert.strictEqual(matches(source), false);
    });
  });

  it('should return an iteratee created by `_.matchesProperty` when `func` is an array', () => {
    let array = ['a', undefined],
      matches = iteratee([0, 'a']);

    assert.strictEqual(matches(array), true);

    matches = iteratee(['0', 'a']);
    assert.strictEqual(matches(array), true);

    matches = iteratee([1, undefined]);
    assert.strictEqual(matches(array), true);
  });

  it('should support deep paths for `_.matchesProperty` shorthands', () => {
    const object = { 'a': { 'b': { 'c': 1, 'd': 2 } } },
      matches = iteratee(['a.b', { 'c': 1 }]);

    assert.strictEqual(matches(object), true);
  });

  it('should not change `_.matchesProperty` behavior if `source` is modified', () => {
    const sources = [
      { 'a': { 'b': 2, 'c': 3 } },
      { 'a': 1, 'b': 2 },
      { 'a': 1 }
    ];

    each(sources, (source, index) => {
      const object = { 'a': cloneDeep(source) },
        matches = iteratee(['a', source]);

      assert.strictEqual(matches(object), true);

      if (index) {
        source.a = 2;
        source.b = 1;
        source.c = 3;
      } else {
        source.a.b = 1;
        source.a.c = 2;
        source.a.d = 3;
      }
      assert.strictEqual(matches(object), true);
      assert.strictEqual(matches({ 'a': source }), false);
    });
  });

  it('should return an iteratee created by `_.property` when `func` is a number or string', () => {
    let array = ['a'],
      prop = iteratee(0);

    assert.strictEqual(prop(array), 'a');

    prop = iteratee('0');
    assert.strictEqual(prop(array), 'a');
  });

  it('should support deep paths for `_.property` shorthands', () => {
    const object = { 'a': { 'b': 2 } },
      prop = iteratee('a.b');

    assert.strictEqual(prop(object), 2);
  });

  it('should work with functions created by `_.partial` and `_.partialRight`', () => {
    const fn = function() {
      const result = [this.a];
      push.apply(result, arguments);
      return result;
    };

    const expected = [1, 2, 3],
      object = { 'a': 1, 'iteratee': iteratee(partial(fn, 2)) };

    assert.deepStrictEqual(object.iteratee(3), expected);

    object.iteratee = iteratee(partialRight(fn, 3));
    assert.deepStrictEqual(object.iteratee(2), expected);
  });

  it('should work as an iteratee for methods like `_.map`', () => {
    const fn = function() { return this instanceof Number; },
      array = [fn, fn, fn],
      iteratees = map(array, iteratee),
      expected = map(array, stubFalse);

    const actual = map(iteratees, (iteratee) => iteratee());

    assert.deepStrictEqual(actual, expected);
  });
});

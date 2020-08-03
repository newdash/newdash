// @ts-nocheck
import * as assert from 'assert';

import { _, symbol, numberProto } from './utils';
import get from '../src/get';
import empties from '../src/.internal/empties';
import noop from '../src/.internal/noop';
import map from '../src/map';
import each from '../src/each';


describe('get and result', () => {

  const func = get;

  it(`'_.get' should get string keyed property values`, () => {
    const object = { 'a': 1 };

    each(['a', ['a']], (path) => {
      assert.strictEqual(func(object, path), 1);
    });
  });

  it(`'_.get' should preserve the sign of \`0\``, () => {
    const object = { '-0': 'a', '0': 'b' },
      props = [-0, Object(-0), 0, Object(0)];

    const actual = map(props, (key) => func(object, key));

    assert.deepStrictEqual(actual, ['a', 'a', 'b', 'b']);
  });

  it(`'_.get' should get symbol keyed property values`, () => {
    if (Symbol) {
      const object = {};
      object[symbol] = 1;

      assert.strictEqual(func(object, symbol), 1);
    }
  });

  it(`'_.get' should get deep property values`, () => {
    const object = { 'a': { 'b': 2 } };

    each(['a.b', ['a', 'b']], (path) => {
      assert.strictEqual(func(object, path), 2);
    });
  });

  it(`'_.get' should get a key over a path`, () => {
    const object = { 'a.b': 1, 'a': { 'b': 2 } };

    each(['a.b', ['a.b']], (path) => {
      assert.strictEqual(func(object, path), 1);
    });
  });

  it(`'_.get' should not coerce array paths to strings`, () => {
    const object = { 'a,b,c': 3, 'a': { 'b': { 'c': 4 } } };
    assert.strictEqual(func(object, ['a', 'b', 'c']), 4);
  });

  it(`'_.get' should not ignore empty brackets`, () => {
    const object = { 'a': { '': 1 } };
    assert.strictEqual(func(object, 'a[]'), 1);
  });

  it(`'_.get' should handle empty paths`, () => {
    each([['', ''], [[], ['']]], (pair) => {
      assert.strictEqual(func({}, pair[0]), undefined);
      assert.strictEqual(func({ '': 3 }, pair[1]), 3);
    });
  });

  it(`'_.get' should handle complex paths`, () => {
    const object = { 'a': { '-1.23': { '["b"]': { 'c': { "['d']": { '\ne\n': { 'f': { 'g': 8 } } } } } } } };

    const paths = [
      'a[-1.23]["[\\"b\\"]"].c[\'[\\\'d\\\']\'][\ne\n][f].g',
      ['a', '-1.23', '["b"]', 'c', "['d']", '\ne\n', 'f', 'g']
    ];

    each(paths, (path) => {
      assert.strictEqual(func(object, path), 8);
    });
  });

  it(`'_.get' should return \`undefined\` when \`object\` is nullish`, () => {
    each(['constructor', ['constructor']], (path) => {
      assert.strictEqual(func(null, path), undefined);
      assert.strictEqual(func(undefined, path), undefined);
    });
  });

  it(`'_.get' should return \`undefined\` for deep paths when \`object\` is nullish`, () => {
    const values = [null, undefined],
      expected = map(values, noop),
      paths = ['constructor.prototype.valueOf', ['constructor', 'prototype', 'valueOf']];

    each(paths, (path) => {
      const actual = map(values, (value) => func(value, path));

      assert.deepStrictEqual(actual, expected);
    });
  });

  it(`'_.get' should return \`undefined\` if parts of \`path\` are missing`, () => {
    const object = { 'a': [, null] };

    each(['a[1].b.c', ['a', '1', 'b', 'c']], (path) => {
      assert.strictEqual(func(object, path), undefined);
    });
  });

  it(`'_.get' should be able to return \`null\` values`, () => {
    const object = { 'a': { 'b': null } };

    each(['a.b', ['a', 'b']], (path) => {
      assert.strictEqual(func(object, path), null);
    });
  });

  it(`'_.get' should follow \`path\` over non-plain objects`, () => {
    const paths = ['a.b', ['a', 'b']];

    each(paths, (path) => {
      numberProto.a = { 'b': 2 };
      assert.strictEqual(func(0, path), 2);
      delete numberProto.a;
    });
  });

  it(`'_.get' should return the default value for \`undefined\` values`, () => {
    const object = { 'a': {} },
      values = empties.concat(true, new Date, 1, /x/, 'a'),
      expected = map(values, (value) => [value, value]);

    each(['a.b', ['a', 'b']], (path) => {
      const actual = map(values, (value) => [func(object, path, value), func(null, path, value)]);

      assert.deepStrictEqual(actual, expected);
    });
  });

  it(`'_.get' should return the default value when \`path\` is empty`, () => {
    assert.strictEqual(func({}, [], 'a'), 'a');
  });

});

import * as assert from 'assert';
import { _, stubA, stubB, stubC, slice, stubFalse, stubTrue } from './utils';
import { cond as fCond } from '../src/cond';
import { matches } from '../src/matches';
import { matchesProperty } from '../src/matchesProperty';
import { property } from '../src/property';
import each from '../src/each';

describe('cond', () => {

  it('should create a conditional function', () => {
    const cond = fCond([
      [matches({ 'a': 1 }), stubA],
      [matchesProperty('b', 1), stubB],
      [property('c'), stubC]
    ]);

    assert.strictEqual(cond({ 'a': 1, 'b': 2, 'c': 3 }), 'a');
    assert.strictEqual(cond({ 'a': 0, 'b': 1, 'c': 2 }), 'b');
    assert.strictEqual(cond({ 'a': -1, 'b': 0, 'c': 1 }), 'c');
  });

  it('should provide arguments to functions', () => {
    let args1,
      args2,
      expected = ['a', 'b', 'c'];

    const cond = fCond([[
      function() { args1 || (args1 = slice.call(arguments)); return true; },
      function() { args2 || (args2 = slice.call(arguments)); }
    ]]);

    cond('a', 'b', 'c');

    assert.deepStrictEqual(args1, expected);
    assert.deepStrictEqual(args2, expected);
  });

  it('should work with predicate shorthands', () => {
    const cond = fCond([
      [{ 'a': 1 }, stubA],
      [['b', 1], stubB],
      ['c', stubC]
    ]);

    assert.strictEqual(cond({ 'a': 1, 'b': 2, 'c': 3 }), 'a');
    assert.strictEqual(cond({ 'a': 0, 'b': 1, 'c': 2 }), 'b');
    assert.strictEqual(cond({ 'a': -1, 'b': 0, 'c': 1 }), 'c');
  });

  it('should return `undefined` when no condition is met', () => {
    const cond = fCond([[stubFalse, stubA]]);
    assert.strictEqual(cond({ 'a': 1 }), undefined);
  });

  it('should throw a TypeError if `pairs` is not composed of functions', () => {
    each([false, true], (value) => {
      assert.throws(() => { fCond([[stubTrue, value]])(); }, TypeError);
    });
  });

  it('should use `this` binding of function for `pairs`', () => {
    const cond = fCond([
      [function(a) { return this[a]; }, function(a, b) { return this[b]; }]
    ]);

    const object = { 'cond': cond, 'a': 1, 'b': 2 };
    assert.strictEqual(object.cond('a', 'b'), 2);
  });
});

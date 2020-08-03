import * as assert from 'assert';
import split from '../src/split';
import map from '../src/map';
import constant from '../src/constant';

describe('split', () => {

  it('should split a string by `separator`', () => {
    const string = 'abcde';
    assert.deepStrictEqual(split(string, 'c'), ['ab', 'de']);
    assert.deepStrictEqual(split(string, /[bd]/), ['a', 'c', 'e']);
    assert.deepStrictEqual(split(string, '', 2), ['a', 'b']);
  });

  it('should return an array containing an empty string for empty values', () => {
    const values = [, null, undefined, ''],
      expected = map(values, constant(['']));

    const actual = map(values, (value: any, index: any) => index ? split(value) : split());

    assert.deepStrictEqual(actual, expected);
  });

  it('should work as an iteratee for methods like `_.map`', () => {
    const strings = ['abc', 'def', 'ghi'],
      actual = map(strings, (v) => split(v));

    assert.deepStrictEqual(actual, [['abc'], ['def'], ['ghi']]);
  });

  it('should split with limit', () => {
    const actual = split('ababcad', 'b', 2);
    assert.deepStrictEqual(actual, ['a', 'a']);
  });

  it('should split with limit 0', () => {
    const actual = split('abcde', 'b', 0);
    assert.deepStrictEqual(actual, []);
  });

});

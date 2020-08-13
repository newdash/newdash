import * as assert from 'assert';
import { addPrefix } from '../src/addPrefix';
import { addSuffix } from '../src/addSuffix';
import { curry } from '../src/curry';
import { trimPrefix } from '../src/trimPrefix';
import { trimSuffix } from '../src/trimSuffix';


describe('trim test suite', () => {

  it('should trim prefix', () => {

    assert.strictEqual(trimPrefix('aaa', 'a'), 'aa');
    assert.strictEqual(trimPrefix('aaa', 'c'), 'aaa');
    assert.strictEqual(trimPrefix('aaa', 'aaa'), '');
    assert.strictEqual(trimPrefix(' aa', ' '), 'aa');

    assert.strictEqual(trimPrefix('123456', '123'), '456');


  });

  it('should trim suffix', () => {

    assert.strictEqual(trimSuffix('aaa', 'a'), 'aa');
    assert.strictEqual(trimSuffix('aaa', 'c'), 'aaa');
    assert.strictEqual(trimSuffix(' aa', ' '), ' aa');
    assert.strictEqual(trimSuffix(' aa', ' aaa'), ' aa');
    assert.strictEqual(trimSuffix(' aa', 'aa'), ' ');
    assert.strictEqual(trimSuffix(' aa', ' aa'), '');

    assert.strictEqual(trimSuffix('123456789', '789'), '123456');
    assert.strictEqual(trimSuffix('123456789', '4789'), '123456789');

  });

  it('should support add prefix', () => {

    assert.strictEqual(addPrefix(), '');
    assert.strictEqual(addPrefix('123'), '123');
    assert.strictEqual(addPrefix(undefined, '123'), '123');
    assert.strictEqual(addPrefix('123', '123'), '123');
    assert.strictEqual(addPrefix('456', '123'), '123456');
    assert.strictEqual(addPrefix('123456', '123'), '123456');

  });


  it('should support add suffix', () => {

    assert.strictEqual(addSuffix(), '');
    assert.strictEqual(addSuffix('123'), '123');
    assert.strictEqual(addSuffix(undefined, '123'), '123');
    assert.strictEqual(addSuffix('123', '123'), '123');
    assert.strictEqual(addSuffix('456', '123'), '456123');
    assert.strictEqual(addSuffix('123456', '456'), '123456');

  });

  it('should support curry', () => {

    // for curried function, parameters of function can not be optional
    const tt = curry(trimPrefix)(curry.placeholder, '123');

    assert.strictEqual(tt('123456'), '456');
    assert.strictEqual(tt('23456'), '23456');

  });

});

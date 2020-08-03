import * as assert from 'assert';
import { isMatch } from '../src/isMatch';

describe('isMatch', () => {

  const obj = { 'a': 1, 'b': 2 };
  const pObj = { 'a': 1 };
  const pObj2 = { 'a': 3 };
  const pObj3 = { 'c': 3 };

  it('should match', () => {

    assert.strictEqual(isMatch(obj, obj), true);
    assert.strictEqual(isMatch(obj, pObj), true);
    assert.strictEqual(isMatch(obj, { b: 2 }), true);

  });

  it('should not match', () => {
    assert.strictEqual(isMatch(obj, pObj2), false);
    // @ts-ignore
    assert.strictEqual(isMatch(obj, pObj3), false);
  });

});

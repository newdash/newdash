import * as assert from 'assert';
import lodashStable from 'lodash';
import { falsey, stubFalse, args, slice, symbol, isStrict, lodashBizarro } from './utils';
import isBuffer from '../src/isBuffer';

describe('isBuffer', () => {

  it('should return `true` for buffers', () => {
    if (typeof Buffer == 'object') {
      assert.strictEqual(isBuffer(Buffer.alloc(2)), true);
    }
  });

  it('should return `false` for non-buffers', () => {
    const expected = lodashStable.map(falsey, stubFalse);

    const actual = lodashStable.map(falsey, (value, index) => index ? isBuffer(value) : isBuffer());

    assert.deepStrictEqual(actual, expected);

    assert.strictEqual(isBuffer(args), false);
    assert.strictEqual(isBuffer([1]), false);
    assert.strictEqual(isBuffer(true), false);
    assert.strictEqual(isBuffer(new Date), false);
    assert.strictEqual(isBuffer(new Error), false);
    assert.strictEqual(isBuffer(_), false);
    assert.strictEqual(isBuffer(slice), false);
    assert.strictEqual(isBuffer({ 'a': 1 }), false);
    assert.strictEqual(isBuffer(1), false);
    assert.strictEqual(isBuffer(/x/), false);
    assert.strictEqual(isBuffer('a'), false);
    assert.strictEqual(isBuffer(symbol), false);
  });

  it('should return `false` if `Buffer` is not defined', () => {
    if (!isStrict && typeof Buffer == 'object' && lodashBizarro) {
      assert.strictEqual(lodashBizarro.isBuffer(Buffer.alloc(2)), false);
    }
  });

});

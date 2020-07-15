import assert from "assert";
import { product } from "../product";


describe('product', () => {

  it('should create product for number', () => {
    assert.strictEqual(product(3, 4), 12)
    assert.strictEqual(product('3', '4'), NaN)
  });

  it('should create product for number & array', () => {
    assert.deepStrictEqual(product([1, 2, 3], 4), [4, 8, 12])
    assert.deepStrictEqual(product(4, [1, 2, 3]), [4, 8, 12])
    assert.deepStrictEqual(product('a', [1, 2, 3]), [NaN, NaN, NaN])
  });

  it('should create product for array & array', () => {
    assert.deepStrictEqual(product([1, 2], [3, 4]), [[1, 3], [1, 4], [2, 3], [2, 4]])
    assert.deepStrictEqual(product([1, 2], ['3', '4']), [[1, '3'], [1, '4'], [2, '3'], [2, '4']])
  });

});

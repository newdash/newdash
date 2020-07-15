import assert from "assert";
import { product } from "../product";


describe('product', () => {

  it('should create product for number', () => {
    assert.strictEqual(product(3, 4), 12)
    assert.ok(isNaN(product('3', '4')))
  });

  it('should create product for number & array', () => {
    assert.deepStrictEqual(product([1, 2, 3], 4), [4, 8, 12])
    assert.deepStrictEqual(product(4, [1, 2, 3]), [4, 8, 12])
    product('a', [1, 2, 3]).forEach(item => assert.ok(isNaN(item)))
  });

  it('should create product for array & array', () => {
    assert.deepStrictEqual(product([1, 2], [3, 4]), [[1, 3], [1, 4], [2, 3], [2, 4]])
    assert.deepStrictEqual(product([1, 2], ['3', '4']), [[1, '3'], [1, '4'], [2, '3'], [2, '4']])
  });

});

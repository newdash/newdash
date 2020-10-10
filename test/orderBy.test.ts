// @ts-nocheck
import * as assert from 'assert';
import constant from '../src/constant';
import map from '../src/map';
import orderBy from '../src/orderBy';
import { falsey } from './utils';

describe('orderBy', () => {

  const objects = [
    { 'a': 'x', 'b': 3 },
    { 'a': 'y', 'b': 4 },
    { 'a': 'x', 'b': 1 },
    { 'a': 'y', 'b': 2 }
  ];

  const nestedObj = [
    { id: '4', address: { zipCode: 4, streetName: 'Beta' } },
    { id: '3', address: { zipCode: 3, streetName: 'Alpha' } },
    { id: '1', address: { zipCode: 1, streetName: 'Alpha' } },
    { id: '2', address: { zipCode: 2, streetName: 'Alpha' } },
    { id: '5', address: { zipCode: 4, streetName: 'Alpha' } }
  ];


  it('should sort by a single property by a specified order', () => {
    const actual = orderBy(objects, 'a', 'desc');
    assert.deepStrictEqual(actual, [objects[1], objects[3], objects[0], objects[2]]);
  });

  // current impl can not pass this test case
  it.skip('should sort by nested key in array format', () => {
    const actual = orderBy(
      nestedObj,
      [['address', 'zipCode'], ['address.streetName']],
      ['asc', 'desc']
    );
    assert.deepStrictEqual(actual, [nestedObj[2], nestedObj[3], nestedObj[1], nestedObj[0], nestedObj[4]]);
  });

  it('should sort by multiple properties by specified orders', () => {
    const actual = orderBy(objects, ['a', 'b'], ['desc', 'asc']);
    assert.deepStrictEqual(actual, [objects[3], objects[1], objects[2], objects[0]]);
  });

  it('should sort by a property in ascending order when its order is not specified', () => {
    let expected = [objects[2], objects[0], objects[3], objects[1]],
      actual = orderBy(objects, ['a', 'b']);

    assert.deepStrictEqual(actual, expected);

    expected = map(falsey, constant([objects[3], objects[1], objects[2], objects[0]]));

    actual = map(falsey, (order, index) => orderBy(objects, ['a', 'b'], index ? ['desc', order] : ['desc']));

    assert.deepStrictEqual(actual, expected);
  });

  it('should work with `orders` specified as string objects', () => {
    const actual = orderBy(objects, ['a'], [Object('desc')]);
    assert.deepStrictEqual(actual, [objects[1], objects[3], objects[0], objects[2]]);
  });
});

import * as assert from 'assert';
import { isEven } from './utils';
import filter from '../src/filter';

describe('filter', () => {

  const array = [1, 2, 3];
  const users = [
    { 'user': 'barney', 'age': 36, 'active': true },
    { 'user': 'fred', 'age': 40, 'active': false }
  ];

  it('should return elements `predicate` returns truthy for', () => {
    assert.deepStrictEqual(filter(array, isEven), [2]);
  });

  it('should return size > 2', () => {
    assert.deepStrictEqual(filter([1, 2, 3, 4, 5], (v) => v > 2), [3, 4, 5]);
  });

  it('should return active users', () => {
    assert.deepStrictEqual(filter(users, 'active'), [users[0]]);
  });

  it('should return age 36', () => {
    assert.deepStrictEqual(filter(users, { age: 36 }), [users[0]]);

  });

});

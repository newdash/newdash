import { find } from "../src/find";


describe('find Test Suite', () => {

  const users = [
    { 'user': 'barney', 'age': 36, 'active': true },
    { 'user': 'fred', 'age': 40, 'active': false },
    { 'user': 'pebbles', 'age': 1, 'active': true }
  ];

  it('should support find with type', () => {
    expect(find(users, 'active')).toEqual(users[0])
    expect(find(users, { active: true })).toEqual(users[0])
    expect(find(users, { active: false })).toEqual(users[1])
    expect(find(users, ['active', false])).toEqual(users[1])
  });

});

import { timeIt } from '../src/functional/timeIt';
import { hashSort } from '../src/hashSort';

describe('hashSort method', () => {

  it('should support pure numeric array', () => {
    expect(hashSort([2, 999, 3, 113, 3, 32, 3, 4]))
      .toStrictEqual([2, 3, 3, 3, 4, 32, 113, 999]);
  });

  it('should support pure numeric array', () => {
    expect(() => hashSort([2, -1, 3, 113, 3, 32, 3, 4]))
      .toThrowError();
  });

  it.skip('should faster than native sort', () => {
    const a1 = new Array();
    const a2 = new Array();
    for (let idx = 0; idx < Math.pow(2, 12); idx++) {
      const tmpValue = Math.floor(Math.random() * 1000000);
      a1.push(tmpValue);
      a2.push(tmpValue);
    }
    // current, native sort much more faster than hash sort.
    const nativeSortConsumption = timeIt(() => a1.sort());
    const hashSortConsumption = timeIt(() => hashSort(a2));
    expect(hashSortConsumption).toBeLessThanOrEqual(nativeSortConsumption);
  });

  it('should support object array', () => {
    expect(
      hashSort(
        [
          { age: 2 },
          { age: 999 },
          { age: 3 },
          { age: 113 },
          { age: 3 },
          { age: 32 },
          { age: 3 },
          { age: 4 }
        ],
        (item) => item.age
      )
    )
      .toStrictEqual([
        { age: 2 },
        { age: 3 },
        { age: 3 },
        { age: 3 },
        { age: 4 },
        { age: 32 },
        { age: 113 },
        { age: 999 }
      ]);
  });


});

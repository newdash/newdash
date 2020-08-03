import intersection from '../src/intersection';
import * as assert from 'assert';


describe('intersection', () => {

  it('should match example description', () => {
    assert.deepStrictEqual(intersection([2, 1], [2, 3]), [2]);
    assert.deepStrictEqual(intersection(['a', 'b'], ['c', 'a']), ['a']);
  });

  it('should support undefined value', () => {
    assert.deepStrictEqual(
      intersection(
        ['a', 'b', 'c', undefined],
        ['c', undefined, 'a']
      ),
      ['a', 'c', undefined]
    );
  });

});

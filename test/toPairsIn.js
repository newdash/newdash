import * as assert from 'assert';
import entriesIn from '../src/entriesIn';
import toPairsIn from '../src/toPairsIn';

describe('toPairsIn', () => {
  it('should be aliased', () => {
    assert.strictEqual(entriesIn, toPairsIn);
  });
});

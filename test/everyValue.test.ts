
import * as assert from 'assert';
import { everyValue } from '../src/everyValue';

describe('everyValue', () => {


  it('should match description', () => {

    assert.strictEqual(
      everyValue({ 'a': 0, 'b': 'yes', 'c': false }, Boolean),
      false
    );

    assert.strictEqual(
      everyValue({ 'a': 0, 'b': 1, 'c': 2 }, (v: number) => v == 1),
      false
    );

  });

});

import assert from "assert";
import { floor } from "../floor";

describe('floor', () => {


  it('should floor without precision', () => {
    assert.strictEqual(floor(4.006), 4)
  });

  it('should floor with precision', () => {
    assert.strictEqual(floor(0.046, 2), 0.04)
  });

  it('should floor with negative precision', () => {
    assert.strictEqual(floor(4060, -2), 4000)
  });

});

import assert from "assert";
import { ceil } from "../ceil";

describe('ceil', () => {

  it('should match definition', () => {

    assert.strictEqual(ceil(4.006), 5)
    assert.strictEqual(ceil(6.004, 2), 6.01)
    assert.strictEqual(ceil(6040, -2), 6100)

  });

});

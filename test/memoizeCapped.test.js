import * as assert from "assert";
import lodashStable from "../src";
import _memoizeCapped from "../src/.internal/memoizeCapped";
import { identity, MAX_MEMOIZE_SIZE } from "./utils";

describe("memoizeCapped", () => {
  const func = _memoizeCapped;

  it("should enforce a max cache size of `MAX_MEMOIZE_SIZE`", () => {
    if (func) {
      const memoized = func(identity),
        cache = memoized.cache;

      lodashStable.times(MAX_MEMOIZE_SIZE, memoized);
      assert.strictEqual(cache.size, MAX_MEMOIZE_SIZE);

      memoized(MAX_MEMOIZE_SIZE);
      assert.strictEqual(cache.size, 1);
    }
  });
});

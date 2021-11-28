import assert from "assert";
import { unWrap } from "../src/unWrap";
import { wrap } from "../src/wrap";


describe("wrap", () => {

  it("should support wrap", () => {

    assert.strictEqual(wrap("aaaaabbcc", "e"), "eaaaaabbcce");
    assert.strictEqual(wrap("aaaaabbcc", "a"), "aaaaabbcca");

  });

  it("should support unWrap", () => {

    assert.strictEqual(unWrap("aaaaabbcc", "e"), "aaaaabbcc");
    assert.strictEqual(unWrap("aaaaabbcc", "a"), "aaaabbcc");

  });

});

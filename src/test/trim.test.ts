import assert from "assert"
import { trimPrefix } from "../trimPrefix";
import { trimSuffix } from "../trimSuffix";
import { curry } from "../curry";


describe('trim test suite', () => {

  it('should trim prefix', () => {

    assert.strictEqual(trimPrefix("aaa", "a"), "aa")
    assert.strictEqual(trimPrefix("aaa", "c"), "aaa")
    assert.strictEqual(trimPrefix("aaa", "aaa"), "")
    assert.strictEqual(trimPrefix(" aa", " "), "aa")

    assert.strictEqual(trimPrefix("123456", "123"), "456")


  });

  it('should trim suffix', () => {

    assert.strictEqual(trimSuffix("aaa", "a"), "aa")
    assert.strictEqual(trimSuffix("aaa", "c"), "aaa")
    assert.strictEqual(trimSuffix(" aa", " "), " aa")
    assert.strictEqual(trimSuffix(" aa", " aaa"), " aa")
    assert.strictEqual(trimSuffix(" aa", "aa"), " ")
    assert.strictEqual(trimSuffix(" aa", " aa"), "")

    assert.strictEqual(trimSuffix("123456789", "789"), "123456")
    assert.strictEqual(trimSuffix("123456789", "4789"), "123456789")

  });


  it('should support curry', () => {

    // for curried function, parameters of function can not be optional
    const tt = curry(trimPrefix)(curry.placeholder, "123")

    assert.strictEqual(tt("123456"), '456')
    assert.strictEqual(tt("23456"), '23456')

  })

});

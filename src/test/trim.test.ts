import assert from "assert"
import { trimPrefix } from "../trimPrefix";
import { trimSuffix } from "../trimSuffix";


describe('trim test suite', () => {

  it('should trim prefix', () => {


    assert.equal(trimPrefix("aaa", "a"), "aa")
    assert.equal(trimPrefix("aaa", "c"), "aaa")
    assert.equal(trimPrefix("aaa", "aaa"), "")
    assert.equal(trimPrefix(" aa", " "), "aa")

    assert.equal(trimPrefix("123456", "123"), "456")
    assert.equal(trimPrefix("123456"), "123456")


  });

  it('should trim suffix', () => {

    assert.equal(trimSuffix("aaa", "a"), "aa")
    assert.equal(trimSuffix("aaa", "c"), "aaa")
    assert.equal(trimSuffix(" aa", " "), " aa")
    assert.equal(trimSuffix(" aa", " aaa"), " aa")
    assert.equal(trimSuffix(" aa", "aa"), " ")
    assert.equal(trimSuffix(" aa", " aa"), "")

    assert.equal(trimSuffix("123456789", "789"), "123456")
    assert.equal(trimSuffix("123456789", "4789"), "123456789")

  });


});

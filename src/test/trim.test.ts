import { trimPrefix } from "../trimPrefix";
import { trimSuffix } from "../trimSuffix";

describe('trim test suite', () => {



  it('should trim prefix', () => {

    expect(trimPrefix("aaa", "a")).toBe("aa")
    expect(trimPrefix("aaa", "c")).toBe("aaa")
    expect(trimPrefix("aaa", "aaa")).toBe("")
    expect(trimPrefix(" aa", " ")).toBe("aa")

  });

  it('should trim suffix', () => {

    expect(trimSuffix("aaa", "a")).toBe("aa")
    expect(trimSuffix("aaa", "c")).toBe("aaa")
    expect(trimSuffix(" aa", " ")).toBe(" aa")
    expect(trimSuffix(" aa", " aaa")).toBe(" aa")
    expect(trimSuffix(" aa", "aa")).toBe(" ")
    expect(trimSuffix(" aa", " aa")).toBe("")

    expect(trimSuffix("123456789", "789")).toBe("123456")
    expect(trimSuffix("123456789", "4789")).toBe("123456789")


  });


});

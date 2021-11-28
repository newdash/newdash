import { toNumber } from "../src/toNumber";

describe('ToNumber Test Suite', () => {

  it('should support process space value', () => {
    expect(toNumber(" 123")).toBe(123)
    expect(toNumber("123 ")).toBe(123)
    expect(toNumber(" 123 ")).toBe(123)
  });

});

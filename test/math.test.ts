import { mean } from "../src/math/mean";
import { stdDeviation } from "../src/math/stdDeviation";
import { sum } from "../src/math/sum";
import { variance } from "../src/math/variance";


describe("math", () => {

  it("should support sum", () => {

    expect(sum(Float64Array.from([1, 23, 4]))).toBe(28);
    expect(sum(Float64Array.from([1.2, 3.1, 0.3]))).toBe(4.6);

  });

  it("should support mean", () => {

    expect(mean(Float64Array.from([1, 7, 4]))).toBe(4);
    expect(mean(Float64Array.from([1.2, 3, 0.3]))).toBe(1.5);

  });

  it("should support variance", () => {

    expect(variance(Float64Array.from([600, 470, 170, 430, 300]))).toBe(21704);

  });

  it("should support standard deviation", () => {

    expect(stdDeviation(Float64Array.from([600, 470, 170, 430, 300]))).toBe(147.32277488562318);

  });


});

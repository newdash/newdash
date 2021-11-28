import { closest, distance } from "../src/string/distance";


describe("string library", () => {

  it("should support calculate distance of strings", () => {

    expect(distance("", "")).toBe(0);
    expect(distance("abcd", "abcd")).toBe(0);
    expect(distance("abcd", "abc")).toBe(1);
    expect(distance("abcd", "123")).toBe(4);

  });

  it("should support calculate closest string", () => {
    const dict = ["hello", "haha", "mama", "moment", "world", "latest"];

    expect(closest("h", dict)).toBe("haha");
    expect(closest("he", dict)).toBe("hello");
    expect(closest("m", dict)).toBe("mama");
    expect(closest("mo", dict)).toBe("mama");
    expect(closest("mome", dict)).toBe("mama");
    expect(closest("latast", dict)).toBe("latest");

  });

  it("should support calculate closest string for detail", () => {
    const dict = ["moment1", "mnment1", "mcment1"];
    expect(closest("moment", dict)).toBe("moment1");
    expect(closest("mnment", dict)).toBe("mnment1");
    expect(closest("mnment1", dict)).toBe("mnment1");

  });

});

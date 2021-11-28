import { md5, MD5 } from "../src/md5";

describe("md5 & MD5", () => {

  it("should support simple md5 test cases", () => {

    expect(md5("simple")).toBe("8dbdda48fb8748d6746f1965824e966a");
    expect(MD5("simple")).toBe("8DBDDA48FB8748D6746F1965824E966A");

    expect(
      md5("The girl on the hill made Mark think of Edna St. Vincent Millay.")
    ).toBe("6785109158c4375eff940bb0a6f7dc56");
    expect(
      MD5("The girl on the hill made Mark think of Edna St. Vincent Millay.")
    ).toBe("6785109158C4375EFF940BB0A6F7DC56");

    expect(md5("")).toBe("d41d8cd98f00b204e9800998ecf8427e");

  });


});

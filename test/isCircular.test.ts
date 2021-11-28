import { getObjectCycles, isCircular } from "../src/isCircular";

describe("isCircular", () => {

  it("should support simple check falsy", () => {

    expect(isCircular(undefined)).toBeFalsy();
    expect(isCircular(null)).toBeFalsy();
    expect(isCircular([])).toBeFalsy();
    expect(isCircular({})).toBeFalsy();
    expect(isCircular(Symbol(""))).toBeFalsy();
    expect(isCircular(1)).toBeFalsy();
    expect(isCircular(NaN)).toBeFalsy();

    expect(isCircular([undefined])).toBeFalsy();
    expect(isCircular([null])).toBeFalsy();
    expect(isCircular([[]])).toBeFalsy();
    expect(isCircular([{}])).toBeFalsy();
    expect(isCircular([Symbol("")])).toBeFalsy();
    expect(isCircular([1])).toBeFalsy();
    expect(isCircular([NaN])).toBeFalsy();

  });

  it("should support getCycle for objects", () => {

    const a: any = {};
    a.a = a;
    expect(getObjectCycles(a)).toStrictEqual([["ROOT['a']", "ROOT"]]);

    const b = new Array(3);
    b[2] = b;
    expect(getObjectCycles(b)).toStrictEqual([["ROOT['2']", "ROOT"]]);

    const c: any = {};
    c.b = b;
    b[1] = c;

    expect(getObjectCycles(c)).toStrictEqual([
      ["ROOT['b']['1']", "ROOT"],
      ["ROOT['b']['2']", "ROOT['b']"]
    ]);


  });


  it("should support simple check truth", () => {

    const a: any = {};
    a.a = a;
    expect(isCircular(a)).toBeTruthy();

    const b = new Array(3);
    b[2] = b;
    expect(isCircular(b)).toBeTruthy();

    const c = new Array(3);
    c["c"] = c;
    expect(isCircular(c)).toBeTruthy();


  });


});

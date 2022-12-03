import { isAsyncFunction } from "../src/isAsyncFunction";

describe("isAsyncFunction Test Suite", () => {


  it("should support positive cases", () => {

    const f1 = async () => { }
    const f2 = async (vvvvv: any) => { }
    const f3 = (() => async (vvvvv: any) => { })();
    async function f4() { }
    const c1 = new class { async f5() { } }

    for (const f of [f1, f2, f3, f4, c1.f5]) {
      expect(isAsyncFunction(f)).toBeTruthy()
    }

  })


  it("should support negative cases", () => {

    const f1 = () => { }
    const f2 = (vvvvv: any) => { }
    const f3 = (() => (vvvvv: any) => { })();
    function f4() { }
    const c1 = new class { f5() { } }

    for (const f of [f1, f2, f3, f4, c1.f5, undefined, null, ",", 123, Symbol("123")]) {
      expect(isAsyncFunction(f)).toBeFalsy()
    }

  })


})

import toPlainObject from "../src/toPlainObject";


describe('toPlainObject Test Suite', () => {


  it('should support class values', () => {
    class C { c = 1 }
    class D extends C { d = 2 }

    expect(toPlainObject(new D)).toEqual({ c: 1, d: 2 })
    expect(toPlainObject(new C)).toEqual({ c: 1 })

  });

  it('should support array values', () => {

    expect(toPlainObject([1, 2, 3])).toEqual({ '0': 1, '1': 2, '2': 3 })

  });

  it('should support string values', () => {

    expect(toPlainObject('123')).toEqual({ '0': '1', '1': '2', '2': '3' })

  });


  it('should support empty values', () => {

    for (const v of [undefined, null, 1, Symbol("321")]) {
      expect(Object.keys(toPlainObject(v as any)).length).toBe(0)
    }

  });

});

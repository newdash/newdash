import { createFunctionWrapper } from "../src/functional/functionWrapper";

describe("functionWrapper", () => {

  it("should return original function without processors", () => {

    const f = () => { };

    expect(createFunctionWrapper(f, {})).toBe(f);
    expect(createFunctionWrapper(f, { global: {} })).toBe(f);
    expect(createFunctionWrapper(f, { global: {}, execute: () => null })).not.toBe(f);

  });

  it('should support bind "this" context', () => {
    const f = function () { return this.a; };
    const ctx = { a: Date.now(), c: 1342 };
    expect(f.bind(ctx)()).toBe(ctx.a);
    expect(createFunctionWrapper(f, {
      execute(ctx) { return this.c; },
      thisContext: ctx
    })()).toBe(ctx.c);
    expect(createFunctionWrapper(f, {
      execute(ctx) { return ctx.thisContext.c; },
      thisContext: ctx
    }).bind(ctx)()).toBe(ctx.c);

  });


  it("should support overwrite error", async () => {

    const f = () => { throw new TypeError(); };
    const f2 = async () => { throw new TypeError(); };
    expect(createFunctionWrapper(f, { error: (ctx, error) => error })()).toBeInstanceOf(TypeError);
    expect(await createFunctionWrapper(f2, { error: (ctx, error) => error })()).toBeInstanceOf(TypeError);

  });

});

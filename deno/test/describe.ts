// @ts-nocheck

const describe = (suite: string, fn: (...args: any[]) => void) => {
  const it = (name: string, fn: (...args: any[]) => void) => {
    Deno.test({
      name: `suite '${suite}' - '${name}'`, fn,
      fn,
      sanitizeResources: false,
      sanitizeOps: false,
    })
  }
  fn(it)
}

export { describe }

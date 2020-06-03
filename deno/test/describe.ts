// @ts-nocheck

const describe = (suite: string, fn: (...args: any[]) => void) => {
  const it = (name: string, fn: (...args: any[]) => void) => {
    Deno.test(`suite '${suite}' - '${name}'`, fn)
  }
  fn(it)
}

export { describe }

// @ts-nocheck
import { expect } from "https://cdn.jsdelivr.net/gh/Soontao/expect@0.3.0/mod.ts";

window.expect = expect

const describe = (suite: string, fn: (...args: any[]) => void) => {

  const it = (name: string, fn: (...args: any[]) => void) => {
    Deno.test({
      name: `case '${suite}' - '${name}'`,
      fn,
      sanitizeResources: false,
      sanitizeOps: false,
    })
  }

  it.skip = (name: string, fn: (...args: any[]) => void) => {
    Deno.test({
      name: `case '${suite}' - '${name}'`,
      fn,
      ignore: true,
      sanitizeResources: false,
      sanitizeOps: false,
    })
  }

  fn(it)
}

describe.skip = (suite: string, fn: (...args: any[]) => void) => {

  const it = (name: string, fn: (...args: any[]) => void) => {
    Deno.test({
      name: `case '${suite}' - '${name}'`, fn,
      fn,
      ignore: true,
      sanitizeResources: false,
      sanitizeOps: false,
    })
  }

  it.skip = (name: string, fn: (...args: any[]) => void) => {
    Deno.test({
      name: `case '${suite}' - '${name}'`, fn,
      fn,
      ignore: true,
      sanitizeResources: false,
      sanitizeOps: false,
    })
  }

  fn(it)
}

export { describe };


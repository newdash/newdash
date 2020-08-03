import { assert, assertEquals, AssertionError, assertNotEquals, assertStrictEquals, assertThrows, equal } from "https://deno.land/std@0.61.0/testing/asserts.ts"
import { isCyclic } from "./cycle.ts"

export const strictEqual = assertStrictEquals
export const ok = assert

export function notStrictEqual(actual: any, expect: any) {
  // ref not equal
  if (actual !== expect) {
    return
  } else {
    throw new AssertionError("actual and expected are strict equal")
  }
}

export const notEqual = assertNotEquals

export function deepStrictEqual(actual: any, expected: any, m: any): any {
  // if object is circular object, not check it for deno language
  if (isCyclic(actual) || isCyclic([expected])) {
    return
  }
  return assertEquals(actual, expected, m)
}
export const throws = assertThrows

export default {
  strictEqual,
  deepStrictEqual,
  notStrictEqual,
  ok,
  equal,
  notEqual,
  throws
}

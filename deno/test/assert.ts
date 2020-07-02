import { assertStrictEquals, assert, assertNotEquals, equal, assertEquals, AssertionError, assertThrows } from "https://deno.land/std/testing/asserts.ts"

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
export const deepStrictEqual = assertEquals
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

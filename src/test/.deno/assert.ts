import { assertStrictEq, assert, assertNotEquals } from "https://deno.land/std/testing/asserts.ts"

export const strictEqual = assertStrictEq
export const deepStrictEqual = assertStrictEq
export const ok = assert
export const notStrictEqual = assertNotEquals

export default {
  strictEqual,
  deepStrictEqual,
  notStrictEqual,
  ok
}

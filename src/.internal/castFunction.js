import { identity } from "./identity";

export function castFunction(value) {
  return typeof value == 'function' ? value : identity;
}

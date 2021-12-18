import toHashCode from "./toHashCode";

/**
 * generate hash value from values
 *
 * @category Functional
 * @since 5.18.0
 * @param args
 * @returns the hash of the object (string(32))
 *
 *
 * ```ts
 * hash() // => 'd41d8cd98f00b204e9800998ecf8427e'
 * hash(1) // => '0ebf66ef421c088eaba5e3b47176d2b3'
 * hash('1') // the data type is aware => '8e71db5ef074ed1210bee7b7c854365d'
 * hash({a:1}) // => '0ebf66ef421c088eaba5e3b47176d2b3'
 * hash({a:1,b:2}) // => '6f2e650dd73e36d596fa487d8cf93f47'
 * hash({b:2,a:1}) // => '6f2e650dd73e36d596fa487d8cf93f47'
 *
 * ```
 */
export function hash(...args: any[]): string {
  return toHashCode(args);
}

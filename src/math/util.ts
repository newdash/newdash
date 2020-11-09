import forEach from '../forEach';


/**
 * check array all are numbers
 *
 * @private
 * @internal
 * @ignore
 * @since 5.18.0
 * @param values
 */
export function checkArray(values: ArrayLike<any>) {
  forEach(values, (value, idx) => {
    const tValue = typeof value;
    if (tValue !== 'number' && tValue !== 'bigint') {
      throw new TypeError(`array[${idx}] is ${tValue}, all items must be number`);
    }
    if (value === NaN) {
      throw new TypeError(`array[${idx}] is NaN, all items must be number`);
    }
  });
}

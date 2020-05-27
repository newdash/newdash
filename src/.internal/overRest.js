const nativeMax = Math.max

/**
 * A specialized version of `baseRest` which transforms the rest array.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @param {Function} transform The rest array transform.
 * @returns {Function} Returns the new function.
 */
function overRest(func, start, transform) {
  start = nativeMax(start === undefined ? (func.length - 1) : start, 0)
  return function() {
    // eslint-disable-next-line prefer-rest-params
    const args = arguments
    let index = -1
    const length = nativeMax(args.length - start, 0)
    const array = Array(length)

    while (++index < length) {
      array[index] = args[start + index]
    }
    index = -1
    const otherArgs = Array(start + 1)
    while (++index < start) {
      otherArgs[index] = args[index]
    }
    otherArgs[start] = transform(array)
    return func.apply(this, otherArgs)
  }
}

export default overRest

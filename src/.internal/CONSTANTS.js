/** Used as the size to enable large array optimizations. */
export const LARGE_ARRAY_SIZE = 200

/** Error message constants. */
export const CORE_ERROR_TEXT = 'Unsupported core-js use. Try https://npms.io/search?q=ponyfill.'
export const FUNC_ERROR_TEXT = 'Expected a function'

/** Used to stand-in for `undefined` hash values. */
export const HASH_UNDEFINED = '__lodash_hash_undefined__'

/** Used as the maximum memoize cache size. */
export const MAX_MEMOIZE_SIZE = 500

/** Used as the internal argument placeholder. */
export const PLACEHOLDER = '__lodash_placeholder__'

/** Used to compose bitmasks for cloning. */
export const CLONE_DEEP_FLAG = 1
export const CLONE_FLAT_FLAG = 2
export const CLONE_SYMBOLS_FLAG = 4

/** Used to compose bitmasks for value comparisons. */
export const COMPARE_PARTIAL_FLAG = 1
export const COMPARE_UNORDERED_FLAG = 2

/** Used to compose bitmasks for function metadata. */
export const WRAP_BIND_FLAG = 1
export const WRAP_BIND_KEY_FLAG = 2
export const WRAP_CURRY_BOUND_FLAG = 4
export const WRAP_CURRY_FLAG = 8
export const WRAP_CURRY_RIGHT_FLAG = 16
export const WRAP_PARTIAL_FLAG = 32
export const WRAP_PARTIAL_RIGHT_FLAG = 64
export const WRAP_ARY_FLAG = 128
export const WRAP_REARG_FLAG = 256
export const WRAP_FLIP_FLAG = 512

/** Used as default options for `_.truncate`. */
export const DEFAULT_TRUNC_LENGTH = 30
export const DEFAULT_TRUNC_OMISSION = '...'

/** Used to detect hot functions by number of calls within a span of milliseconds. */
export const HOT_COUNT = 800
export const HOT_SPAN = 16

/** Used to indicate the type of lazy iteratees. */
export const LAZY_FILTER_FLAG = 1
export const LAZY_MAP_FLAG = 2
export const LAZY_WHILE_FLAG = 3

/** Used as references for various `Number` constants. */
export const INFINITY = 1 / 0
export const MAX_SAFE_INTEGER = 9007199254740991
export const MAX_INTEGER = 1.7976931348623157e+308
export const NAN = 0 / 0

/** Used as references for the maximum length and index of an array. */
export const MAX_ARRAY_LENGTH = 4294967295
export const MAX_ARRAY_INDEX = MAX_ARRAY_LENGTH - 1
export const HALF_MAX_ARRAY_LENGTH = MAX_ARRAY_LENGTH >>> 1

export const metaMap = WeakMap && new WeakMap;

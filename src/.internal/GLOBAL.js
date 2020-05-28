import { WRAP_ARY_FLAG, WRAP_BIND_FLAG, WRAP_BIND_KEY_FLAG, WRAP_CURRY_FLAG, WRAP_CURRY_RIGHT_FLAG, WRAP_FLIP_FLAG, WRAP_PARTIAL_FLAG, WRAP_PARTIAL_RIGHT_FLAG, WRAP_REARG_FLAG } from "./CONSTANTS";
import toSource from "./toSource";
import overArg from "./overArg";


/** Used to associate wrap methods with their bit flags. */
export const wrapFlags = [
  ['ary', WRAP_ARY_FLAG],
  ['bind', WRAP_BIND_FLAG],
  ['bindKey', WRAP_BIND_KEY_FLAG],
  ['curry', WRAP_CURRY_FLAG],
  ['curryRight', WRAP_CURRY_RIGHT_FLAG],
  ['flip', WRAP_FLIP_FLAG],
  ['partial', WRAP_PARTIAL_FLAG],
  ['partialRight', WRAP_PARTIAL_RIGHT_FLAG],
  ['rearg', WRAP_REARG_FLAG]
];

/** `Object#toString` result references. */
export const argsTag = '[object Arguments]',
  arrayTag = '[object Array]',
  asyncTag = '[object AsyncFunction]',
  boolTag = '[object Boolean]',
  dateTag = '[object Date]',
  domExcTag = '[object DOMException]',
  errorTag = '[object Error]',
  funcTag = '[object Function]',
  genTag = '[object GeneratorFunction]',
  mapTag = '[object Map]',
  numberTag = '[object Number]',
  nullTag = '[object Null]',
  objectTag = '[object Object]',
  promiseTag = '[object Promise]',
  proxyTag = '[object Proxy]',
  regexpTag = '[object RegExp]',
  setTag = '[object Set]',
  stringTag = '[object String]',
  symbolTag = '[object Symbol]',
  undefinedTag = '[object Undefined]',
  weakMapTag = '[object WeakMap]',
  weakSetTag = '[object WeakSet]';

export const arrayBufferTag = '[object ArrayBuffer]',
  dataViewTag = '[object DataView]',
  float32Tag = '[object Float32Array]',
  float64Tag = '[object Float64Array]',
  int8Tag = '[object Int8Array]',
  int16Tag = '[object Int16Array]',
  int32Tag = '[object Int32Array]',
  uint8Tag = '[object Uint8Array]',
  uint8ClampedTag = '[object Uint8ClampedArray]',
  uint16Tag = '[object Uint16Array]',
  uint32Tag = '[object Uint32Array]';

/** Used to match empty string literals in compiled template source. */
export const reEmptyStringLeading = /\b__p \+= '';/g,
  reEmptyStringMiddle = /\b(__p \+=) '' \+/g,
  reEmptyStringTrailing = /(__e\(.*?\)|\b__t\)) \+\n'';/g;

/** Used to match HTML entities and HTML characters. */
export const reEscapedHtml = /&(?:amp|lt|gt|quot|#39);/g,
  reUnescapedHtml = /[&<>"']/g,
  reHasEscapedHtml = RegExp(reEscapedHtml.source),
  reHasUnescapedHtml = RegExp(reUnescapedHtml.source);

/** Used to match template delimiters. */
export const reEscape = /<%-([\s\S]+?)%>/g,
  reEvaluate = /<%([\s\S]+?)%>/g,
  reInterpolate = /<%=([\s\S]+?)%>/g;

/** Used to match property names within property paths. */
export const reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
  reIsPlainProp = /^\w*$/,
  rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
export const reRegExpChar = /[\\^$.*+?()[\]{}|]/g,
  reHasRegExpChar = RegExp(reRegExpChar.source);

/** Used to match leading and trailing whitespace. */
export const reTrim = /^\s+|\s+$/g,
  reTrimStart = /^\s+/,
  reTrimEnd = /\s+$/;

/** Used to match wrap detail comments. */
export const reWrapComment = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/,
  reWrapDetails = /\{\n\/\* \[wrapped with (.+)\] \*/,
  reSplitDetails = /,? & /;

/** Used to match words composed of alphanumeric characters. */
export const reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;

/** Used to match backslashes in property paths. */
export const reEscapeChar = /\\(\\)?/g;

/**
 * Used to match
 * [ES template delimiters](http://ecma-international.org/ecma-262/7.0/#sec-template-literal-lexical-components).
 */
export const reEsTemplate = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g;

/** Used to match `RegExp` flags from their coerced string values. */
export const reFlags = /\w*$/;

/** Used to detect bad signed hexadecimal string values. */
export const reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
export const reIsBinary = /^0b[01]+$/i;

/** Used to detect host constructors (Safari). */
export const reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used to detect octal string values. */
export const reIsOctal = /^0o[0-7]+$/i;

/** Used to detect unsigned integer values. */
export const reIsUint = /^(?:0|[1-9]\d*)$/;

/** Used to match Latin Unicode letters (excluding mathematical operators). */
export const reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;

/** Used to ensure capturing order of template delimiters. */
export const reNoMatch = /($^)/;

/** Used to match unescaped characters in compiled string literals. */
export const reUnescapedString = /['\n\r\u2028\u2029\\]/g;

/** Used to compose unicode character classes. */
export const rsAstralRange = '\\ud800-\\udfff',
  rsComboMarksRange = '\\u0300-\\u036f',
  reComboHalfMarksRange = '\\ufe20-\\ufe2f',
  rsComboSymbolsRange = '\\u20d0-\\u20ff',
  rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange,
  rsDingbatRange = '\\u2700-\\u27bf',
  rsLowerRange = 'a-z\\xdf-\\xf6\\xf8-\\xff',
  rsMathOpRange = '\\xac\\xb1\\xd7\\xf7',
  rsNonCharRange = '\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf',
  rsPunctuationRange = '\\u2000-\\u206f',
  rsSpaceRange = ' \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000',
  rsUpperRange = 'A-Z\\xc0-\\xd6\\xd8-\\xde',
  rsVarRange = '\\ufe0e\\ufe0f',
  rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;

/** Used to compose unicode capture groups. */
export const rsApos = "['\u2019]",
  rsAstral = '[' + rsAstralRange + ']',
  rsBreak = '[' + rsBreakRange + ']',
  rsCombo = '[' + rsComboRange + ']',
  rsDigits = '\\d+',
  rsDingbat = '[' + rsDingbatRange + ']',
  rsLower = '[' + rsLowerRange + ']',
  rsMisc = '[^' + rsAstralRange + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + ']',
  rsFitz = '\\ud83c[\\udffb-\\udfff]',
  rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')',
  rsNonAstral = '[^' + rsAstralRange + ']',
  rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}',
  rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]',
  rsUpper = '[' + rsUpperRange + ']',
  rsZWJ = '\\u200d';

/** Used to compose unicode regexes. */
export const rsMiscLower = '(?:' + rsLower + '|' + rsMisc + ')',
  rsMiscUpper = '(?:' + rsUpper + '|' + rsMisc + ')',
  rsOptContrLower = '(?:' + rsApos + '(?:d|ll|m|re|s|t|ve))?',
  rsOptContrUpper = '(?:' + rsApos + '(?:D|LL|M|RE|S|T|VE))?',
  reOptMod = rsModifier + '?',
  rsOptVar = '[' + rsVarRange + ']?',
  rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*',
  rsOrdLower = '\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])',
  rsOrdUpper = '\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])',
  rsSeq = rsOptVar + reOptMod + rsOptJoin,
  rsEmoji = '(?:' + [rsDingbat, rsRegional, rsSurrPair].join('|') + ')' + rsSeq,
  rsSymbol = '(?:' + [rsNonAstral + rsCombo + '?', rsCombo, rsRegional, rsSurrPair, rsAstral].join('|') + ')';

/** Used to match apostrophes. */
export const reApos = RegExp(rsApos, 'g');

/**
 * Used to match [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks) and
 * [combining diacritical marks for symbols](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks_for_Symbols).
 */
export const reComboMark = RegExp(rsCombo, 'g');

/** Used to match [string symbols](https://mathiasbynens.be/notes/javascript-unicode). */
export const reUnicode = RegExp(rsFitz + '(?=' + rsFitz + ')|' + rsSymbol + rsSeq, 'g');

/** Used to match complex or compound words. */
export const reUnicodeWord = RegExp([
  rsUpper + '?' + rsLower + '+' + rsOptContrLower + '(?=' + [rsBreak, rsUpper, '$'].join('|') + ')',
  rsMiscUpper + '+' + rsOptContrUpper + '(?=' + [rsBreak, rsUpper + rsMiscLower, '$'].join('|') + ')',
  rsUpper + '?' + rsMiscLower + '+' + rsOptContrLower,
  rsUpper + '+' + rsOptContrUpper,
  rsOrdUpper,
  rsOrdLower,
  rsDigits,
  rsEmoji
].join('|'), 'g');

/** Used to detect strings with [zero-width joiners or code points from the astral planes](http://eev.ee/blog/2015/09/12/dark-corners-of-unicode/). */
export const reHasUnicode = RegExp('[' + rsZWJ + rsAstralRange + rsComboRange + rsVarRange + ']');

/** Used to detect strings that need a more robust regexp to match words. */
export const reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;

/** Used to assign default `context` object properties. */
export const contextProps = [
  'Array', 'Buffer', 'DataView', 'Date', 'Error', 'Float32Array', 'Float64Array',
  'Function', 'Int8Array', 'Int16Array', 'Int32Array', 'Map', 'Math', 'Object',
  'Promise', 'RegExp', 'Set', 'String', 'Symbol', 'TypeError', 'Uint8Array',
  'Uint8ClampedArray', 'Uint16Array', 'Uint32Array', 'WeakMap',
  '_', 'clearTimeout', 'isFinite', 'parseInt', 'setTimeout'
];

/** Used to make template sourceURLs easier to identify. */
export const templateCounter = -1;

/** Used to identify `toStringTag` values of typed arrays. */
export const typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
  typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
  typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
  typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
  typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
  typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
  typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
  typedArrayTags[errorTag] = typedArrayTags[funcTag] =
  typedArrayTags[mapTag] = typedArrayTags[numberTag] =
  typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
  typedArrayTags[setTag] = typedArrayTags[stringTag] =
  typedArrayTags[weakMapTag] = false;

/** Used to identify `toStringTag` values supported by `_.clone`. */
export const cloneableTags = {};
cloneableTags[argsTag] = cloneableTags[arrayTag] =
  cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] =
  cloneableTags[boolTag] = cloneableTags[dateTag] =
  cloneableTags[float32Tag] = cloneableTags[float64Tag] =
  cloneableTags[int8Tag] = cloneableTags[int16Tag] =
  cloneableTags[int32Tag] = cloneableTags[mapTag] =
  cloneableTags[numberTag] = cloneableTags[objectTag] =
  cloneableTags[regexpTag] = cloneableTags[setTag] =
  cloneableTags[stringTag] = cloneableTags[symbolTag] =
  cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
  cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
cloneableTags[errorTag] = cloneableTags[funcTag] =
  cloneableTags[weakMapTag] = false;

/** Used to map Latin Unicode letters to basic Latin letters. */
export const deburredLetters = {
  // Latin-1 Supplement block.
  '\xc0': 'A', '\xc1': 'A', '\xc2': 'A', '\xc3': 'A', '\xc4': 'A', '\xc5': 'A',
  '\xe0': 'a', '\xe1': 'a', '\xe2': 'a', '\xe3': 'a', '\xe4': 'a', '\xe5': 'a',
  '\xc7': 'C', '\xe7': 'c',
  '\xd0': 'D', '\xf0': 'd',
  '\xc8': 'E', '\xc9': 'E', '\xca': 'E', '\xcb': 'E',
  '\xe8': 'e', '\xe9': 'e', '\xea': 'e', '\xeb': 'e',
  '\xcc': 'I', '\xcd': 'I', '\xce': 'I', '\xcf': 'I',
  '\xec': 'i', '\xed': 'i', '\xee': 'i', '\xef': 'i',
  '\xd1': 'N', '\xf1': 'n',
  '\xd2': 'O', '\xd3': 'O', '\xd4': 'O', '\xd5': 'O', '\xd6': 'O', '\xd8': 'O',
  '\xf2': 'o', '\xf3': 'o', '\xf4': 'o', '\xf5': 'o', '\xf6': 'o', '\xf8': 'o',
  '\xd9': 'U', '\xda': 'U', '\xdb': 'U', '\xdc': 'U',
  '\xf9': 'u', '\xfa': 'u', '\xfb': 'u', '\xfc': 'u',
  '\xdd': 'Y', '\xfd': 'y', '\xff': 'y',
  '\xc6': 'Ae', '\xe6': 'ae',
  '\xde': 'Th', '\xfe': 'th',
  '\xdf': 'ss',
  // Latin Extended-A block.
  '\u0100': 'A', '\u0102': 'A', '\u0104': 'A',
  '\u0101': 'a', '\u0103': 'a', '\u0105': 'a',
  '\u0106': 'C', '\u0108': 'C', '\u010a': 'C', '\u010c': 'C',
  '\u0107': 'c', '\u0109': 'c', '\u010b': 'c', '\u010d': 'c',
  '\u010e': 'D', '\u0110': 'D', '\u010f': 'd', '\u0111': 'd',
  '\u0112': 'E', '\u0114': 'E', '\u0116': 'E', '\u0118': 'E', '\u011a': 'E',
  '\u0113': 'e', '\u0115': 'e', '\u0117': 'e', '\u0119': 'e', '\u011b': 'e',
  '\u011c': 'G', '\u011e': 'G', '\u0120': 'G', '\u0122': 'G',
  '\u011d': 'g', '\u011f': 'g', '\u0121': 'g', '\u0123': 'g',
  '\u0124': 'H', '\u0126': 'H', '\u0125': 'h', '\u0127': 'h',
  '\u0128': 'I', '\u012a': 'I', '\u012c': 'I', '\u012e': 'I', '\u0130': 'I',
  '\u0129': 'i', '\u012b': 'i', '\u012d': 'i', '\u012f': 'i', '\u0131': 'i',
  '\u0134': 'J', '\u0135': 'j',
  '\u0136': 'K', '\u0137': 'k', '\u0138': 'k',
  '\u0139': 'L', '\u013b': 'L', '\u013d': 'L', '\u013f': 'L', '\u0141': 'L',
  '\u013a': 'l', '\u013c': 'l', '\u013e': 'l', '\u0140': 'l', '\u0142': 'l',
  '\u0143': 'N', '\u0145': 'N', '\u0147': 'N', '\u014a': 'N',
  '\u0144': 'n', '\u0146': 'n', '\u0148': 'n', '\u014b': 'n',
  '\u014c': 'O', '\u014e': 'O', '\u0150': 'O',
  '\u014d': 'o', '\u014f': 'o', '\u0151': 'o',
  '\u0154': 'R', '\u0156': 'R', '\u0158': 'R',
  '\u0155': 'r', '\u0157': 'r', '\u0159': 'r',
  '\u015a': 'S', '\u015c': 'S', '\u015e': 'S', '\u0160': 'S',
  '\u015b': 's', '\u015d': 's', '\u015f': 's', '\u0161': 's',
  '\u0162': 'T', '\u0164': 'T', '\u0166': 'T',
  '\u0163': 't', '\u0165': 't', '\u0167': 't',
  '\u0168': 'U', '\u016a': 'U', '\u016c': 'U', '\u016e': 'U', '\u0170': 'U', '\u0172': 'U',
  '\u0169': 'u', '\u016b': 'u', '\u016d': 'u', '\u016f': 'u', '\u0171': 'u', '\u0173': 'u',
  '\u0174': 'W', '\u0175': 'w',
  '\u0176': 'Y', '\u0177': 'y', '\u0178': 'Y',
  '\u0179': 'Z', '\u017b': 'Z', '\u017d': 'Z',
  '\u017a': 'z', '\u017c': 'z', '\u017e': 'z',
  '\u0132': 'IJ', '\u0133': 'ij',
  '\u0152': 'Oe', '\u0153': 'oe',
  '\u0149': "'n", '\u017f': 's'
};

/** Used to map characters to HTML entities. */
export const htmlEscapes = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
};

/** Used to map HTML entities to characters. */
export const htmlUnescapes = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#39;': "'"
};

/** Used to escape characters for inclusion in compiled string literals. */
export const stringEscapes = {
  '\\': '\\',
  "'": "'",
  '\n': 'n',
  '\r': 'r',
  '\u2028': 'u2028',
  '\u2029': 'u2029'
};

/** Built-in method references without a dependency on `root`. */
export const freeParseFloat = parseFloat,
  freeParseInt = parseInt;

/** Detect free variable `global` from Node. */
export const freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
export const freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
export const root = freeGlobal || freeSelf || Function('return this')();

/** Detect free variable `exports`. */
export const freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
export const freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
export const moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node. */
export const freeProcess = moduleExports && freeGlobal.process;

/** Used to access faster Node helpers. */
export const nodeUtil = (function () {
  try {
    // Use `util.types` for Node 10+.
    var types = freeModule && freeModule.require && freeModule.require('util').types;

    if (types) {
      return types;
    }

    // Legacy `process.binding('util')` for Node < 10.
    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  } catch (e) { }
}());

/* Node helper references. */
export const nodeIsArrayBuffer = nodeUtil && nodeUtil.isArrayBuffer,
  nodeIsDate = nodeUtil && nodeUtil.isDate,
  nodeIsMap = nodeUtil && nodeUtil.isMap,
  nodeIsRegExp = nodeUtil && nodeUtil.isRegExp,
  nodeIsSet = nodeUtil && nodeUtil.isSet,
  nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

/** Used for built-in method references. */
export const arrayProto = Array.prototype,
  funcProto = Function.prototype,
  objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
export const funcToString = funcProto.toString;

/** Used to check objects for own properties. */
export const hasOwnProperty = objectProto.hasOwnProperty;

/** Used to generate unique IDs. */
export const idCounter = 0;

/** Used to detect methods masquerading as native. */
export const maskSrcKey = ''

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
export const nativeObjectToString = objectProto.toString;

/** Used to infer the `Object` constructor. */
export const objectCtorString = funcToString.call(Object);

/** Built-in value references. */
export const allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined,
  getPrototype = overArg(Object.getPrototypeOf, Object),
  objectCreate = Object.create,
  propertyIsEnumerable = objectProto.propertyIsEnumerable,
  splice = arrayProto.splice,
  spreadableSymbol = Symbol ? Symbol.isConcatSpreadable : undefined,
  symIterator = Symbol ? Symbol.iterator : undefined,
  symToStringTag = Symbol ? Symbol.toStringTag : undefined;

export const defineProperty = Object.defineProperty

/** Mocked built-ins. */
export const ctxClearTimeout = clearTimeout
export const ctxNow = Date.now
export const ctxSetTimeout = setTimeout

/* Built-in method references for those with the same name as other `lodash` methods. */
export const nativeCeil = Math.ceil,
  nativeFloor = Math.floor,
  nativeGetSymbols = Object.getOwnPropertySymbols,
  nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined,
  nativeIsFinite = isFinite,
  nativeJoin = arrayProto.join,
  nativeKeys = overArg(Object.keys, Object),
  nativeMax = Math.max,
  nativeMin = Math.min,
  nativeNow = Date.now,
  nativeParseInt = parseInt,
  nativeRandom = Math.random,
  nativeReverse = arrayProto.reverse;

/* Built-in method references that are verified to be native. */
export const nativeCreate = Object.create

/** Used to store function metadata. */
export const metaMap = WeakMap && new WeakMap;

/** Used to lookup unminified function names. */
export const realNames = {};

/** Used to detect maps, sets, and weakmaps. */
export const dataViewCtorString = toSource(DataView),
  mapCtorString = toSource(Map),
  promiseCtorString = toSource(Promise),
  setCtorString = toSource(Set),
  weakMapCtorString = toSource(WeakMap);

/** Used to convert symbols to primitives and strings. */
export const symbolProto = Symbol ? Symbol.prototype : undefined,
  symbolValueOf = symbolProto ? symbolProto.valueOf : undefined,
  symbolToString = symbolProto ? symbolProto.toString : undefined;

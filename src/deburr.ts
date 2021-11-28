// @ts-nocheck
import deburrLetter from "./.internal/deburrLetter";

/**
 * Used to match Latin Unicode letters (excluding mathematical operators).
 * @ignore
 */
const reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;

/** @ignore */ const rsComboMarksRange = "\\u0300-\\u036f";
/** @ignore */ const reComboHalfMarksRange = "\\ufe20-\\ufe2f";
/** @ignore */ const rsComboSymbolsRange = "\\u20d0-\\u20ff";
/** @ignore */ const rsComboMarksExtendedRange = "\\u1ab0-\\u1aff";
/** @ignore */ const rsComboMarksSupplementRange = "\\u1dc0-\\u1dff";
/** @ignore */ const rsComboRange = rsComboMarksRange +
 reComboHalfMarksRange +
 rsComboSymbolsRange +
 rsComboMarksExtendedRange +
 rsComboMarksSupplementRange;

/**
 * Used to compose unicode capture groups.
 * @ignore
 */
const rsCombo = `[${rsComboRange}]`;

/**
 * Used to match [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks) and
 * [combining diacritical marks for symbols](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks_for_Symbols).
 * @ignore
 */
const reComboMark = RegExp(rsCombo, "g");

/**
 * Deburrs `string` by converting
 * [Latin-1 Supplement](https://en.wikipedia.org/wiki/Latin-1_Supplement_(Unicode_block)#Character_table)
 * and [Latin Extended-A](https://en.wikipedia.org/wiki/Latin_Extended-A)
 * letters to basic Latin letters and removing
 * [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks).
 *
 * @since 5.7.0
 * @category String
 * @param str The string to deburr.
 * @returns Returns the deburred string.
 * @example
 *
 * ```js
 * deburr('déjà vu')
 * // => 'deja vu'
 * ```
 */
export function deburr(str: string): string {
  return str && str.replace(reLatin, deburrLetter).replace(reComboMark, "");
}

export default deburr;

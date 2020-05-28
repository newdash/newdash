import baseIsMatch from './baseIsMatch'
import getMatchData from './getMatchData'
import matchesStrictComparable from './matchesStrictComparable'

/**
 * The base implementation of `matches` which doesn't clone `source`.
 *
 * @private
 * @param {Object} source The object of property values to match.
 * @returns {Function} Returns the new spec function.
 */
function baseMatches(source) {
  const matchData = getMatchData(source)
  if (matchData.length === 1 && matchData[0][2]) {
    return matchesStrictComparable(matchData[0][0], matchData[0][1])
  }
  return (object) => object === source || baseIsMatch(object, source, matchData)
}

export default baseMatches

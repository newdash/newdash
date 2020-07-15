import assert from 'assert'
import { _ } from './utils'
import each from '../each'

import { sortedIndexOf } from "../sortedIndexOf";
import { sortedLastIndexOf } from "../sortedLastIndexOf";

describe('sortedIndexOf methods', () => {

  each([['sortedIndexOf', sortedIndexOf], ['sortedLastIndexOf', sortedLastIndexOf]], ([methodName, func]) => {

    const isSortedIndexOf = methodName == 'sortedIndexOf'

    it(`\`_.${methodName}\` should perform a binary search`, () => {
      const sorted = [4, 4, 5, 5, 6, 6]
      assert.deepStrictEqual(func(sorted, 5), isSortedIndexOf ? 2 : 3)
    })

  })
})

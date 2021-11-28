import * as assert from "assert";
import { _ } from "./utils";
import each from "../src/each";

import { sortedIndexOf } from "../src/sortedIndexOf";
import { sortedLastIndexOf } from "../src/sortedLastIndexOf";

describe("sortedIndexOf methods", () => {

  each([["sortedIndexOf", sortedIndexOf], ["sortedLastIndexOf", sortedLastIndexOf]], ([methodName, func]) => {

    const isSortedIndexOf = methodName == "sortedIndexOf";

    it(`\`_.${methodName}\` should perform a binary search`, () => {
      const sorted = [4, 4, 5, 5, 6, 6];
      assert.deepStrictEqual(func(sorted, 5), isSortedIndexOf ? 2 : 3);
    });

  });
});

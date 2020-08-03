import * as assert from 'assert';
import { falsey, stubObject } from './utils';
import { mapKeys } from '../src/mapKeys';
import { mapValues } from '../src/mapValues';
import map from '../src/map';
import each from '../src/each';

describe('mapKeys and mapValues', () => {
  each(
    [['mapKeys', mapKeys], ['mapValues', mapValues]],
    ([methodName, func]) => {

      it(`\`_.${methodName}\` should iterate over own string keyed properties of objects`, () => {
        function Foo() {
          this.a = 'a';
        }
        Foo.prototype.b = 'b';

        const actual = func(new Foo, (value, key) => key);
        assert.deepStrictEqual(actual, { 'a': 'a' });
      });

      it(`\`_.${methodName}\` should accept a falsey \`object\``, () => {
        const expected = map(falsey, stubObject);

        const actual = map(falsey, (object, index) => {
          try {
            return index ? func(object) : func();
          } catch (e) { }
        });

        assert.deepStrictEqual(actual, expected);
      });


    });
});

import assert from 'assert';
import { map, constant, deburr } from '../';
import { burredLetters, deburredLetters, comboMarks } from './utils.js';

describe('deburr', function () {
  it('should convert Latin Unicode letters to basic Latin', function () {
    var actual = map(burredLetters, deburr);
    assert.deepStrictEqual(actual, deburredLetters);
  });

  it('should not deburr Latin mathematical operators', function () {
    var operators = ['\xd7', '\xf7'],
      actual = map(operators, deburr);

    assert.deepStrictEqual(actual, operators);
  });

  it('should deburr combining diacritical marks', function () {
    var expected = map(comboMarks, constant('ei'));

    var actual = map(comboMarks, function (chr) {
      return deburr('e' + chr + 'i');
    });

    assert.deepStrictEqual(actual, expected);
  });
});

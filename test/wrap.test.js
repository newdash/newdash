import assert from 'assert';
import { wrap } from '../src/wrap';

describe('wrap', () => {

  it('should support wrap', () => {

    assert.equal(wrap('aaaaabbcc','e'),'eaaaaabbcce');
    assert.equal(wrap('aaaaabbcc','a'),'aaaaabbcca');

  });

});

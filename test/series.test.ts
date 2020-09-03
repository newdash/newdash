
import assert from 'assert';
import { series } from '../src/series';
import { assertShouldThrowError } from './helpers';

describe('series test suite', () => {


  it('should support run async operations', async() => {


    const result = await series(
      () => Promise.resolve(1),
      () => Promise.resolve(2),
      () => Promise.resolve(3)
    );

    assert.deepStrictEqual(result, [1, 2, 3]);


  });

  it('should call operations one by one', async() => {
    const op = [];

    await series(
      () => new Promise((resolve) => { op.push(1); resolve(); }),
      () => new Promise((resolve) => { op.push(2); resolve(); }),
      () => new Promise((resolve) => { op.push(3); resolve(); })
    );

    assert.deepStrictEqual(op, [1, 2, 3]);

  });

  it('should support throw errors', async() => {

    const err = new Error();

    await assertShouldThrowError(async() => {
      await series(
        () => Promise.resolve(1),
        () => Promise.reject(err),
        () => Promise.resolve(3)
      );
    });

  });

});

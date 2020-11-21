
import assert from 'assert';
import { series } from '../src/series';
import { assertShouldThrowError } from './helpers';

const asyncOperation = (value, onCall = () => { }, timeout = 100) => () => {
  if (onCall) {
    onCall();
  }
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (value instanceof Error) {
        reject(value);
      } else {
        resolve(value);
      }
    }, timeout);
  });
};

describe('series', () => {

  it('should support run async operations', async() => {

    const callTrace = [];

    const result = await series(
      asyncOperation(1, () => callTrace.push('f1')),
      asyncOperation(2, () => callTrace.push('f2')),
      asyncOperation(3, () => callTrace.push('f3'))
    );

    assert.deepStrictEqual(callTrace, ['f1', 'f2', 'f3']);
    assert.deepStrictEqual(result, [1, 2, 3]);


  });

  it('should stop call next operations on error', async() => {
    const op = [];

    await assertShouldThrowError(async() => {
      await series(
        () => new Promise((resolve) => { op.push(1); resolve(null); }),
        () => Promise.reject(new Error()),
        () => new Promise((resolve) => { op.push(3); resolve(null); })
      );
    });

    assert.deepStrictEqual(op, [1]);

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

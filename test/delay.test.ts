import * as assert from 'assert';
import { slice } from './utils';
import delay from '../src/delay';

describe('delay', () => {

  it('should delay `func` execution', (done) => {
    let pass = false;
    delay(() => { pass = true; }, 32);

    setTimeout(() => {
      assert.ok(!pass);
    }, 1);

    setTimeout(() => {
      assert.ok(pass);
      done();
    }, 64);
  });

  it('should provide additional arguments to `func`', (done) => {
    let args;

    delay(function(...args1) {
      args = slice.call(arguments);
    }, 32, 1, 2);

    setTimeout(() => {
      assert.deepStrictEqual(args, [1, 2]);
      done();
    }, 64);
  });

  it('should use a default `wait` of `0`', (done) => {
    let pass = false;
    delay(() => { pass = true; });

    assert.ok(!pass);

    setTimeout(() => {
      assert.ok(pass);
      done();
    }, 0);
  });

  it('should be cancelable', (done) => {
    let pass = true;
    const timerId = delay(() => { pass = false; }, 32);
    assert.strictEqual(typeof timerId, 'number');

    clearTimeout(timerId);

    setTimeout(() => {
      assert.ok(pass);
      done();
    }, 64);
  });

  it('should works with parameter type', (done) => {
    let value: any;
    const f1 = (v1: number, v2: string, v3: boolean = false) => { value = v3 ? v1 : v2; };

    delay(f1, 32, 1, '2'); // with typescript type check

    setTimeout(() => {
      assert.strictEqual(value, '2');
      done();
    }, 64);

  });

});

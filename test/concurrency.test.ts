
import { concurrency } from '../src/concurrency';
import { assertShouldThrowError } from './helpers';
describe('concurrency', () => {


  it('should support concurrency.limit function', async () => {

    const currLimit = 5;
    let ctx = 0;

    const runner = concurrency.limit(async () => {
      ctx++;
    }, currLimit);

    const allRunner = [];

    for (let idx = 0; idx < 15; idx++) {
      allRunner.push(runner().then(() => {
        expect(ctx).toBeLessThanOrEqual(currLimit);
        ctx--;
      }));
    }

    await Promise.all(allRunner);

  });

  it('should support concurrency.limit function on error', async () => {

    class E1 extends Error { }

    const currLimit = 5;
    let ctx = 0;
    let total = 0;
    const max = 15;

    const runner = concurrency.limit(async () => {
      ctx++;
      total++;
      if (total > (max - 2)) {
        throw new E1();
      }
    }, currLimit);

    const allRunner = [];

    for (let idx = 0; idx < max; idx++) {
      allRunner.push(runner().then(() => {
        expect(ctx).toBeLessThanOrEqual(currLimit);
        ctx--;
      }));
    }
    await assertShouldThrowError(() => Promise.all(allRunner), E1);


  });

});

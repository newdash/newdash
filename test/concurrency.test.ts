
import { concurrency } from '../src/concurrency';
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

});

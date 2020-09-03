
import { series } from '../src/series';
describe('series test suite', () => {


  it('should support run async operations', async() => {


    const result = await series(
      () => Promise.resolve(1),
      () => Promise.resolve(2),
      () => Promise.resolve(3)
    );

    expect(result).toStrictEqual([1, 2, 3]);

  });

  it('should support throw errors', async() => {

    const err = new Error();

    expect(async() => {
      await series(
        () => Promise.resolve(1),
        () => Promise.reject(err),
        () => Promise.resolve(3)
      );
    }).rejects.toThrow(err);

  });

});

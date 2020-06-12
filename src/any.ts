

/**
 *
 * Promise.any implementation
 *
 * just ref the [MDN document](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/any)
 *
 * `Promise.any()` takes an iterable of Promise objects and, as soon as one of the promises in the iterable fulfils, returns a single promise that resolves with the value from that promise. If no promises in the iterable fulfil (if all of the given promises are rejected), then throw the array of errors
 *
 * @since 5.7.0
 * @category Async
 * @param iterable
 *
 * @throws Error list
 */
export async function any<T>(iterable: Iterable<Promise<T>>): Promise<T>;
export async function any(iterable: Iterable<Promise<any>>): Promise<any> {
  return new Promise((resolve, reject) => {
    const results = [];
    let total = 0;
    let finished = 0;
    let resolved = false;
    for (const task of iterable) {
      const index = total;
      task
        .then((value) => {
          results[index] = value;
          resolved = true;
          resolve(value);
        })
        .catch((error) => {
          results[index] = error;
        })
        .finally(() => {
          finished++;
          if (!resolved && finished == total) {
            reject(results);
          }
        });
      total++;
    }


  });

}

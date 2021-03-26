
interface SettleResult<T = any> {
  status: 'fulfilled' | 'rejected'
  value?: T
  reason?: any
}

/**
 * Promise.allSettled() implementation
 *
 * @since 5.18.0
 * @category Async
 * @param collection
 * @returns
 */
export async function allSettled<T = any>(collection: Array<Promise<T>>): Promise<Array<SettleResult<T>>> {
  // @ts-ignore
  return Promise.all(
    collection
      .map(
        (item) => item
          .then((value) => ({ status: 'fulfilled', value }))
          .catch((reason) => ({ status: 'rejected', reason }))
      )
  );
}

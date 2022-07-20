
interface SettleResult<T = any> {
  status: "fulfilled" | "rejected"
  value?: T
  reason?: any
}


/**
 * Promise.allSettled() implementation
 *
 * @author Theo Sun
 * @since 5.18.0
 * @category Async
 * @param collection
 * @returns
 */
export async function allSettled<A extends readonly unknown[] | []>(collection: A): Promise<{
  -readonly[K in keyof A]: SettleResult<Awaited<A[K]>>
}> {
  // TODO: native Promise.allSettled()
  // @ts-ignore
  return Promise.all(
    collection
      .map(
        (item) => item
          .then((value) => ({ status: "fulfilled", value }))
          .catch((reason) => ({ status: "rejected", reason }))
      )
  );
}

export async function assertShouldThrowError(func: Function, eType: any = Error): Promise<void> {
  let errorExist = false;
  try {
    const rt = func();
    if (rt instanceof Promise) {
      await rt;
    }
  } catch (error) {
    errorExist = true;
    // provide error type
    if (eType.prototype instanceof Error || eType === Error) {
      // check error type
      if (!(error instanceof eType)) {
        throw new TypeError(`require ${eType.name} but received ${error?.constructor?.name}`);
      }
    } else {
      // provide value
      if (error != eType) {
        throw new TypeError(`require ${eType} but received ${error}`);
      }
    }

  }
  if (!errorExist) {
    throw new Error('require throw error');
  }
}

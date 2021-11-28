

export async function assertShouldThrowError(actual: Function | Promise<any>, expected: any = Error): Promise<void> {
  let errorExist = false;
  try {
    let rt = undefined;
    if (typeof actual === "function") {
      rt = actual();
    }
    if (rt instanceof Promise) {
      await rt;
    }
  } catch (error) {
    errorExist = true;
    // provide error type
    if (expected.prototype instanceof Error || expected === Error) {
      // check error type
      if (!(error instanceof expected)) {
        throw new TypeError(`expect ${expected.name} but received ${error?.constructor?.name}`);
      }
    } else if (typeof expected === "string") {
      if (error.message.search(expected) < 0) {
        throw new TypeError(`expect message ${expected} but received ${error.message}`);
      }
    } else {
      // provide value
      if (error != expected) {
        throw new TypeError(`expect ${expected} but received ${error}`);
      }
    }

  }
  if (!errorExist) {
    throw new Error("require throw error");
  }
}


export async function assertShouldThrowError(func: Function, eType: ErrorConstructor = Error): Promise<void> {
  let errorExist = false
  try {
    const rt = func()
    if (rt instanceof Promise) {
      await rt
    }
  } catch (error) {
    errorExist = true
    // check error type
    if (!(error instanceof eType)) {
      throw TypeError(`require ${eType.name} but received ${error?.constructor?.name}`)
    }
  }
  if (!errorExist) {
    throw Error("require throw error")
  }
}


const describe = (name: string, fn: (...args: any[]) => void) => {
  Deno.test(name, fn)
}

const it = (name: string, fn: (...args: any[]) => void) => {
  Deno.test(name, fn)
}

export { it, describe }

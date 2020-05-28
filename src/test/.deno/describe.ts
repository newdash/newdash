
(window as any).describe = (name: string, fn: () => void) => {
  Deno.test({
    name,
    fn
  })
}

(window as any).it = (name: string, fn: () => void) => {
  Deno.test({
    name,
    fn
  })
}

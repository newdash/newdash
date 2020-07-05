// @ts-nocheck

export function platform(): string {
  switch (Deno.build.os) {
    case "windows":
      return "win32"
    default:
      return Deno.build.os
  }
}


export default { platform }

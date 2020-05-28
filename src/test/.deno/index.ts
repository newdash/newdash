import "./describe";
import * as path from "https://deno.land/std/path/mod.ts";

const __dirname = path.dirname(path.fromFileUrl(import.meta.url));

for await (const f of Deno.readDir(path.join(__dirname, ".."))) {
  if (f.isFile && f.name.endsWith(".test.js")) {
    import(path.join(__dirname, "..", f.name));
  }
}



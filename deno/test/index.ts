import './describe.ts';
import * as path from 'https://deno.land/std/path/mod.ts';

const __dirname = path.dirname(path.fromFileUrl(import.meta.url));

for await (const f of Deno.readDir(path.join(__dirname, '../../dist/deno/test'))) {
  if (f.isFile && (f.name.endsWith('.test.js') || f.name.endsWith('.test.ts'))) {
    import(path.join(__dirname, '../../dist/deno/test', f.name));
  }
}



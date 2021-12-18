# NewDash

[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/newdash/newdash/Github%20CI?label=nodejs%20test)](https://github.com/newdash/newdash/actions?query=workflow%3A%22Github+CI%22)
[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/newdash/newdash/Deno%20CI?label=deno%20test)](https://github.com/newdash/newdash/actions?query=workflow%3A%22Deno+CI%22)

[![Codecov](https://codecov.io/gh/newdash/newdash/branch/master/graph/badge.svg)](https://codecov.io/gh/newdash/newdash)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=newdash_newdash&metric=alert_status)](https://sonarcloud.io/dashboard?id=newdash_newdash)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=newdash_newdash&metric=security_rating)](https://sonarcloud.io/dashboard?id=newdash_newdash)
[![Total alerts](https://img.shields.io/lgtm/alerts/g/newdash/newdash.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/newdash/newdash/alerts/)
[![Netlify](https://img.shields.io/netlify/267b7429-c295-4d0e-90d0-97d772b9a821?label=docs)](https://newdash.netlify.fornever.org/)

[![npm (scoped)](https://img.shields.io/npm/v/@newdash/newdash?label=newdash)](https://www.npmjs.com/package/@newdash/newdash)
[![npm (scoped)](https://img.shields.io/npm/v/@newdash/newdash-deno?label=deno)](https://www.npmjs.com/package/@newdash/newdash-deno)
[![npm (scoped)](https://img.shields.io/npm/v/@newdash/newdash-es5?label=es5)](https://www.npmjs.com/package/@newdash/newdash-es5)
[![npm (scoped)](https://img.shields.io/npm/v/@newdash/newdash-es6?label=es6)](https://www.npmjs.com/package/@newdash/newdash-es6)
[![npm (scoped)](https://img.shields.io/npm/v/@newdash/newdash-umd?label=umd)](https://www.npmjs.com/package/@newdash/newdash-umd)
[![](https://data.jsdelivr.com/v1/package/npm/@newdash/newdash-umd/badge)](https://www.jsdelivr.com/package/npm/@newdash/newdash-umd)

**NewDash** is a hard fork of the [lodash](https://github.com/lodash/lodash) utility project, and re-build it with `typescript`.

## Quick Start

### NodeJS

works as you want.

```js
// const { first } = require("@newdash/newdash")
const { first } = require("@newdash/newdash/first") // Compatible with es6 module
first("abc")
// => "a"
```

### ES6 or Typescript

```js
// import { first } from "@newdash/newdash" // load all functions of @newdash
import first from "@newdash/newdash/first" // only load `first` function
first("abc")
// => "a"
```

### Deno Runtime

import from CDN, remember to add `.ts` suffix.

```js
// import { add } from "https://cdn.jsdelivr.net/npm/@newdash/newdash-deno/index.ts"
import { add } from "https://cdn.jsdelivr.net/npm/@newdash/newdash-deno/add.ts"

add(1, 2)
// => 3
add('1', '2')
// => '12'
add('1', 2) // different types
// throw error: TS2345 [ERROR]: Argument of type '2' is not assignable to parameter of type '"1"'.
```

### UMD Module (Browser Native)

just introduce `script` with html.

```html
<script src="https://cdn.jsdelivr.net/npm/@newdash/newdash-umd/newdash.min.js"></script>
```

## [API Document](https://newdash.netlify.fornever.org/)

### Highlight

- [`concurrency/limit`](https://newdash.netlify.fornever.org/modules/concurrency_limit.html#limit) - limit concurrency of async operations
- [`Mutex`](https://newdash.netlify.fornever.org/classes/functional_mutex.mutex#constructor) - exclusive executing
- [`hash`](https://newdash.netlify.fornever.org/modules/functional_hash.html#hash) - hash js object to stable string (MD5 based)
- [`LRUMap`](https://newdash.netlify.fornever.org/classes/functional_lrumap.lrumap#constructor) and [`TTLMap`](https://newdash.netlify.fornever.org/classes/functional_ttlmap.ttlmap#constructor) - Map implementations which concern about eviction

## Different Release

In most cases, just use the `@newdash/newdash` package is enough.

- `@newdash/newdash` - for modern `nodejs` environment, ready for all build tools which based on the nodejs `commonjs` module system (node, react, vuejs, webpack and more).
- `@newdash/newdash-deno` - for deno language support, with some transform, like add the '.ts' suffix for modules.
- `@newdash/newdash-es5` - for old `nodejs` environment, ready for `0.12 <= node version <= 8`.
- `@newdash/newdash-es6` - for modern build system, with `es6` module keywords so that build tool could strip the unused modules.
- `@newdash/newdash-umd` - for native browser without any build system, please access it with `unpkg` or `jsdeliver`

## [CHANGELOG](./CHANGELOG.md)

## [LICENSE](./LICENSE)

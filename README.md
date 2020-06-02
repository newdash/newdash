# NewDash

[![CircleCI](https://img.shields.io/circleci/build/github/newdash/newdash?label=circleci)](https://app.circleci.com/pipelines/github/newdash/newdash)
[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/newdash/newdash/Github%20CI?label=action)](https://github.com/newdash/newdash/actions?query=workflow%3A%22Github+CI%22)
[![codecov](https://codecov.io/gh/newdash/newdash/branch/master/graph/badge.svg)](https://codecov.io/gh/newdash/newdash)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=newdash_newdash&metric=alert_status)](https://sonarcloud.io/dashboard?id=newdash_newdash)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=newdash_newdash&metric=security_rating)](https://sonarcloud.io/dashboard?id=newdash_newdash)
[![Total alerts](https://img.shields.io/lgtm/alerts/g/newdash/newdash.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/newdash/newdash/alerts/)
[![Netlify](https://img.shields.io/netlify/267b7429-c295-4d0e-90d0-97d772b9a821?label=docs)](https://newdash.netlify.fornever.org/)

[![npm (scoped)](https://img.shields.io/npm/v/@newdash/newdash?label=all%20in%20one)](https://www.npmjs.com/package/@newdash/newdash)
[![npm (scoped)](https://img.shields.io/npm/v/@newdash/newdash-node?label=node)](https://www.npmjs.com/package/@newdash/newdash-node)
[![npm (scoped)](https://img.shields.io/npm/v/@newdash/newdash-es5?label=es5)](https://www.npmjs.com/package/@newdash/newdash-es5)
[![npm (scoped)](https://img.shields.io/npm/v/@newdash/newdash-es6?label=es6)](https://www.npmjs.com/package/@newdash/newdash-es6)
[![npm (scoped)](https://img.shields.io/npm/v/@newdash/newdash-umd?label=umd)](https://www.npmjs.com/package/@newdash/newdash-umd)
[![](https://data.jsdelivr.com/v1/package/npm/@newdash/newdash/badge)](https://www.jsdelivr.com/package/npm/@newdash/newdash)

**NewDash** is a hard fork project of the [lodash](https://github.com/lodash/lodash) utility project.

## Quick Start

### Traditional NodeJS

```js
const { first } = require("@newdash/newdash-node")
first("abc")
// => "a"
```

### Load Single Module On-Demand

```js
const first = require("@newdash/newdash-node/first")
first("abc")
// => "a"
```

### ES6 & Typescript

```js
// import { first } from "@newdash/newdash-node" // load all functions of @newdash
import first from "@newdash/newdash-node/first" // only load `first` function
first("abc")
// => "a"
```

## Different Release

In most cases, just use the `@newdash/newdash-node` package is enough.

* `@newdash/newdash-node` - for modern `nodejs` environment, ready for all build tool based on nodejs `commonjs` module system (node, react, vuejs).
* `@newdash/newdash-es5` - for old `nodejs` environment, ready for `0.12 <= node version <= 8`.
* `@newdash/newdash-es6` - for modern build system, with `es6` module keywords so that build tool could strip the unused modules.
* `@newdash/newdash-umd` - for native browser without any build system, please access it with `unpkg` or `jsdeliver`
* `@newdash/newdash` - all in one, includes all built artifacts in the `@newdash/newdash/dist` directory.


## [CHANGELOG](./CHANGELOG.md)

## [LICENSE](./LICENSE)

# `@saurookkadookk/node-utils`

| Build Status | Tests Status | Coverage |
| :---: | :---: | :---: |
| ![Build][build-badge] | ![Test][test-badge] | ![Coverage][coverage-badge] |

[build-badge]: https://github.com/saurookadook/node-utils/actions/workflows/build-main.yml/badge.svg?branch=main&event=push
[test-badge]: https://github.com/saurookadook/node-utils/actions/workflows/test-main.yml/badge.svg?branch=main&event=push
[coverage-badge]: https://github.com/saurookadook/node-utils/blob/ci-badges/badges/coverage-total.svg

## Installation

```bash
pnpm add node-utils
```

---

## Contributing

### Setup

```bash
nvm use
corepack enable
pnpm i
```

### Building the Package

```bash
pnpm build
```

### Running Tests

Tests are written using [Vitest](https://vitest.dev/guide/). They can be run with:

```bash
pnpm test
```

### Creating new Releases

See the [Creating Releases](/docs/CREATING_RELEASES.md) doc for detailed steps.

### Publishing

<!-- #### First-Time Only -->

<!-- #### Authentication -->

#### Main Workflow

```bash
pnpm pkg:prepublish
pnpm pkg:publish
```

> ℹ️ For available options and flags for `pnpm publish`, see [`pnpm`'s documentation](https://pnpm.io/cli/publish).

Once successfully published, versions can then be found in the NPM registry.

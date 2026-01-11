# Demo of issue with node import maps + rev-dep resolution

## Setup

```bash
npm install
```

It's using rev-dep@2.4.0-beta.2

## TLDR
- added support for resolving imports defined in imports map in package.json (default behaviour)
- added support for resolving files imported from workspace packages (opt-in behaviour, use `--follow-monorepo-packages` flag)
  - supports `exports` field, `main` field and lack of them in package.json

## Cases from repo root

**Run circular imports detection for whole project from project root**

- `npm run circular` 

Should detect circular import that exists in `packages/common`

```
Found 1 circular dependencies:

Circular Dependency 1:
 ➞ packages/common/src/file-utils.ts (cycle start)
  ➞ packages/common/src/file.ts ('#common/file.ts')
   ➞ packages/common/src/file-utils.ts ('./file-utils.ts')
```

**List _app_ files with script defined in project root by providing relative path to entry point**

- `npm run app-files-from-root`

```
apps/app/src/absolute.ts
apps/app/src/index.ts
apps/app/src/relative.ts
packages/common/src/async-utils.ts
packages/common/src/dir/other.js
packages/common/src/file-utils.ts
packages/common/src/file.ts
packages/common/src/other2.js
```

**List _app_ files with script defined in project root by using cwd pointing to _app_**

- `npm run app-files-from-root-by-cwd`

```
../../packages/common/src/async-utils.ts
../../packages/common/src/dir/other.js
../../packages/common/src/file-utils.ts
../../packages/common/src/file.ts
../../packages/common/src/other2.js
src/absolute.ts
src/index.ts
src/relative.ts
```

## Cases from _app_ subpackage

**List files imported by entry point without following monorepo packages (just files within _app_)**

- `npm run --workspace app files`

```
src/absolute.ts
src/index.ts
src/relative.ts
```

Note it follows `#root/absolute.ts` import based on package.json imports map

**List files imported by entry point monorepo packages**

- `npm run --workspace app files-follow-monorepo` 

```
../../packages/common/src/async-utils.ts
../../packages/common/src/dir/other.js
../../packages/common/src/file-utils.ts
../../packages/common/src/file.ts
../../packages/common/src/other2.js
src/absolute.ts
src/index.ts
src/relative.ts
```

**Check circular imports in _app_**

- `npm run --workspace app circular`

```
<Empty result>
```

No circular imports exists in _app_

**Check circular imports in _app_ but follow monorepo packages**

- `npm run --workspace app circular-follow-monorepo`

```
Found 1 circular dependencies:

Circular Dependency 1:
 ➞ /root/rev-dep-demo/packages/common/src/file-utils.ts (cycle start)
  ➞ /root/rev-dep-demo/packages/common/src/file.ts ('#common/file.ts')
   ➞ /root/rev-dep-demo/packages/common/src/file-utils.ts ('./file-utils.ts')
```

It follows files, goes into `packages/common` and discovers circular import there
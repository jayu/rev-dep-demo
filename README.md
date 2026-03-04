```
my-monorepo/
  package.json              # root — no @ai-sdk/cerebras here
  node_modules/             # only root-level deps hoisted here
  packages/
    llm-clients/
      package.json          # "@ai-sdk/cerebras": "^4.0.0"
      node_modules/
        @ai-sdk/cerebras/   # symlinked by pnpm ✓
      src/
        index.ts            # dependencies imports
```

Config (single rule or per-workspace — same result):

```jsonc
{
  "configVersion": "1.5",
  "rules": [
    {
      "path": "packages/llm-clients",
      "followMonorepoPackages": true,
      "missingNodeModulesDetection": { "enabled": true }
    }
  ]
}
```


`> rev-dep config run`

```sh
📁 Rule: packages/llm-clients (1 files)
  ❌ Missing Node Modules Issues (2):
    - missing-dep (imported from: packages/llm-clients/src/index.ts)
    - root-dep (imported from: packages/llm-clients/src/index.ts)

❌ Checks failed! See details above.
```

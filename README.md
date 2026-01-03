# Demo of issue with node import maps + rev-dep resolution

## Setup

```bash
npm install
```

## Issue
Running `rev-dep` on our index file 
```bash
npx rev-dep files --entry-point src/index.ts
```

Outputs:
```txt
src/index.ts
src/relative-util.ts
```

which does not include the `example-util.ts` module which is being imported via nodejs' import map.

Expected output should be
```txt
src/index.ts
src/example-util.ts
src/relative-util.ts
```


### Dependency-cruiser

Dependency-cruiser handles this case as expected.

```bash
npx dependency-cruise --output-type json src/index.ts --no-config
```

Outputs:
```json
{
  "modules": [
    {
      "source": "src/index.ts",
      "dependencies": [
        {
          "module": "./relative-util.ts",
          "moduleSystem": "es6",
          "dynamic": false,
          "exoticallyRequired": false,
          "dependencyTypes": [
            "local",
            "export"
          ],
          "resolved": "src/relative-util.ts",
          "coreModule": false,
          "followable": true,
          "couldNotResolve": false,
          "matchesDoNotFollow": false,
          "circular": false,
          "valid": true
        },
        {
          "module": "#demo/example-util.ts",
          "moduleSystem": "es6",
          "dynamic": false,
          "exoticallyRequired": false,
          "dependencyTypes": [
            "aliased",
            "aliased-subpath-import",
            "local",
            "export"
          ],
          "resolved": "src/example-util.ts",
          "coreModule": false,
          "followable": true,
          "couldNotResolve": false,
          "matchesDoNotFollow": false,
          "circular": false,
          "valid": true
        }
      ],
      "dependents": [],
      "orphan": false,
      "valid": true
    },
    {
      "source": "src/relative-util.ts",
      "dependencies": [],
      "dependents": [
        "src/index.ts"
      ],
      "orphan": false,
      "valid": true
    },
    {
      "source": "src/example-util.ts",
      "dependencies": [],
      "dependents": [
        "src/index.ts"
      ],
      "orphan": false,
      "valid": true
    }
  ],
  "summary": {
    "violations": [],
    "error": 0,
    "warn": 0,
    "info": 0,
    "ignore": 0,
    "totalCruised": 3,
    "totalDependenciesCruised": 2,
    "optionsUsed": {
      "baseDir": "/Users/ryanquinn/repos/rev-dep-demo",
      "combinedDependencies": false,
      "detectJSDocImports": false,
      "detectProcessBuiltinModuleCalls": false,
      "exoticRequireStrings": [],
      "externalModuleResolutionStrategy": "node_modules",
      "metrics": false,
      "moduleSystems": [
        "es6",
        "cjs",
        "tsd",
        "amd"
      ],
      "outputTo": "-",
      "outputType": "json",
      "preserveSymlinks": false,
      "skipAnalysisNotInRules": false,
      "tsPreCompilationDeps": false,
      "args": "src/index.ts"
    }
  }
}
```


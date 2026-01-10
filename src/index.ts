// An import map is used to redirect this import to ./src/example-util.ts
export * from "#demo/example-util.ts";
// Direct relative export
export * from "./relative-util.ts";

import {getTypeParameterOwner} from "typescript"
getTypeParameterOwner;
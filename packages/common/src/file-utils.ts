export const readFile = (path: string) => {
  console.log(`Reading file at ${path}`);
  return `Content of ${path}`;
};

import { d } from "#common/file.ts";

d;

export type SomeType = string
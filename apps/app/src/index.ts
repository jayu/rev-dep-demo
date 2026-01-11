import { readFile } from "@company/common/file-utils";
import { fetchData } from "@company/common/async-utils";
// import { getTypeParameterOwner } from "typescript";

import { absolute } from "#root/absolute.ts";
import { relative } from "./relative.ts";

async function main() {
  const content = readFile("./test.txt");
  console.log(content);

  const data = await fetchData("https://example.com");
  console.log(data);
}

main().catch(console.error);

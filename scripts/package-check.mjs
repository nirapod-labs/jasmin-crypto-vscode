import {access, mkdir} from "node:fs/promises";
import {fileURLToPath} from "node:url";
import {spawnSync} from "node:child_process";

const artifactsDirectory = new URL("../.artifacts/", import.meta.url);
const output = new URL("../.artifacts/jasmin-crypto-vscode.vsix", import.meta.url);
const vsceCli = new URL("../node_modules/.bin/vsce", import.meta.url);

await mkdir(artifactsDirectory, {recursive: true});

const result = spawnSync(
  fileURLToPath(vsceCli),
  ["package", "--no-dependencies", "--out", fileURLToPath(output)],
  {stdio: "inherit"}
);

if (result.status !== 0) {
  process.exit(result.status ?? 1);
}

await access(output);

import assert from "node:assert/strict";
import {readFile, readdir} from "node:fs/promises";

const grammarPath = new URL("../syntaxes/jasmin.tmLanguage.json", import.meta.url);
const syntaxesDirectory = new URL("../syntaxes/", import.meta.url);
const packagePath = new URL("../package.json", import.meta.url);
const languageConfigurationPath = new URL("../language-configuration.json", import.meta.url);

const [grammarText, packageText, languageConfigurationText] = await Promise.all([
  readFile(grammarPath, "utf8"),
  readFile(packagePath, "utf8"),
  readFile(languageConfigurationPath, "utf8")
]);

const grammar = JSON.parse(grammarText);
const extension = JSON.parse(packageText);
JSON.parse(languageConfigurationText);

const syntaxFiles = await readdir(syntaxesDirectory);
assert.deepEqual(syntaxFiles.sort(), ["jasmin.tmLanguage.json"]);

assert.equal(grammar.scopeName, "source.jasmin.crypto");
assert.deepEqual(grammar.fileTypes, ["jazz", "jinc"]);
assert.equal(extension.contributes.languages[0].id, "jasmin-crypto");
assert.deepEqual(extension.contributes.languages[0].extensions, [".jazz", ".jinc"]);
assert.equal(extension.contributes.grammars[0].scopeName, grammar.scopeName);
assert.equal(extension.contributes.grammars[0].path, "./syntaxes/jasmin.tmLanguage.json");

for (const forbiddenPattern of ["(?<=", "(?<!", "(?x)"]) {
  assert.equal(
    grammarText.includes(forbiddenPattern),
    false,
    `Grammar must not contain ${forbiddenPattern}; Linguist compatibility requires portable PCRE patterns.`
  );
}

console.log("Extension manifest and grammar invariants: valid");

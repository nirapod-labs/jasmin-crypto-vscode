import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import test from "node:test";
import textmate from "vscode-textmate";
import oniguruma from "vscode-oniguruma";

const {Registry, parseRawGrammar} = textmate;
const {loadWASM, OnigScanner, OnigString} = oniguruma;

const grammarScope = "source.jasmin.crypto";
const grammarPath = new URL("../syntaxes/jasmin.tmLanguage.json", import.meta.url);
const grammarText = await readFile(grammarPath, "utf8");
const wasmPath = new URL("../node_modules/vscode-oniguruma/release/onig.wasm", import.meta.url);
const wasm = await readFile(wasmPath);

await loadWASM(wasm.buffer);

const registry = new Registry({
  onigLib: Promise.resolve({
    createOnigScanner: (patterns) => new OnigScanner(patterns),
    createOnigString: (value) => new OnigString(value)
  }),
  loadGrammar: async (scopeName) => {
    if (scopeName !== grammarScope) {
      return null;
    }
    return parseRawGrammar(grammarText, grammarPath.pathname);
  }
});

const grammar = await registry.loadGrammar(grammarScope);

async function scopesForFixture(name) {
  const source = await readFile(new URL(`../fixtures/${name}`, import.meta.url), "utf8");
  const scopes = new Set();
  let ruleStack = null;

  for (const line of source.split(/\r?\n/u)) {
    const tokenized = grammar.tokenizeLine(line, ruleStack);
    ruleStack = tokenized.ruleStack;
    for (const token of tokenized.tokens) {
      for (const scope of token.scopes) {
        scopes.add(scope);
      }
    }
  }

  return scopes;
}

test("tokenizes a .jazz source fixture", async () => {
  const scopes = await scopesForFixture("rotate-columns.jazz");

  for (const scope of [
    "meta.attribute.jasmin.crypto",
    "storage.modifier.jasmin.crypto",
    "keyword.control.jasmin.crypto",
    "entity.name.function.jasmin.crypto",
    "storage.type.jasmin.crypto",
    "constant.numeric.jasmin.crypto",
    "keyword.operator.jasmin.crypto",
    "comment.line.double-slash.jasmin.crypto"
  ]) {
    assert.ok(scopes.has(scope), `Expected ${scope}`);
  }
});

test("tokenizes a .jinc include fixture", async () => {
  const scopes = await scopesForFixture("mix-round.jinc");

  for (const scope of [
    "keyword.control.jasmin.crypto",
    "string.quoted.double.jasmin.crypto",
    "storage.modifier.jasmin.crypto",
    "entity.name.function.jasmin.crypto",
    "storage.type.jasmin.crypto"
  ]) {
    assert.ok(scopes.has(scope), `Expected ${scope}`);
  }
});

test("tokenizes current Jasmin language forms", async () => {
  const scopes = await scopesForFixture("current-syntax.jazz");

  for (const scope of [
    "keyword.declaration.jasmin.crypto",
    "keyword.declaration.namespace.jasmin.crypto",
    "entity.name.namespace.jasmin.crypto",
    "storage.modifier.jasmin.crypto",
    "storage.modifier.alignment.jasmin.crypto",
    "support.function.intrinsic.jasmin.crypto",
    "storage.type.jasmin.crypto",
    "constant.numeric.jasmin.crypto",
    "comment.block.jasmin.crypto",
    "punctuation.accessor.namespace.jasmin.crypto"
  ]) {
    assert.ok(scopes.has(scope), `Expected ${scope}`);
  }
});

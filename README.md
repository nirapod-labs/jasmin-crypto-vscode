# Jasmin Crypto for VS Code

Community-maintained TextMate grammar and VS Code language support for the
[Jasmin](https://github.com/jasmin-lang/jasmin) cryptographic programming
language.

## Scope

This extension recognizes both Jasmin source files (`.jazz`) and Jasmin include
files (`.jinc`). Its language identity is intentionally distinct from the JVM
assembly language already named Jasmin in several tooling ecosystems:

| Field | Value |
| --- | --- |
| VS Code language id | `jasmin-crypto` |
| Display name | Jasmin Crypto |
| Extensions | `.jazz`, `.jinc` |
| TextMate scope | `source.jasmin.crypto` |

The project provides editor highlighting. It does not validate Jasmin programs,
replace the Jasmin compiler, or make claims about compiler correctness.

## Relationship to Jasmin

This is a community-maintained project of Nirapod Labs. It is not an official
`jasmin-lang` project and does not imply endorsement by Jasmin's authors.

The initial grammar is derived from the MIT-licensed
[`dsprenkels/vscode-jasmin`](https://github.com/dsprenkels/vscode-jasmin)
extension. Its attribution and license notice are retained in
[NOTICE.md](NOTICE.md).

## Status

The repository is being established with a focused grammar, reproducible
validation, and contributor workflow before a future GitHub Linguist proposal.

## Development

CI uses Node.js 22 and pnpm. From a fresh checkout:

```bash
pnpm install --frozen-lockfile
pnpm run validate
```

Validation checks manifest and scope invariants, tokenizes both `.jazz` and
`.jinc` fixtures, and packages a VSIX without publishing it.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Security-sensitive reports belong in
[SECURITY.md](SECURITY.md), not public issues.

## License

MIT. See [LICENSE](LICENSE).

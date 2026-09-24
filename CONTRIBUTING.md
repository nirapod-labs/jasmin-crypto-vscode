# Contributing

This repository is PR-driven. Changes land through focused pull requests; do
not push directly to `main`.

## Contribution standard

- Keep each branch and pull request focused on one reviewable change.
- Use conventional commits. Keep subjects concise, factual, and lowercase
  after the type and optional scope.
- Include a fixture when changing grammar coverage or correcting a
  classification.
- Run the documented validation commands before requesting review.
- Describe syntax decisions with a link to the Jasmin language source,
  documentation, or a compact reproducer.

## Grammar changes

The extension must retain a single TextMate grammar at
`syntaxes/jasmin.tmLanguage.json`. Avoid patterns that depend on variable-length
lookbehind or other constructs that may work in VS Code but fail Linguist's
PCRE-based grammar compiler.

## Review

`main` is protected. One approval from a code owner and passing CI are required
before merge. Do not bypass hooks, reviews, or branch protection.

## Security reports

Do not disclose potential denial-of-service regexes, malicious grammar inputs,
or dependency-security concerns in a public issue. Follow
[SECURITY.md](SECURITY.md).

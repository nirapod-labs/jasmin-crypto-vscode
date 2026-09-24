# Security

This repository contains editor grammar and packaging metadata. It does not
handle keys, credentials, signing, funds, recovery material, or wallet custody.

Security reports may still matter. Examples include regex patterns with
pathological performance, malicious extension packaging behavior, dependency
issues, or CI workflow weaknesses.

Use GitHub private vulnerability reporting for security-sensitive reports. Do
not open a public issue before maintainers have assessed the report.

## Scope boundary

Syntax highlighting is not a security validation layer. It must not be
presented as evidence that a Jasmin program is valid, safe, constant-time, or
correct.

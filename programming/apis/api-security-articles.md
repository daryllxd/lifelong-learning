# Project Guidelines
[Reference](https://github.com/elsewhencode/project-guidelines#92-api-security)

- Auth tokens must NOT be transmitted in the URL.
- Tokens must be transmitted using the `Authorization` header on every request. `Authorization: Bearer xxxxxx, Extra yyyyy.`
- Auth code must be short-lived.
- Rate limiting.
- API should convert received data to the canonical form or reject them.
- Serialize JSON.
- Validate content-type and mostly use `application/*json`.

- [API Security checklist.][https://github.com/shieldfy/API-Security-Checklist]

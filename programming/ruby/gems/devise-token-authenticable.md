## Is Devise's `token_authenticable` secure?

- To ensure secure token authentication:
  - Must be sent via HTTPS.
  - Must be random, of cryptographic strength,
  - Must be securely compared. `SecureRandom.hex` or `sysrandom`.
  - Must not be stored directly in the database. Token = password.
  - Should expire according to some logic.
- Find user record using the user's ID, email, then compare the user's token with the request's token with `Devise.secure_compare`.
- Several applications/sessions at the same time per user, store as many encrypted tokens per user as you want to allow current sessions.
- Expiring tokens: Google expires a token if it has not been used for six months. Facebook expires a token if it has not been used for two months.
- Contingency plan: rake task to reset a subset of tokens or every single token in the database.

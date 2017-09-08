## PostgreSQL: How to make “case-insensitive” query
[Reference](https://stackoverflow.com/questions/7005302/postgresql-how-to-make-case-insensitive-query)

- `SELECT id FROM groups WHERE LOWER(name)=LOWER('Administrator')` is slow because they cause indexes to no linger be seekable.
- `CREATE INDEX idx_groups_name ON groups lower(name)` to create an index on the lower-cased.
- `ILIKE` will work, but with slower response.

## 11.7. Indexes on Expressions
[Reference](https://www.postgresql.org/docs/current/static/indexes-expressional.html)

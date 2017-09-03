## Storing JSON in database vs having a new column for each key
[Reference](https://stackoverflow.com/questions/15367696/storing-json-in-database-vs-having-a-new-column-for-each-key)

- Postgres JSONB has matured significantly. Support for indexing specific keys of the JSON object.
- When using a relational DB, it should still be column-per-value.
  - Relational databases are still built on the assumption that the data within them will be fairly well normalized.
  - The query planner has better optimization information when looking at columns than when looking at keys in a JSON document.
  - Foreign keys can be created between columns.
  - That said, no application is perfectly relational or document-oriented. Most applications have some mix of both.

When to JSON

- Storing email addresses and phone numbers for a contact, when storing them as values in a JSON array is much easier to manage than multiple separate tables.
- Saving arbitrary key/value user preferences.
- Storing config data that has no defined schema.
- *If you're adding true metadata, or if your JSON is describing information that does not need to be queried and is only used for display, it may be overkill to create a separate column for all of the data points.*

- Because one of the temptations of using JSON is to avoid migrating schema and so if the team is not disciplined, it's very easy to stick yet another key/value pair into a JSON field. There's no migration for it, no one remembers what it's for. There is no validation on it.
- Flexibility comes at a cost--it's hard to change because we've built so many other things on top of this design decision.
- JSON allows you to iterate very quickly, however it's flexibility allowed us to hand ourselves with a long row of technical debt which then slowed down subsequent feature evolution progress.
- No way to query "name like 'foo'" if you use a document based.

## Is PostgreSQL Your Next JSON Database?
[Reference](https://www.compose.com/articles/is-postgresql-your-next-json-database/)

- JSONB: It turns the JSON document into a hierarchy of key/value pairs. `{"name": "fred", "address": {"line1": "52 The Elms", "line2": "Elmstreet", "postcode": "ES1 1ES"}}`
- Much like HSTORE.
- Vs JSON, you get indexing. You can't actually index a JSON datatype in PostgreSQL.
- *If you update your JSON documents in place, the answer is no. What PostgreSQL is very good at is storing and retrieving JSON documents and their fields. To update a single field, you need to extract the JSON document out, append the new values and write it back.*


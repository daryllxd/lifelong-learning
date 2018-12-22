# MongoDB, 7 Databases in 7 Weeks

- Document DB, allows data to persist in a nested state, and can query that nested state in an ad hoc fashion. No schema, so documents can optionally contain fields or types that no other document in the collection contains.
- Users: Foursquare, `bit.ly`, CERN.
- JSON document database. A Mongo document can be likened to a relational table row without a schema.
- It can query fields inside in the document with its commands such as `$or`, `$gt`, etc.
- Mongo isn't built to perform joins, but it's useful for documents to reference each other.
- There is no protection vs misspellings.
- Strengths: Can replicate and horizontal scale by default. Plus flexible data model.
- Weaknesses: The full denormalization means you lose some control. Typos can drive you crazy.

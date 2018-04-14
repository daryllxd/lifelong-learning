# Is it good practice to always have an auto-increment integer primary key? [Reference](https://softwareengineering.stackexchange.com/questions/328458/is-it-good-practice-to-always-have-an-autoincrement-integer-primary-key?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa)

- German tank problem: Get the estimated number of so-and-so based on the IDs or the serial numbers of whatever that was.
- This isn't just a URL thing, it's also an ID thing, like you can see how many posts were added in so-and-so timeslot.
- Usually better to have a guaranteed row identifier.
- SQLite always makes a comment under the hood.
- UUIDs: Okay, but they take up too much space for the majority of tables. Also, indexing?
- Drawbacks:
  - If you have a business key, you have to add a unique index on that column to enforce rules.
  - The sync is not as simple because you need to create an equivalence key?
  - If the system grows so large that you need to shard, you can no longer use AI to produce a globally unique key.
- There are very few things that don't change: even usernames and home addresses (given street naming changes) change.
- For gigantic ERPs, your integer autoincrement does:
  - Easier to remember convention.
  - You can JOIN tables without needing to check what the keys are.
  - Just refer to IDs of existing tables.
- Examples of no identity column:
  - In many-many cross reference tables. The foreign key columns can reference each table's PK.
  - When you plan on inserting and deleting in bulk on this table a lot.
  - Distributed tables.
  - Uniqueness across multiple rows in the DB.


# Primary Keys: IDs versus GUIDs: [Reference](https://blog.codinghorror.com/primary-keys-ids-versus-guids/)

- GUID Pros:
  - Unique across every table, every database, every server.
  - Allows easy merging of records from different databases.
  - Allows easy distribution of databases across multiple servers.
  - You can generate IDs anywhere, instead of having a roundtrip to the database.
  - Most replication scenarios require GUID columns anyway.
- GUID Cons:
  - Takes up more memory.
  - Cumbersome to debug.
  - Should be partially sequential for best performance.

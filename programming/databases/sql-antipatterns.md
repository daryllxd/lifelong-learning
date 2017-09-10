## SQL Antipatterns

### Jaywalking

- Objective: Store multivalue attributes. One product has many accounts.
- Antipattern: Format comma separated-lists.
- Problems:
  - Querying products for a specific account: you have to check versus a pattern. You also can't use indexes.
  - If you want to query the accounts for a specific product, you have to do a select where the join condition is something that will decode the comma separated lists.
  - You need to do tricks for aggregating.
  - Hard to update accounts.
  - Hard to validate product IDs since no foreign key constraint.
  - Separator character.
- Recognizing:
  - "Greatest number of entries this list must support?": When you're trying to choose the maximum length of the VARCHAR column.
- Uses:
  -  You can improve queries by denormalizing your database--if your app needs the data in a comma-separated format.
- Solution: Join table.

### Naive Trees

### ID Required

- Objective: Establish Primary Key Conventions.
  - A primary key is guaranteed to be unique over all rows in the table, so this is the logical mechanism to address individual rows and to prevent duplicate rows from being stored.
  - Primary keys are needed to: prevent a table from containing duplicate rows, reference individual rows in queries, and support foreign key references.
  - Redundant key: Ex: `id` and `bug_id` for a table where the `bug_id` is a unique mnemonic.
- Antipattern: Creating an `id` column for each table.
  - Why would you need `id` always? You might need  natural key (natural key = things like SSS numbers) or a compound key instead.
- Legitimate Uses:
  - Convention over configuration, expecting all tables to have an `id` table.
- Solution: Tailored to Fit.
  - you can declare a primary key on any column or set of columns, as long as that data types support indexing. You should be able to define a column as an auto-incrementing integer without making it the primary key of the table.

### Keyless Entry

- Objective: Simplify Database Architecture. Referential integrity: very important part of database design and operation. When you declare a foreign key constraint for a column, the values in these columns must exist in the primary key or unique key columns of the parent table.
- Arguments against foreign keys:
  - Data updates can conflict with the constraints.
  - Your DB design is so flexible that it can't support referential integrity constraints.
  - Indexing the db will impact performance.
  - Your db doesn't support foreign keys.
- Antipattern: Leave out the constraints.
  - To avoid making referential integrity mistakes, you have to run extra `SELECT` queries before you apply changes to confirm the change won't result in broken references.
  - Checking mistakes: Using developer scripts to report corrupted data.
- Recognizing the Antipattern:
  - "How do I query to check for a value that exists in one table and not the other table?"
- Solution: Declare Constraints.
  - You can support multitable changes with `cascade`. No need to lock tables first.

### Entity-Attribute-Value

- Objective: Support Variable Attributes. `Bugs` and `FeatureRequests` are `Issues`, they share attributes, and they also have their own attributes.
- Antipattern: Generic attribute table.
  - `IssueAttributes` table, with `attr_name` and `attr_value`.
  - This results in a simple database structure but doesn't make up for the difficulty of using it. Harder to query individual attributes.
  - No mandatory attributes via SQL constraint.
  - No SQL data types.
  - No referential data integrity.
  - Attribute names can be whatever.
- Recognizing:
  - "Totally extensible without metadata changes." RDBMSes don't support that.
- If you have non-relational data management needs, the best answer is to use a non-relational technology.
- Solution: Model the subtypes.
  - Single table inheritance (`Issues`) or concrete table inheritance (`Bugs` and `FeatureRequests`).
  - Concrete means you don't have an extra attribute than from single table inheritance, but it's hard to determine the shared attributes for the subtypes.
  - Class table inheritance: Split the shared fields on different tables: `Issues`, `Bugs`, and `FeatureRequests`.
  - Semi-structured data: add a column with a BLOB inside.

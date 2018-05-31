# Ode to Sequel
[Reference](https://twin.github.io/ode-to-sequel/)

- Problems with AR:
  - Limited query interface.
  - No good low-level query interface.
  - LEFT JOIN?
  - Hard to set up on non-Rails.
  - Dependent on AS.
- Plugin system: core + other things.
- Regex: Sequel transforms these to SQL.
- Virtual row blocks for queries.
- Because you need time to allocate AR objects, you can surpass the time it takes for the queries to execute. So it takes longer for things like AR migrations.
- Arel: Hard to use and hard to read.
- Model design: Not a class level DSL, but a simple OO design.
- LEFT JOIN.
- JSON in PG.
- Database views.
- Cursors, used to iterate over large datasets without having to load all records into memory.
- Sequel PG: A C extension which optimizes the fetching of rows.

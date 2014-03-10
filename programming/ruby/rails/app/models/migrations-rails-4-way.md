## Active Record Migrations

#### Rake tasks

- `db:create`, `db:create:all`: Creates db, if in dev, Rails will create both dev and test dbs.
- `db:drop`, `db:drop:all`: Drop db for current env.
- `db:migrate`: Applies all pending migrations.
- `db:test:prepare`: You need to do this so that the tests can be run now, since the test DB is not synchronized with the dev DB.
- `db:setup`: Creates a DB from scratch, loads schema, seeds the shit. Need to do `test:prepare` still.
- `db:reset`: Does the `setup` but drops the database too.

- `db:structure:dump`: Dump db structure to SQL file.
- `db:forward`, `db:rollback`: Moves schema forward/back.
- `db:migrate:down`, `db:migrate:up`: Will invoke the down method of the specified migration only.
- `db:migrate:redo`: Execute down then up immediately.

[TODO]
- Irreversible migrations

Starting the fucking thing

``` shell
pg_ctl -D /usr/local/var/postgres -l /usr/local/var/postgres/server.log start
```

``` shell
# Dump from file
$ psql -h hostname -d databasename -U username -f file.sql

# Connect to database

ssh wherever "pg_dump -a -U DB_USERNAME -d DB_NAME -h RDS_HOST -C --column-inserts" \ >> wew.sql
```

### Dump from staging to local

``` shell
#!/bin/bash
DATABASE_DUMP_FILE=wew.sql

killall -9 ruby
ssh WHERE_YOU_SSH_TO "pg_dump -a -U DB_USERNAME -d DB_NAME -h DB_HOST -C --column-inserts" \ >> $DATABASE_DUMP_FILE
bundle exec rake db:reset
psql DB_NAME_OF_LOCAL_MACHINE < $DATABASE_DUMP_FILE
rm $DATABASE_DUMP_FILE
```


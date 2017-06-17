``` shell
# Dump from file
$ psql -h hostname -d databasename -U username -f file.sql

# Connect to database

ssh wherever "pg_dump -a -U DB_USERNAME -d DB_NAME -h RDS_HOST -C --column-inserts" \ >> wew.sql
```

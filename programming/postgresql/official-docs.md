## 1.2: Architectural Fundamentals

In database jargon, PostgreSQL uses a client/server model. A PostgreSQL session consists of the following cooperating processes (programs):

- A server process, which manages the database files, accepts connections to the database from client applications, and performs database actions on behalf of the clients. The database server program is called postgres.
- The user's client (frontend) application that wants to perform database operations.

The PostgreSQL server can handle multiple concurrent connections from clients. To achieve this it starts ("forks") a new process for each connection. From that point on, the client and the new server process communicate without intervention by the original postgres process. Thus, the master server process is always running, waiting for client connections, whereas client and associated server processes come and go.

## 1.3: Creating a DB

	$ createdb mydb # success = no response

Shell script not in path variable

	$ /usr/local/pgsql/bin/createdb mydb # check if the path is just not in the shell search.

Server not started

	$ createdb: could not connect to database postgres: could not connect to server: No such file or directory
	Is the server running locally and accepting
	connections on Unix domain socket "/tmp/.s.PGSQL.5432"?

Role not yet created

	$ createdb: could not connect to database postgres: FATAL: role "joe" does not exist

No privileges

	$ createdb: database creation failed: ERROR: permission denied to create database

Dropping the db

	$ drop mydb

## 1.4: Accessing the shit

	$ psql mydb # access the db
	mydb=> # you should see this
	mydb=# # you should see this if you are a database superuser
	mydb=> SELECT version();
	mydb=> SELECT current_date;
	mydb=> SELECT 2+2;
	mydb=> \h
	mydb=> \q # quit the thing!

---
## 2: The SQL Language

Types: `int, smallint, real, double precision, char(N), varchar(N), date, time, timestamp, interval`

	CREATE TABLE weather (
		city varchar(80),
		temp_lo int, -- low temperature
		temp_hi int, -- high temperature
		prcp real, -- precipitation
		date date
	);

New data type: `point`. It requires coordinates.

	INSERT INTO weather (city, temp_lo, temp_hi, prcp, date) VALUES (’San Francisco’, 43, 57, 0.0, ’1994-11-29’);

	INSERT INTO weather (date, city, temp_hi, temp_lo) VALUES (’1994-11-29’, ’Hayward’, 54, 37);

	COPY weather FROM ’/home/user/weather.txt’; # mass insert from file

	SELECT city, (temp_hi+temp_lo)/2 AS temp_avg, date FROM weather;

	SELECT weather.city, weather.temp_lo, weather.temp_hi, weather.prcp, weather.date, cities.location FROM weather, cities WHERE cities.name = weather.city;

	SELECT max(temp_lo) FROM weather;

	SELECT city FROM weatherWHERE temp_lo = (SELECT max(temp_lo) FROM weather);

	UPDATE weather SET temp_hi = temp_hi - 2, temp_lo = temp_lo - 2 WHERE date > ’1994-11-28’;

	DELETE FROM weather WHERE city = ’Hayward’;

---
## 3: Advanced Features

	CREATE VIEW myview AS
		SELECT city, temp_lo, temp_hi, prcp, date, location
		FROM weather, cities
		WHERE city = name;
	SELECT * FROM myview;

	# Foreign Key demo
	CREATE TABLE cities (
		city varchar(80) primary key,
		location point
	);

	CREATE TABLE weather (
		city varchar(80) references cities(city),
		temp_lo int,
		temp_hi int,
		prcp real,
		date date
	);

	# Transactions demo
	# Use ROLLBACK if you do not want to commit the changes
	BEGIN;
	UPDATE accounts SET balance = balance - 100.00
		WHERE name = ’Alice’;
	-- etc etc
	COMMIT;

	# Savepoints. Exactly what it sounds like
	BEGIN;
	UPDATE accounts SET balance = balance - 100.00
		WHERE name = ’Alice’;
	SAVEPOINT my_savepoint;
	UPDATE accounts SET balance = balance + 100.00
		WHERE name = ’Bob’;
	-- oops ... forget that and use Wally’s account
	ROLLBACK TO my_savepoint;
	UPDATE accounts SET balance = balance + 100.00
		WHERE name = ’Wally’;
	COMMIT;

	#Window functions: These are related to the current row. Read this shit.

---
## 4: SQL Syntax: Later

---
## 5: Data Definition

	PG has DEFAULT, NOT NULL

	# Constraints (these are given names)
	CREATE TABLE products (
		product_no integer,
		name text,
		price numeric CHECK (price > 0)
	);

	# Named constraints
	CREATE TABLE products (
		product_no integer,
		name text,
		price numeric CONSTRAINT positive_price CHECK (price > 0)
	);

	# Diff columns
	CREATE TABLE products (
		product_no integer,
		name text,
		price numeric CHECK (price > 0),
		discounted_price numeric CHECK (discounted_price > 0),
		CHECK (price > discounted_price)
	);

	# Uniques
	CREATE TABLE example (
		a integer,
		b integer,
		c integer,
		UNIQUE (a, c)
	);

	# Named unique
	CREATE TABLE products (
		product_no integer CONSTRAINT must_be_different UNIQUE,
		name text,
		price numeric
	);

	# Double primary key
	CREATE TABLE example (
		a integer,
		b integer,
		c integer,
		PRIMARY KEY (a, c)
	);

	# Foreign Key Syntax, must match cols
	CREATE TABLE t1 (
		a integer PRIMARY KEY,
		b integer,
		c integer,
		FOREIGN KEY (b, c) REFERENCES other_table (c1, c2)
	);

	Integrity Checks
	ON DELETE RESTRICT: Key is not possible to delete if being referenced
	ON DELETE CASCADE: Delete the referencers too.
	ON DELETE NO ACTION: No action lol.
	ON DELETE SET NULL, ON DELETE SET DEFAULT

	ALTER TABLE: lol.

#### Privileges

There are different kinds of privileges: SELECT, INSERT, UPDATE, DELETE, TRUNCATE, REFERENCES, TRIGGER, CREATE, CONNECT, TEMPORARY, EXECUTE, and USAGE.

---
## 19: Client Authentication

Client authentication is controlled by a configuration file, `pg_hba.conf` and is stored in the database cluster’s data directory. A default is installed when the data directory is initialized by `initdb`. 

Formats

	local database user auth-method [auth-options]
	host database user address auth-method [auth-options]
	hostssl database user address auth-method [auth-options]
	hostnossl database user address auth-method [auth-options]
	host database user IP-address IP-mask auth-method [auth-options]
	hostssl database user IP-address IP-mask auth-method [auth-options]
	hostnossl database user IP-address IP-mask auth-method [auth-options]

	host: Connections made via TCP/IP.
	hostssl: Match only those made over TCP/IP and are under SSL.
	auth method: Either trust (unconditional connect), reject, md5, password...

---
## 20: Database Roles

	daryll=# CREATE ROLE icpa;
	daryll=# DROP ROLE icpa;

We can also do

	$ createuser icpa
	$ dropuser icpa

	#Get roles
	daryll=# SELECT rolname FROM pg_roles;

Superuser: The OS system user that initialized the db cluster (in my case, daryll). To create more, you need this initial user.

#### Role Attributes

1. Login privilege: Only roles that have the LOGIN attribute can be used as the initial role name for a database connection.

2. Superuser status: A superuser bypasses all permission checks except the right to log in.

3. Database creation: Must be explicitly given permission to create db: `CREATE ROLE name CREATEDB`.

4. Initiate streamling replication: `CREATE ROLE name REPLICATION LOGIN.

5. Password: `CREATE ROLE name PASSWORD 'string'`.

**CREATE ROLE icpa CREATEDB REPLICATION LOGIN PASSWORD 'icpa'.**

Can alter roles: `ALTER role myname SET enable_indexscan TO off;`. (Not set immediately doe.)

#### Role Membership

Group role: `CREATE ROLE name;`

`GRANT group_role TO role`; REVOKE group_role FROM role1;`




---
## 23: Backup and Restore

Dumping via SQL: `$ pg_dump dbname > outfile`. `pgdump` is a regular PG client application. Can add `-h` host or `-p` port switch.

[From Heroku](http://stackoverflow.com/questions/10852631/how-to-import-a-heroku-pg-dump-into-local-machine): `pg_restore -O -d app_development latest.dump`. This is because psql tries to interpret SQL queries when you're actually giving him a compressed dump.
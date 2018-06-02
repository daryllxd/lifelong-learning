# Processing large CSV files with Ruby
[Reference](https://dalibornasevic.com/posts/68-processing-large-csv-files-with-ruby)

- Helpers for printing memory used and time spent:

``` ruby
require 'csv'
require_relative './helpers'

headers = ['id', 'name', 'email', 'city', 'street', 'country']

name    = "Pink Panther"
email   = "pink.panther@example.com"
city    = "Pink City"
street  = "Pink Road"
country = "Pink Country"

print_memory_usage do
  print_time_spent do
    CSV.open('data.csv', 'w', write_headers: true, headers: headers) do |csv|
      1_000_000.times do |i|
        csv << [i, name, email, city, street, country]
      end
    end
  end
end

require 'benchmark'

def print_memory_usage
  memory_before = `ps -o rss= -p #{Process.pid}`.to_i
  yield
  memory_after = `ps -o rss= -p #{Process.pid}`.to_i

  puts "Memory: #{((memory_after - memory_before) / 1024.0).round(2)} MB"
end

def print_time_spent
  time = Benchmark.realtime do
    yield
  end

  puts "Time: #{time.round(2)}"
end
```

- When building the CSV file, the Ruby process did not spike in memory usage because the GC was reclaiming the used memory.
- Reading the entire file at once: Really high memory usage. 19 sec, 920 MB.
- Parsing CSV from an in-memory string `CSV.parse...`: 21 sec, 1 GB memory.
- Parse line by line: 9.73 sec, 74 MB. (`CSV.new...`)
- Fastest way: `CSV.foreach`. 9 sec, 0.5 MB.

# Ask Ruby: Speeding up CSV imports?
[Reference](https://www.reddit.com/r/ruby/comments/8nazca/speeding_up_csv_imports/)

- Fastest way: Use Postgres' COPY command.
- `ActiveRecord::Base.connection.execute "COPY your_table FROM '/path/to/file.csv' FORMAT CSV"`.
- Using the `COPY` API with just a connection and IO stream.

```
ActiveRecord::Base.connection.raw_connection

File.open('sample_file.csv','rb') do |f|
  conn.copy_data('COPY "some_table"(col1, col2) FROM STDIN WITH CSV') do
    while chunk = f.read(10240)
      conn.put_copy_data(chunk) # does not need to be row-aligned
    end
  end
end
```

- If possible, load the data into a table with no indexes, and then create the indexes afterward.
- Create the table, COPY command in the same transaction and use the FREEZE option.
- Partitioned tables in PG 10. "I'm able to load ~200M rows into a partition, setup indexes on it, warm the data and put it into the line of fire in ~4 minutes using this approach (most of this time is index construction and warming)."
- Data loading: faster to `psql` and `\\copy`, faster than passing through Ruby.

# Importing data quickly in Ruby on Rails applications
[Reference](https://www.mutuallyhuman.com/blog/2016/06/28/importing-data-quickly-in-ruby-on-rails-applications)

- He's the guy who wrote [`activerecord-import`](https://github.com/zdennis/activerecord-import).
- AR is slow because every time you `create` a record with AR, a single `INSERT` statement is generated and sent off to the database.
- What we do is to build the `Book` instances in memory, and then pass them into `Book.import`.
- *By default, the import method will continue to enforce validations and it will figure out how to serialize all of the Book instances into highly performant SQL statements.*
- *If you do not have DB-level constraints enforcing uniqueness, you may get duplicates if your imported dataset contains duplicate values.*

# Importing data and handling conflicts in Ruby on Rails applications
[Reference](https://www.mutuallyhuman.com/blog/2016/08/19/importing-data-and-handling-conflicts-in-ruby-on-rails-applications)

- We can do a `on_duplicate_key_update` thingie to specify that we want to update `name` when a duplicate is found.
- If the data being inserted would cause a duplicate, then MySQL will perform an `UPDATE` on the existing row.

``` ruby
Author.import(
  [:name, :key],
  rows_to_import_second,
  on_duplicate_key_update: [:name],
  validate: false
)
```

- On how to detect duplicates: `columns: [:name], conflict_target`

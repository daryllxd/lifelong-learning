# Tips on Treating Flakiness in your Rails Test Suite
[Reference](https://semaphoreci.com/blog/2017/08/03/tips-on-treating-flakiness-in-your-test-suite.html)

- `FactoryGirl`: affects the number of records, and tests that expect a certain record can affect the incidental database state.
- Timestamps: Background processes can have an influence on execution speed/running tests on different machines can product different execution times. Either explicitly set timestamps/use `Timecop` and/or equivalent tool that allows you to freeze/travel through time in your tests.
- External requests: Stub them out.
- Ajax: Code that follows an Ajax request might not give it time to finish: if followed by additional asynchronous requests, the test will continue executing regardless of their state. Async/await?

# 5 ways We've improved flakey test debugging
[Reference](https://building.buildkite.com/5-ways-weve-improved-flakey-test-debugging-4b3cfb9f27c8)

- Save database state for failed tests: When a test fails, we capture the state of the database at the time and store it somewhere, then we can load into a temp database so we can see what was going on in the database when the test failed.
- A simple database cleaner: `database_rewinder` doesn't clean tables that you insert data into using `ActiveRecord::Base.connection.execute`. So we just wrote a cleaner.
- Extracting logs from failed tests.
- Trace AR IDs in logs:

```
# Add this file to `spec/support/active_record_id_tracer.rb`

module ActiveRecordIDTracer
  def insert(*args)
    super(*args).tap do |returned_id|
      Rails.logger.debug("\033[1m\033[33mActiveRecordIDTracer\033[0m #{klass.name} insert returned ID #{returned_id}")
    end
  end
end

ActiveRecord::Relation.prepend ActiveRecordIDTracer
```

- Reset ID test codes.

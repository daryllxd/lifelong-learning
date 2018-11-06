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

# Eliminating Flaky Ruby Tests
[Reference](https://engineering.gusto.com/eliminating-flaky-ruby-tests/)

- Bad effect of flaky specs: needless retrying of builds, lower trust in the test suite, frustration with the CI system.
- Can't rely on the build results, and fixes were prevented from being shipped quickly.
- Capybara:
  - Avoid methods that do not wait: `visit`, `current_path`, `all` and `first` selectors, `text`, `value`, `title` accessors.
  - Use safe methods that wait: `find(selector)`, `find_field`, `find_link`, `has_selector`.
- Database pollution/`database_cleaner`:
  - `transaction`: A transaction is opened at the beginning of the example, and rolled back when it completes. Fastest method.
  - `truncation`: After the test, a set of queries will happen to truncate the table.
  - Truncation is required when running request specs with Capybara. The thread running the Rails server uses a separate connection from the one running the test.
- Non-deterministic attributes
  - When you need unique values, don't use faker.
  - ID dependence/hardcoding IDs.
- On globally cached values, try to not stub global values.
- Time-based failures: Use Timecop.
- Reproducing the bug:
  - Run RSpec using the same seed that was used in your CI run
  - Run the entire list of files that were run before your failing test

# The Importance of a Clean Test Database
[Reference](https://medium.com/@StevenLeiva1/the-importance-of-a-clean-test-database-3b0f78a7ccb2)

- `before(:all)` block: the changes made here are not a part of a specific example, which means they are not part of a transaction, which means they will not be rolled back.
- Wrap associations in a lambda/proc, otherwise the association will be created outside of an example group, which means that it won't be in a transaction.
- ***Any time you make changes to the database outside of a specific example, you are creating data that will not be cleaned out by default. You have to take explicit steps to clear out the data.***

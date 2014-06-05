# 7 Reasons Why I'm Sticking With Minitest and Fixtures in Rails
[link](http://brandonhilkert.com/blog/7-reasons-why-im-sticking-with-minitest-and-fixtures-in-rails/)

1. *Fixtures force you to test against "real" data.* Fixture data isn't real, it's staged, and you have control over what and how much you add. Easier to make associations than in Factory Girl. With fixtures, you don't use as much mocks and stubs. The data is predictable and I'm confident in my tests. When Factory Girl inserts data before each test, there's a cost because of the communication with the database. Fixtures are inserted before the test suite runs, so outside of any test-specific mutation, no additional results are necessary.

2. *Rspec provides more than one way to do something.* `eq()` or `==` or `eql()`? In Minitest, it's just `assert post.active?`

3. *Setting up Capybara is trivial.* RSpec has the database cleaner stuff. Using fixtures, you insert the data only at the beginning of each test run, so it's available to the next threads.

4. *Lack of complex stubbing/mocking constructs simplifies code.*

5. *Snippets can help the uncertainty about Minitest assertion order.*

6. *Minitest is just Ruby.*

7. *Deviating from Rails defaults doesn't always provide value.* The ease at which I was able to get going with the Rails default stack using Minitest and fixtures has made me a convert. There was minimal setup/little additional configuration.

## Comments

- The default behavior of Rails is to use transactions at the individual test level. Database cleaner runs it's own transaction, so you turn off the default Rails transactions if you do use `database_cleaner`.
- To test for local effect on the database, assert the difference, not absolute stuff.
- Fixtures - we make the mistake of defining new fixtures for every mutation needed by unit tests. Factories can be painful when your app gets complex, because you have to set up the universe to catch regressions.

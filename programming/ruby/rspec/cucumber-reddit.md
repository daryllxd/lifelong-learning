- I use Capybara tests on a daily basis. Cucumber test are nice in that they give you a human readable description of a feature, but you can make your Capy tests just as verbose. Typically, you want a behavior-level test to describe the feature you are implementing, and then write unit-level tests to check features at a more granular level.

    So, you don't need Cucumber tests, but I would recommend having behavior and unit tests in order to maintain some level of sanity in the project.

- Use the 'shoulda' gem for testing Rails model relationships and validations. FactoryGirl is great for testing your database, and for creating db fixtures that you can use while writing Capybara tests. Capybara tests should describe the user's interaction with the website.

        group :test, :development do
          gem 'capybara'
          gem 'factory_girl_rails'
          gem 'rspec-rails'
          gem 'shoulda-matchers'
          gem 'valid_attribute'
        end

- You CANNOT substitute Capybara for Cucumber. Cucumber IS NOT a web testing tool. You CAN NOT do BDD with Capybara. You can use Capybara inside of a BDD tool like Cucumber or rspec though. You use cucumber as a BDD tool to communicate with each other and the business owners.

    You shouldn't need to have every test drive the whole system from web front end to database. More than anything else, this is slow.

    Instead you should aim for a pyramid with a few system level tests being backed up by increasing numbers of less integrated tests, resting on a broad foundation of (isolated) unit tests.

    For example, you could have one test that drives your app through the web interface, then makes assertions about the results (through the web or backend). You then have many more tests that pick-apart the distinct components that go into that request/ response to tease out the different paths/ error scenarios/ business logic etc.

    Your business logic should be written without a framework using dependency injection, so you can mock out the dependancies and test the actual business logic of them very quickly. Writing actual unit tests using TDD practices will help you be productive long after you've started your project.

- If you are two developers, and are not working closely with business-y people, if you don't have a one or two BA's with non-technical backgrounds consistently looking to refine requirements and if you don't have to "convince upstairs", then it will probably be overkill for you two. RSpec will suffice. Indeed this was the case when I was working for a startup a year ago.

- I would use Capybara for behavior driven development unless your client or non tech people are going to participate in the process.

    Cucumber only adds a more readable DSL for non tech people. So if the BDD is going to be done by programmers and without non tech people very involved in the process I recommend you to do Rspec + Capybara and you'll be faster and will cover the same at same level.

- I'm going to go against the grain here and say I'd rather avoid Capybara than Cucumber. This is coming from a Test::Unit devotee. 

    Capybara is a great piece of software, but it's hard to get working 100% of the time. Tests are often unreliable and brittle against updates to the underlying driver (e.g. poltergeist or selenium). Plus, they're dog slow. Like, if you thought ActiveRecord tests that hit the DB were slow, capybara is at a whole other level.

    Use cucumber only if you've got engineers who have used it enough to know how to stop and think, "hey, someone else must have selected a date from a date picker before, let's see if they created some step definitions for it before we write a new one." If your team doesn't do that, your features/step_definitions directory will become a hot mess.
















 
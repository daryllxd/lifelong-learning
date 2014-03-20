## The Cucumber Command-Line Interface

#### Cucumber’s Command-Line Options

    $ cucumber --help
    [TODO]

#### Specifying the Location of Step Definitions

Cucumber recursively scans some directories for .rb files to load, and if there are step definitions in them (or hooks or transforms), they get loaded.

The directories scanned for step defi- nitions and support code are determined by the feature files (or directories) you give it. If you give it a feature file, it will look underneath its directory. If you give it a directory, it will look under that directory. To see where Cucumber is looking for code, you can pass the `--verbose` option.

The solution to this common problem is to use --require to tell Cucumber explicitly where to load code from.

#### Running Cucumber from Rake [TODO]

#### Running Cucumber in Continuous Integration [TODO]

## Testing a REST Web Service

Sometimes the user of the system we need to test isn’t a human being but another computer program. For systems like these, the user interface is often a REST web service. To automate tests against it, we need to make our Cucumber step definitions talk to the web service as though they were a regular client application.

The preferred approach is usually in-process, which means that Cucumber is running in the same Ruby process as your own application. There is no running web server or HTTP traffic, and this is both fast to run and easy to set up. Being able to easily reset state (usually in a database) between scenar- ios is another strength of the in-process approach.

Your application doesn’t have to be written in Ruby in order to be testable with Cucumber. Applications written in Java, .NET, PHP, or any other pro- gramming language can be tested using the out-of-process approach, which means starting your application before Cucumber runs and then having Cucumber talk to it using an HTTP client library.

#### In-Process Testing of Rack-Based REST APIs

    Feature: Fruit list
      In order to make a great smoothie
      I need some fruit.
      
      Scenario: List fruit
        Given the system knows about the following fruit:
          | name       | color  |
          | banana     | yellow |
          | strawberry | red    |
        When the client requests GET /fruits
        Then the response should be JSON:
          """
          [
            {"name": "banana", "color": "yellow"},
            {"name": "strawberry", "color": "red"}
          ]
          """

#### Poking Our Application with Rack-Test

Since we are running Cucumber in the same Ruby process as the application itself, we have the luxury of being able to talk to it directly, without going through HTTP or a web server. This is possible thanks to a nifty little Ruby gem called rack-test. Rack-Test is a library that is designed to be used in tests and that acts as a façade2 to your web application, very much in the same way as a regular web server does. Rack-Test has methods for mimicking HTTP requests from code. 

[TODO]

## Comparing Data Is Less Brittle Than Comparing Strings

The lesson we learn in this chapter about parsing both strings into JSON documents before comparing them is a useful one to remember for other situations. When you compare two strings in a test, you’re often leaving yourself open to brittle failures that aren’t telling you anything useful. Parsing the string from the Gherkin feature into more meaningful data can often mean you have more robust tests that fail only when they should.

#### Out-of-Process Testing of Any REST API

## Adding Tests to a Legacy Application

#### Characterization Tests

In his excellent book Working Effectively with Legacy Code [Fea04], Michael Feathers talks about two different types of tests, which he calls specification tests and characterization tests.

Specification tests check that the code does what it’s supposed to. Ideally you write them before you write the code itself and use them as a guide to help you get the code into the right shape.

With characterization tests, the aim is just to understand what the system currently does.

[TODO]

#### What We Just Learned

- Be pragmatic! Don’t exhaust yourself trying to retrofit a complete set of Cucumber features for everything the system already does. Instead, add them gradually, one at a time, as you need them.
- Use characterization tests to help you understand what the system is already doing and to give you some security before you make a change.
- Every time you discover a bug, trap it with a new Cucumber scenario. Every time you add new behavior to the system, start by describing it with a Cucumber feature.
- Use code coverage to give you and your team feedback and encouragement about your progress in getting the system under test.

## Using Capybara to Test Ajax Web Applications

#### Implementing a Simple Search Without Ajax

    Feature: Search
      Scenario: Find messages by content
        Given a User has posted the following messages:
          | content            |
          | I am making dinner |
          | I just woke up     |
          | I am going to work |
        When I search for "I am"
        Then the results should be:
          | content            |
          | I am making dinner |
          | I am going to work |

#### Preparing Something to Search For

> Create a content -> user hash of messages.

    Given /^a User has posted the following messages:$/ do |messages|
      user = FactoryGirl.create(:user)
      messages_attributes = messages.hashes.map do |message_attrs| 
        message_attrs.merge({:user => user})
      end
      Message.create!(messages_attributes)
    end

#### Navigating, Filling in Fields, and Clicking Buttons

We decided to write our steps in a declarative style. `When I search for "I am"` is a great example of a declarative step. *What widgets the user interacts with will be nicely hidden inside a single step definition.* This makes our Gherkin much simpler and expressive, but it also makes our scenarios much easier to maintain.

> features/step_definitions/search_steps.rb

    When /^I search for "([^"]*)"$/ do |query|
      visit('/search')
      fill_in('query', :with => query)
      click_button('Search')
    end

#### Assumptions
- We expect the web app to respond to the `/search` path.
- We expect an input field named query to be on the rendered page.
- There should be a `Search` button we can click.

#### Fixes
- Add route to routes.rb `resource :search, :only => :show, :controller => :search`
- Add controller `app/controllers/search_controller.rb`
- Add view `app/views/search/show.html.erb`
- Add pertinent HTML elements: `input type="text" id="query"`, `input type="submit" value="Search"`

[TODO]

#### Searching with Ajax [TODO]

    When I enter "I am" in the search field

Tag with `@javascript`.

JavaScript TDD: QUnit or Jasmine, or _Test-Driven JS Development (book)_.

#### Dealing with the Asynchronous Nature of Ajax [TODO]

#### The Progressive Enhancement Pattern

Although using Selenium for full-stack JavaScript testing was possible with Webrat, it wasn’t easy to set up, and we quickly made a decision: we would build the first iteration of every feature to work without JavaScript.

Because of our rule, we had to figure out how to deliver the same behavior using basic HTTP posts and gets of forms and URLs—no JavaScript. This required us to simplify the designs for our first iteration. We got a little pushback at first, but we were a tight team, and the designers quickly caught on, especially when we started shipping these first-iteration features quickly and reliably.

So, this rule had helped us to do the simple thing. We shipped features and moved on.

When we did have to add JavaScript, we added it on top of the existing working HTTP- only implementation, and we got another surprise: it was easy! Nearly every time, because we’d built the server-side infrastructure to a clean, standard pattern, the JavaScript we needed was clean and simple to write.

#### Capybara API: Own file

#### Taking Screenshots [TODO]

## Testing Command-Line Applications with Aruba [TODO]

# Switches

    $ cucumber test.feature --dry-run # parse the file without executing it.
    $ cucumber features/reading_reports/widgets_report.feature -r features # To run features in a folder you need to put require the step definition code too

# Part I: Cucumber Fundamentals

The best TDD practitioners work from the outside-in, starting with a failing customer acceptance test that describes the behavior of the system from the customer’s point of view. As BDD practitioners, we take care to write the acceptance tests as examples that anyone on the team can read. We make use of the process of writing those examples to get feedback from the business stakeholders about whether we’re setting out to build the right thing before we get started.

What makes Cucumber stand out from the crowd of other testing tools is that it has been designed specifically to ensure the acceptance tests can easily be read—and written—by anyone on the team. This reveals the true value of acceptance tests: as a communication and collaboration tool.

## How Cucumber Works
- Cucumber is a CLI tool. IT reads specifications from text files called _features_, examines them for _scenarios_ to test, and runs the scenarios against your system. Each scenario has _steps_.
- Cucumber has _step definitions_ which map the business-readable language of each step into Ruby code to carry out whatever action is being described by the step.
- Automation library (Capybara) interacts with the system itself.

## First Taste

    $ mkdir features # need this to actually run cucumber.
    $ cucumber
    $ mkdir features/step_definitions

This principle, deliberately doing the minimum useful work the tests will let us get away with, might seem lazy, but in fact it’s a discipline. It ensures that we make our tests thorough: if the test doesn’t drive us to write the right thing, then we need a better test.

Scenario Outline - When the stuff becomes a table.

## Gherkin Basics

By using real-world examples to describe the desired behavior of the system we want to build, we stay grounded in language and terminology that makes sense to our stakeholders: we’re speaking their language.

Better to have a concrete example rather so we communicate requirements faster.

> If a customer enters a credit card number that isn’t exactly 16 digits long, when they try to submit the form, it should be redisplayed with an error message advising them of the correct number of digits.

vs.

> Customers should be prevented from entering invalid credit card details.

Each Gherkin file begins with the _Feature keyword_. On the same line you have the feature _name_, and the remaining lines are its _desription_.

Each scenario is a single concrete example of how the system should behave in a particular sitaution.

*And* and *But* are the same as the Given, When, and Then, just for papogi effects. We can also use _*_.

#### *Each scenario must make sense and be able to be executed independently of any other scenario.*

This might seem a little dogmatic, but trust us, it really helps keep your sce- narios simple to work with. It avoids building up brittle dependencies between scenarios and also gives you the flexibility to run just the scenarios you need to when you’re working on a particular part of the system, without having to worry about getting the right test data set up.

## Step Definitions: From the Outside

There are two sides to a step definition. On the outside, it translates from plain language into Ruby, and on the inside it tells your system what to do using Ruby automation code. Ruby has an incredibly rich set of libraries for automating a whole variety of systems, from JavaScript-heavy web applications to REST web services.

    Given /I have \$100 in my Account/ do
      # TODO: code that puts $100 into User's Account goes here
    end

*Given, When, Then Are the Same:* It doesn’t actually matter which of the three methods you use to register a step definition, because Cucumber ignores the keyword when matching a step.

#### Capturing Arguments

*Capture Groups:* When you surround part of a regular expression with parentheses, it becomes a capture group. Capture groups are used to highlight particular parts of a pattern that you want to lift out of the matching text and use.

    Given /I have deposited \$(100) in my Account/ do |amount| 
      # TODO: code goes here
    end

*Alternation:* Match either 100 or 250.

    Given /I have deposited \$(100|250) in my Account/ do |amount| 

*Dot:* Match literally any single character.

    Given /I have deposited \$(...) in my Account/ do |amount|

*Star:* Match shit.

Regex regex [TODO]

#### Cucumber States
- *Undefined:* When C can't find a step definition that matches a step.
- *Pending:* When it discovers a step definition but has `Pending` on it.
    
         pending("Need to design the interface")

- *Failing:* Either because there is a bug in the step definition or in the system under test, or an assertion failed.

## Expressive Scenarios

*When you’re writing Cucumber features, make readability your main goal.* Otherwise, a reader can easily feel more like they’re a reading computer pro- gram than a specification document, which is something we want you to try to avoid at all costs. After all, if your features aren’t easy for nonprogrammers to read, you might as well just be writing your tests in plain old Ruby code.

*Background:* A background section in a feature file allows you to specify a set of steps that are common to every scenario in the file, so it's easier to change and so that it's easier to focus on what is unique and important about that scenario.

- Don't use _Background_ to set up complicated state unless the state is something the reader actually needs to know.
- Keep your _Background_ section short.
- Make your _Background_ section vivid. User names rather than User A.
- Keep your scenarios short, and don't have too many. If background has many (> 4) steps, time to split the feature file into 2.
- Avoid putting technical details such as clearing queues, starting backend services, or opening browsers in a background. Most of these things will be assumed by the reader.

#### Data Tables [TODO]

#### Scenario Outline [TODO]

#### Nesting Steps [TODO]

#### Staying Organized with Tags and Subfolders

Subfolders: Don’t get too hung up about getting your folder structure right the first time. Make a decision to try a structure, reorganize all the existing feature files, and then stick to it for a while as you add new features. 

Tags: If subfolders are the chapters in your book of features, then tags are the sticky notes you’ve put on pages you want to be able to find easily. You tag a scenario by putting a word prefixed with the @ character on the line before the Scenario keyword.

## When Cucumbers Go Bad

#### Four Main Types of Pain
- *Flickering Scenarios.* When a scenario that was passing yesterday is failing today, with the same source code running in the same environment, you have what we call a flickering scenario.

    _A flickering scenario fails occasionally and at random. The same scenario, run on the same codebase in the same environment, will mostly pass but sometimes fail. These apparently uncontrollable failures cause the team to lose confidence in their tests, in their code, and in themselves._

    To fix a flickering scenario, you have to study the code and try to understand why it might be happening.

- *Brittle Features.* When you feel like you can hardly move in the test suite without making an apparently unrelated test fail for no good reason, you have what we call brittle features.

    _A brittle feature is easy to break. When features are brittle, a necessary change in one part of the test suite or main codebase causes apparently unrelated scenarios to break._

- *Slow Features.* Once a new scenario is passing, the main reason to keep running it is for feedback: you want that scenario to warn you if you somehow accidentally break the functionality that it checks for. The value of that feedback dimin- ishes as your test run starts taking longer and longer. When the build is slow, developers don’t run all the tests before committing code and will rely on the continuous integration server to give them feedback instead.

- *Bored Stakeholders.* The answer lies partly in starting with the right kind of collaborative relation- ship with those business stakeholders. If they think they’re too busy to help you understand exactly what they want, then you have a deeper team problem that Cucumber can’t help you solve. On the other hand, many teams who start out with keen and interested stakeholders waste the opportunity Cucum- ber gives them to build that collaborative relationship.

_If you’re stuck with a slow set of features, a pragmatic option can be to run them in parallel. The simplest approach to this is to partition your features using tags or folders and then run each of those partitioned sets at the same time._

#### Working Together

Cucumber features are what Gojko Adzic4 calls living documentation. _Living:_ It tests the system automatically so you can work on it safely. _Documentation:_ It facilitates good communication about the current or planned behavior of the system.

When your team is struggling with Cucumber, the problems you’re having will hit you in one of these two places. Either they’ll result in Cucumber sce- narios that provide poor feedback for the developers or they’ll mean Cucumber fails to help your team communicate. We’ll start by looking at what might be holding you back from making the features work as a communication tool.

Remove noise and _incidental details_ (crap) from tests.

> Crappy, noisy

    Scenario: Check inbox
    Given a User "Dave" with password "password"
    And a User "Sue" with password "secret"

> Better    

    Scenario: Check inbox
    Given I have received an email from "Sue"
    When I sign in
    Then I should see 1 email from "Sue" in my inbox

Now we have a simple three-step scenario that’s clear and concise. It’s also more maintainable: if our product owner wants us to change the authentication mechanism, we can just rewrite the underlying step definition code without having to touch the features.

Try to avoid being guided by existing step definitions when you write your scenarios and just write down exactly what you want to happen, in plain English. In fact, try to avoid programmers or testers writing scenarios on their own. Instead, get nontechnical stakeholders or analysts to write the first draft of each scenario from a purely business-focused perspective or ideally in a pair with a programmer to help them share their mental model.

#### Imperative Steps

Imperative programming means using a sequence of commands for the com- puter to perform in a particular order. Ruby is an example of an imperative language: you write a program as a series of statements that Ruby runs one at a time, in order.

A declarative program tells the computer what it should do without prescribing precisely how to do it. CSS is an example of a declar- ative language: you tell the computer what you want the various elements on a web page to look like, and you leave it to take care of the rest.

> Gherkin is imperative but you don't have to write boring test code:

    Scenario: Redirect user to originally requested page after logging in Given a User "dave" exists with password "secret"
    And I am not logged in
    When I navigate to the home page
    Then I am redirected to the login form 
    When I fill in "Username" with "dave" 
    And I fill in "Password" with "secret" 
    And I press "Login"
    Then I should be on the home page

Good: Generic step definitions. Sucks: If UX changes the wording from Login to Log In, scenario will fail. Scenarios that use generic step definitions are also failing to create their own domain language.

> Declarative Style

    Scenario: Redirect user to originally requested page after logging in Given I am an unauthenticated User
    When I attempt to view some restricted content
    Then I am shown a login form
    When I authenticate with valid credentials 
    Then I should be shown the restricted content

- This is not coupled to any specific implementation of the UI, we can go with thick-client or mobile.
- No technical terms and stakeholders in security can understand _unauthenticated_, _restricted_, and _credentials_.

#### Duplication

_When you are using examples to drive your code, there is another principle in play that I believe trumps the DRY principle: the examples should tell a good story. They are the documentation narrative that will guide future programmers. In this case, clarity of intent is found in the quality of the narrative, not necessarily in minimizing duplication._

_The a-ha! moment for me was when I imagined reading a book where the plot and characters had been DRYed out. Everything would be in footnotes or appendixes. All the character descrip- tions, plot elements, subtexts, and so on, would be carefully extracted into fully cross-referenced paragraphs. That is great if you are reading an encyclopedia but not so appropriate if you want to get into the flow and find out what happens. You would be forever flicking back and forth in the book, and you would very quickly forget where you even were in the story. In the words of the old joke, dictionaries have lousy plots, but at least they explain all the words as they go._

Your features act as a design tool for specifying new features, but they also act as a great reference document for what the system already does today. For a system of any significant size, no one person will remember exactly what it will do in every situation, so when you get a bug report from a user or are considering adding new functionality to some part of the system, you want this reference right at your side.

#### Leaky Scenarios

Cucumber scenarios are basically state-transition tests: you put the system into a Given state A, you perform action X (When), and Then you check that it has moved into expected state B. So, each scenario needs the system to be in a certain state before it begins, and yet each scenario also leaves the system in a new, dirty state when it’s finished.

*When the state of the system is not reset between tests, we say that they allow state to leak between them. This is a major cause of brittle tests.*

The opposite of this, independent scenarios, ensures they put the system into a clean state and then add their own data on top of it. This makes them able to stand on their own, rather than being coupled to the data left behind by other tests or shared fixture data.

We can’t stress enough how fundamental independent scenarios are to suc- cessful automated testing. Apart from the added reliability of scenarios that independently set up their own data, they’re also clearer to read and debug.

#### Test Data Builders

FactoryGirl is an excellent implementation of the Test Data Builder pattern.

    Given /^I have been paid$/ do 
      Factory :pay_check
    end

#### Race Conditions and Sleepy Steps

Race conditions occur when two or more parts of the system are running in parallel, but success depends on a particular one of them finishing first. In the case of a Cucumber test, your When step might cause the system to start some work that it runs in the background, such as generating a PDF or updating a search index. If this background task happens to finish before Cucumber runs your Then step, the scenario will pass. If Cucumber wins the race and the Then step executes before the background task is finished, the scenario will fail.

When it’s a close race, you’ll have a flickering scenario, where the scenario will pass and fail intermittently. If there’s a clear winner, a race condition can go unnoticed for a long time, until a new change to the system evens up the stakes, and the scenario starts to fail at random.

A crude solution to this problem is to introduce a fixed-length pause or sleep into the scenario to give the system time to finish processing the background task.

#### Lots of Scenarios

We find that teams that have a single humongous build also tend to have an architecture that could best be described as a big ball of mud. Because all of the behavior in the system is implemented in one place, all the tests have to live in one place, too, and have to all be run together as one big lump. This is a classic ailment of long-lived Ruby on Rails applications, which tend to grow organically without obvious interfaces between their subsystems.

It’s also worth thinking about whether some of the behavior you’ve specified in Cucumber scenarios could be pushed down and expressed in fast unit tests instead.

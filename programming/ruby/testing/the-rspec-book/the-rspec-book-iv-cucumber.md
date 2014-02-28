## Intro to Cucumber

A common understanding of done is crucial to the success of any project. How do we know when we’re done if we can’t agree on what done means?

Cucumber supports collaboration and communication between stakeholders and the delivery team. It uses a simple language for describing scenarios that can be written and read with ease by both technical and nontechnical people. These scenarios represent customer acceptance tests and are used to automate the system we’re developing.

At a high level, there are three parts to Cucumber: features, the cucum- ber command, and step definitions.

Features are written in `Gherkin`.  Step definitions are written in the language of the system that we're developing.

`cucumber` parses the steps in each scenario and tries to map them to one of the step definitions we've written in Ruby.

#### Features

In Cucumber, a feature is a high-level requirement expressed from the perspective of a person or another computer using the system. 

> Feature Title

The title of a Cucumber feature is typically just a few words that repre- sent an activity for which a user might engage the system.

    Stock clerk adds inventory item
    Anonymous visitor adds blog comment
    Code-breaker submits guess

> Narrative

We use a short narrative to provide context for the executable scenarios we’ll be writing.

> The Connextra Format

    As a <role>
    I want <feature>
    So that <business value>

#### Customer Acceptance Tests

A customer acceptance test represents an agreement between the stake- holder and delivery team. It specifies how a feature should behave. When the developers deliver code that passes the test, the stakeholder accepts that feature as done.

We consider acceptance in the context of the current iteration. If a new idea emerges mid-iteration, we can talk about it without changing the acceptance criteria for features for the current iteration and add new stories to the backlog for future consideration. The work that was done in the iteration is still valued and accepted as meeting the agreed-upon criteria. This is good for morale, as well as tracking.

The new stories can be prioritized intelligently, without the gravity of unfinished work getting more weight than it may deserve. Maybe it makes sense to add a story for the next iteration, but maybe it makes more sense to add the story to the backlog and not introduce it right away.

#### Gherkin

    Feature
    Background
    Scenario
    Scenario outline
    Scenarios (or examples)
    Given
    When
    Then
    And (or but)
    | (which is used to define tables)
    """ (which is used to define multiline strings)
    # (which is used for comments)

Every feature file must start with the Feature keyword, followed by a colon and a description.

Cucumber ignores everything until it sees `Background`, `Scenario`, or `Scenario Outline`.

#### Scenarios

Scenarios are concrete examples of how we want the software to behave. They allow us to answer these questions by describing exactly what should happen under what circumstances.

    Feature: Traveler books room
      In order to reduce staff
      As a hotel owner
      I want travelers to book rooms on the web

      Scenario: Successful booking
        Given a hotel with "5" rooms and "0" bookings

      Scenario: Hotel is full

      Scenario: Visitor forgets to enter email

> Step definitions

    Given /^a hotel with "([^"]*)" rooms and "([^"]*)" bookings$/ do |arg1, arg2|
      pending # express the regexp above with the code you wish you had
    end

#### Given/When/Then

__Given__ indicates something that we accept to be true in a scenario. _These are not preconditions. Preconditions are part of a contract that indicates we can go no further unless a precondition is met. Givens are not bound by precondition contracts and can violate them in order to specify how an app should behave in theory._

__When__ indicates the event in a scenario. We prefer to have a signel event in any scenario.

__Then__ indicates an expected outcome.

#### Declarative vs Imperative Styles

    # Imperative
    Scenario: transfer money (declarative)
      Given I have $100 in checking
      And I have $20 in savings
      When I transfer $15 from checking to savings
      Then I should have $85 in checking
      And I should have $35 in savings

    # Declarative           
    Scenario: transfer money (imperative)
      Given I have $100 in checking
      And I have $20 in savings
      When I go to the transfer form
      And I select "Checking" from "Source Account"
      And I select "Savings" from "Target Account"
      And I fill in "Amount" with "15"
      And I press "Execute Transfer"
      Then I should see that I have $85 in checking
      And I should see that I have $35 in savings

Larger team with more BAs means the power is in their hands. Smaller team wants more declarative style.

#### Organizing Features

When you run the `cucumber` command with no options, Cucumber will look for all of the `.rb` and `.feature` files below the `./features` directory, load all of the `.rb` files, and then run all of the `.feature` files. 

Cucumber supports running selected subsets of features and scenarios with tags.

#### Tags to the Rescue

    @approved @iteration_12
    Feature: patient requests appointment

      @wip
      Scenario: patient selects available time

    $ cucumber --tags @wip

    # runs all of the scenarios tagged with @foo OR @bar
    $ cucumber --tags @foo, @bar

    # runs all of the scenarios tagged with @foo AND @bar
    $ cucumber --tags @foo --tags @bar

## Cucumber Detail

#### Step Definitions

    Given /^a hotel with "([^"]*)" rooms and "([^"]*)" bookings$/ do |room_count, booking_count|

    end

Arguments area always passed as strings.

#### World

Every scenario runs in the context of a new instance of an object that we call World.

By default, `World` is just an instance of `Object` that `Cucumber` instantiates before each scenario.

    class MyWorld
             def some_helper
    ... end
    end

#### Calling Steps Within Step Definitions

    When I select checking as the source account
    And I select savings as the target account
    And I set $20.00 as the amount
    And I click transfer

    # Shorter versiones
    When I transfer $20.00 from checking to savings

    When /I transfer (.*) from (.*) to (.*)/ do |amount, source, target|
      When "I select #{source} as the source account"
      When "I select #{target} as the target account"
      When "I set #{amount} as the amount"
      When "I click transfer"
    end

    # Interpolated shit
    When /I transfer (.*) from (.*) to (.*)/ do |amount, source, target|
      steps %Q{
      When I select #{source} as the source account
      And I select #{target} as the target account
      And I set #{amount} as the amount
      And I click transfer
    } 
    end

#### Hooks

Hooks are a way to perform common operations before and after each scenario. `cucumber-rails` starts a database transaction before each scenario and rolls it back when it has finished, ensuring that the db is in a pristine state for each scenario.

    # Hook example
    Before do
      puts "This will run before each scenario"
    end

- `Before`: Executed before every scenario.
- `After`: Executed after every scenario.
- `AfterStep`: Executed after every step.

Place this in `features/support/hooks.rb`.

#### Background

Backgrounds let us write steps once that will be invoked before every scenario in a given feature. We use them instead of `Before` hooks when we want the steps to be visible in the feature file because they create logical context for each scenario.

    Feature: invite friends
      Background: Logged in
        Given I am logged in as "Aslak"
        And the following people exist:
        | name   | friend?  |
        |David   | yes      |
        | Vidkun | no       |
       
      Scenario: Invite someone who is already a friend
       
      Scenario: Invite someone who is not a friend
       
      Scenario: Invite someone who doesn't have an account

#### Multiline Text [TODO]

#### Tables in Steps [TODO]

#### Scenario Outlines [TODO]

#### Configuration [TODO]




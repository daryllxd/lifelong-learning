## Introduction

Bigger code, more time spent on refactoring.

BDD puts the focus on behavior instead of structure, and it does so at every level of development. Whether we’re talking about an object calculating the distance between two cities, another object delegating a search off to a third-party service, or a user-facing screen providing feedback when we provide invalid input, it’s all behavior!

`Given`, `When`, `Then`, the BDD triad, are simple words that we use whether we’re talking about application behavior or object behavior.

  describe MovieList do
      context "when first created" do
        it "is empty" do
          movie_list = MovieList.new
          movie_list.should be_empty
        end
      end
  end

The `it( )` method creates an example of the behavior of a MovieList, with the context being that the MovieList was just created.

BDD is a full-stack agile methodology. It takes some of its cues from Extreme Programming, including a variation of Accep- tance Test–Driven Development called Acceptance Test–Driven Plan- ning (ATDP).

In ATDP, we use customer acceptance tests to drive the development of code. Ideally, these are the result of a collaborative effort between the customer and the delivery team. Sometimes they are written by the delivery team and then reviewed/approved by the customer. In either case, they are customer facing and must be expressed in a language and format that customers can relate to. Cucumber gives us that lan- guage and format.

Cucumber reads plain-text descriptions of application features with example scenarios and uses the scenario steps to automate interaction with the code being developed.

  Feature: pay bill on-line
    In order to reduce the time I spend paying bills
    As a bank customer with a checking account
    I want to pay my bills on-line

    Scenario: pay a bill
      Given checking account with $50
      And a payee named Acme
      And an Acme bill for $37
      When I pay the Acme bill
      Then I should have $13 remaining in my checking account
      And the payment of $37 to Acme should be listed in Recent Payments

We use Cucumber to describe the behavior of applications and use RSpec to describe the behavior of objects. Both cycles involve taking small steps and listening to the feedback you get from the tools. We start with a failing step (red) in Cucumber (the outer cycle). To get that step to pass, we’ll drop down to RSpec (the inner cycle) and drive out the underlying code at a granular level (red/green/refactor).

At each green point in the RSpec cycle, we’ll check the Cucumber cycle. If it is still red, the resulting feedback should guide us to the next action in the RSpec cycle. If it is green, we can jump out to Cucumber, refactor if appropriate, and then repeat the cycle by writing a new failing
Cucumber step.

## Hello

  $ rspec [options] [files or directories]
  $ cucumber [options] [ [FILE|DIR|URL][:LINE[:LINE]*] ]+

>greeter_spec.rb

  describe "RSpec Greeter" do
    it "should say 'Hello RSpec!' when it receives the greet() message" do
        greeter = RSpecGreeter.new
        greeting = greeter.greet
        greeting.should == "Hello RSpec!"
    end 
  end

- `describe`: declaring an example group.
- `it()`: creating an example.
- Initialize a new `RSpecGreeter` on line 3.
- Assign `greeting` to the `return` of `greeter.greet`.
- Set expectation of what is supposed to happen on line 5.

Just add the RspecGreeter

  class RSpecGreeter
    def greet
      "Hello RSpec!"
    end 
  end

Output:

  .               # represents that the test passes
  Finished in 0.00075 seconds
  1 example, 0 failures

#### Cucumbah

>Directory structure

  - root
    - spec
      - greeter_spec.rb
    - features
      - greeter_says_hello.feature

> greeter_says_hello.feature

  Feature: greeter says hello

    In order to start learning RSpec and Cucumber
    As a reader of The RSpec Book
    I want a greeter to say Hello

    Scenario: greeter says hello
    Given a greeter
    When I send it the greet message
    Then I should see "Hello Cucumber!"

> Running the thing: Run it in the root!

  root$ cucumber features

  Feature: greeter says hello
    
    In order to start learning RSpec and Cucumber
    As a reader of The RSpec Book
    I want a greeter to say Hello

    Scenario: greeter says hello          # features/greeter_says_hello.feature:7
      Given a greeter                     # features/greeter_says_hello.feature:8
      When I send it the greet message    # features/greeter_says_hello.feature:9
      Then I should see "Hello Cucumber!" # features/greeter_says_hello.feature:10

  1 scenario (1 undefined)
  3 steps (3 undefined)
  0m0.002s

  You can implement step definitions for undefined steps with these snippets:

  Given(/^a greeter$/) do
    pending # express the regexp above with the code you wish you had
  end

  When(/^I send it the greet message$/) do
    pending # express the regexp above with the code you wish you had
  end

  Then(/^I should see "(.*?)"$/) do |arg1|
    pending # express the regexp above with the code you wish you had
  end

  If you want snippets in a different programming language,
  just make sure a file with the appropriate file extension
  exists where cucumber looks for step definitions.

Here, we use the `Given()`, `When()`, and `Then()` to write step definitions, each of which takes a `Regexp` and a block. Cucumber reads the first step, looks for a step def'n whose Regex matches that step, and then executes that step definition's block.

In order for these to pass, you have to create the `step definitions`.

>Directory structure

  - root
    - spec
      - greeter_spec.rb
    - features
      - step_definitions
        - greeter_steps.rb
      - greeter_says_hello.feature

>greeter_steps.rb

  Given /^a greeter$/ do
    @greeter = CucumberGreeter.new
  end

  When /^I send it the greet message$/ do
    @message = @greeter.greet
  end

  Then /^I should see "([^"]*)"$/ do |greeting|
    @message.should == greeting
  end

You get a failing step because you don't have a `CucumberGreeter` defined yet.

>greeter_steps.rb

  class CucumberGreeter
    def greet
      "Hello Cucumber!"
    end
  end

  ...
  Given /^a greeter$/ do
    @greeter = CucumberGreeter.new
  end

## Describing Features
  
One of the three principles of BDD is “Enough is enough.” We want to avoid the pitfalls of the Big Design Up Front,2 but we also want to do enough planning to know we’re heading in the right direction.

For the first release, we simply want to be able to play the game. We should be able to type a command in a shell to start it up, submit guesses, and see the mark for each of our guesses until we crack the code.

>Selecting Stories

A great way to get started gathering user stories is to do a high-level brain dump of the sorts of things we might like to do. Here are some titles to get started:

- Code-breaker starts game
- Code-breaker submits guess 
- Code-breaker wins game
- Code-breaker loses game
- Code-breaker plays again
- Code-breaker requests hint 
- Code-breaker saves score

The role is the code- breaker role each time because this game has only one kind of user.

The idea is that there should be just enough information to serve as a token for a conversation that should take place as we get closer to implementation.

Now that we have some stories,4 let’s consider them in the context of the stated goal for the initial release: to simply be able to play the game. Looking at the original list of stories, there are only two that are abso- lutely necessary to meet that goal:

- Code-breaker starts game
- Code-breaker submits guess

But then, to actually finish the game, we have to have these features:

- Code-breaker starts game
- Code-breaker submits guess 
- Code-breaker wins game
- Code-breaker plays again

The point is that our goal is to write software that matters, and what matters depends entirely on context and is the purview of the stake- holders! In our case, the primary stakeholder is you!

A user story must have the following characteristics:

- *Have business value.* Clearly, the game is no fun unless it generates a different secret code each time.
- *Be testable.* That’s easy. We just start up a bunch of games and ask for the code.
- *Be small enough to implement in one iteration.*

Cucumber lets us describe application features in a simple plain-text format and then use those descriptions to automate interaction with the application. We’re going to use Cucumber to express application features in this chapter and then automate them in the next.

>Start of code

  Feature: code-breaker starts game

        As a code-breaker
        I want to start a game
        So that I can break the code

  Scenario: start game

      Given I am not yet playing
      When I start a new game
      Then I should see "Welcome to Codebreaker!"
      And I should see "Enter guess:"

The Scenario keyword is followed by a string and then a series of steps. *Each step begins with any of five keywords: Given, When, Then, And, and But.*

- _Given_ represents the state of the world before an event.
- _When_ steps represent the event.
- _Then_ steps represent the expected outcomes.
- _And_ and _but_ steps take on the quality of the previous step. Think: "But I should not see 'What is your quest?'"

We choose the first-person form because it makes the narrative feel more compelling. Given x, when I y, then I should see a message saying “z.” This helps keep the focus on how I would use the system if I were in a given role (the code-breaker).

>Directory structure

  - root
    - features
      - support
        - env.rb
      - codebreaker_starts_game.feature

`env.rb` just to tell Cucumber that we're in Ruby.

>codebreaker_starts_game.feature

  Feature: code-breaker starts game

    As a code-breaker
    I want to start a game
    So that I can break the code

    Scenario: start game
      Given I am not yet playing
      When I start a new game
      Then I should see "Welcome to Codebreaker!"
      And I should see "Enter guess:"

Next, we want submit a guess.

>codebreaker_submits_guess.feature

  Feature: code-breaker submits guess

    The code-breaker submits a guess of four numbers. The game marks the guess with + and - signs.

    For each number in the guess that matches the number and position of a number in the secret code, the mark includes one + sign. For each number in the guess that matches the number but not the position of an umber in the secret code, the mark includes one - sign.

(non Connextra format)

>code_breaker_submits_guess.feature (Connextra)

  Feature: code-breaker submits guess

    As a code-breaker
    I want to submit a guess
    So that I can try to break the code

    Scenario: all exact matches
      Given the secret code is "1234"
      When I guess "1234"
      Then the mark should be "++++"

Not that detailed. But you have multiple tools to use, either Connextra or free-form prose.

Other scenarios (need all) (not scalable that much).

  Scenario: all exact matches
    Given the secret code is "1234"
    When I guess "1234"
    Then the mark should be "++++"

  Scenario: 2 exact matches and 2 number matches
    Given the secret code is "1234"
    When I guess "1243"
    Then the mark should be "++--"

  Scenario: 1 exact match and 3 number matches
    Given the secret code is "1234"
    When I guess "1342"
    Then the mark should be "+---"

  Scenario: 4 number matches
    Given the secret code is "1234"
    When I guess "4321"
    Then the mark should be "----"

#### Scenario Outlines

This is a way to make a more scalable scenario flow.

  Scenario Outline: submit guess
    Given the secret code is "<code>"
    When I guess "<guess>"
    Then the mark should be "<mark>"

  Scenarios: all numbers correct
  | code | guess | mark |
  | 1234 | 1234  | ++++ |
  | 1234 | 1243  | ++-- |
  | 1234 | 1423  | +--- |
  | 1234 | 4321  | ---- |

Following convention, we’ve named the columns using the same names that are in angle brackets in the scenario outline, but the placeholders and columns are bound by position, not name.

The entire feature:

    Scenario Outline: submit guess

      Given the secret code is "<code>"
      When I guess "<guess>"
      Then the mark should be "<mark>"

      Scenarios: no matches
        | code | guess | mark |
        | 1234 | 5555  |      |

      Scenarios: 1 number correct
        | code | guess | mark |
        | 1234 | 1555  | +    |
        | 1234 | 2555  | -    |

        ...

## Automating Features with Cucumber

When Cucumber starts up, it loads up all the Ruby files in the same directory as the file and any of its subdirec- tories. This includes features/step_definitions/codebreaker_steps.rb, where we copied the step definition earlier.

In this case, we called the Given( ) method and passed it a Regexp and a block. Cucumber then stores the block in a hash-like structure with the Regexp as its key.

We leave /^I am not yet playing$/ blank because it isn't supposed to do anything. We are just using it to provide context.

>step_definitions/codebreaker_steps.rb

  Given /^I am not yet playing$/  do
    
  end

  When /^I start a new game$/ do
    Codebreaker::Game.new.start
  end

We totally get an error on 'starting a new game' because we haven't written the code yet. Write the code you wish you had!

>Directory structure to fix the thing

  - root
    - features
      - step_definitions
        - codebreaker_steps.rb
      - support
        - env.rb
      - codebreaker_starts_game.feature
      - codebreaker_submits_guess.feature
    - lib
      - codebreaker
        - game.rb
      - codebreaker.rb

>game.rb

  module Codebreaker
    class Game
      def start
      end 
    end
  end

>codebreaker.rb # bootstrapping thingie

  require 'codebreaker/game'

>env.rb # you now require the 'codebreaker' lib

  $LOAD_PATH << File.expand_path('../../../lib', *FILE*) 
  require 'codebreaker' 

#### Test Doubles

We need a fake object that the `Game` thinks is STDOUT, but it really just captures messages for us so we can set expectations about the messages.

>codebreaker_steps.rb

  Then /^I should see "[^"]*)$/ do |message|
    output.messages.should include(message)
  end

This means test will fail because we don't have the mock stuff yet. Add mock:

>codebreaker_steps.rb

  class Output
    def messages
      @messages ||= []
    end

    def puts(message)
      messages << message
    end
  end

  # memoization: the first time it is called, it creates an @output and stores it in the @output variable.

  def output
    @output ||= Output.new
  end
  
You should also update the `lib` itself:

>game.rb

  class Game

    def initialize(output)
      @output = output
    end

    def start
    end

  end

## Describing Code with RSpec

> spec/codebreaker/game_spec.rb

  require 'spec_helper'

  module Codebreaker
    describe Game do
      describe '#start' do
        it 'sends a welcome message'
        it 'prompts for a first guess'
      end
    end
  end

`describe` hooks into RSpec's API to create a subclass of class `Rspec::Core::ExampleGroup`. This is a group of examples of the expected behavior of an object.

The `it()` methods creates an `example`. 

To get this to work, you should create the spec helper.

>spec/spec_helper.rb

  require 'codebreaker'

And run the thing

  $ rspec spec/codebreaker/game_spec.rb --format doc --color

We get "PENDING: Not Yet Implemented`. To make it work, we pass a block to the `it()` method. Without the block, the example is considered pending.

#### Red

  describe '#start' do
    it 'sends a welcome message' do
      output = double('output')
      game = Game.new(output)

      output.should_receive(:puts)
      .with('Welcome to Codebreaker!')

    end

    it 'prompts for a first guess' do

    end
        
    end

Mocks were created by `Rspec::Mocks` to create a dynamic test double framework.

#### Green: Get the Example to Pass

Oks

`as_null_object`: Tells the mocked object to only listen for the messages we tell it to expect, and ignore any other messages.

Refactoring: We know that everything still works even while we are editing the frigging code.

When the code in a `before` block is only creating instance vars and assigning them values, we can use RSpec's `let()` method instead.

The first call to `let()` defines a memoized output() that returns a double object.

## Adding New Features

>codebreaker_steps.rb (Regex shit to see the thingies)

  Then /^I should see "([^\"]*)"$/ do |message|
    output.messages.should include(message)
  end

Not enough, we have to create the guess methods because this will fail:

    Scenarios: no matches
      | code | guess | mark |
      | 1234 | 5678  |      |

## Specifying an Algorithm

The RSpec code examples we wrote for the Codebreaker starts game fea- ture specified a simple responsibility of the Game: send messages to the output. The next responsibility is more complex. We need to spec- ify the algorithm we’re going to use to mark a guess submitted by the codebreaker.

This is one of those moments that makes people who are new to TDD uncomfortable. We know with some certainty that this is not the implementation we want when we’re finished, and we might even have a good idea of what that implementation should be. The problem is that we don’t have enough examples to really specify what this code should do, so any code that we write right now would be speculative.

One of the benefits of progressing in small steps is that when we intro- duce a new failure, we know exactly what we just did, so we have con- text in which we can analyze the failure. Both failures are because of one more minus sign than we were expecting in the mark. What about the change we just made would cause that to happen?

## Refactoring with Confidence

  def guess(guess)
    mark = ""
    (0..3).each do |index|
      if exact_match? guess, index
        mark << "+"
      end
    end

    (0..3).each do |index|
      if number_match? guess, index
        mark << "+"
      end
    end
  end

Code smells: Temporary Variable and Long Method. Both of them are related to procedural methods like this.

Temporary Variable: `mark`. Long Method: A method that does more than one thing. We want methods to have only one reason to change as the requirements of a system change so that we can make changes in small steps and with confidence.

Temporary variables can be useful in the process of refactoring, but only temporarily.

Extract Method refactoring: We create a new empty method with the name we want to use, move the code from the source method to the target method, and adjust as necessary.

  $ rspec spec --backtrace # backtrace for each feature.

*First refactor: Make `guess` literally just output the guess, without any computations.*

>game.rb

  def guess(guess)
    @output.puts '+'*exact_match_count(guess) + '-'*number_match_count(guess)
  end

*Second refactor: Move to `inject` instead of `each` to remove the temporary variable.*

>game.rb

    def number_match_count(guess)
      number_match_count = 0
      (0..3).each do |index|
        if number_match?(guess, index)
          number_match_count += 1
        end
      end
      number_match_count
    end

> new version

    def number_match_count
      (0..3).inject(0) do |count, index|
        count + (number_match?(index) ? 1 : 0)
      end
    end

#### Large class

This is not about size; it's about responsibilities. The `Game` violates the SRP because it formats output, sends messages to output, and marks each guess.

It was violating SRP since we first introduced the guess() method, but that violation and its solution are much more clear now.

We have four methods that all deal with marking a guess. These meth- ods clearly belong together. We might even be tempted to put a com- ment above the first one indicating that the next four methods deal with marking the guess. This is a strong hint that we’re missing an abstraction in our design.

*Third refactor: Extract the Class out.*

Extract Class refactoring is needed for an SRP violation. The steps are:

- Creating an empty `Marker` class inside the `Game` class.
- Add an initializer to the `Marker` that accepts the secret code and assigns thet hing.
- Copy the calculation methods into the new Marker, without deleting the originals.
- Creating a new Marker in the guess method and trying the new class out.
- Remove the original copies.

*Fourth refactor: Pass everything to the Marker, instead of just the guess, so that the Marker can do only one thing, and not be reliant on the guess.*

>game.rb

  def guess(guess)
    marker = Marker.new
    ...
  end

  class Marker
    def initialize(secret)
      @secret = secret
    end
    ...
  end

>Refactored

  def guess(guess)
    marker = Marker.new(@secret, guess)
    ...
  end

  class Marker
    def initialize(secret, guess)
      @secret, @guess = secret, guess
    end
  end

Instead of passing around guess through other methods, pass it through `initialize` as a method of abstraction. This makes `Marker` a more self-contained class with only one responsibility, which is to mark shit.

*Fifth refactor (?): Move to own file.*

After the refactor, you should update the specs and shit. This is how you will know if the refactor was decent and your test structure is decent because the changes you should make should be as minimal as possible.

  $ rspec spec --format nested # You will be able to see the test results for each of the classes XD.

#### Exploratory Testing

Exploratory testing is a practice in which we discover the behavior of an application by interacting with it directly. It is the opposite of the process we’ve been learning about, in that we’re looking to see what the app actually does and then question whether that is the correct behavior.

Perhaps you’re wondering why we’d want to do exploratory testing if we’ve already tested the app. Well, we haven’t. Remember that BDD is a design practice, not a testing practice. We’re using executable exam- ples of how we want the application to behave. But just as Big Design Up Front fails to allow for discovery of features and designs that nat- urally emerge through iterative development, driving out behavior with examples fails to unearth all of the corner cases that we’ll naturally discover by simply using the software.

## Introduction

Test-Driven Development is a developer practice that involves writing tests before writing the code being tested. Begin by writing a very small test for code that does not yet exist. Run the test, and, naturally, it fails. Now write just enough code to make that test pass. 

Once the test passes, observe the resulting design, and refactor any duplication you see.

As a code base increases in size, we find that more attention is con- sumed by the refactoring step. The design is constantly evolving and under constant review, though it is not predetermined. This is emergent design at a granular level and is one of the most significant by-products of Test-Driven Development.

The problem with testing an object’s internal structure is that we’re testing what an object is instead of what it does. What an object does is significantly more important.

Stakeholders don’t usually care that data is being persisted in an ANSI-compliant, relational data- base. They care that it’s in “the database,” but even then, they generally mean is that it’s stored somewhere and they can get it back.

BDD puts the focus on behavior instead of structure, and it does so at every level of development. Whether we’re talking about an object calculating the distance between two cities, another object delegating a search off to a third-party service, or a user-facing screen providing feedback when we provide invalid input, it’s all behavior!

Given, When, Then, the BDD triad, are simple words that we use whether we’re talking about application behavior or object behavior.

RSpec was created by Steven Baker in 2005. Steven had heard about BDD from Aslak Hellesøy, who had been working on a project with Dan North when the idea first came to light. Steven was already inter- ested in the idea when Dave Astels suggested that with languages like Smalltalk and Ruby, we could more freely explore new TDD frameworks that could encourage focus on behavior. And RSpec was born.

We use RSpec to write exe- cutable examples of the expected behavior of a small bit of code in a controlled context. Here’s how that might look:

	describe MovieList do
        context "when first created" do
          it "is empty" do
            movie_list = MovieList.new
            movie_list.should be_empty
		end 
	end
	end

The it( ) method creates an example of the behavior of a MovieList, with the context being that the MovieList was just created.

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

	.								# represents that the test passes
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

- __Have business value.__ Clearly, the game is no fun unless it generates a different secret code each time.
- __Be testable.__ That’s easy. We just start up a bunch of games and ask for the code.
- __Be small enough to implement in one iteration.__

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

The Scenario keyword is followed by a string and then a series of steps. __Each step begins with any of five keywords: Given, When, Then, And, and But.__

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

>codebreaker_submits_guest.feature





















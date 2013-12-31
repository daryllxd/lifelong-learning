# Introduction

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

# Hello

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































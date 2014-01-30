## RSpec switches

    -- color
    -- drb # for BASED SPORK
    -- format documentation # for specification like thingie

# Part II - Behaviour-Driven Development

## The Case for BDD

> The Agile Manifesto

> We are uncovering better ways of developing software by doing it and helping others do it. Through this work we have come to value:

> 
  - Individuals and interactions over processes and ktools
  - Working software over comprehensive documentation 
  - Customer collaboration over contract negotiation
  - Responding to change over following a plan
  
Tiny, one- or two-week iterations or mini-projects, using a small, fixed-size team. It would be easy to calculate the project budget then.

We need: Reasonable guess on project size and feature (not module) prioritization.

Because we have stuff coming every 2 weeks, we don't have 'database schema iteration' or 'middleware iteration.'

Client sees new features coming in, and changes are still fresh in the devs' minds.

No longer unstable in production, because we deliver every iteration. App servers are configured, initialized; database schemas are automatically updated; code is automatically built, assembled, and deployed; tests are automatically exectured.

After the first iteration, the team is in maintenance mode.

#### Challenges of Agile

- We need to accept that the fine details of the requirements are bound to change, and that's okay.
- Instead of one-shot, requirements have to be streamlined.
- Design and existing code is bound to change. The Agile process requries us to keep revisiting the same code as we evolve it to do new things.
- Integration test/continuous integration.
- Continuous regression testing.
- Everyone sits beside each other.

## Writing Software that Matters

> Behaviour-Driven Development is about implementing an application by describing its behavior from the perspective of its stakeholders.

#### Three principles of BDD:

1. __Enough is enough.__ Don't automate everything.
2. __Deliver stakeholder value.__ Stop doing stuff that doesn't have value.
3. __It’s all behavior.__ Whether at the code level, the application level, or beyond, we can use the same thinking and the same linguistic constructs to describe behavior at any level of granularity.

#### SMART outcomes

1. __Specfic.__ There is enough detail to know that something is done.
2. __Measurable.__ You can determine whether the objective was reached.
3. __Achievable.__ You reduce unrealistic expectations.
4. __Relevant.__ Clear, concise reporting.
5. __Timeboxed.__ We know when to call time if we haven't achieved a routine.

#### Stories vs. Features

A feature is somethign that delivers cohesive value to a stakeholder. A story is a piece of demonstrable functionality that shouldn't take a few days to implement.

We can separate the "edge cases" out with a different story. Ex: Verifying email addresses, maybe you don't have time to test EVERY. SINGLE. THING.

#### The Cycle of Delivery

1. Stakeholder discusses requirements with business analysts. Use features and stories.
2. Create stories for the users. What does _done_ look like?
3. Devs will code enough to satisfy the agreed scenarios, and _no more_.
3. Automate the scenarios where it makes sense to do so. Cuke helps here.
4. A handful of stories (1 week) is an _iteration_.

#### What's in a Story?

- __A title__ so we know which story we are talking about.
- __A narrative__ that tells us what this story is about. It shold have _a stakeholder_, a description of the _feature_ they want, and the reason they want it--the _benefit_ they expect to gain.

  _As a [stakeholder], I want [feature] so that [benefit]._

- __Acceptance criteria__ so we know when we are done. This takes the form of a number of _scenarios_ made up of individual _steps_.

# Part III - RSpec

## Code Examples

- _subject code_: The code whose behavior we are specifying with RSpec.
- _expectation_: An expression of how the subject code is expected to behave.
- _code example_: An executable example of how the subject code can be used and its expected behavior in a given context.

`describe()`: Defines an example group.

`it()`: Defines a code example. The string passed to it describes the specific behavior we're interested in specifying about that facet. The block holds the example code.

    describe "A new Account" do
    it "should have a balance of 0" do
               account = Account.new
               account.balance.should == Money.new(0, :USD)
    end end

`describe()`/`context()` - Takes in an arbitrary # of arguments and returns a subclass of `RSpec::Core::ExampleGroup`. 

    # We get Authentication::User with no roles assigned
    module Authentication
      describe User, "with no roles assigned" do

`it()` - Takes a single string, an optional hash, and an optional block.

#### Pending examples: When?
- Add pending examples as you think of new examples.
- Disable examples without losing track of them.
- Wrap failing examples when you want to be notified that changes to the system cause them to pass.

#### Hooks

`before(:each)`: Recreates the context before each example and keeps state from leaking from ex to ex.

    describe Stack do
      context "when empty" do
        before(:each) do
          @stack = Stack.new
        end
      end

      context "when almost empty (with one element)" do 
        before(:each) do
          @stack = Stack.new
          @stack.push 1
        end 
      end

      context "when almost full (with one element less than capacity)" do
        before(:each) do
          @stack = Stack.new
          (1..9).each { |n| @stack.push n }
        end
      end

      context "when full" do
        before(:each) do
          @stack = Stack.new
          (1..10).each { |n| @stack.push n }
        end
      end
    end

Each of the contexts are isolated from each other.

`before(:all)`: All instance variables are copied to each instance in which the examples are run. Rarely used.

`after(:each)`: When maintaining global states. Not used much.

`after(:all)`: Even rarer than the others. Used usually for closing browsers, database connections, closing sockets, etc.

`around(:each)`: [TODO]

#### Helper Methods

Helper methods are defined in the example group, which are then accessible from all the examples in that group.
  
    describe Thing do
      def create_thing(options)
        thing = Thing.new
        thing.set_status(options[:status])
        thing
      end

      it "should do something when ok" do
        thing = create_thing(:status => 'ok')
        thing.do_fancy_stuff(1, true, :move => 'left', :obstacles => nil) ...
      end

      it "should do something else when not so good" do
        thing = create_thing(:status => 'not so good') 
        thing.do_fancy_stuff(1, true, :move => 'left', :obstacles => nil) ...
      end 
    end
    
#### Sharing Helper Methods

> features/steps/shared.rb, spec/support.rb

    module UserExampleHelpers
      def create_valid_user
        User.new(:email => 'email@example.com', :password => 'shhhhh')
      end

      def create_invalid_user 
        User.new(:password => 'shhhhh')
      end 

    end

> Share that shit. spec_helper.rb from Gitlab.

    RSpec.configure do |config|
      config.mock_with :rspec

      config.include LoginHelpers, type: :feature
      config.include LoginHelpers, type: :request
      config.include FactoryGirl::Syntax::Methods
      config.include Devise::TestHelpers, type: :controller

      config.include TestEnv

      # If you're not using ActiveRecord, or you'd prefer not to run each of your
      # examples within a transaction, remove the following line or assign false
      # instead of true.
      config.use_transactional_fixtures = false

      config.before(:suite) do
        TestEnv.init(observers: false, init_repos: true, repos: false)
      end
      config.before(:each) do
        TestEnv.setup_stubs
      end
    end

#### Shared Examples

When we expect instances of more than one class to behave in the same way, we can use a shared example group to describe it once and then include that example group in other example groups.

    shared_examples_for "any pizza" do
      it "tastes really good" do
        @pizza.should taste_really_good
      end

      it "is available by the slice" do 
        @pizza.should be_available_by_the_slice
      end 
    end

Shared group stuff can be shared (lol) with the `it_behaves_like()` method.

    describe "New York style thin crust pizza" do
      before(:each) do
        @pizza = Pizza.new(:region => 'New York', :style => 'thin crust')
      end

      it_behaves_like "any pizza"
    
    end

    describe "Chicago style stuffed pizza" do 
      before(:each) do
          @pizza = Pizza.new(:region => 'Chicago', :style => 'stuffed')
      end

      it_behaves_like "any pizza"
    
    end

#### Nested Example Groups

Order precedence: Outer before -> Inner before -> Thingies -> Inner after -> Outer after.

## RSpec::Expectations

#### `should`, `should_not`, and `matchers`

`should()` and `should_not()` both accept either a _matcher_ or a Ruby expression using a specific subset of Ruby operators. A matcher is an object that tries to match against an expected outcome.

    result.should equal(5)

- When the Ruby interpreter encounters this line, it begins by evaluating `equal(5)`. 
- Behind the scenes, the `should()` calls `matcher.matches?`, passing `self` as the argument.
- If `matches?(self)` returns `true`, move on.
- If `false`, `should()` asks the matcher for a failure message and raises an `ExpectationNotMetError` with that message.

#### Built-in Matchers

    include(item)
    respond_to(message)
    raise_error(type)

    prime_numbers.should_not include(8)
    list.should respond_to(:length)
    lambda { Object.new.explode! }.should raise_error(NameError)

#### Equality

    a.should == b
    a.should === b
    a.should eql(b)
    a.should equal(b)

`should == ` means we're concerned with value equality, not object identity.

    (3 * 5).should == 15
    person = Person.new(:given_name => "Yukihiro", :family_name => "Matsumoto")
    person.full_name.should == "Yukihiro Matsumoto"
    person.nickname.should == "Matz"

`equal()` means same object.

Floating-Point Calculations (bitch): Use `be_close()`.

    result.should be_close(5.25, 0.005)

Match regex

    result.should match(/this expression/)
    result.should =~ /this expression/

#### Expecting Errors

    expect { do_something_risky }.to raise_error

#### Expecting a Throw [TODO]

#### Predicate Matchers

    array.empty?.should == true # This is replaceable with
    array.should be_empty
    user.should be_in_role("admin") # This will pass as long as user.in_role?("admin") returns true.

If the missing method begins with "be," RSpec strips off the "be" and appends “?”; then it sends the resulting message to the given object.

    instance_of?(type) # be_instance_of
    be_a_kind_of(Player) # kind_of?

    request_parameters.has_key?(:id).should == true
    request_parameters.should have_key(:id)

    field.players.select {|p| p.team == home_team }.length.should == 9
    home_team.should have(9).players_on(field)

    collection.should have(37).items

    day.should have_exactly(24).hours
    dozen_bagels.should have_at_least(12).bagels
    internet.should have_at_most(2037).killer_social_networking_apps

#### Operator Expressions

We want to be precise in our operators: 2 + 2 = 4, not 2 + 2 > 3. Writing random numbers, if randomizing 1-10, we want 1 to appear 1,000 in 10,000 tries, +- 2%.

    result.should == 3
    result.should =~ /some regexp/
    result.should be < 7
    result.should be <= 7
    result.should be >= 7
    result.should be > 7

#### Subjectivity

The _subject_ of an example is the object being described.

Explicit means it's delegated. `it` is understood to be `subject`.

    describe Person do
      subject { Person.new(:birthdate => 19.years.ago) }
      it { should be_eligible_to_vote }
    end

Implicit: Concise ass fuck. (The object has to be instantiated without any arguments, though.)

    describe RSpecUser do
      it { should be_happy }
    end


## RSpec::Mocks

__Both mock and stub are aliases of the more generic double.__ WTF.

A _test double_ stands in for a collaborator in an example. If we want the CheckingAccount object to log messages somewhere but we have yet to develop a logger, we can use a double in its place. We often refer to them by names like mock objects, test stubs, fakes.

> Object double
    thingamajig_double = double('thinagmajig')
> New stub (method)
    stub_thingamajig = stub('thingamajig')
> New mock ()
    mock_thingamajig = mock('thingamajig')

#### Method Stubs

__A _method stub_ is a method that we can program to return predefined responses during the execution of a code example.__

    describe Statement do
      it "uses the customer's name in the header" do

> Create a test double. The customer double stands in for a real Customer. This is a "Customer".

        customer = double('customer')

> Method stub: This is a method `name` that we are making, and calling this fake method means you return 'Aslak'.

        customer.stub(:name).and_return('Aslak')
        statement = Statement.new(customer)
        statement.generate.should =~ /^Statement for Aslak/
      end 
    end

Passing the test. We are making a fake `customer` with a fake method named `name`.

    class Statement
      def initialize(customer)
          @customer = customer
      end

      def generate
        "Statement for #{@customer.name}"
      end 

    end

    # Simplest code to pass the test.
    def generate
      "Statement for Aslak"
    end

#### Message Expectations: A message expectation, aka mock expectation, is a method stub that will raise an error if it is never called.

    describe Statement do
      it "uses the customer's name in the header" do
      customer = double('customer') 

> Using `should_receive` instead of `stub()` sets an expectation that the cx double should receive the `name()` message.

      customer.should_receive(:name).and_return('Aslak') 
      statement = Statement.new(customer) 
      statement.generate.should =~ /^Statement for Aslak/
      end 
    end

#### Mixing Method Stubs and Message Expectations

    describe Statement do
      it "logs a message on generate()" do

> Create a dummy customer with a dummy method.

        customer = stub('customer')
        customer.stub(:name).and_return('Aslak')

> Create a dummy logger.

        logger   = mock('logger')
        statement = Statement.new(customer, logger)

> We test both logger and generate at the same time because logger depends on generate.

        logger.should_receive(:log).with(/Statement generated for Aslak/)
        statement.generate
      end 
    end

#### Test-Specific Extensions

A test-specific extension is an extension of an object that is specific to a particular test, or example in our case.

Consider a case in Ruby on Rails where we want to disconnect the system we are working on from the database. We can use real objects but stub the find( ) and save( ) methods that we expect to be invoked.

    describe WidgetsController do
      describe "PUT update with valid attributes"
        it "redirects to the list of widgets"
          widget = Widget.new()

> We stub the class-level find() method to return a known value. We get teh widge.

          Widget.stub(:find).and_return(widget)

> We stub the update_attributes() value to return true.

          widget.stub(:update_attributes).and_return(true)

> We invoke put() from the Rails functional testing API.

          put :update, :id => 37

> The response should redirect to the list of widgets.

          response.should redirect_to(widgets_path)
        end
      end 
    end

We don’t really need to know what constitutes valid attributes in order to specify the controller’s behavior in response to them. __We just program the Widget to pretend it has valid attributes.__

_Validation rules will not have any impact on this example._  As long as the controller's responsibility does not change, this example won't need to change, nor will the controller itself.

_No explicit dependency on the database in this example._ Rails will try to load up the schema for the widgets table, but there are no DB interactions.


## Tools and Integration

    $ rspec simple_math_spec.rb
    # Rails
    $ bundle exec rspec spec
    $ rspec path/to/my/specs --format documentation
    # Format to HTML
    $ rspec path/to/my/specs --format html:path/to/my/report.html

#### Rake: `rspec-rails`

    rake spec             # Run all specs in spec directory
    rake spec:controllers # Run the code examples in spec/controllers
    rake spec:helpers     # Run the code examples in spec/helpers
    rake spec:models      # Run the code examples in spec/models
    rake spec:requests    # Run the code examples in spec/requests
    rake spec:routing     # Run the code examples in spec/routing
    rake spec:views       # Run the code examples in spec/views
    
#### RCov

RCov is a code coverage tool. The idea is that you run your specs, and RCov observes what code in your application is executed and what is not. It then provides a report listing all the lines of code that were never executed when you ran your specs and a summary identifying the per- centage of your code base that is covered by specs.

#### Guard

    guard 'rspec', :version => 2, :cli => '--drb --color --format doc' do
      watch(%r{^spec/.+_spec\.rb$})
      ...
    end

## Extending RSpec [TODO]
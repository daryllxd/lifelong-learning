## Ruby Conf 12 - Boundaries by Gary Bernhardt
[link](https://www.youtube.com/watch?v=yTkzNHF6rMs)

Test doubles.

    describe Sweeper do
      let(:bob) do
        stub(active?: true, paid_at: 2.months.ago)
      end
      let(:users) { [bob] }
      before { User.stub(:all) { users } }  # This is a way to isolate yourself from the database.

      it 'emails the user' do
        UserMailer.should_receive(:billing_problem).with(bob)
        Sweeper.sweep
      end

This is isolated because it removes the dependencies like `User` and `UserMailer`.

    class Sweeper
      def self.sweep
        User.all.select do |user|
          user.active? && user.paid_at < 1.month.ago
        end.each do |user|
          UserMailer.billing_problem(user)
        end
      end
    end

- Win: Real test-driven design. Seeing that you mocked a lot of stuff means that you don't really have a good design.
- Win: Outside-in TDD, you can TDD the sweeper before the `UserMailer` is written.
- Win: Tests are faster.
- Loss: In production, you run real classes. If you don't stub and mock the boundary correctly, your test will pass and your system will not work. *This can overshadow all the benefits.*

#### Attempts to fix this problem:

- Contract/collaboration tests.
- `rspec-fire`: If you mock a class with RSpec fire, you can only mock methods that actually exist.
- Static typing & static mocks.

These just solve stuff like wrong method names, they don't solve the underlying problem of "it might not actually work". Some people try to solve the problem by using Integration tests. The problem with Integration tests are that Integration tests are a scam. (Too many test cases, too long to run all the tests ever.)

#### Values

If you wanted to isolate the `+` operator, what dependencies do you have? None, but not because it is a simple operation, it has two properties that are necessary for it to be naturally isolated with no stubs or mocks.

1. It takes values are arguments and it returns new values, it doesn't mutate the values. It takes in an integer and returns an integer.
2. It also does not have dependencies. There's nothing to mock. It's a local computation that produces a value.

So, how do we change the Sweeper?

> Old: We can't use a stub so we remove the `:bob` stub. We also remove stubbing the `:all`.

    describe Sweeper do
      let(:bob) do
        stub(active?: true, paid_at: 2.months.ago)
      end
      before { User.stub(:all) { users } }

> New: We replace bob with a real object, but not necessarily an AR object, we can use a Struct or a hash.

      let(:bob) do
        User.new(active: true, paid_at: 2.months.ago)
      end

To facilitate this, we need to create a new class which will get all the expired users.

    class ExpiredUsers
      def self.for_users(users)
        users.select do |user|
          user.active? && user.paid_at < 1.month.ago
        end
      end
    end

Instead of method calls as boundaries (stubbing), the values are now the boundaries.

#### Paradigms

The idea to have the code communicate via values as opposed to method calling?

> Procedural: With mutation, data and code are separated.

    def feeding_time
      walruses.each do |walrus|       # If you see each, usually there is something destructive going on.
        walrus.stomach << Cheese.new
      end
    end

We also know about the structure of a walrus, we know it has a stomach, and we know that it can be `<<`ed.

> OO: With mutation, data and code are combined (object does stuff with the data).

    def feeding_time
      walruses.each do |walrus|
        walrus.eat(Cheese.new)        # Walrus knows how to eat, we just call it
      end
    end

    class Walrus
      def eat(food)
        @stomach << food              # Same as before, just encapsulated.
      end
    end

> Functional: No mutation, data and code are separated.

    def feeding_time
      walruses.map do |walrus|
      eat(walrus, "cheese")
    end

    def eat(walrus, food)
      stomach = walrus.fetch(:stomach) + [food]    # We create a new stomach, one with food
      walrus.merge(:stomach => stomach)            # We create a new walrus, with the new stomach
    end

> FauxO.

    def feeding_time
      walruses.map do |walrus|       # Still a map so we are creating new instances
        walrus.eat(Cheese.new)
      end
    end

    class Walrus
      def eat
        Walrus.new(@name, @stomach + [food]) # Not destructive, it constructs a new Walrus with stuff in its stomach.
      end
    end

#### Core & Shell

The problem is there is no destructive stuff so you have

[TODO]: FINISH_THIS!

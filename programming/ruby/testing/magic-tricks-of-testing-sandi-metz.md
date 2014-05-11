# The Magic Tricks of Testing

## Why do you hate your tests?
- They're fragile.
- It is rational to say that you hate them, because for many people, the promise of testing is not fulfilling.
- Integration tests, they check whatever is supposed to happen. Unit tests narrow the focus down until the unit test is the only thing you care about. Unit tests are like "each cell is correct", and integration is like the whole beast.
- For many of us, our app feels like spaghetti. Focus on the messages.

## The object under test should be contained in itself.
- Outside world sends incoming things onto the object under test.
- The object also sends stuff outside.
- The object can send stuff to itself, too.
- So these messages can be either *Queries* or *Commands*.

*Query: Return something/change nothing.*

*Command: Return nothing/change something.*

We conflate commands and queries at our peril. Example, when I pop a queue. I pop it, and get the element I popped out. But these things, they get tested differently. So it's really important to understand if you have a command or query or both.

# Message Origin x Type

## Query

*Incoming Messages*

    class WheelTest < MiniTest::Unit::TestCase
      def test_calculates_diameter
        wheel = Wheel.new(26, 1.5)
        assert_in_delta(29, wheel.diameter, 0.01) # This just asserts a value as that diameter is within 0.1.
      end
    end

*Rule: Test incoming query messages by making assertions about what they send back.* I test that something actually gets returned and the something is the correct value.

    class Gear
      attr_reader :chainring, :cog. :wheel

      def initialize(args)
        ...
      end

      def gear_inches
        ratio * wheel.diameter
      end

      private
      def ratio
        chainring / cog.to_f
      end
    end

See `gear_inches` is based on the method `ratio` which is a private method. So if you stand there, the test you write will be like this:

    def test_calculates_gear_inches
      gear = Gear.new(chainring,....)
      assert_in_delta(137.1, gear.gear_inches, 0.01)
    end

This is the same thing as the other test! This gives me absolutely nothing new. Remember: *test the interface, not the implementation*. I don't want to see how the underlying thing works. I just want the interface to work.

## Incoming Command

    class Gear
      attr_reader :chainring, :cog. :wheel

      def set_cog(new_cog)
        @cog = new_cog
      end
    end

So what happens here is you assign @cog to something. So what you need to test is the fact that it was really assigned.

    def test_set_cog
      gear = Gear.new
      gear.set_cog(27)
      assert(27, gear.cog) # Assert the side effect
    end

*Make assertions about the DIRECT public side effects.* Direct: It's the responsibility of the last Ruby class involved.

Remember: The Receiver of the incoming message has the *sole responsibility* for asserting the result of direct public side effects!

## Private methods

So, how should we test `ratio`? Some people are thinking about making an explicit test for this.  *If the test for gear inches is correct, this test will be redundant*.

Second, they do the `gear.expect(:ratio)` to be sent, too. This is a problem because it *binds you to the current implementation*. As far as you are concerned, this method does not exist. It makes it impossible for you to change this code. So *don't test private methods*. Caveat: Break rule if it saves $$$ during development.

*The rules of private methods are don't test them. Do not make assertions about their result, and do not expect to send them.*

## Outgoing Query Messages

We already know that the query works. So why would you actually duplicate Wheel's test? It's an anti-pattern to duplicate that test. This doesn't prove anything!

*Rules: Do not test outgoing query messages. Do not make assertions about their result, do not expect to send them.*  If a message has no visible side-effects, **it is invisible to rest of your app. So the sender should *not* test it**.

## Outgoing Command Messages

When player changes `Gears`, things change.

    class Gear
      attr_reader :chainring. :cog, :wheel, :observer
      def initialize(args)
        @observer = args[:observer]
      end

      def set_cog(new_cog)
        @cog = new_cog
        changed
        @cog
      end

      def changed
        observer.changed(chainring, cog)
      end

    end

This is sort of observer pattern-ish. So when a cog is changed, observers are sent. So to the observer, `changed` is an *INCOMING* command message. So this message *HAS* to be sent, it has to.

So it is very tempting to write code like this:

    def test_saves_changed_cog_in_db
      @observer = Obs.new
      @gear = Gear.new(chainring: 52, cog: 11, observer: @observer)
      @gear.set_cog(27)

      # assert something about the state of the db
    end

What happens is you are banking on something that can change VERY far away. Gear's responsibility is not to update the database, it should NOT EVEN KNOW THAT IT IS HAPPENING. This is an integration test. Gear's job is to just send this thing, and to test this, we require using a mock.

    def test_notifies_observers_when_cogs_change
      @observer = MiniTest::Mock.new
      @gear = Gear.new(chainring: 52, cog: 11, observer: @observer)
      @observer.expect(:changed, true, [52, 27])
      @gear.set_cog(27)
      @observer.verify
    end

This test does not depend on the objects and messages and side effects. *This test depends on the interface of the message, it tests the thing for which `Gear` is responsible.*

## Rule: Expect to send outgoing command messages. Caveat, just break the rule if the side effects are stable and cheap.

What happens if Observer stops implementing `changed`?

The mock plays a role of an object in your app. The fake thing and the real thing both promise that they are going to implement a common API, and it is your job that your fakes and your doubles keep your promise. So honor the contract.

Be a minimalist: Each additional adds a cost. The rule is *Test Everything Once*. These rules are simple, and these are our jobs.

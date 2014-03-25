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

*Make assertions about the DIRECT side effects.* Direct: It's the responsibility of the last Ruby class involved.

Remember: The Receiver of the incoming message has the *sole responsibility* for asserting the result of direct public side effects!

## Private methods

So, how should we test `ratio`? Some people are thinking about making an explicit test for this.  *If the test for gear inches is correct, this test will be redundant*.

Second, they do the `gear.expect(:ratio)` to be sent, too. This is a problem because it *binds you to the current implementation*. It makes it impossible for you to change this code. So *don't test private methods*. Caveat: Break rule if it saves $$$ during development.



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

We conflate commands and queries at our peril. Example, when I pop a queue. I pop it, and get the element I popped out. But these things, they get tested differently.

## Message Origin x Type

##### Query

*Incoming Messages*

    class WheelTest < MiniTest::Unit::TestCase
      def test_calculates_diameter
        wheel = Wheel.new(26, 1.5)
        assert_in_delta(29, wheel.diameter, 0.01) # This just asserts a value as to what happens.
      end
    end


git-new-remote-tracking

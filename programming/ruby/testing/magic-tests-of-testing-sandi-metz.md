# The Magic Tricks of Testing

## Why do you hate your tests?
- They're fragile.
- It is rational to say that you hate them, because for many people, the promise of testing is not fulfilling. 
- Integration tests, they check whatever is supposed to happen. Unit tests narrow the focus down until the unit test is the only thing you care about. Unit tests are like "each cell is correct", and integration is like the whole beast.
- For many of us, our app feels like spaghetti. Focus on the messages. 

## The object under test should be contained in itself.
- Outside world sends incoming things onto the object under test.
- The object also sends stuff outside.
- So these messages can be either *Queries* or *Commands*.

*Query: Return something/change nothing. Command: Return nothing/change something.* We conflate commands and queries at our peril. These hidden side effects make our lives bad lol.

## Message Origin x Type

##### Query

*Incoming Messages*

    class WheelTest < MiniTest::Unit::TestCase
      def test_calculates_diameter
        wheel = Wheel.new(26, 1.5)
        assert_in_delta(29, wheel.diameter, 0.01)
      end
    end

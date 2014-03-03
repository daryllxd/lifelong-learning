## 1. Extract Value Objects

Value Objects are simple objects whose equality is dependent on their value rather than an identity. `Date`, `URI`, and `Pathname` are examples from Ruby’s standard library, but your application can (and almost certainly should) define domain-specific Value Objects as well.

In Rails, Value Objects are great when you have an attribute or small group of attributes that have logic associated with them. Anything more than basic text fields and counters are candidates for Value Object extraction.

- Text messaging: `PhoneNumber`
- E-commerce: `Money`
- Code Climate: `Rating` to represent a simple A-F grade.

A Ruby `String` can represent, but a `Rating` allows me to combine behavior with the data.

    class Rating
      include Comparable

      def self.from_cost(cost)
        if cost <= 2
          new("A")
        elsif cost <= 4
          new("B")
        elsif cost <= 8
          new("C")
        elsif cost <= 16
          new("D")
        else
          new("F")
        end
      end

      def initialize(letter)
        @letter = letter
      end

      def better_than?(other)
        self > other
      end

      def <=>(other)
        other.to_s <=> to_s
      end

      def hash
        @letter.hash
      end

      def eql?(other)
        to_s == other.to_s
      end

      def to_s
        @letter.to_s
      end
    end

> He is able to add methods to the `Rating` without gumming up an AR:Base object. The class has just one responsibility, and that is to store/compare ratings.

`ConstantSnapshot`s expose an instance of Rating in its public interface:

    class ConstantSnapshot < ActiveRecord::Base
      # …

      def rating
        @rating ||= Rating.from_cost(cost)
      end
    end

#### Advantages
- Added methods: `worse_than?` and `better_than?` which are more expressive than Ruby's `<` and `>`.
- Defining `hash` and `eql?` makes it possible to use a Rating as a hash key.
- `to_s` makes it easier to interpolate a string.
- Class definition provides a convenient place for a factory method (`from_cost`).

## Eastward Ho! A Clear Path Through Ruby With OO
[link](http://confreaks.com/videos/4825-RubyConf2014-eastward-ho-a-clear-path-through-ruby-with-oo)

Information travelling eastward is good and Information travelling westward is bad.

    <- Queries
    -> Commands

1. *Always return `self`.*
2. *Objects may query themselves.*
3. *Factories are exempt.*

`if` is probably the simplest and most powerful words in the room, and we ask ourself what's the problem with one `if`? Well the problem is that it's usually not just one, it goes all over the place.

    def Person
      attr_reader :address

      def display_address

      end
    end

We might want to display street, state, postal code, etc. Let's not do the `if` `if` `if` constructing a big string method.

*Tell, don't ask. Ensure a correct division of responsibility that places the right funcaionality in the right class without causing excess coupling to other classes.*

Another way to think of it is this: *Command, Don't Query.* Think of kids, you command them, you just know they have to have their socks and shoes on, etc.

    def display_address
      address.display
      self
    end

    class Address
      def display
        ...?
      end
    end

Is it okay to query Address? Yes, because it is its own object. It should be able to know some data.


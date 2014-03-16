# Bryan Helmkamp -- Refactoring Fat Models with Patterns

Specific patterns for managing complexity in the domain layer.

Rails's ActiveRecord is the thing that makes it hard to OOP in Rails.

AR, by definition, couples your models to the db schema. The tools you have to manage complexity in your domain are limited by the number of tables you have. If you have a lot of behavior, if you just use the AR pattern, you'll have a brown field.

Rails: Calzone code. You have independent units of code, collaborating loosely. This leads to god objects. It's User and your main thing, such as Order in an e-commerce app.

Skinny controllers, fat models -> Skinny controllers, skinny models. Some will be AR, some will be not AR.

Anti-pattern: Extract mixins, no. They are basically a form of inheritance. It sweeps the model complexity under a rug. Ex: The mixin "friendy" to have friends in a social network, it actually makes it harder to debug because you split the thingies.

## Value Objects
- Equality dependent on value.
- Usually immutable.

Ex: Fixnum, URI.

> Old

    class Constant < ActiveRecord::Base
      # ...

      def worse_rating
        if rating_string == "F"
          nil
        else
          rating_string.succ
        end
      end

      def rating_higher_than?(other_rating)
        rating_string > other_rating.rating_string
      end

      def rating_string
        if    remediation_cost <= 2  then "A"
        elsif remediation_cost <= 4  then "B"
        elsif remediation_cost <= 8  then "C"
        elsif remediation_cost <= 16 then "D"
        else "F"
        end
      end
    end

So we see here that `rating` is being repeated multiple times. This is one of the best ways to know that there is an object is waiting to be extracted at this point. By having the rating logic tied into an AR object, there's no way to have a `Rating` instance on its own outside the value object.

> So we can create this thing:
    
    class Rating
      include Comparable

> Factory method.
      
      def self.from_cost(cost)
        if    cost <= 2  then new("A")
        elsif cost <= 4  then new("B")
        elsif cost <= 8  then new("C")
        elsif cost <= 16 then new("D")
        else new("F")
        end
      end

      def initialize(letter)
        @letter = letter
      end

      def to_s
        @letter.to_s
      end

> Comparison

      def <=>(other)
        other.to_s <=> to_s
      end

      def worse
        return nil if @letter == "F"
        self.class.new(@letter.succ)
      end

      def higher_than?(other)
        self > other
      end

      def hash
        @letter.hash
      end

      def eql?(other)
        to_s == other.to_s
      end
    end

> Usage is so simple. `constant.rb`. So you can access `Constant.rating`.

    class Constant < AR::Base
        def rating
            Rating.from_cost(cost)
        end
    end

#### Implications
- Comparable
- Usable as a hash key
- Interpolates into strings
- Convenient place for a Factory Method.

#### When to use?
- I like value objects that tends to follow objects around.
- Data clumps, such as First and Last Name, addresses with Number + Street + whatever.
- RoR primitives. To layer a bunch of things on this thingie.

## Service Objects
- Encapulates a process in the app.
- Standalone operations.
- Short lifecycle.
- Maybe stateless??

> user.rb: Has things associated with password. We have password authentication from either Bcrypt or an external API, and a security thing to prevent timing attacks.

Now normally the `secure_comparable` method would be 200 lines down and it doesn't also makes sense to put in the `User` object.

    class User < ActiveRecord::Base
      # ...

      def password_authenticate(unencrypted_password)
        BCrypt::Password.new(password_digest) == unencrypted_password
      end

      def token_authenticate(provided_token)
        secure_compare(api_token, provided_token)
      end

    private

      # constant-time comparison algorithm to prevent timing attacks
      def secure_compare(a, b)
        return false unless a.bytesize == b.bytesize
        l = a.unpack "C#{a.bytesize}"
        res = 0
        b.each_byte { |byte| res |= byte ^ l.shift }
        res == 0
      end

    end

I would create a PasswordAuthenticator and a Token Authenticator.




Domain-driven design.

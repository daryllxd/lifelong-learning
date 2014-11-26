## My Take on Services in Rails
[link](http://adamniedzielski.github.io/blog/2014/11/25/my-take-on-services-in-rails/)

I want to have my logic accessible from Rake tasks, background jobs, console, tests. If I throw logic into a controller, it won't be accessible from all these places.

A class which inherits from ActiveRecord::Base already has a lot of responsibilities. It handles query interface, associations, and validations.

I named it `call` because Lambda also responds to `call` so in your tests you have the possibility to mock service with Lambda.

#### Splitting Big Services

    class CreateUserAccount
      class GenerateToken
        def call(user)
        end
      end
    end

    class CreateUserAccount
      class SendWelcomeEmail
        def call(user)
        end
      end
    end

    class CreateUserAccount
      def call(params)
        generate_token.call(user)
        send_welcome_email.call(user)
      end
    end

#### Dependency Injection: Use `build`

    class CreateUserAccount

      # Has two dependencies
      def self.build
        new(GenerateToken.build, SendWelcomeEmail.build)
      end

      def initialize(generate_token, send_welcome_email)
        @generate_token = generate_token
        @send_welcome_email = send_welcome_email
      end

      def call(params)
        # code which creates user model
        [...]
        @generate_token.call(user)
        @send_welcome_email.call(user)
        user
      end
    end

    class SendWelcomeEmail

      # No dependencies
      def self.build
        new
      end
    end

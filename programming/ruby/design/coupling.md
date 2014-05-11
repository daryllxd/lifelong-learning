# WI 2

Coupling = degree to which the components rely on each other. BTW remember that a system has to have some degree of coupling or else nothing will interact with each other.

    instance_variable_set # this sets an instance variable of something else. Don't do this. This is the worst form of coupling ever. This could be helpful if you were just playing around. Protip, if you can't test the code, it's probably bad code.

## Global Coupling

    FactoryGirl.define do
      factory :user
        # Changes here are global and can affect many test files.
      end
    end

We have to have some degree of coupling in reusable factories, but at least we have a central repository that we can define.

These feel like you have a global engine of `FactoryGirl` factories. This is much like a singleton for all the factories. But the only alternative is to have multiple repositories of factories. Which is bad!

## Control Couple

> Example from old `ActiveRecord`:

    def save(should_run_validations = true)
      if should_run_validations
        run_validations
        persist
      else
        persist
    end

This is basically 2 different validations. Why not just have 2 methods?

    def save
    end

    def save_without_validations
    end

*This is an example of not letting Ruby do its job. Whenever you pass in a boolean flag, that could be a code smell!*

This is the same thing:

    def save(options = { validate: true })
      if (options[:validate])
      end
    end

This actually changed a lot of Rails apps. It's worse than renaming a method because it's difficult to search for this.

## Data Coupling

This is an example of where you use the parameter, but you don't fork the behavior based on it. You just use the parameter.

    class ScreenPrinter
      def print(text)
        output_to_screen(text.to_s)
      end
    end

Since this method is coupled to its parameter, a change to that argument can cause breakage.If we add more methods which need `text`, it feels repetitive.

    def print(text)
    end

    def log_thing(text)
    end

Why not just pass `text` in as a constructor? BTW more parameters are bad because you get to know about the internals of the application.

## Feels good man

    class ScreenPrinter
      def print
        output_to_screen(text.to_s)
      end
    end

This is the least amount of coupling. BTW don't turn this into a game where you want to turn everything into something in the constructor.

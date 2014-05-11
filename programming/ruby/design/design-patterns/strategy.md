# Strategy

Strategy is used for more complicated behaviors than template method.

    module Generators
      class Base
        attr_reader :format

> Constructor gets a `format` parameter which will determine the output.

        def intialize(format = :html)
          @format = format
        end

> We pass in a new instance of a strategy class from the format variable. We rely on a format attribute being passed to the initializer.

        def render
          name = format.to_s.capitalize

> We need to fetch a class from the module hierarchy.

          strategy = Newsltetter::Generators.const_get(name).new
          strategy.execute
        end

> `strategy.execute` will return the rendered thing in the Newsletter. We can put what we had there last time.

What we want is to not contain the data, but contain the *strategy*. If we do this, we will just have delegated it:

    def execute
      <<EOF
      #{header}

      #{content}
      EOF
    end

Better to not have the information in the strategy itself. We have to pass in the information from the outside. We do this by passing the class which will use Html (in this case the generator).

    def render
      strategy = Newsletter::Generators.const_get(name).new(self) # pass it in
    end

In the HTML class, we forward the "data methods" onto the using class.

    require 'forwardable' # This is the STD library class which will help you delegate messages to another object
    class Html
      extend Forwardable # make it class method vs. instance method

      def_delegators :@context, :title, :phrase # Everytime the HTML receives a title property, it will look for the `title` and the `message` in the `@context` object.

      def initialize(context)
        @context = context
      end

      def header
        "<h1>#{title}</h1>" # title is taken from the @context
      end

      def content
        "<p>#{phrase}</p>"
      end


What happens is that instead of `Newsletter::Generators::HTML.new.render`, we have `Newsletter::Generators.new(:html).render`. *We also don't have to inherit from the base anymore.*

The point is that we can change how the clients (Html and Markdown) execute because the client knows that in the base class that there is a `render` method, and regardless of the strategy, it could be executed. We just specify a contract (in this case we need to return a string).

Template method is used if we can rely on simple inheritance. But if we need something longer we can use strategy method. Many applications in Ruby use Omniauth.

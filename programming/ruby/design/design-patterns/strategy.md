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

## Design Patterns in Ruby -- Strategy

Problem with Template Method: Basing your design on inheritance means that your classes are tangled up with their superclass. Inheritance-based techniques such as the TM pattern also limit our runtime flexibility.

What if, instead of creating a subclass for each variation, we tear out the whole annoyingly varying chunk of code and isolate it in its own class?

    class Formatter
      def output_report( title, text )
        raise 'Abstract method called'
      end
    end

    class HTMLFormatter < Formatter
      def output_report( title, text )
        puts('<html>')
        puts('  <head>')
        puts("    <title>#{title}</title>")
        puts('  </head>')
        puts('  <body>')
        text.each do |line|
          puts("    <p>#{line}</p>" )
        end
        puts('  </body>')
        puts('</html>')
      end
    end

    class PlainTextFormatter < Formatter
      def output_report(title, text)
        puts("***** #{title} *****")
        text.each do |line|
          puts(line)
        end
      end
    end

New report implementation, you have a strategy implemented, based on the `formatter` which is inside the `Report` class.

    class Report
      attr_reader :title, :text
      attr_accessor :formatter

      def initialize(formatter)
        @title = 'Monthly Report'
        @text =  [ 'Things are going', 'really, really well.' ]
        @formatter = formatter
      end

      def output_report
        @formatter.output_report( @title, @text )
      end
    end

*The key idea underlying the Strategy pattern is to define a family of objects, the strategies, which all do the same thing-in our example, format the report.* Not only does each strategy object perform the same job, but all of the objects support exactly the same interface.

Given that all of the strategy objects look alike from the outside, the user of the strategy-called the context class-can treat the strategies like interchangeable parts. Thus, it does not matter which strategy you use, because they all look alike and they all perform the same function.

We can achieve better separation of concerns by pulling out a set of strategies from a class. By using Strategy, we remove `Report` of any responsibility for or knowledge of the report file format.

The Strategy pattern does have one thing in common with the Template Method pattern: Both patterns allow us to concentrate the decision about which variation we are using in one or a few places. With the Template Method pattern, we make our decision when we pick our concrete subclass. In the Strategy pattern, we make our decision by selecting a strategy class at runtime.

#### Sharing Data between the Context and the Strategy

The `Report` can pass itself as a context:

    def output_report
      @formatter.output_report(self)
    end

Here `Report` passes a reference to itself to the formatting strategy, and the for matter class now has access to whatever instance variables the `Report` has.

    class HTMLFormatter < Formatter
      def output_report(context)
        puts('<html>')
        puts(' <head>')
        puts(" <title>#{context.title}</title>") puts(' </head>')
        puts(' <body>')
        context.text.each do |line|
              puts("    <p>#{line}</p>")
        end
        puts('  </body>')
        puts('</html>')
      end
    end

(We can remove the base `Formatter` class since it just serves as an interface.)

Lambdas can also be executed by changing the `output_report` to use `call`:

    def output_report
        @formatter.call( self )
    end

We can then pass lambdas in:

    report = Report.new { |context|
      puts("***** #{context.title} *****")
      context.text.each do |line|
        puts(line)
      end
    }

*The easiest way to go wrong with the Strategy pattern is to get the interface between the context and the strategy object wrong.* Bear in mind that you are trying to tease an entire, consistent, and more or less self-contained job out of the context object and delegate it to the strategy. You need to pay particular attention to the details of the interface between the context and the strategy as well as to the coupling between them.

# Gang of Design Patterns in Ruby: Decorator

This is getting more powerful.

Given `Product.new("Tomato", :fruit, [%w(red salad sour)]`, we want to have an html table to be generated.

    product.as_html_row.

Rendering the product is not a part of the product. We should move them to the decorator.

    class ProductDecorator
      def initialize(context)
        @context = context
      end
    end

We then require the `forwardable` class and `def_delegators` to the context class.

    class ProductDecorator
      extend Forwardable

      def_delegators :@context, :name, :category, :tags

      def initialize context
        @context = context
      end

      def as_html_row
        <<EOF
        <tr>
          <th>#{name}</th>
          <td>#{category.to_s}</td>
          <td>
            #{tags_list}
          </td>
        </tr>
        EOF
      end
    end

The `Forwardable` thing delegate the `name`, `category`, and `tags` to the underlying context that was passed in. We pass in `Product` as a context.

Now, whenever you need to use the `as_html_row` for the product, you have to do this:

    product_decorator = ProductDecorator.new(product)

We have the sole purpose of decorating an object. This separates context and responsibilities.


## Rails Patterns - Decorator vs Presenter
[Link](http://stackoverflow.com/questions/7860301/rails-patterns-decorator-vs-presenter)

## Exhibit vs Presenter
[Link](http://mikepackdev.com/blog_posts/31-exhibit-vs-presenter)

*Decorator: Let's add functionality to this entity.* Very generic. They should be able to decorate other decorators, as well as the component object. Decorator is a design pattern that is used to extend the functionality of specific object by wrapping it, without effecting other instances of that object. In general, Decorator pattern is an example of Open-Close Principle (class is closed for modifications by available for extensions).

_A good implementation of Decorator means that the patterns will delegate any unknown methods to the underlying object it decorated, they'll be transparent._

*Presenter: Let's build a bridge between the model and the view.* Both the exhibit and presenter patterns are a form of the decorator pattern.

## Decorators Compared to Strategies, Composites, and Presenters
[Link](http://robots.thoughtbot.com/decorators-compared-to-strategies-composites-and)

*Intent*: A decorator's intent is to *attach additional responsibilities to an object dynamically. Decorators provide a flexible alternative to subclassing for extending functionality*.

*Strategy*

- A decorator changes an object's skin.
- A strategy changes an object's guts.

A decorator is likely to add functionality (decorate) an object and a strategy is likely to *swap* functionality.

The decorator is additive and the strategy is a replacement. This is why _strategies are often used with Dependency Injection_.

*Composite*

- A decorator can be viewed as a composite with only one component.
- A decorator decorates a single component, and a composite composes multiple components.

*Presenter*

- A decorator is a class that adds functionality to another class.
- A presenter is a class that adds *presentation functionality* to another class.
- A presenter is *sometimes* a decorator.
- A presenter is sometimes a composite.

This is why presenters are usually in `app/presenters`.

## Design Patterns in Ruby -- Decorator

How do you add features to your program without turning the whole thing into a huge, unmanageable mess? To split the internal workings of objects, use Template Method. To split off whole chunks of algorithms, use Strategy. To react to requests coming into your objects, use Command.

To vary the responsibilities of an object, use the Decorator pattern. This enables you to add enhancement to an existing object. The Decorator pattern also allows you to layer features atop one another so that you can construct objects that have exactly the right set of capabilities that you need for any given situation.

#### Example

You have text that needs to be written to a file. In your system, sometimes you want to write out just the plain, unadorned text, while at other times you want to number each line as it gets written out. Sometimes, you want to add a time stamp, sometimes, you need a checksum from the text so that you can ensure it was written and stored properly.

    class EnhancedWriter
      attr_reader :check_sum

      def initialize(path)                              # Constructor needs a file immediately
        @file = File.open(path, "w")
        @check_sum = 0
        @line_number = 1
      end

      def write_line(line)                              # EnhancedWriter.new('out.txt').write_line('a plain line')
        @file.print(line)
        @file.print("\n")
      end

      def checksumming_write_line(data)                 # EnhancedWriter.new('out.txt').checksumming_write_line('a line with checksum')
        data.each_byte {|byte| @check_sum = (@check_sum + byte) % 256 }
        @check_sum += "\n"[0] % 256
        write_line(data)
      end

      def timestamping_write_line(data)
        write_line("#{Time.new}: #{data}")
      end

      def numbering_write_line(data)
        write_line("%{@line_number}: #{data}")
        @line_number += 1
      end

      def close
        @file.close
      end
    end

# A Decorator vs a Subclass
[Reference](https://www.justinweiss.com/articles/a-decorator-vs-a-subclass/)

- Separate behavior into 2 different classes.
- Subclasses can access private methods, and decorators can only access public methods. This makes it easier for subclasses to break.
- *Decorators can be especially useful when you’re breaking apart large classes. With decorators, it’s easier to follow the Single-Responsibility Principle – each decorator can do one thing and do it well, and you can combine decorators to get more complex behavior.*

## Comments

- I think a good reason to use decorators rather than subclassing is that you can often test the decorators without having to load heavy weight dependencies such as an ORM.

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

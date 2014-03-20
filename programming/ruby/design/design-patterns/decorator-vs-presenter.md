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

This is why presnters are usually in `app/presenters`.

## Rails Patterns - Decorator vs Presenter
[Link](http://stackoverflow.com/questions/7860301/rails-patterns-decorator-vs-presenter)

## Exhibit vs Presenter
[Link](http://mikepackdev.com/blog_posts/31-exhibit-vs-presenter)

__Decorator: Let's add functionality to this entity.__ Very generic. They should be able to decorate other decorators, as well as the component object. Decorator is a design pattern that is used to extend the functionality of specific object by wrapping it, without effecting other instances of that object. In general, Decorator pattern is an example of Open-Close Principle (class is closed for modifications by available for extensions).

_A good implementation of Decorator means that the patterns will delegate any unknown methods to the underlying object it decorated, they'll be transparent._

__Presenter: Let's build a bridge between the model and the view.__ Both the exhibit and presenter patterns are a form of the decorator pattern.

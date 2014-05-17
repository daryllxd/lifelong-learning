# Value Object

Value objects represent some value and its job is not to do things but to answer questions about that value. Ex: `Color`, you can define it in terms of the RGB, etc.

*A value object is a value object as long as it takes a value in the constructor and the only things it does is to tell you things about that value.* By some definition, it may not mutate.

We try to separate query methods and command methods. When things get bigger you want to separate them into classes. We want to separate things to change colors from the colors themselves. In a way you're creating some kind of new primitive.

We don't want primitive obsession (ex: three numbers to represent a color, or strings being passed around). *A value object doesn't do anything. It is tempting to add processing stuff to a value object, but it is sometimes helpful to reason about a program if they are only actors in a system.*

Value objects are really useful to pass around. By separating out the action of doing something and the object itself, you can reduce bugs. There are common benefits to immutable objects, like for multithreading.

Another principle to write a value object is to have two colors be equal to each other when their two properties are the same.

In general the only way I use `protected` for is when reaching across comparisons. Protected in Ruby is weird, because protected stuff means you can access the internals of another instance of the same class. `private` methods can't be accessed by another instance of the same class.

## Cons

If you're using a value object and you commit to it, a good value object will be immutable, it will be equal to another thing, it won't have any actions on it. If you use objects everywhere, but you want to store them in databases, then you will have more objects.

When you do separate the value from the behavior, do you add it back in by decorating or composition? It's useful for example as `color`, you probably don't have a concept of a color model, but you have a color field. There is no identity asides from the model where it came from.

## ELI5: Can someone explain OOP?
[link](http://www.reddit.com/r/explainlikeimfive/comments/syjy3/can_someone_explain_object_oriented_programming/)

We can write a script that says "Mark, go to the closet; Mark, hang your coat; Suzy, walk to the closet; Suzy, hang your coat. While this works, you'll run into problems if you want to make it more complex.

With OOP, you could build a classroom with a `Closet` object, which handles putting away boots. When a `Kid` object goes to the closet, the `Closet` will know what to do.

> Scripting

    MyScript {
    initialize Kids
    for CurrentKid in Kids
    MyScript.PutAwayClothes("Closet", CurrentKid)
    }
    PutAwayClothes { ... }

> OOP

    Main {
    initialize Closet
    initialize Kids
    for CurrentKid in Kids
    Closet.HandleAVisitor(CurrentKid)
    }

Conceptually: In normal programming, it's possible to have data and methods just floating around everywhere. In OOP, everything belongs to an object, and you have to kind of communicate with that object.

---

OOP is all about saving time and effort by dividing tasks cleanly.

Whatever you're trying to accomplish (and you can do infinite amounts of shit with code) OOP is creating a thing that does this stuff, another thing that does this part, and then probably having a controller thing that tells the two when to do their stuff.

*If I was making code that simulated driving a car, I could put the whole thing in one giant ridiculous block of code that would make my coworkers want to burn me alive. But that would be silly and difficult. OOP would correctly tell you to make some code that simulates what the engine does and make that an object, some code that simulates the transmission, some code that simulates the brakes, all the way down the line, and then have one controlling object that tells each one when to do it's thing, and then the whole project instantly becomes much easier to think about and implement.*

---

- *Object.* An object is a set of data taken together with methods that operate on that data.
- *Class.* A class is a template for an object. It is a "class" of objects. Fido's class is "Dog". Think of a class as a rubber stamp and the markings it leaves behind as specific instances of the class.
- *Type.* When you create a new class, you define a new type. Dog is a type. So that means all classes are types, but not all types are defined by classes, some are defined by an interface or an abstract class. The class of an object is the type used to instantiate, but the type of an object is conferred upon it by the reference used to access it.
- *Inheritance. Inheritance is about the behavior of the objects involved and nothing else. In common language, we often say that a "square" is a type of rectangle." But they do not have the same behavior, so you would make a mistake of having your Square class extend your Rectangle class.*
- *Polymorphism.* As long as you follow the rules above about making sure your classes only extend classes/implement interfaces if they agree to stay within the contract defined by them, then those subtypes can be treated as though they are supertypes.
- *Encapsulation.* This means that your class defines a boundary around the data inside it and regulates access to it. For a ball, you put in `getMass()`, but not `getWeight()`, because Mass is an inherent property, while Weight is extrinsic to the ball and should not be encapsulated within the Ball class.
- *Dependency.* Whenever you create a new class, ask yourself: what are its compile-time and run-time dependencies, and do they make sense? What are the compile-time and run-time dependencies on this class as well?

In the ball example above, you might agree and say, OK, `getMass()` makes sense, but I can still have a method that returns weight. I can just ask the caller to pass in the current environment, defined by some new class I make called Environment, and interrogate it for its current context to calculate its weight. So you go ahead and add `getWeight(Environment env)` to the Ball API.

*If you take one thing away from this post, take this: the whole idea of different approaches to coding, whether procedural, OOP, functional programming, etc...it's all just different approaches to help you structure code so that you can efficiently manage dependencies. This is the point of programming paradigms, and what makes them better than programming in assembly. If you keep that in mind and always try to understand features of a programming language, style, design pattern, etc, in terms of how it helps manage dependencies better, you'll be streets ahead of your peers.*

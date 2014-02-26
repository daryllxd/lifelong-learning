## Large Class

1. You can't tell what the class does without scrolling.
2. The class needs to change for more than one reason.
3. The class has more private methods than public methods.
4. __The class has more than 7 methods.__
5. __The class has a total flog score of 50.__

__Solutions:__

1. __Move Method__ to move methods to another class if an existing class could better handle the responsibility.
2. __Extract Class__ if the class has multiple responsibilities.
3. __Replace Conditional with Polymorphism__ if the class contains private methods related to the conditional branches.
4. __Extract Value Object__ if the class contains private query methods.
5. __Extract Decorator__ if the class contains delegate methods.
6. __Replace Subclasses with Strategies__ if the large class is a base class in an inheritance hierarchy.

Following the `Single Responsibility Principle` will prevent large classes from cropping up. It’s difficult for any class to become too large without taking on more than one responsibility.

## God Class

A God Class is any class that seems to know everything about an appli- cation. It has a reference to the majority of the other models, and it’s difficult to answer any question or perform any action in the application without going through this class.

Most applications have two God Classes: User, and the central focus of the application.

__You need to be particularly vigilant about refactoring these classes. If you don’t start splitting up your God Classes early on, then it will become impossible to separate them without rewriting most of your application.__

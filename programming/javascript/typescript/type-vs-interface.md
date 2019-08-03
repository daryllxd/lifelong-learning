# TypeScript Type vs Interface
[Reference](https://www.educba.com/typescript-type-vs-interface/)

-



# Classes vs Interfaces in TypeScript
[Reference](https://ultimatecourses.com/blog/classes-vs-interfaces-in-typescript)

- Use case: type-checking and the underlying implementation?
- TypeScript class: type-checking and static properties.
- Classes can be object factories. Something like `PizzaMaker` with a static class that we can use to create a class without having to create an instance of the object itself.
- So being able to use TS classes with and without an existing instance of a class makes them versatile and flexible. Adding `static` properties and methods to a class makes them act like a factory.
- Interface: When we want to define the structure of a Pizza, but we'd never need to instantiate it.
  - ***Basically just a structural contract that defines what the properties of an object should have as a name and type.***

```
interface Pizza {
  name: string;
  toppings: string[];
}

class PizzaMaker {
  static create(event: Pizza) {
    return { name: event.name, toppings: event.toppings };
  }
}
```

- So we basically split the class into a creator and an interface.
- If you think about it though, we cannot create a Pizza with this - it would just create something that looks like a Pizza.
- ***Lastly: If we need to share structural definition amongst various classes, we can define that structure in an interface and then have each class implement that interface.*** Then, each class will have to declare or implement each property of the interface.

# When use a interface or class in Typescript [duplicate]
[Reference](https://stackoverflow.com/questions/51716808/when-use-a-interface-or-class-in-typescript)

- The pragmatic reason: interfaces don't get transpiled into JS, so the generated code is shorter.
- Interfaces won't work if you need to instantiate objects with constructors or use a framework that instantiates and injects them. Use classes or abstract classes.
- Not easy to convert a JSON object into a class object.
- There are no easy solutions for this: [Reference](https://stackoverflow.com/questions/22885995/how-do-i-initialize-a-typescript-object-with-a-json-object).
- `readonly` keyword: ones that cannot be changed once they are initialised.
- Think about `indexable` stuff in TS.
- Types vs interfaces?

# Typescript interface initialization
[Reference](https://stackoverflow.com/questions/23412033/typescript-interface-initialization)

- This `interface` is only used at compile time and for code-hinting/intelligence. Rigorous and type-safe way of using an object with a defined signature in a consistent manner.
- TS calling:

``` typescript
// matches the interface as there is a foo property
start({foo: 'hello'});

// Type assertion -- intellisense will "know" that this is an ISimpleObject
// but it's not necessary as shown above to assert the type
var x = <ISimpleObject> { foo: 'hello' };
start(x);

// the type was inferred by declaration of variable type
var x : ISimpleObject = { foo: 'hello' };
start(x);

// the signature matches ... intellisense won't treat the variable x
// as anything but an object with a property of foo.
var x = { foo: 'hello' };
start(x);

// and a class option:
class Simple implements ISimpleObject {
    constructor (public foo: string, public bar?: any) {
       // automatically creates properties for foo and bar
    }
}
start(new Simple("hello"));
```

- No right way to do it, it's a matter of style choice.

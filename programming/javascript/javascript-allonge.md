# JavaScript Allongé
[link](https://leanpub.com/javascript-allonge)

All values (such as "42") are expressions. Strings are values, and are expressions by themselves, but strings with operators are not values, they are expressions.

In JS, we test whether two values are identical (same value, same type) with the `===` operator, and whether they are not identical with the `!==` operator.  Strings and numbers are different types, so strings and numbers are never identical.

Value types: These are the same as long as they hold the same contents.

    "ab" === ("a" + "b")

Reference types:  Same value and same contents might not be equal to each other. Ex: array.

    [1] === [1] # false

# 1: Basic Functions

Functions are values. They represent computations to be performed. Like numbers, strings, and arrays, they have a representation.

    (function() {}) #=> [Function]

Function is a reference type.

In JavaScript, the absence of a value is `undefined`. `undefined` acts like a value type.

`void` is an operator that takes any value and evaluates to `undefined`, always.

## Functions with no arguments and their bodies

When we define a function, we write the word `function`, put an empty list of arguments, then we give the function a body that is enclosed in braces. Function bodies are lists of JavaScript statements separated by semicolons.

## Functions that evaluate to functions

    function() {
      return (function() { return 3; })
    }

This is a function that when applied, evaluates to a function that when applied, evaluates to 3.

*A return statement accepts and valid JavaScript expression. This is recursive, so we can write a function that returns a function, or an array of functions.*

Call by value evaluation strategy: when you write some code that appears to apply a function to an expression or expressions, JavaScript evaluates all of those expressions and applies the functions to the resulting values.

    function (x) { return (function (y) { return x }) }

- The first `x` is an argument. The `y` is another argument.
- The second `x` *is an expression referring to a variable.*
- Every time a function is invoked (applied to zero or more arguments), a new environment is created. An environment is a possibly empty dictionary that maps variables to values by name.

When a value--any value--is passed as an argument to a function, the value bound in the function's environment must be identical to the original. When JavaScript binds a value-type to a name, it makes a copy of the value and places the copy in the environment. As for reference types, JavaScript does not place copies into the environment, but it places *references* to reference types in the environments, and when the value needs to be used, JavaScript uses the reference to obtain the original.

## Closures and Scope

    (function(x) {
      return function(y) {
        return x;
      }
    })(1)(2)

- We evaluate from left to right.
- Once we evaluate the outer function, we end up with an environment where x = 1, and we still have another function to evaluate.

    # x = 1
    function(y) { return x; }(2)

- When we evaluate `function(y)`, we return 1, since `x == 1`.

*The function `function(y) { return x }` contains a free variable, `x`.* A free variable is one that is not bound within the function. `x` is not bound in the function.

*Functions containing no free variables are called pure functions. Functions containing one or more free variables are called closures.*

BTW, this is a pure function. A pure function can contain a closure.

    (function(x) {
      return function(y) {
        return x;
      }
    })

Pure functions always mean the same thing because all of their “inputs” are fully defined by their arguments. Not so with a closure-- we can't say what the above function will do with argument `(2)` without understanding the magic for evaluating the free variable x.

## Currying

This:

    function(x){
      return function(y){
        return function(z){
          return x + y + z
        }
      }
    }

Does the same things as this:

    function(x, y, z){
      return x + y + z
    }

Only if you call it with (1)(2)(3) instead of (1, 2, 3). *In the first function, you can call it with (1) and get a function back that you can later call with (2)(3).* The first function is the result of currying the second function. Calling a curried function with only some of its arguments is called partial application. Some programming languages automatically curry and partially evaluate functions without the need to manually nest them.

Shadowing: JavaScript always searches for a binding starting with the functions own environment and then each parent in turn until it finds one. When a variable has the same name as an ancestor environment's binding, it is said to shadow the ancestor.

JavaScript always has one environment we do not control, the global environment in which many useful things are bound such as libraries of standard functions.

## Var

This:

    function(diameter){
      return diameter * 3.141592
    }

Is similar to this:

    function(Pi) {
      return function(diameter){
        return diameter * Pi
      }
    }(3.141592)

Except that it names the constant `Pi`.

However, instead of going through all that, you can just do the same thing with `var`:

    var Pi = 3.141592

The `var` keyword introduces one or more bindings in the current function's environment. We can also do this:

    function(d) {
      var calc = function(diameter) {
        var Pi = 3.14159;

        return diameter * Pi;
      }

      return "The circumference is " + calc(d);
    }

This demonstrates the idea of "functions as first class entities". Functions are values that can be found to names like any other value, passed as arguments, returned from other functions, and so forth.

## Naming Functions

This code does not name a function:

    var repeat = function(str){
      return str + str
    }

`repeat` is the binding to an anonymous function to a name in an environment, but the function itself remains anonymous. To name a function:

    var bindingName = function actualName(){ ... }

BTW, don't declare functions inside an if block!

# Combinations and Function Decorators



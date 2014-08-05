# 10 Most Common JavaScript Mistakes
[link](http://www.toptal.com/javascript/10-most-common-javascript-mistakes)

1. Incorrect references to `this`.

There are some functions that change the scope of `this`, ex: `setTimeout()` changes the scope of `this` to the `window`. If you do something like this:

    Game.prototype.restart = function () {
      this.clearLocalStorage();
      this.timer = setTimeout(function() {
        this.clearBoard();    // what is "this"?
      }, 0);
    };

Javascript will change what `this` is and you get an error. To solve this, use `self` to store the context variable.

    var self = this;   // save reference to 'this', while it's still this!
      this.timer = setTimeout(function(){

2. Thinking there is a block-level scope.

Don't assume that Javascript creates a new scope for each code block (not true in JS!). Support for block-level scopes is making its way into Javascript via the new `let` keyword.

3. Creating memory leaks.

Memory leaks are almost inevitable if you're not consciously coding to avoid them. Sources of leaks: dangling references to defunct objects (defining a variable outside the closure and reinitializing it), and circular references.

    function addClickHandler(element) {
        element.click = function onClick(e) {
            alert("Clicked the " + element.nodeName)
        }
    }

`onClick` has a closure which keeps a reference to the element (the `nodeName`), but the element has a reference to `onClick`. The circular self-reference would prevent `element` and `onClick` from being collected (memory leak).

*Avoiding Memory Leaks: What you need to know.* JS's memory management is based on object reachability. What's reachable? Objects referenced from anywhere in the current call stack and global variables. As long as an object can be reached, the GC will not clean it.

4. Confusion about equality.

JS coerces any value being referenced in a boolean context to a boolean value.

True:

    false == '0'
    null == undefined
    " \t\r\n" == 0
    '' == 0
    {} # Unintuitively true
    [] # Unintuitively true

It's best to use `===` and `!==` rather than `==` and `!=` to avoid any unintended side-effects of type coercion.

Also, comparing anything with `NaN` (even `NaN`) will always return false. You therefore cannot use the equality operators (`==`, `===`, `!=`, `!==`), use `isNaN(NaN)` function.

5. Inefficient DOM manipulation.

JS makes it easy to manipulate the DOM, but it does nothing to promote doing so efficiently. Ex: Code that adds a series of DOM elements one at a time. Adding a DOM element is expensive! Why not use document fragments instead?

6. Incorrect use of function definitions inside `for` loops.

If you put a function declaration inside a for loop, by the time the function is invoked, the above loop will have completed and the value for the loop will be the last value. Better to put the function declaration outside.

7. Failure to properly leverage prototypal inheritance.

Better to set default values with prototypal inheritance as opposed to just manual checks via `typeof == undefined`.

8. Creating incorrect references to instance methods.

    obj.whoAmI(); is different from whoAmI(); because the latter operates as window.whoAmI().

If we really need to create a reference to an existing method of an object, we need to be sure to do it within that object's namespace, to preserve the value of `this`.

9. Providing a string as the first argument to `setTimeout` or `setInterval`. Better to pass in a function itself, because passing in a string converts the string to a function constructor under the hood (which is slow).

10. Failure to use strict mode. Benefits of strict mode:

- Easier to debug.
- Prevent accidental globals.
- Eliminates `this` coercion, no more `null` and `undefined`.
- Disallows duplicate property names or parameter values.
- Makes `eval()` safer, variables and functions declared inside of an `eval()` statement are not created in the containing scope.
- Throws error on invalid usage of `delete` (`delete` is used to remove properties from objects).



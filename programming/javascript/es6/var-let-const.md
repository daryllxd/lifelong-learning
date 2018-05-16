# You Don't Know JS
[Reference](https://github.com/getify/You-Dont-Know-JS/blob/master/es6%20%26%20beyond/ch2.md)

- Previously, you needed the immediately invoked function expression (IIFE).
- Better to just declare the `let` immediately in the scope.
- You get a reference error if you reference the `let` variable before the `let` statement actually happens.

``` js
{ let a = 2, b, c; }

// Temporal Dead Zone: You're accessing a variable that's been declared by not yet initialized
{
  console.log(b); // Reference error

  if typeof b === "undefined" { // Reference error
  }

  let b;
}
```

- `const`
  - Assigning an object or array as a constant means that value will not be able to be garbage collected until that constant's lexical scope goes away, as the reference to the value can never be unset.
  - They can still be used with variable declarations of `for`, `for..in`, etc, but can't reassign (error).

# JavaScript ES6+: var, let, or const?
[Reference](https://medium.com/javascript-scene/javascript-es6-var-let-or-const-ba58b8dcde75)

- Favor `const` over `let`, because that identifier can't be reassigned (these can be mutated though).
- `const`: this identifier would not be reassigned.
  - `const` is just a keyword. It doesn't literally mean "constant". It simple means "can't be reassigned in this scope."
- `let`: signal that the variable may be reassigned (counter in a loop, value swap in an algorithm). "This variable is going to disappear soon."

# Full Stack React

## Appendix B: ES6

- Use `const` in cases where a variable is never re-assigned.
- If the variable will be re-assigned, use `let`.
- Both `const` and `let` are blocked scope as opposed to function scoped.

# Function scopes and block scopes in JavaScript
[Reference](https://edgecoders.com/function-scopes-and-block-scopes-in-javascript-25bbd7f293d7)

- On `var`: a variable declared with `var` in a function scope can't be accessed outside that scope.
- But a variable declared with `bar` in a block scope is available outside of that block scope (why?).

```
function iHaveScope() {
  var secret = 42;
}
secret; // ReferenceError: secret is not defined (in this scope)

for (var i=0; i<10; i++) {
  // block scope for the for statement
}
console.log(i) // => 10 (why oh why)
```

- Use `let`

```
for (let i=0; i<10; i++) {
  // block scope for the for statement
}
console.log(i) // ReferenceError: i is not defined (D'oh!)
```

- `const`

```
const PI = 3.141592653589793
PI = 42 // SyntaxError: "PI" is read-only

// We can reassign the internals of a const object
// But we can't reassign the const itself
const dessert = { type: 'pie' };
dessert.type = 'pudding'; // Sure thing
```

- Completely immutable library: `Immutable.js`.

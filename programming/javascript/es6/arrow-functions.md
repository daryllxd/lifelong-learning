# You Don't Know JS
[Reference](https://github.com/getify/You-Dont-Know-JS/blob/master/es6%20%26%20beyond/ch2.md)

- Arrow functions are always functions expressions, there is no arrow function declaration.
- They are anonymous function expressions and have no named references for the purposes of recursion or event binding/unbinding.
- If shorter function, the more `=>` helps.

``` js
function foo(x,y) {
  return x + y;
}

// versus

var foo = (x,y) => x + y;

// This works
var a = [1,2,3,4,5];

a = a.map( v => v * 2 );
```

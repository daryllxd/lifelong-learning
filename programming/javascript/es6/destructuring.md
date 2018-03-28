# You Don't Know JS
[Reference](https://github.com/getify/You-Dont-Know-JS/blob/master/es6%20%26%20beyond/ch2.md)

- Manually assigning indexed values from an array or properties from an object can be thought of as structured assignment. ES6 adds a dedicated syntax for destructuring, specifically array destructuring and object destructuring.

```
var [ a, b, c ] = foo();
var { x: x, y: y, z: z } = bar();

console.log( a, b, c );        // 1 2 3
console.log( x, y, z );        // 4 5 6

var { x, y, z } = bar();

console.log( x, y, z );        // 4 5 6

var a, b, c, x, y, z;

[a,b,c] = foo();
( { x, y, z } = bar() );

console.log( a, b, c );        // 1 2 3
console.log( x, y, z );        // 4 5 6

var [,b] = foo();
var { x, z } = bar();

console.log( b, x, z );        // 2 4 6

// Nested
var a1 = [ 1, [2, 3, 4], 5 ];
var o1 = { x: { y: { z: 6 } } };

var [ a, [ b, c, d ], e ] = a1;
var { x: { y: { z: w } } } = o1;

console.log( a, b, c, d, e );    // 1 2 3 4 5
console.log( w );          // 6
```

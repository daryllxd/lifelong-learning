# You Don't Know JS
[Reference](https://github.com/getify/You-Dont-Know-JS/blob/master/es6%20%26%20beyond/ch2.md)

## Default Arguments

``` js
function foo(x = 11, y = 31) {
  console.log( x + y );
}

foo();               // 42
foo( 5, 6 );         // 11
foo( 0, 42 );        // 42

foo( 5 );            // 36
foo( 5, undefined ); // 36 <-- `undefined` is missing
foo( 5, null );      // 5  <-- null coerces to `0`

foo( undefined, 6 ); // 17 <-- `undefined` is missing
foo( null, 6 );      // 6  <-- null coerces to `0`
```

## Interpolated Expressions

# Why Curry Helps
[Reference](https://hughfdjackson.com/javascript/why-curry-helps/)

``` js
var sum3 = curry(function(a, b, c){ return a + b + c })
sum3(1, 2, 3) //= 6
sum3(1)(2, 3) //= 6
sum3(1, 2)(3) //= 6
```

- Mapping over objects to get IDs

``` js
var get = curry(function(property, object){ return object[property] })
objects.map(get('id')) //= [1, 2, 3]

var map = curry(function(fn, value){ return value.map(fn) })
var getIDs = map(get('id'))

getIDs(objects) //= [1, 2, 3]
```

- Other example: chains of functions when parsing JSON:

``` js
fetchFromServer()
    .then(JSON.parse)
    .then(function(data){ return data.posts })
    .then(function(posts){
        return posts.map(function(post){ return post.title })
    })

fetchFromServer()
    .then(JSON.parse)
    .then(get('posts'))
    .then(map(get('title')))
```

# Does Curry Help?
[Reference](https://hughfdjackson.com/javascript/does-curry-help/)

## Comments

- Functional composition is widely used in combinations, and currying is fundamental to functional programming.
- Uncurrying:

``` js
add(2)(3); // cumbersome

// Uncurry to get the desired flexibility
const uncurry = f => (...args) => args.reduce((g, x) => g(x), f);
const add = uncurry(x => y => x + y);

let add2 = add(2);
add2(3); // 5
```

- The biggest downside I see to currying is the additional cognitive overload for debugging. Currying adds significantly to the stack trace.

# Debugging Functional
[Reference](https://medium.com/@drboolean/debugging-functional-7deb4688a08c)

- Cryptic error messages in functional programming libraries.
- To fix them, overwrite `toString`.
- In a curried function:

``` js
f2.toString = function() {
  return fx.toString()+'('+args.join(', ')+')';
}

console.log(inc)
// function add(x,y){ return x + y }(1)
```

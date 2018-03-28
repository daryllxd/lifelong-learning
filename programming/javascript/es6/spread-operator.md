# You Don't Know JS
[Reference](https://github.com/getify/You-Dont-Know-JS/blob/master/es6%20%26%20beyond/ch2.md)

- When `...` is used in front of an array, it acts to "spread" it out into its individual values.
- Other usage: spreading a value out.

```
function foo(...args) {
  console.log( args );
}

foo( 1, 2, 3, 4, 5);      // [1,2,3,4,5]
```

# Full-Stack React

- The ellipsis operator copies one object into another:


``` js
const common = {
  family: 'abc', genus: 'def'
}

const spotted = {
  ... common, species: 'ghi'
}

```

- This allows us to succinctly construct new objects by copying over properties from existing ones.
- This allows us to keep our reducer functions pure.



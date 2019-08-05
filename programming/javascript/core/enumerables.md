# JavaScript Array.reduce()
[Reference](https://hackernoon.com/javascript-array-reduce-50403c421968)

- Unintuitive nature:
  - Initial accumulator value = 1st element in array if you don't specify it otherwise.
- Order of callback arguments: `reduce: (accumulator, currentValue, index, array) => {}`
- Lodash: treats both arrays and objects as collections, and collections have map, find, filter, and reduce methods.
- To accumulate on an object => use `Object.values` or `Object.entries`.
- Because the accumulator is optional, without it you get random results.
- If return is `undefined`, then you probably forgot to return the accumulator.

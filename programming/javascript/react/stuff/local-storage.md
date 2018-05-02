# Initiating the React App for Local Storage Example
[Reference](https://www.robinwieruch.de/local-storage-react/)

``` js
// setter
localStorage.setItem('myData', data);

// getter
localStorage.getItem('myData');
```

- Using as cache:

``` js
const cachedHits = localStorage.getItem(value);
if (cachedHits) {
  this.setState({ hits: JSON.parse(cachedHits) });
  return;
}
```

If you want the cache to only work in the current session, you can do `sessionStorage`.

``` js
// setter
sessionStorage.setItem('myData', data);

// getter
sessionStorage.getItem('myData');
```

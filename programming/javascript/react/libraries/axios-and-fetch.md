# How to fetch data in React
[Reference](https://www.robinwieruch.de/react-fetching-data/)

- Where to fetch in React's component tree?
  - Who is interested in the data?
  - Where do you want to show a conditional loading indicator?
  - Where do you show the error message when the request fails?
- `componentDidMount()` is the ideal lifecycle method that is a perfect match to fetch data.
- Add the `isLoading` and `error` props to your component.

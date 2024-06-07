# Don't over useState
[Reference](https://tkdodo.eu/blog/dont-over-use-state)

- **Using `useEffect` to sync two react states is rarely right.**
- The issue here is that:
  - You fetch `data`.
  - Because of that, you set categories in the `useEffect`.
  - You change categories by clicking the button.
  - When you fetch data again, **CATEGORIES GETS CALLED AGAIN.**

```
const App = () => {
  const [data, setData] = React.useState(null)
  const [categories, setCategories] = React.useState([])

  React.useEffect(() => {
    async function fetch() {
      const response = await fetchData()
      setData(response.data)
    }

    fetch()
  }, [])

  React.useEffect(() => {
    if (data) {
      setCategories(computeCategories(data))
    }
  }, [data])

  return (
    <>
      ...
      <Button onClick={() => setCategories(getMoreCategories())}>
        Get more
      </Button>
    </>
  )
}
```

- When to have derived state or not

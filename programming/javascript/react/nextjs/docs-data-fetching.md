# Data Fetching

- Fetching on the server with `fetch`
  - Next extends fetch to memoize fetch requests while rendering a React component tree.

```
async function getData() {
  const res = await fetch('https://api.example.com/...')
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export default async function Page() {
  const data = await getData()

  return <main></main>
}
```

  - By default, Next automatically caches the returned values of fetch on the Data Cache on the server - does it?
  - Revalidating data: The purging of the data cache and re-fetching the latest data. Useful when your data changes and you want to ensure you show the latest information.
  - Time-based revalidation: `fetch('https://...', { next: { revalidate: 3600 } })`.
- Not cached if:
  - `cache: 'no-store'.
  - `revalidate: 0`.
  - `fetch` request is inside a Router handler that uses the POST method.
  - `fetch` after headers or cookies.
- Using a third-party library that doesn't support/expose `fetch` - you can use `Route Segment Config Option`.





Questions

- Are we really caching all our calls??? Seems like no

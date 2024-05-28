# Practical React Query
[Reference](https://tkdodo.eu/blog/practical-react-query)

## The Defaults explained

- React Query does not invoke the queryFn on every re-render, even with the default staleTime of zero. Your app can re-render for various reasons at any time, so fetching every time would be insane!
- `refetchOnWindowFeature` - this is on by default.
  - This is used on `visibilitychange`.
- `staleTime` - when query transitions from fresh to stale.
- `gcTime` (previously `cacheTime`) - the duration until inactive queries will be removed from the cache.
- React Query will trigger a refetch whenever the query key changes.
- Every time the user switches between states, we can use `initialData`.
- **Keep server and client state separate**
  - If you get data from `useQuery`, try not to put that data into local state. The main reason is that you implicitly opt out of all background updates that React Query does for you.

## Enabled option

- **Dependent Queries.** Fetch data in one query and have a second query only run once we have successfully obtained data from the first query.
- **Turn queries on and off.** We have one query that polls data regularly thanks to `refetchInterval`, but we can temporarily pause it if a Modal is open to avoid updates in the back of the screen.
- **Wait for user input.** Have some filter criteria in the query key, but disable it for as long as the user has not applied their filters.
- **Disable a query after some user input.** e.g. if we then have a draft value that should take precedence over the server data. See the above example.

# Even if it's only for wrapping one useQuery call, creating a custom hook usually pays off because:

- You can keep the actual data fetching out of the UI, but co-located with your useQuery call.
- You can keep all usages of one query key (and potentially type definitions) in one file.
- If you need to tweak some settings or add some data transformation, you can do that in one place.

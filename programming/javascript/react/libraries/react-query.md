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

# React Query Data Transformations
[Reference](https://tkdodo.eu/blog/react-query-data-transformations)

## When should you do the transformation?

- `queryFn`
  - You will not have access to the original structure in the cache.
  - Every time a fetch is executed, your transformation will run.
- Render function - not recommended.

```
export const useTodosQuery = () => {
  const queryInfo = useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos,
  })

  return {
    ...queryInfo,
    data: queryInfo.data?.map((todo) => todo.name.toUpperCase()),
  }
}
```

  - This will run on every render! You have to use `useMemo`.

```
return {
  ...queryInfo,
  // 🚨 don't do this - the useMemo does nothing at all here!
  data: React.useMemo(
    () => queryInfo.data?.map((todo) => todo.name.toUpperCase()),
    [queryInfo]
  ),

  // ✅ correctly memoizes by queryInfo.data
  data: React.useMemo(
    () => queryInfo.data?.map((todo) => todo.name.toUpperCase()),
    [queryInfo.data]
  ),
}
```

# React Query Render Optimizations
[Reference](https://tkdodo.eu/blog/react-query-render-optimizations)

- Re-renders are a good thing, they make sure your app is up-to-date. **I'd take an "unnecessary re-render" over a "missing render-that-should-have-been-there" all day every day.**
- Every background re-fetch will force the component to re-render twice as this happens:

```
{ status: 'success', data: 2, isFetching: true }
{ status: 'success', data: 2, isFetching: false }
```

- `notifyOnChangeProps` - inform the observer about changes if one of these props change.
- Tracking queries - turned on by default on v4.
- Structural sharing will be used on the result of the selector function.

# Status Checks in React Query
[Reference](https://tkdodo.eu/blog/status-checks-in-react-query)

- Common pattern:

```
const todos = useTodos()

if (todos.isPending) {
  return 'Loading...'
}
if (todos.error) {
  return 'An error has occurred: ' + todos.error.message
}

return <div>{todos.data.map(renderTodo)}</div>
```

- RQ refetches quite aggressively per default, and does so without the user actively requesting a refetch. The concepts of `refetchOnMount`, `refetchOnWindowFocus` and `refetchOnReconnect` are great for keeping your data accurate, but they might cause a confusing UX if such an automatic background refetch fails.
- We would rather do something like this:

```
const todos = useTodos()

if (todos.data) {
  return <div>{todos.data.map(renderTodo)}</div>
}
if (todos.error) {
  return 'An error has occurred: ' + todos.error.message
}

return 'Loading...'
```

- Prefer to show something, even if the data is stale post-refetch.

# Testing React Query
[Reference](https://tkdodo.eu/blog/testing-react-query)

- `TODO`.

# React Query and TypeScript
[Reference](https://tkdodo.eu/blog/react-query-and-type-script)

```
export function useQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>
```

- `TQueryFnData`: the type returned from the queryFn. In the above example, it's Group[].
- `TError`: the type of Errors to expect from the queryFn. Error in the example.
- `TData`: the type our data property will eventually have. Only relevant if you use the select option, because then the data property can be different from what the queryFn returns. Otherwise, it will default to whatever the queryFn returns.
- `TQueryKey`: the type of our `queryKey`, only relevant if you use the `queryKey` that is passed to your queryFn.

- Suggestion: Let the query function have the typing.

```
function fetchGroups(): Promise<Group[]> {
  return axios.get('groups').then((response) => response.data)
}

// ✅ data will be `Group[] | undefined` here
function useGroups() {
  return useQuery({ queryKey: ['groups'], queryFn: fetchGroups })
}

// ✅ data will be `number | undefined` here
function useGroupCount() {
  return useQuery({
    queryKey: ['groups'],
    queryFn: fetchGroups,
    select: (groups) => groups.length,
  })
}
```
- Advantages of this approach are:
  - No more manually specifying Generics
  - Works for cases where the 3rd (select) and 4th (QueryKey) Generic are needed
  - Will continue to work if more Generics are added
  - Code is less confusing / looks more like JavaScript

## Type safety with the enabled option

```
function fetchGroup(id: number | undefined): Promise<Group> {
  // ✅ check id at runtime because it can be `undefined`
  return typeof id === 'undefined'
    ? Promise.reject(new Error('Invalid id'))
    : axios.get(`group/${id}`).then((response) => response.data)
}

function useGroup(id: number | undefined) {
  return useQuery({
    queryKey: ['group', id],
    queryFn: () => fetchGroup(id),
    enabled: Boolean(id),
  })
}
```

# Using WebSockets with React Query
[Reference](https://tkdodo.eu/blog/using-web-sockets-with-react-query)

- TODO.


# Effective React Query Keys
[Reference](https://tkdodo.eu/blog/effective-react-query-keys)

- TODO.

# Leveraging the Query Function Context
[Reference](https://tkdodo.eu/blog/leveraging-the-query-function-context)

- TODO.

# Placeholder and Initial Data in React Query
[Reference](https://tkdodo.eu/blog/placeholder-and-initial-data-in-react-query)

- Avoiding spinners:
  - Prefetch.
  - Keep previous data.
  - Pre-fill the cache with data that we think will potentially be right for our use-case.

```
function Component() {
  // ✅ status will be success even if we have not yet fetched data
  const { data, status } = useQuery({
    queryKey: ['number'],
    queryFn: fetchNumber,
    placeholderData: 23,
  })

  // ✅ same goes for initialData
  const { data, status } = useQuery({
    queryKey: ['number'],
    queryFn: fetchNumber,
    initialData: () => 42,
  })
}
```

- Cache level - there is only one cache entry.
- `staleTime` and `gcTime` will affect that cache entry, such that when it is considered stale, it can be garbage collected.
- Observer level: Each observer is someone looking at `useQuery`.
- `initialData` works on cache level, while `placeholderData` works on observer level.
  - `initialData` - this is what I have from the back-end.
    - Respects `staleTime`.
    - Can put `initialDataUpdatedAt` to let RQ know when this initial data has been created.
  - `placeholderData` - **this is never persisted to the cache**. This is what React Query gives to you so it can be shown while the real data is being fetched.

# React Query as a State Manager
[Reference](https://tkdodo.eu/blog/react-query-as-a-state-manager)

- TODO.

# React Query Error Handling
[Reference](https://tkdodo.eu/blog/react-query-error-handling)

- Suggestion: Use an `ErrorBoundary` just in case. However, it's suggested to use `throwOnError`.

```
const todos = useQuery({
  queryKey: ['todos'],
  queryFn: fetchTodos,
  throwOnError / useErrorBoundary: (error) => error.response?.status >= 500,
})
```

- WIP.

# Routing Fundamentals
[Reference](https://nextjs.org/docs/app/building-your-application/routing)

- App router works in `app`, which works alongside `pages` router.
- By default, components inside are React Server Components.
- Folders are used to define routes.
  - `layout` - shared UI for a segment and its children
  - `page` - unique UI of a route
  - `loading`, `not-found`, `error`, `global-error`, `route`, `template`, `default`.

## Hierarchy

- Layout -> template -> error -> loading -> not-found -> page.
- Parallel routes: show two or more pages in the same view.
- Intercepting routes: allow you to intercept a route and show it in the context of another route.

## Pages

- A page is always the leaf of the route subtree. Pages can fetch data.
- Layouts preserve state, remain interactive, and do not re-render.
- When to use `Template`? If you need to do `useEffect` and `useState`.

## Linking and Navigating

- `Link` and `useRouter` are the only two ways to change routes.
- Scroll restoration is in `scroll={false}` and `router.push({ scroll: false })`.

## How Routing and Navigation Works

- On the server, the application code is automatically code-split by route segments.
- On the client, Next.js prefetches and caches the route segments.
- Prefetching in Next.js:
  - Link component prefetches when they become visible in the user's viewport.
  - Can do `router.prefetch`.
- Caching in Next:
  - In-memory client-side cache called the Router Cache. As users navigate around the app, the react server component payload of prefetched route segments and visited routes are stored in the cache.
- Partial Rendering: Only the route segments that change on navigation re-render are preserved.
- **Hard and Soft Navigation**. By default, when moving through pages, the browser will reload the page. In Next, the App Router uses soft navigation.

## Route Groups

- Folders in parentheses are omitted from the URL, but you can create

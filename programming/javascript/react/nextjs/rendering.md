# Rendering
[Reference](https://nextjs.org/docs/app/building-your-application/rendering)

- Request-Response Lifecycle
  - User action - click link, submit form, etc.
  - HTTP request
  - Server process response
  - HTTP Response
  - Client parse resources to render UI
  - User action
- Network boundary - `use client` and `use server`.

# Server Components

## Benefits

- Data fetching - you are at the server, so closer to the data source.
- Security - can keep sensitive data and logic on the server.
- Caching.
- Performance - moving non-interactive pieces of the UI to server can reduce the amount of client-side JS needed.

## How are server components rendered?

- React renders server components into a special format called RSC payload. Next.js uses this payload and client component JS instructions to render HTML on the server.
- Client
  - HTML shows a fast, non-interactive preview of the route.
  - RSC used to reconcile the client and server component trees.
  - JS instructions used to hydrate client components/make the application interactive.

## RSC Payload

- Rendered result of server components
- **Placeholders for client components** + references to their JS files.
- Props passed from server to a client component.

## Server Rendering Strategies

- Static rendering - Routes are rendered **at build time.** This is useful for data that is not personalised to the user and can be known at build time, such as a static blog post or a product page.
- Dynamic rendering - routes rendered at request time.
  - You can have dynamically rendered routes that have both cached and uncached data.
  - During rendering, if a dynamic function or uncached data request is discovered, Next.js will switch to dynamically rendering the whole route.
- Streaming - enabled to progressively render UI from the server.

# Client Components

## Benefits

- Interactive, can use Browser APIs.
- Defining multiple `use client` entry points:
  - Once you define the boundary, all child components and modules imported into it are considered part of the client bundle.

## How are they rendered?

- Subsequent navigations - client components are rendered entirely on the client, without the server-rendered HTML.
- You can keep code on the server even though it's theoretically nested inside Client Components by interleaving Client and Server Components and Server Actions. See the Composition Patterns page for more information.

## Keeping Server-only Code out of the Client Environment

- You can use `import 'server-only'` to ensure a package only runs on the server, and if it's imported by a client component, an error appears.

```
import 'server-only'

export async function getData() {
  const res = await fetch('https://external-service.com/data', {
    headers: {
      authorization: process.env.API_KEY,
    },
  })

  return res.json()
}
```

- Wrapping third-party components that rely on client-only features:

```
'use client'

import { Carousel } from 'acme-carousel'

export default Carousel
```

- Context providers - they should be wrapped inside of a Client component.

```
'use client'

import { createContext } from 'react'

export const ThemeContext = createContext({})

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return <ThemeContext.Provider value="dark">{children}</ThemeContext.Provider>
}
```

## Client Components

- Moving Client Components Down the Tree - you can make the interactive components client components, and the non-interactive ones server components.
- Passing props from Server to Client components - the props must be serializable by React.

## Interleaving server/client components

- When a new request is made to the server, all server components are rendered first, including those nested inside client components. The rendered result will contain references to the **locations** of client components.
- **We cannot import a server component into a client component, but we pass the server component as props to a client component.**
  - You can use any prop, not just `children`.

## Runtimes

- Node.js Runtime - access to all Node.JS APIs and compatible packages from the ecosystem.
- Edge Runtime which has a more limited set of APIs.
  - Used for middleware.

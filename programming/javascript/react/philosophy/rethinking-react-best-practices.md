# Rethinking React best practices
[Reference](https://frontendmastery.com/posts/rethinking-react-best-practices/)

- Problems in software engineering: technical and people.
- Finding the right constraints:
  - The more people collaborate, the more complex, error-prone, and riskier changes become
  - Without the right constraints for managing tech problems, the more you ship, the poorer the end-user exp usually becomes.
- The biggest constraint as humans building/interacting with complex systems: **limited time and attention.**

- React component system: Allows teams to build components in parallel which can be composed together and "just work" with unidirectional data flow.
- React escape hatches - https://react.dev/learn/escape-hatches - allow abstracting from legacy systems/integrations behind clear boundaries.
- React/tech problems: React tries to address the technical problem of optimising large, deep trees, that need to be processed on end-user hardware.

- Tech industry: Thick desktop client -> thin web applications -> thick (mobile) client with mobile computing/SPA.
  - And then FE engineers split to "front of front-end" and "back of front-end".
  - **React code will migrate back to the server, to reconcile the best of both SPA and server apps.**
- In principle, we'd want to reduce the amount of code that needs to load/run on end-user devices.

## Client-rendered to server-rendered

- For heavy client-rendered front-ends, there is a heavy time where the user downloads, runs code, renders the app, fetches the data, and then renders the page.
  - Slow "blank page".
  - Then, the user hardware takes care of things and we wait until everything is downloaded and ran, and then fetch from client.
- Streaming - ex: ChatGPT showing a spinner until the entire reply was complete vs showing what we can rather than later.
- Relay:
  - Components have data dependencies co-located. Components don't initiate fetches (unlike react-query).
  - Tree traversal occurs during build time.
  - Needs GraphQL, client-side run time, and compiler to reconcile the DX attributes while staying performant.
- Nested routes:
  - Initial data dependencies of components can be mapped to URLs - where nested segments of the URL map to component sub-trees.

## More Parallelisation

- Suspense - allows a sub-tree to fall back to displaying a loading UI when data is unavailable, and resume rendering when it's ready.

```
export function loader ({ params }) {
  // not critical, start fetching, but don't block rendering
  const productReviewsPromise = fetchReview(params.id)
  // critical to display page with this data - so we await
  const product = await fetchProduct(params.id)

  return defer({ product, productReviewsPromise })
}
```

- Pattern using React suspense:

```
// Example of similar pattern in a server component
export default async function Product({ id }) {
  // non critical - start fetching but don't block
  const productReviewsPromise = fetchReview(id)
  // critical - block rendering with await
  const product = await fetchProduct(id)
  return (
    <>
      <ProductView product={product}>
      <Suspense fallback={<LoadingSkeleton />}>
        {/* Unwrap promise inside with use() hook */}
        <ReviewsView data={productReviewsPromise} />
      </Suspense>
    </>
  )
}
```

## Understanding React Server Components

- RSC introduces server as first-class citizen. React evolves to grow another layer, where the back-end becomes embedded into the component tree.

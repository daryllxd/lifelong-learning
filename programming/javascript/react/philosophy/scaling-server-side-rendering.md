# Scaling React Server-Side Rendering
[Reference](https://arkwright.github.io/scaling-react-server-side-rendering.html)

- Came from: Java monolith + JSP-generated templates + jQuery.
- Migration pattern was to have half-React half-JSP templates.
- Improvements to the service's rendering efficiency: streaming responses, refactoring React component elements to DOM node elements, cached renders.
- Service discovery: Consul.
- Apparently the load balancer was not really balancing?

## Client-Side Rendering Fallback

- Load throttling - serialize state to enable isomorphic rendering. We were rendering requests on the server, and then handling re-renders on the client. If there's too much errors resulting from requests timing out, then ask the React server to not server-side render, but let the browser handle it.
- But then, we need to make sure that if it's Google that is crawling, then still do server-side rendering (check user agent string).

## Load Shedding

- React can shed load by dropping excess requests.
- Apply load shedding.
- Not sure how this works yet.

## Component caching

- Fancy library: [Reference](https://github.com/electrode-io/electrode-react-ssr-caching) - caches HTML output on a per-component basis. Prop values can either be cached or interpolated.
- But, it modifies React private APIs, and mutates some of them.
- And the way that it works is that it caches all prop combinations (which wouldn't work for a `Greeting` component if you have 1M users).
- So there are high gains but you have to know how to use them.

## Summary

- First, upgrade your Node and React dependencies. This is likely the easiest performance win you will achieve. In my experience, upgrading from Node 4 and React 15, to Node 8 and React 16, increased performance by approximately 2.3x.
- Double-check your load balancing strategy, and fix it if necessary. This is probably the next-easiest win. While it doesn’t improve average render times, we must always provision for the worst-case scenario, and so reducing 99th percentile response latency counts as a capacity increase in my book. I would conservatively estimate that switching from random to round-robin load balancing bought us a 1.4x improvement in headroom.
- Implement a client-side rendering fallback strategy. This is fairly easy if you are already server-side rendering a serialized Redux store. In my experience, this provides a roughly 8x improvement in emergency, elastic capacity. This capability can give you a lot of flexibility to defer other performance upgrades. And even if your performance is fine, it’s always nice to have a safety net.
- Implement isomorphic rendering for entire pages, in conjunction with client-side routing. The goal here is to server-side render only the first page in a user’s browsing session. Upgrading a legacy application to use this approach will probably take a while, but it can be done incrementally, and it can be Pareto-optimized by upgrading strategic pairs of pages. All applications are different, but if we assume an average of 5 pages visited per user session, we can increase capacity by 5x with this strategy.
- Install per-component caching in low-risk areas. I have already outlined the pitfalls of this caching strategy, but certain rarely modified components, such as the page header, navigation, and footer, provide a better risk-to-reward ratio. I saw a roughly 1.4x increase in capacity when a handful of rarely modified components were cached.
- Finally, for situations requiring both maximum risk and maximum reward, cache as many components as possible. A 10x or greater improvement in capacity is easily achievable with this approach. It does, however, require very careful attention to detail.

# What are Micro Frontends?
[Reference](https://micro-frontends.org/)

- The idea behind Micro Frontends is to think about a website or web app as a composition of features which are owned by independent teams. Each team has a distinct area of business or mission it cares about and specialises in. A team is cross functional and develops its features end-to-end, from database to user interface.
- Microservices = front-end team + aggregation layer + each back-end has its own service aka `ProductService`, `RecommendationService` etc.
- E2E with Micro frontends: "Search team" across front-end to back-end to database ,"team checkout across front-end to back-end to database.
- Documents-to-applications continuum: Sliding scale where a site, built out of static documents, is connected via links, and a purely behaviour driven, *contentless application* like an online photo editor is on the right.
  - Left side: Integration on webserver level - a server collects and concatenates HTML strings from all the components that make up the page requested by the user.
  - When your UI has to provide instant feedback, a pure SSR site is not enough, you have to do things like skeleton screens or update the UI on the device itself.

## Core Ideas

- Be technology agnostic: Each team should be able to choose and upgrade their stack without having to coordinate with other teams. `Custom Elements` are a great way to hide implementation details while providing a neutral interface to others.
- Isolate team code: Don't share a runtime, even if all teams use the same framework. Build independent apps that are self-contained. Don't rely on shared state or global variables.
- Establish team prefixes: Agree on naming conventions where isolation is not possible yet - namespace CSS, events, local storage and cookies to avoid collisions and clarify ownership.
- Favor Native Browser Features over Custom APIs: Use browser events for communication instead of a global system.
- Resilient site: Even if JS failed or hasn't executed yet, your feature should be useful enough.

# Is Ruby Too Slow For Web-Scale?
[Reference](https://www.speedshop.co/2017/07/11/is-ruby-too-slow-for-web-scale.html)

- Latency: the amount of time it takes the server to respond to a single request. Inversely prop to throughput.
- Throughput: how many requests we can serve at the same time.
- Dynamic languages like Ruby generate more CPU instructions that compiled languages like C or Rust.
- On "making things faster":
  - 0.1 second is the limit for users feeling that they are manipulating objects in the UI.
  - 1 second is the limit for users feeling that they are freely navigating the command space.
  - 10 seconds is the limit for users to keep their attention on the task.
- Most web apps are CRUD apps.
- The more Ruby you have, the slower things will be. Because Rails does a lot on every request.
- Most problems are:
  - Poor server config.
  - Memory leaks.
  - Poor use of caching.
- On rewriting to Node/Phoenix: you are still going to be limited by the I/O to the databases that back the app.

# 100ms to Glass with Rails and Turbolinks
[Reference](https://www.speedshop.co/2015/05/27/100-ms-to-glass-with-rails-and-turbolinks.html)

- Turbolinks: Made Rails apps have similar characteristics to the JS SPA paradigm.
- Turbolinks vs SPA: it sends fully rendered views, not data over the wire.
- Non-Turbolinks: Rails usually are in 1.0 seconds:
  - 100-300ms response.
  - 200ms loading HTML/CSS OM.
  - A few more rendering and painting.
  - JS scripting.
- Turbolinks:
  - You don't throw away your entire JS runtime on every page.
  - Don't even throw away the entire DOM.
  - No parsing/tokenizing the CSS and JS again.
- Because Rails is an extraction from Basecamp, it's best used when building Basecamp-like applications.
- Most successful large-scale Rails deployments make extensive use of caching.
- Tools:
  - `rack-mini-profiler`
  - `flamegraph`
  - Chrome Timeline.
  - Turbolinks progress bar.
- Non-RESTful redirects.
- Cache partials.
- Apache Bench/siege.
- Rack::Deflater to gzip asset responses.

## What doesn't work

- JRuby.
- Turbo-React.

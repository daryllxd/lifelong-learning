# RailsConf 2017 Panel: Performance, Performance
[Reference](https://www.youtube.com/watch?v=SMxlblLe_Io)

- Measure it first boys. Each Ruby object gets a slot in the Ruby VM.
- Discourse: Sam has a blog post on this thing.
- Defer JS, CDN.
- Low request variance on seconds thingie.
- Slowest endpoints that have a high amount of traffic.
- Freezing fucking strings?
- Fast vs pretty code?
- The thing about freeze is that if you don't really use the string more than once, why?
- Strike-proof.
- Thing that can cause a slow thing in production: Data in the database. Also when one specific user is logged in. Like paper trail.
- Chrome Dev Tools for throttling your network connection.

# API with Ruby on Rails: useful tricks
[Reference](https://railsware.com/blog/2013/04/08/api-with-ruby-on-rails-useful-tricks/)

- Inherit from `ActionController::Metal`, not `ActionController::Base`. Up to 40% speedup.

``` ruby
  include ActionController::Rendering        # enables rendering
  include ActionController::MimeResponds     # enables serving different content types like :xml or :json
  include AbstractController::Callbacks      # callbacks for your authentication logic
```

- Routing: Versioning.
- Hiding IDs with GUIDs.

# Rails Performance and the root of all evil
[Reference](http://blog.scoutapp.com/articles/2016/05/09/rails-performance-and-the-root-of-all-evil)

- Baking in performance with best practices and experience: Pagination, DB indexes, pagination, know what SQL AR is firing, using `includes` when necessary, know when caching is going to be useful.
- Measuring, identifying, and handling performance issues.
- ***It's much easier to build performance into an app than it is to hunt down random performance problems as they bubble up. Baking in optimization is not what Knuth means by "premature." Let's see a bit more context around the Knuth quote:***
- Quickest path:
  - Fix evidence.
  - Use APM services.
  - Work locally using logs or tools.
  - Keep narrowing down the problem until you have one line or area at fault.
- Evil optimizations:
  - Looking for Ruby problems instead of app problems/poorly written AR.
  - Figuring out how to display 5K rows of something on a page.
  - Is an alternative database necessary?
  - Build abstractions to work around performance problems.
  - Obsess about rewriting parts of the app in another language.
- Non-evil optimizations
  - Ensure a popular action stays under 300ms
  - Implement caching
  - Increase RAM
  - Evaluate the performance of the existing feature first
  - Monitoring

# Ruby Backend Performance Getting Started Guide
[Reference](https://schneems.com/2017/05/17/ruby-backend-performance-getting-started-guide/)

- Start by looking at the outliers (slowest endpoints, those with most memory).
- Check memory usage.
- Scout to check out memory leaks.
- Memory problems usually come from AR/how you use it.
  - Make sure all queries to the DB are using a `limit`.
  - Use `find_each` when you need to loop around a large number of objects.
  - Get a bigger database with production-ish data.
- Tools: `rack-mini-profiler`, `bullet`.

# N+1 Queries or Memory Problems: Why not Solve Both?
[Reference](https://www.schneems.com/2017/03/28/n1-queries-or-memory-problems-why-not-solve-both/)

- N+1 is bad, but unneeded memory allocation is worse.
- If you need count, do `counter_cache`.
- Pass values if you need to.

# Thoughtbot Improving Performance

Improving Rails for Real-Time Requests

Real time requests are requests that can't be backgrounded, and are difficult to cache. Sometimes the cache invalidates too quickly, or there is a bad hit or miss cache ratio.

The goals are:

- Avoid cache invalidation.
- Avoid duplication. (Oftentimes developers do two things, one for the macro/collection, and one for an instance. We want to avoid this.)
- Refactor for performance. (Instead of doing a rewrite, we will work in small steps, keeping everything working along the way. We also want to keep our test suite green as much as possible.)

In order to identify the slow requests, we use New Relic. We can profile the query problems using this. When debugging a problem with this from New Relic, it is better to debug locally. It is difficult to test this in production because the data is always changing. I recommend downloading a local snapshot of the data and getting your tests running with the data.

When you're working with that local data, it's important to not only use the actual data, but also make sure that you reproduce the same situation with that data. A common mistake is to take a production snapshot and sign in with yourself locally. If you are using New Relic, I recommend logging your user id with the current request.

The purpose of this application is to print.

I can install New Relic Developer mode. It provides nice traces for your local requests. It takes 3 seconds to run requests because we are executing 1600+ SQL queries. We can find the slow point.



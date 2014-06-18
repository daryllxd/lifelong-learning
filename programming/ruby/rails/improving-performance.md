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

The problem:

    def each(&block)
      Company.all.map { |company| company.offer_for(@user) }.
      sort_by(&:amount).
      reverse.
      slice(0, MAX_OFFERS).
      each(&block)
    end

We can do some SQL optimization and eager loading, but where exactly can you eager load?

The real meat is the `company.offer_for` part.

    def offer_for(user)
      deal = deals.best_for(user) || NullDeal.new(self)
      if user.new_customer_of?(self)
        Offer.new(

What happens is that you check for each company if the user has a coupon for the company. You just want one query for all the companies. What I do is to extract a class, pull it up to generalize over singular/plural.

Reverse TDD: Comment out the passing spec so it fails. Slowly uncomment it out so it passes.

Pluck out stuff?

    @company_ids_with_coupons = @user.coupons.joins(:deal).pluck(:company_id)

Instead of going through AR models, you just pluck out information from them.

When I delegate, I convert the creates in Factory Girl to stubs.

Memoizing the user cache, we cut out about 500 SQL queries.

AR doesn't have what we call an instance map. Even if you have the same company record, it could be a different Ruby instance.

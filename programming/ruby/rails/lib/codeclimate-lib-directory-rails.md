# What code goes in the `lib/` directory?
[link](http://blog.codeclimate.com/blog/2012/02/07/what-code-goes-in-the-lib-directory/)

    lib: Application specific libraries. Basically, any kind of custom code that doesn't belong under controllers, models, or helpers. This directory is in the load path.

Antipattern: Anything that's not an AR. The most common anti-pattern is pushing any classes that are not AR models into `lib/`. Treat non-AR classes as first class citizens. Requiring these classes be stored in a `lib/` junk drawer away from the rest of the domain model creates enough friction that they not be created at all.

Pattern: Store code that is not domain specific in `lib/`.

*If instead of my app, I were building a social networking site for pet turtles, is there a chance I would use this code?*

- An `OnboardingReport` goes in `app/`. This depends on the specific steps the users must go through to get started with the application.
- A `SSHTunnel` class used for deployment goes in `lib/`.
- Custom Resque extensions go in `lib/`. Any site may use a background procession system.
- A `ShippingRatesImporter` goes in `app/` if it imports a data format the company developed internally. A `FedExRateImporter` would go in `lib/`.
- A `GPGEncrypter` class goes in `lib/`.

I will often introduce modules like `Reporters` and `Importers`, which avoids them cluttering up the root of the `app/models/Importers`.

## Comments

- If you can re-use it, and it's already extracted out into a generic, self-contained chunk of code, you might as well turn it into a gem.
- Your domain logic shouldn't depend on Rails, and I see the app directory as a place for Rails.
- Anything that acts like a model would go in app/models. I would place `ActiveModel` stuff in app/models too for example. Even if it didn't do anything with Rails in particular, but performed the role of a model would go in app/models. Or maybe in app/presenters. Whatever I feel like. Point is: it's not about the classes, it's about roles (and dependencies).
- I wouldn't see the benefit of isolating the domain model in lib/ away from Rails as being realized when you swap the app framework -- the good OO design this can lead to provides a benefit in and of itself as you maintain the software. (For example, the faster, cleaner tests.)
-


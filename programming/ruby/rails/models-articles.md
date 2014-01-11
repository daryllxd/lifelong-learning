## [CodeClimate](http://blog.codeclimate.com/blog/2012/10/17/7-ways-to-decompose-fat-activerecord-models/)

Early on, SRP is easier to apply. ActiveRecord classes handle persistence, associations and not much else. But bit-by-bit, they grow. Objects that are inherently responsible for persistence become the de facto owner of all business logic as well. And a year or two later you have a User class with over 500 lines of code, and hundreds of methods in it’s public interface. Callback hell ensues.

I discourage pulling sets of methods out of a large ActiveRecord class into “concerns”, or modules that are then mixed in to only one model. I once heard someone say:

“Any application with an app/concerns directory is concerning.”

And I agree. Prefer composition to inheritance. Using mixins like this is akin to “cleaning” a messy room by dumping the clutter into six separate junk drawers and slamming them shut. Sure, it looks cleaner at the surface, but the junk drawers actually make it harder to identify and implement the decompositions and extractions necessary to clarify the domain model.


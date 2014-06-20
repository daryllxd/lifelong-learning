# All The Little Things
[link](http://www.confreaks.com/videos/3358-railsconf-all-the-little-things)

I suggest make smaller things. Make small classes and small methods. On conditionals, when could I change them into small objects?

    class GildedRose
      attr_reader :name


Shallow, narrow, leaf node, uses all methods of upper class.

- Switches are usually for business logic or for configuration stuff.
- Prefer duplication over the wrong abstraction.
- Reach for open/closed. New requirements shit. How do you change the code to prepare for the future.
- Make the change easy, then make the easy change.
- Make small things.
- Refactor through complexity. It will be easier once you slog through!


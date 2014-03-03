## Railscasts Draper
- Use this to help a view.
- Lots of `if` conditions and they are view related logic, so we can't extract to methods. We can use helpers, though.
- Problem with helper methods is that they pollute the global namespace and are very not OOP.

#### Installation

    $ rails g draper:decorator NAME_OF_MODEL

This creates `a/decorators/application_decorator.rb` and `a/decorators/user_decorator.rb`.

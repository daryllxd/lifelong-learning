## Understanding the Structure of Rails
[Reference](http://codefol.io/posts/Understanding-the-Structure-of-Rails)

- `ActiveSupport`: A compatibility library including methods that aren't necessarily specific to Rails.
- `ActiveModel`: Hooks into features of your models that aren't really about the database. AM implementations are ORMs, which can hook to MongoDB, Redis, Memcached, or even local machine memory.
- `ActiveRecord`: ORM.
- `ActionPack`: ActionPack does routing. Templating is done through an external gem.
- `ActionMailer`. Used to send email with templates.
- `Railsties`. Glues the framework.

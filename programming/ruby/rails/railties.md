## Introduction to Railties
[Reference](http://wangjohn.github.io/railties/rails/gsoc/2013/07/10/introduction-to-railties.html)

- All major components of Rails are created as a subclass or `Rails::Railtie.`
- `Railtie` is abstract, has 4 methods: `rake_tasks`, `console`, `runner`, and `generators`. This provides a way to configure anything which subclasses `Rails::Railtie`.

## Rails::Railtie
[Reference](http://edgeapi.rubyonrails.org/classes/Rails/Railtie.html)

- Each component is responsible for their own initialization.
- Developing a Rails extension does not require implementing a railtie, but if you need to interact with the Rails framework during or after boot, then a railtie is needed.
- These need railties: creating initializers, setting a generator, adding `config.*` keys to the environment, setting up a subscriber, adding Rake tasks.

## Defining Gems, Plugins, Railties, and Engines
[Reference](http://hawkins.io/2012/03/defining_plugins_gems_railties_and_engines/)

- Gem: portable unit of Ruby code.
- Plugins: ???
- Railties: A connector for external code to tie into Rails.
- Engines: Self-contained Rails applications.

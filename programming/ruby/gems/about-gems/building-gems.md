## [Engineering Lunch Series] Step-by-Step Guide to Building Your First Ruby Gem
[link](https://quickleft.com/blog/engineering-lunch-series-step-by-step-guide-to-building-your-first-ruby-gem/)

A gem is a Ruby plugin. Problems with old Ruby plugins: needed to be committed to source, manual update process/lack of automation.

Bundler acts as a package manager by determining the full set of direct dependencies needed by your application, as well as the sub-dependencies needed by those first-level dependencies.

#### Why Gems?

- Code reuse. Ex: Gem that acts as a client for your API.
- Releasing a gem as open-source provides others the opportunity to contribute by adding features, addressing issues that you might have overlooked, and generally making your gem provide a better experience for its users.
- Gems can act as a portfolio.

Bundler and rake are included as development dependencies automatically (`add_dependency` and `add_development_dependency`). *When your gem is included in a third party application, it will tell Bundler to install all runtime dependencies, while all development dependencies are ignored.*

#### Semantic Versioning

1. MAJOR version when you make incompatible API changes,
2. MINOR version when you add functionality in a backwards-compatible manner, and
3. PATCH version when you make backwards-compatible bug fixes. Additional labels for pre-release and build metadata are available as extensions to the MAJOR.MINOR.PATCH format.

#### Releasing

    $ bundle exec rake release

What happens: your git repository will be tagged with the version number using a name like "`v1.0.0`", and your gem will be accessible through `rubygems.org`.

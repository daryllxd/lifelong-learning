## SOA Series Part 1: The What, the Why, and the Rules of Engagement
[link](https://techblog.livingsocial.com/blog/2014/05/06/soa-the-what-the-why-and-the-rules-of-engagement/)

Most shops lose sight of the tipping point where their applications become unmanageable in their complexity, due to the technical debt accrued in the early phases of their business lifecycle.

*Software service: It is a piece of software functionality and its associated set of data for which it is the system of record.* Ex: Amazon AWS service offerings, Google's services portfolio.

When done right, services have much smaller codebases than monolithic applications. This is like using SRP on an application design level. *They implement a self-contained, well-defined, and well-documented set up functionality, which they expose only via versioned APIs.* They are the true system of record for all data they access from a data store. *No other service or application has direct read or write access to the underlying data store. This will achieve true decoupling and transparency of the implementation details of data storage from information access.*

You can design your services to be scaled by their traffic pattern: read-intensive API endpoints can be cached independently from write-intensive functionality. You can also more naturally separate cache expiry based on the tolerance for staleness of information based on your individual endpoints, or even by particular clients requesting information (information about descriptive text on any given inventory item should in cases have a higher tolerance for staleness than the number of items left to be purchased.

#### Why Should I Care?

You should care because if your goal is to have an application that is successful, then there will be a point in the life of your software application where it will have to undergo change. Possible changes: admin interface, mobile version of the site, business metrics reports, public API access.

*It's not a question of if you will need to invest in changing your application, but when to make the change and how expensive it will be.*

#### The Rules of Engagement

1. *Customer-facing applications cannot directly touch any data store.*

Consumer-facing applications will be a mere mashup of data retrieved from authoritative systems-of-record, and they will never have a database. Such systems-of record will always be a service application with well-defined, versionable interfaces. Apart from the fact that some nasty security issues will be easier to address this way (SQL injection should be a thing of the past), different consumer-facing apps that work on the same information exposed by the owning service will be able to evolve independently, regardless of changes in the underlying data schemas of your datastore.

2. *No service accesses another service’s data store.*

Similarly, all inter-service interactions should happen through well defined, versioned APIs. While a service has ownership to of the data for which it is itself the system of record (including direct read and write access), it can only access other information via the dependent authoritative services.

3. *Every service has at least a development and a production instance.*

No developer should ever need to run any system other than the ones under development on their personal development machine. Dependent services should have standard, well-known URIs for server instances to which all consuming applications point by default.

4. *Invest in making spinning up new services trivial.*

Make everyone happy by having a small accepted list of technologies to support. Invest in creating templates for service code. And, last but not least, introduce rules and guidelines for your interfaces: consider the use of an Interface Definition Language to define APIs, and think about the structure of your RESTful interfaces (what consistent error status codes will you expose, what is in the headers, versus URI parameters, how will authentication / authorization work, etc.).

These rules stem from more than a decade of combined personal experience (both from the ground up, as well as via refactoring existing monoliths).

## SOA Series Part 2: SOA Sample Apps and Their Development and Deployment Flow
[link](https://techblog.livingsocial.com/blog/2014/06/03/soa-sample-apps-and-their-development-and-deployment-flow/)

Sample system: Shows deals available in or near a given city. These items can be organized by a category (aka tag).

- *Deals app.* Classic Rails 4 app without DB. It will show a list of deals, a list of inventory items nearby, details about a single inventory item, and a page for deals of a particular category.
- *Inventory Items Service.* Core service, shows general inventory information, all inventory items, all items in a city, all items in cities nearby a given city, endpoints
- *Tagging Service.* Stores tags and associates them with inventory items. Endpoints: A list of all tags, information about a single tag, CRUD tags. Also has an endpoint for managing tagged inventory items.
- *Cities Service.* Call its own city (aka market) related data (name, country, state, latitude/longitude, cities nearby). It offers endpoints to finding cities, listing all cities, creating/manipulating cities.

#### Setting up the apps locally

Each of the services have to be set up.

    $ bundle install
    $ be rake db:create db:migrate db:fixtures:seed
    $ rails s -p <unique_port>

`Deals` relies on `InventoryService`, which relies on `Cities` and `Tagging`.

In `InventoryService's` configuration, the application reference Heroku instances are in the `databse.yml` file:

    development:
      host: tags-service-development.herokuapp.com
      port: 80
      api_version: 1
      max_concurrency: 4

This is if you do not want to makes changes in several services. But if you need to do so...

    development:
      host: localhost
      port: 3004
      api_version: 2
      max_concurrency: 4

#### Using Heroku as your Development Environment

    $ heroku apps:create $MY_UNIQUE_HEROKU_NAME
    $ heroku git:remote -a $MY_UNIQUE_HEROKU_NAME -r development
    $ git push development master
    $ heroku run rake db:migrate
    $ heroku run rake db:seed
    $ heroku  ps:scale web=1

#### Development and Deployment Workflow

To effectively develop, test, and deploy in an SOA, you need these:

- A local development machine (only check out the applications and services you actually are planning to change) with configuration files.
- A remotely hosted `development` or staging. Data held in data stores for applications deployed is "production-like". After QA, code will be promoted to production.
- Production. This is running on server instances that the end customer will connect to and exercise.

Development points to the well-known development fabric instances of the dependent service. Test point at the known development fabric instances. Service responses can be stored in canned responses like `vcr`.

## SOA Series Part 3: Documenting and Generating Your APIs

## SOA Series Part 4: Caching Service Responses Client-Side

Service calls--when a client makes a request to a service and the service delivers back its response to the client--can be expensive for your application to make.

*Don't even make a service call.* Cache service responses within the client application. If the client can tolerate service data being 5 minutes old, then it will incur the inter-application communication costs only once every 5 minutes. *The general rule here is that the fastest service calls are the ones your applications never need to make.*

*Build caching into your client gem.* Often, the team that builds a service will also be developing the libraries (Ruby client gems) to access that service. We build these client libraries on top of a general low-level gem that takes care of all general HTTP communication and JSON (de)serialization.

*The key by which objects are cached: unique, include the gem, service API version, a unique key for the service API called.*

    def self.key_for_foo_api(foo_id, opts)
      key_with("foo_api:#{opts.hash}", foo_id)
    end

    def self.key_with(dynamic_part, id = nil)
      [common_key, dynamic_part, id].join(':')
    end

    def self.common_key
      ["ls-foo-gem", LS::Foo::VERSION, LS::Foo.foo_service_host, LS::Foo.cache_version]
    end

*When allowing cache store injection in your client library, require as little as feasibly possible about the cache object that is injected.* That strategy provides the client applications with more flexibility about choosing which cache store to use.

    def with_possible_cache(cache_key)
      if cache
        cache.fetch(cache_key) do
          yield
        end
      else
        yield
      end
    end

Caching should be entirely a client application's responsibility. Some clients might not want to cache at all, so make sure to provide the ability to just disable caching in your client gem.

It is also the client applications’ responsibility to set cache expiration policies, cache size, and cache store back-end. As an example, Rails client applications could simply use Rails.cache, some others might prefer a Dalli::Client instance (backed by memcached), an ActiveSupport::Cache::MemoryStore (backed by in-process RAM), or even something that is entirely ‘hand-rolled’ by your clients, as long as it conforms to the protocol your gem code expects of the cache store.

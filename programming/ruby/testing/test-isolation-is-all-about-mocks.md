# Test Isolation Is About Avoiding Mocks
[link](https://www.destroyallsoftware.com/blog/2014/test-isolation-is-about-avoiding-mocks)

Avoiding numerous or deeply nested mocks is the principal design activity of isolated TDD.

[TODO]: READTGUS,

# Parts of a Web App: DAS 40

- `routes`: Untested.
- `controller`: Partially unit tested/partially integration.
- `model`: Integrate against the database.
- `app logic`: In isolation. This results in really good app design.
- `service wrappers`: Third party APIs.

    We have this: Service wrapper -> Twitter gem -> Network -> Twitter API. At what point do we stub the service wrapper?

    We can't stub before Twitter gem because gems change frequently. We also don't make a fake Twitter API (though we actually do it in testing models, hehe). What we do is we can work with the Twitter gem but simulate the Network (I use VCR).

- `presenter`: Isolation, because these are just decorators.
- `view`: Isolation.

Why are some things isolation tested and some aren't? If you look at the dependency graph of these components:

    routes
      controller
        model
        app logic
          model
          service wrappers
        view
          presenter
            model (and other stuff)

Routes depend on controllers, which depend on models. App logic depends on both the model and the service wrappers. We test app logic in isolation because it is based on things we control, model and service wrappers. We test model against the database just to make sure that it works. We test service wrapper with VCR, not against actual client, because it is just not worth the effort to test against actual client. Also, if we don't wrap the service, the app logic becomes directly bound to the third-party service which we don't want. Since controller is so tightly coupled with Rails and Devise, we cannot test it in isolation. This is why it is suggested to stub out model/view when you need to test a controller.

# Parley - Avdi's Way of Testing Mocks

- Start outside-in, with acceptance tests. No substitute for tests that interface with the real external service for keeping confidence, so I try to set that up at all possible.
- Once acceptance tests pass *while hitting the actual service*, I use VCR so I can reproduce the results without taking forever. (Throw away VCR cassettes periodically.)
- Everything that talks to an external API gets a wrapper around it. *The adapter exposes only the API I need, not the full API of the external service.* The API adapters have "plain old data". *They don't accept my domain objects. They work with basic strings, numbers, arrays, and hashes.* Adapters are thin. They aren't responsible for converting my domain terms to API terms or vice-versa. *If I need to adapt from API terms to domain terms, that's the job of a mapper object.*
- Verify adapters using integration tests that also hit the real services, which also have VCR recordings. By leaving out the full stack and testing the adapters directly, I can get more detailed with these tests.
- *When testing business logic in isolation, I mock or stub out these adapters. Since I wrote them, I am mocking what I own.*
- *If the external API changes, my adapter API will stay the same, and only the internals (and tests) of the adapters will change.*


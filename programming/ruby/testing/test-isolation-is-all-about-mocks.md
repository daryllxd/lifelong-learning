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

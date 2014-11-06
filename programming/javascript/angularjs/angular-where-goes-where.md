# AngularJS 1.x WGW (What Goes Where) guide
[link](http://demisx.github.io/angularjs/2014/09/14/angular-what-goes-where.html)

Use case: Reusable application-wide business logic that does not need to be further configured in the `module.config` phase, shareable data. *Factory.* Ex: `md5Service`, `authService`. These are generally referred to as application services or simply services.

Use case: Reusable application business logic that does not need to be configured in `module.config` phase before it can be used. *Provider.* Ex: `facebookLoginService`, `geoService`. Ex: setting a Facebook application ID or an API key for accessing the geolocation service.

Use case: Models that map to database tables, CRUD interaction with RESTful server-side data sources, business logic specific to the model. *Factory, (`$resource`).* Ex: `User`, `Session`, `CreditCard`.

Use case: Wiring up scope with data and methods for view to use. *Controller.*

Use case: Manipulations of DOM template that you want all directive instances to inherit. *Directive, compile function.* (Rarely used, no access to scope).

Use case: Manipulations of DOM instances in linked HTML, addition of DOM event listeners, directive specific scope watchers and/or attribute observers. *Directive, link function.*

Use case: Business logic specific to the directive. API methods for communicating between directives. *Directive, controller.* A directive wishing to access controller methods of another directive needs to explicitly require it.

Use case: Transform model data without changing the source data, filer out `ng-repeats` based on a certain criteria. *Filter.*

Use case: Editable application-wide settings. Editable application-wide value objects or primitives that controller or service components need access to. *Value.* `uiConfig`, `currentUser`. (Cannot be injected into the `module.config` phase, but can be altered by a `Decorator`. This could include an object that tracks currently logged in user properties or any other object, properties of which you want to access in various parts of your application.

Use case: Constant application-wide settings. *Constant.* `appConfig`, `servicesConfig`. Besides controllers and services, Constant cant also be injected into the `module.config` phase. Constants cannot be altered by a `Decorator`. Avoid modifying the constant. If you need an editable object or value, use the `Value` component/provider instead.

Use case: Augment/tweak some third-party service, while leaving the service mostly intact. *Decorator.*

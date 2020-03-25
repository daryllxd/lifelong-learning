# `ApplicationRef`
[Reference](https://angular.io/api/core/ApplicationRef)

- `componentTypes`: Gets a list of component types registered to this application.
- `components`: Get a list of components registered to this application.
- `isStable`: Returns an observable that indicated when the application is stable or unstable.
- `viewCount`: Returns the number of attached views.

# What is the purpose of `ApplicationRef` in Angular 2+?
[Reference](https://stackoverflow.com/questions/44583394/what-is-the-purpose-of-applicationref-in-angular-2)

- Allows to invoke application-wide change detection by calling `appRef.tick()`
- Allows to add/remove views to be included or excluded from change detection using `attachView()` and `detachView()`.
- Provides a list of registered components and component types using `componentTypes` and `components` and some other change detection related information.

- To manually run change detection, can use `tick` function.

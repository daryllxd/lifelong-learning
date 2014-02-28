My biggest issue is having random methods called from outside my class and not having a sense of what they do. The implicitness of modules really trip me up. Testing them always feels really brittle as well, mixing in an instance of a dummy class, etc.

The disagreements I've had with others about module use are usually centered around "exceptions" like view logic (I'd recommend a presenter class) and repeated behavior across classes (I'd use composition to accomplish DRY).

I believe module mixins to be a form of inheritance, based on the inclusion of behavior from another object, where we prefer composition instead.

Current folders

- admin - active_admin
- assets
- builders - factory objects (not factories because conflict with FB)
- controllers
- delegates
- facades - view models. we use them to present a single object to the view rather than many ivars.
- helpers
- inputs - simple forms
- mailers
- models - not just AR::Base
- presenters - adding view-specific stuff to models
- processes - Command pattern: Objects that encapsulate a business process.
- validators - custom validators
- views

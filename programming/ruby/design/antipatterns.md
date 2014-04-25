*Service objects with many responsibilities:* Avoid naming your PORO classes `NounService` suc has `UserService`, `ProductService`. These invite large classes with many responsibilities. Instead use `Use Case classes`, such as `Reverb::Accounts::ForgotPassword` and `Reverb::Orders::Finalize`. Find methods that are used only in one use case and move them there.

Don't bloat your AR models with methods that are specific to a Use Case, instead create POROs to break Use Cases into simple parts.

*Un-namespaced classes in the domain layer:* Our domain layer, in `a/reverb`, has more than 236 classes. It would be a nightmare if they were in one flat directory, yet that's how they started. These days, they are grouped by `a/reverb/checkout` and `a/reverb/offers`. As with service class naming, we keep namespaces based on domain concepts such as `checkout` rather than the `Railsy/Nounsy` way of naming things after models.

*Including modules to share functionality:* We believe sharing code via mixins is largely a smell. It is difficult to find where the methods are coming from and to cleanly read a class definition and see its public API. Mixins with public methods increase surface area of your objects, leading to further coupling in the users of your object. Instead of mixins, delegate to collaborator objects explicitly.

*Any kind of dynamic method invocation:* Sends, especially with interpolated method names are impossible to grep for and refactor. We are proud to say that in approximately 25k lines of application code, we have zero usages of `method_missing?`. This technique only invites headache for maintenance, and is only appropriate when crafting very tightly specified DSLs, that are usually best left to external gems.

*Rails helpers:* Don't use. Rails helpers create globally accessible methods. There are valid uses but they should be limited to customizing the framework itself. Ex: `button_to`, which enhances `link_to` with specific button css classes.


http://devblog.reverb.com/post/70344683203/5-architecture-anti-patterns-and-solutions-for-large

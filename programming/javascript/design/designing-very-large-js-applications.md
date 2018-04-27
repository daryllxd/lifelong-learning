# Designing very large (JavaScript) applications
[Reference](https://medium.com/@cramforce/designing-very-large-javascript-applications-6e013a3291a3)

- Senior engineers: I can solve almost any problem with my tools, and I make the junior engineers eventually be senior engineers.
- Above "I know how to solve problems": "I know how I would solve a problem and so I could teach someone else to do it."
- *Programming model: Given a set of APIs, or of libraries, or of frameworks, or of tools, how do people write software in that context.*
  - Things that impact: introducing something like Redux, adding a Date picker.
- Code splitting: At some point, they become so big that you don't want to deliver them all at once. Needs human element.
- Route splitting is the common way to split, but if you think about Google search results (different results screen based on weather or money conversion), it's not going to work out that way.
- Avoid central configuration, because it's hard to delete code if that thing exists everywhere.
  - `routes.js` that has all the routes, "Do I still need that root component?"
  - `webpack.config.js`: at some point you will need to know what another team did.
  - `package.json`: Can lead to merge conflicts.
- Cool idea: enhance instead of import.
  - ***So, instead of the router importing the root component, the root components announce themselves using enhance to the router. This means I can get rid of a root component by just deleting the file. Because it is no longer enhancing the router, that is the only operation you have to do to delete the component.***
  - Use case is for generated code.
- Base bundle pile of trash: this is the one bundle that will always get loaded, independent of how the user interacts with the application.
  - Things like a date picker or checkout flow don't need to be there.
  - Solution: forbidden dependency tests, a way to assert that your base bundle does not depend on any UI.
  - Add tests to your application to ensure invariants of your infrastructure. Not every engineer will understand how  code splitting works. Just introduce this so that everybody doesn't need to keep that complexity in their heads.

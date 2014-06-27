# Best Practice Recommendations for Angular App Structure
[link](https://docs.google.com/document/d/1XXMvReO8-Awi1EZXAXS4PzDzdNvV6pGcuaF4Q9821Es/pub)

- When used in a real large scale app, readability is improved by making the directory and app structure consistent with the architectural design of the app. We also want to be able to develop tools to make app creation/management easier.
- We want to create a common set of rules that can be applied to a logical unit within an application.

## Proposed Structure

We propose a recursive structure, the base unit of which contains a module definition file (`app.js`), a controller definition file (`app-controller.js`), a unit test file (`app-controller_test.js`), an HTML view (index.html or app.html) and some styling (`app.css`) at the top level, along with directives, filters, services, prototypes in their own subdirectories.

Components:

- A components directory contains directives, services, filters, and related files.
- Common data (images, models, utility files) might also live under components (`components/lib`) or it can be stored externally.
- Components can have subcomponent directories, including appended naming where possible.
- Components may contain module definitions, if appropriate.

Sub-sections:

- These top-level directories contain only templates, controllers, and module definitions.
- We stamp out sub-level child sub-sections using the same unit template, going deeper and deeper as needed to reflect the inheritance of elements in the UI.
- Sub-sections may or may not have their own modules.

Module definitions (?):

- `angular.module('foo')` should be called only once. Other modules and fields can depend on it, but they should never modify it.
- Module definition can happen in the main module file, or in subdirectories for sections or components, depending on the application's needs.

Naming conventions:

- Each filename should describe the file's purpose by including the component or view sub-section that it's in, and the type of object that it is in the part of the name. For example, a datepicker directive would be in components/datepicker/datepicker-directive.js.
- Controllers, directives, services and filters should include `controller`, `directive`, `service`, and `filter` in their name.
- File names should be lowercase. HTML and CSS files should also be lowercase.
- Unit tests should be named ending in `_test.js`.

    sampleapp/
      app.css
      app.js                                top-level configuration, route def’ns for the app
      app-controller.js
      app-controller_test.js
      components/
        adminlogin/
          adminlogin.css                styles only used by this component
          adminlogin.js              optional file for module definition
          adminlogin-directive.js
          adminlogin-directive_test.js
        private-export-filter/
          private-export-filter.js
          private-export-filter_test.js
        userlogin/
          somefilter.js
          somefilter_test.js
          userlogin.js
          userlogin.css
          userlogin.html
          userlogin-directive.js
          userlogin-directive_test.js
          userlogin-service.js
          userlogin-service_test.js
      index.html
      subsection1/
        subsection1.js
        subsection1-controller.js
          subsection1-controller_test.js
          subsection1_test.js
          subsection1-1/
            subsection1-1.css
            subsection1-1.html
            subsection1-1.js
            subsection1-1-controller.js
            subsection1-1-controller_test.js
          subsection1-2/
      subsection2/
        subsection2.css
        subsection2.html
        subsection2.js
        subsection2-controller.js
        subsection2-controller_test.js

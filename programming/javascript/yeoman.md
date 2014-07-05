# Improving Your Development Workflow with Yeoman
[link](http://blog.teamtreehouse.com/improving-development-workflow-yeoman)

- Yo is a tool used to scaffold a new application.
- Grunt is a tool that can automate things like compiling Sass files or optimizing images. It handles building, testing, and previewing your project.
- Bower manages dependencies so you don't need to download them manually.

    $ yo angular hehe

## Folder structure

- `app`: HTML, JavaScript, Sass.
- `bower_components`: dependencies.
- `test`: test setup using Mocha.

## Starting the app

    $ grunt serve # Starts at port 9000
    $ grunt test  # Runs tests
    $ grunt       # Without a task, it will do the default set of tasks: JSHint, Mocha, then build. Build will concatenate and minify your CSS and JavaScript assets.

Once the build task is complete you should see a new folder named dist. This contains all of the files that make up your web application. These are the files that should be deployed to the web server.



# Grunt: The JavaScript Task Runner
[link](http://gruntjs.com/)

- A task runner automates minification, compilation, unit testing, linting, etc.
- Each time `grunt` is run, it looks for a locally installed Grunt, so you can run `grunt` from any subfolder in your project.
- To start working with Grunt, change to the project's root directory, `npm install`, and `grunt`.
- `package.json`: File used by npm to store metadata for projects published as npm modules.
- Running `npm install` in the same folder as a `package.json` file will install the correct version of each dependency listed inside.

## The Gruntfile

Project metadata is imported into the Grunt config from the project's `package.json` file and the `grunt-contrib-uglify` plugin's `uglify` task that is configured to minify a source file.

    module.exports = function(grunt) {

      // Project configuration.
      grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
          options: {
            banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
          },
          build: {
            src: 'src/<%= pkg.name %>.js',
            dest: 'build/<%= pkg.name %>.min.js'
          }
        }
      });

      // Load the plugin that provides the "uglify" task.
      grunt.loadNpmTasks('grunt-contrib-uglify');

      // Default task(s).
      grunt.registerTask('default', ['uglify']);

    };

*Parts:*

- *The wrapper function.* `module.exports = function(grunt) {}`. All of your Grunt code must be specified inside this function.
- *Project and task configuration.* `grunt.initConfig({})`. `grunt.file.readJSON('package.json')` imports the JSON metadata stored in `package.json` into the grunt config.
- *Loading Grunt plugins and tasks.*
- *Custom tasks.* These are registered via: `grunt.registerRask('default', ['uglify']);`.

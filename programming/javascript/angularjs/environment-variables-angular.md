# How to use environment variables in your Angular application
[link](http://mindthecode.com/how-to-use-environment-variables-in-your-angular-application/)

    npm install grunt-ng-constant --save-dev

> `grunt.initConfig`

    ngconstant: {
      // Options for all targets
      options: {
        space: '  ',
        wrap: '"use strict";\n\n {%= __ngModule %}',
        name: 'config',
      },
      // Environment targets
      development: {
        options: {
          dest: '<%= yeoman.app %>/scripts/config.js'
        },
        constants: {
          ENV: {
            name: 'development',
            apiEndpoint: 'http://your-development.api.endpoint:3000'
          }
        }
      },
      production: {
        options: {
          dest: '<%= yeoman.dist %>/scripts/config.js'
        },
        constants: {
          ENV: {
            name: 'production',
            apiEndpoint: 'http://api.livesite.com'
          }
        }
      }
    },

> Add to the `serve` function:

    grunt.registerTask('serve', function (target) {
      if (target === 'dist') {
        return grunt.task.run(['build', 'connect:dist:keepalive']);
      }

      grunt.task.run([
        'clean:server',
        'ngconstant:development', // ADD THIS
        'bower-install',
        'concurrent:server',
        'autoprefixer',
        'connect:livereload',
        'watch'
      ]);
    });

> Add to `grunt build` to help in prod:

    grunt.registerTask('build', [
      'clean:dist',
      'ngconstant:production', // ADD THIS
      'bower-install',
      .. // other build tasks
    ]);

When Grunt runs the task, a config file is generated, with the constants.

    'use strict';

    angular.module('config', [])

    .constant('ENV', {
      'name': 'development',
      'apiEndpoint': 'http://your-development.api.endpoint:3000'
    });

## Using the config file in your app

    <script src="/scripts/config.js" />

    var app = angular.module('myApp', ['config']);

    angular.module('myApp')
      .controller('MainCtrl', function ($scope, $http, ENV) { // ENV is injected

      $scope.login = function() {

        $http.post(
          ENV.apiEndPoint, // Our environmental var :)
          $scope.yourData
        ).success(function() {
          console.log('Cows');
        });

      };

    });

# Everything about custom filters in AngularJS
[link](http://toddmotto.com/everything-about-custom-filters-in-angular-js/)

*Filter 1: Static (single) use filter.* Filter 1 just filters a single piece of Model data and spits it out into the View for us.

    var app = angular.module('app', []);

    app.filter('makeUppercase', function () {
      return function (item) {
          return item.toUpperCase();
      };
    });

Return a function. This function gets invoked each time Angular calls the filter, which means two-way binding for our filters. *Whenever the user makes a change, the filters run again and updates as necessary.*

*Filter 2: Filters for repeats.*

    <li ng-repeat="friend in person.friends | startsWithA">
      {{ friend }}
    </li>

*We need to return a new Array.*

    app.filter('startsWithA', function () {
      return function (items) {
        var filtered = [];
        for (var i = 0; i < items.length; i++) {
          var item = items[i];
          if (/a/i.test(item.name.substring(0, 1))) {
            filtered.push(item);
          }
        }
        return filtered;
      };
    });

*Filter 3: Filters for repeats with arguments.*

    <input type="text" ng-model="letter">
    <ul>
      <li ng-repeat="friend in person.friends | startsWithLetter:letter">
        {{ friend }}
      </li>
    </ul>

    app.filter('startsWithLetter', function () {
      return function (items, letter) {
        var filtered = [];
        var letterMatch = new RegExp(letter, 'i');
        for (var i = 0; i < items.length; i++) {
          var item = items[i];
          if (letterMatch.test(item.name.substring(0, 1))) {
            filtered.push(item);
          }
        }
        return filtered;
      };
    });

Multiple arguments:

    <li ng-repeat="friend in person.friends | startsWithLetter:letter:number:somethingElse:anotherThing">

## The 80/20 Guide to Writing and Using AngularJS Filters
[link](http://thecodebarbarian.wordpress.com/2014/01/17/the-8020-guide-to-writing-and-using-angularjs-filters/)

Controllers handle making the data accessible from a given scope, directives handle the visual rules for displaying and interacting with the data, and filters help directives format the data.

If we have to create something that will be used in most probably, more than one controller, then that is when you use a filter.

By default, AngularJS expressions don't have access to the `window` object unless you inject `$window` into your controller and explicitly make it accessible from the controller's scope.

Filters help in adding some conditional logic in your Angular templates.

## All About the Built-In AngularJS Filters

Extending filters with arguments: `{{ totalCost | currency:"USD$" }}`

Filters inside of JS: `$filter('number')(15, 5)` which is equal to `{{ 15 | number:5 }}` which will render the number 15 as a string to five decimal places.

    {{ copy | uppercase | lowercase }}
    {{ defaultNumber | number:4 }} # 4 decimal places
    {{ defaultNumber | currency:'$':4 }} # 4 decimal places
    {{ userInfor | json }}
    {{ previewCopy | limitTo: 250 }} # 250 characters

    {{ thing | limitTo: 150 }}<span ng-if="copy.length > 150">...</span>

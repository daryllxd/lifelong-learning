## Rails JS frameworks: Ember.js vs. AngularJS
[link](http://www.airpair.com/ruby-on-rails/posts/ember-vs-angular-with-rails)

Single-page applications make extensive use of JavaScript. When users visit an internal URL, the backend serves a single view with all the necessary resources to start a fully-featured JavaScript application. From that point on, the backend won't serve HTML views, but will instead interact with the client application as an API.

We also have Rails applications that require JavaScript to improve the user experience only in some particular sections; in this case, rendering a particular controller/action might trigger a fully-featured user interface, but another section leads us back to the traditional MVC Rails flow.

Angular: `angular-js rails` gem, not the `angular-rails` because the latter hasn't been updated.

#### CSRF Token

Server-side solution: `skip_before_filter :verify_authenticity_token`.

Client-side solution: Make the service adjustments inside Angular's application configuration.

    # read CSRF token
    token = $("meta[name=\"csrf-token\"]").attr("content")
    # include token in $httpProvider default headers
    $httpProvider.defaults.headers.common['X-CSRF-TOKEN'] = token


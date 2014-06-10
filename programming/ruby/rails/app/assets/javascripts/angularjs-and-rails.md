# Parley Thread
[link](http://parley.rubyrogues.com/t/angular-and-rails/2293)

Jared Smith:

- It's not how it fits into the Rails community so much as how it fits into the entire web development community.
- Really any server side execution that can produce JSON and ship it to the browser is fine for an Angular app. All you need is a JSON factory.
- Use Angular when you need an app that feels snappy and needs to be loaded into the same window.
- I prefer Ember because of convention over configuration. You define template/controller separately which allows for errors on the coding teams part. In Ember, a `foobar` route means you look for `foobar.js` controller and a `foobar.hbs` template in the view.
- Just like you will find Sinatra apps embedded into Rails, no reason why Angular cannot be viewed the same way. Angular is built so you can call `ng-app` on any element and Angular will only play with that element and its children.

House 9:

- If I was building an MVC front end application I would try to delay adding the back-end for as long as possible.
- In Angular, use hardcoded Factories for the initial data layer, or try stubbing with HTTP backend.

Vec:

- Ember and Angular have different kind of API. Ember data wants root wrapped resources, Angular wants bare responses. Ember data wants separate create and update routes, `ngResource` wants a single post route.


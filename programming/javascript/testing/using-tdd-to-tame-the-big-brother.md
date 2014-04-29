# Using TDD to Tame the Big Brother by Brandon Hays
[link](https://www.youtube.com/watch?v=GB8pgxoBEBg)

## The Ball of Mud Pattern

- Throwaway Code: "This should be easy", "has to happen this week", "proof of concept"
- Piecemeal Growth
= Shantytown

The myth of the 2-week feature: You can talk about something in 2 weeks but you can't really finish that much.

The Sprinkling of JS: None, JQuery, AJAX, spit post from the back-end, then add cancel, then validate on client side. At this point it's a downpour.

## Now what?

- Sweeping under the rug: Okay if you are never going to access it again.
- Rewrite: You won't see the decisions/secret business logic.
- Refactor: Hard.

## Path 1: DIY from Scratch

- Make code more idiomatic and refactor to JS objects.
- The goal is to get out of the DOM as fast as possible.

## Why Ember?

- Model layer
- Bindings to manage state
- Components that we can drop it easily.

## A Sprinkling of Ember

- Move code into Ember Component (you can add Ember part-by-pat)
- Move markup into handlebars template.
- Insert into original DOM.

## Wrap Existing Code into Ember Component

    App.GfNewPostComponent = Ember.Component.extend({
      layoutName: "components/gf-new-post",

      initLegacyCode: function() {
        // All old code goes here.
      }
    });

This is a self-enclosed bit of DOM and JS. `initLegacyCode` just executes the old code. The HTML is just moved to a handlebars component. We sprinkle the component into the page:

    $(document).ready(function() {
      $('#new-post-container).each(function() {
        var component = App.GfNewPostComponent.create();
        component.replaceIn(this);
      }
    });

## Test It

    # jspec
    describe 'new post component' ->
      beforeEach ->
        @component = App.GfNewPostComponent.create().append()
        @component.container = App.__container__
      afterEach ->
        @component.destroy()
      it "exists", ->
        expect(@component.get('element')).to.exist
        expect(@component.$('#gif-post-dialog')).to.exist

    $ karma run

On its own JS is easy but with server-side/asset path. We're still figuring out how things are supposed to work.

AJAX tests: We add tests for each path.

## Identify Models (May or may not match server MVC models)

Identify things that need persistence, they need state.

In our mind we need GifPost and we need to extract a url from the body. So we write teh test:

    describe "GifPost" ->
      beforeEach ->
        @gifPost = App.GifPost.create()
      describe "with a valid url", ->
        beforeEach ->
          @gifPost.set("body", "thing: http://blah.com/cool-gif.gif")
          it "parses the url from the body" -
            expect(@gifPost.get("parsedUrl")).to equal "http://blah.com/cool-gif.gif"

Once we make the unit test past, we can make the Handlebars component dynamic. Then, we can remove some things in the jail cell of pre-refactored code.

## Let the framework carry the load

States: Initial, editing (button goes away), loading (while data is in flight disable post button but leave everything the same), on error state leave the thing, success state.

We want the DOM to hold the state, and ember allows you to act like a state machine for that part.

Then we add another component.

Last: Show/hide behavior in CSS animations. We have a class that holds the state.

Now we don't have to test direct DOM manipulation.

I believe software development is supposed to be fun!

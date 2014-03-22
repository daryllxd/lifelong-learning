## Slimming Controllers
[Link](http://tutorials.jumpstartlab.com/topics/controllers/slimming_controllers.html)

Controllers are supposed to be stupid. They’re just a connector between the model and the view layers, handling information about the request and send it where it needs to go.

#### Pushing Responsibility Down the Stack

Bad: Shepherding data, reacting to failures, and representing business logic.

This is bad because controllers trap logic. They're more difficult to test than models, and the logic is almost impossible to reuse.

Placing biz logic inside a controller immediately violates SRP.

#### Limiting Logical Switching

"If this parameter is present, do this...". Actions should be < 8 LOC.

Make a Facade or a worker if there is no appropriate model.

#### Interfaces

Rails controllers and Rails views are, according to the premise of MVC, distinct responsibilities. They should be separate objects who communicate by just a few well-defined connection points. But that’s not how Rails works.

    def show
        @article = Article.find(params[:id])
      end

When Rails renders the view for the `show` action, it copies instance variables from the controller into the rendered view, clearly coupling together those two components.

Any time you use an instance variable in Ruby, ask yourself: “Is there a better way?” The answer is almost always “yes.”

#### Limiting Instance Variables

*A normal controller action is going to have one instance variable.* Many actions will use two or three variables, but if you’re getting up above that it’s a sign that you’re missing a domain abstraction.

What is the essential "link" between these objects? Why do they all belong on the same page? Whatever the reason, that should probably be a domain object. (Facade)

#### A Better Interface

We want `<h1><%= article.title %></h1>` as opposed to `<h1><%= @article.title %></h1>`

    def article
        Article.find(params[:id])
    end

Need to expose the method to the view via helper methods

    helper_method :article

What happens is that the show action will no longer have an instance variable.

    def show
    end

    def article
        Article.find(params[:id])
    end

    helper_method :article

#### New

In the view template we expect @article to be our new, blank object. If we use the existing helper, it will try to do a lookup based on params[:id].

No problem. Just add logic that reacts to params[:id] in the helper method:

    def article
      if params[:id]
        Article.find(params[:id])
      else
        Article.new
      end
    end

#### Performance Considerations

There is a performance hit on this, you have to use caching/memoization (cuts down 100ms (!)).

    def article
      @cached_article ||= if params[:id]
        Article.find(params[:id])
      else
        Article.new
      end
    end

Why is the variable called @cached_article? I don’t want to use @article, or someone will come along and start using the instance variable in the views. If you want to talk to my article, you should use the accessor method I’ve defined and I want to strongly encourage you to do that.

Cleaner:

    def article
      @cached_article ||= Article.find_or_initialize_by_id(params[:id])
    end

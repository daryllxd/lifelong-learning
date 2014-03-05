# Notes

- New controller action: `resources :bids { match :retract, via : [:get, :post] }`
- Creating a formatted link: `link_to "XML version of this auction", auction_path(@auction, :xml)`

# REST, Resources, and Rails

#### REST Constraints
- Client-server architecture.
- Stateless communication.
- Explicitly signaling if a response can be cached.
- Using HTTP request methods GET POST PUT DELETE.

#### Why REST
- No need to build another layer on top of HTTP.
- Scales relatively well for big systems.
- Encourages long-lived identifiers (URIs).
- Machines talks by sending requests/responses represented in text, XML, graphics

__So what happens is when you ask a machine for a JSON representation of a resource, you'll use the same identifier every time and the same request metadata indicating that you want JSON, and you’ll get the same response.__

__Resources and Representations:__ What you actually do get hold of is never the resource itself, but a representation of it. _So two versions of a book (audio/text) are retrieved by the same URI and a different content type._

#### Routing and CRUD

The routing system does not force you to implement your app’s CRUD functionality in any consistent manner. You can create a route that maps to any action, whatever the action’s name. Choosing CRUD names is a matter of discipline. Except... when you use the REST facilities offered by Rails, it happens automatically.

    resources :auctions

- Four named routes.
- Seven controller actions.

When you say _you created a Book resource_, what you mean is you created a Book model, book controller with CRUD, and named routes (from `resources :books`).

#### From Named Routes to REST Support

`get 'auctions/:id' => "auction#show", as: 'auction'` gives you `auction_path`.

Rails REST routing gives you the option: `/auctions` are routed differently, depending on the HTTP verb.

The four generated routes point to seven controller actions, depending on HTTP request method. In return, you agree to use very specific names for your controller actions: index, create, show, update, destroy, new, edit.

#### Paths, verbs, and controller actions
- `client_path(client)`: GET /clients/1/ show, PATCH /clients/1/update, DELETE /clients/1/destoy
- `clients_path`: GET /clients index, POST /clients create.
- `edit_client_path(client)`: GET /clients/1/edit edit
- `new_client_path`: GET /clients/new new

#### Method selection rules

1. Since paths overlap, you need to specify the method to be used.
2. The default request method is GET.
3. In a `form_tag` or `form_for`, POST will be used automatically.
4. Specify request method (use PATCH instead of PUT).

Example: `link_to "Delete", auction_path(auction), method: :delete`

    item_url(item) # show, update, or destroy, depending on HTTP verb
    # No need to call .id, Rails will interpolate it

#### The Special Pairs: new/create and edit/update

`create` and `update` operations involve submitting a form. So there are really two actions/two requests for each: 

1. The action that results in the display of the form.
2. The action that processes the form input when the form is submitted.

`new` and `edit` are supposed to show you the form (pre-resource, not resource).

__Singular Resource__: A singleton resource route at the top level of your routes can be appropriate when there’s only one resource of its type for the whole application, perhaps something like a per-user profile.

#### Nested Resources

We want to perform CRUD on bids. What you're aiming for is a URL that looks like: `/auctions/3/bids/5`.

You skip `bids/5` because: the URL is more informative, and this kind of URL gives you immediate access to the auction id (`params[:auction_id]`).

    resources :auctions do 
        resources :bids
    end

What that tells the routing mapper is that you want RESTful routes for auction resources; that is, you want `auctions_url`, `edit_auction_url`, and all the rest of it. You also want RESTful routes for bids: `auction_bids_url`, `new_auction_bid_url`, and so forth.

You can nest to any depth. Each level of nesting adds one to the number of arguments you have to supply to the nested routes. This means that for the singular routes (show, edit, destroy), you need at least two arguments:

    link_to "Delete this bid", auction_bid_path(auction, bid), method: :delete

#### RESTful Route Customizations

This is useful when _you’ve got more than one way of viewing a resource that might be described as showing_. You can’t (or shouldn’t) use the show action itself for more than one such view. Instead, you need to think in terms of different perspectives on a resource, and create URLs for each one.
    
    resources :auctions do
        resources :bids do
            member do
                get :retract # Shows a retract form.
                post :retract # Performs the retract action.

                match :retract, via : [:get, :post] # Refactor top lines to this.
            end
        end
    end

We want to have a `retract` action that shows a form. Since this is not the same as destroy, it has to have its own path. (`/auctions/3/bids/5/retract`) and `link_to "Retract", retract_bid_path(auction, bid)` are now valid.

Mapping to a different controller: User the `:controller` option to map a resources to a different controller than the one it would do so by default. `resources :photos, controller: "images"`.

Referring to extra member and collection actions, David has been quoted as saying, _“If you’re writing so many additional methods that the repetition is beginning to bug you, you should revisit your intentions. You’re probably not being as RESTful as you could be.”_

So in this case, we COULD add a `RetractionController` to handle it. `RetractionController` could now be in charge of everything having to do with retraction activities, rather than having that functionality mixed into `BidsController`.

And if you think about it, something as weighty as bid retraction would eventually accumulate quite a bit of logic. Some would call breaking it out into its own controller proper separation of concerns or even just good object-orientation.

#### Controller-Only Resources

A REST resource doesn't have to map directly to an AR model. Resources are high-level abstractions of what’s available through your web application. __Database operations just happen to be one of the ways that you store and retrieve the data you need to generate representations of resources.__

## Different Representations of Resources

Remember: When you create resource routes you automatically get URL recognition for URLs ending with a dot and a :format parameter.

    def index
        @auctions = Auction.all 
        respond_to do |format|
            format.html
            format.xml { render xml: @auctions } 
        end
    end

This means that you can connet to `/auctions.xml`.

> Concise method:

    class AuctionsController<ApplicationController 
        respond_to :html, :xml, :json
        def index
            @auctions = Auction.all
            respond_with(@auctions) 
        end
    end

JSON: Attempt to render the associated view with a `.json` extension. If no view exists, call `to_json` on the object passed to `responds_with`. If no `to_json`, call `to_format` on it.

Creating a formatted link: `link_to "XML version of this auction", auction_path(@auction, :xml)`. This triggers the `:xml` block in `respond_to`.

[TODO]
- Nesting?
- Shallow nesting?
- Concern routing method
- Colllection routes on matchers
- Custom action names
- Routes for new resources
- controller-only resources


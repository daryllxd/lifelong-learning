# Named Routes

The way you name a route is by using the optional `:as` parameter in a rule.

    get 'help' => 'help#index', as: 'help'
    link_to 'Help', help_path
    /help exists now

Test routes by the `app` object.

    app.clients_path #=> "/clients"
    app.clients_url #=> "http://www.example.com/clients"

`name_path` vs. `name_url`: Use `_path`, its the RW.

Syntactic Sugar: Let Rails infer the ids of non-hash params. (Must be correct order.)

    link_to "Auction of #{item.name}", item_path(item.id)
    link_to "Auction of #{item.name}", item_path(item)

    get "auction/:auction_id/item/:id" => "items#show", as: "item"
    link_to "Auction of #{item.name}", item_path(auction, item)

Change the item path routes to names instead of numbers (those are better).

    /auction/3/item/cello-bow
    Item.where(munged_description: params[:id]).first!

#### Scoping

> No Scopes

    get 'auctions/new' => 'auctions#new' 
    get 'auctions/edit/:id' => 'auctions#edit' 
    post 'auctions/pause/:id' => 'auctions#pause'

> With Scopes

    scope path:'/auctions', controller: :auctions do
        get 'new' => :new, as: 'thingie'
        get 'edit/:id' => :edit
        post 'pause/:id' => :pause
    end

Basically what happens here is that you create paths `/auctions/new /auctions/edit/:id and /auctions/pause/:id`. These are mapped to the auctions controller. The `:new` is the action that will be performed.

## TODO
- Namespaces: Use them if you have bigger models (models in a folder).
- Bundling Constraints, making your own constraints.

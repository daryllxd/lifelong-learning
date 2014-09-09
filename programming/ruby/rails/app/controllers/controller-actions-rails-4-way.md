# The RESTful Rails Action Set

## Index

Provides a representation of a plural (or collection) resource. (Super generic, may be different.)

> What it looks like

    class AuctionsController < ApplicationController
        def index
            @auctions = Auction.all
        end
    end

View template: Displays info about each auction, with links to specific information nabout each one, and to profiles of the sellers.

Authorization on bids: We can now organize the bids controller in such a way that access is nicely layered, using action callbacks only where necessary and eliminating conditional branching in the actions themselves.

    resources :auctions do
        resources :bids do
            get :manage, on: :collection
        end
    end

    resources:bids

Now there is a distinction between `/bids` and  `/auctions/1/bids/manage`, and there is a `bids_url` and `manage_auction_bids_url`.

> If they are truly different resources, why not give them each their own controllers? Surely there will be other actions that need to be authorized and scoped to the current user.

## Show

    def show
        @auction = Auction.find(params[:id])
    end

Shows a single resource.

Differentiate between publicly available profiles (different route) and the profile of the current user, which might include modification rights and perhaps different information.

As with index actions, it's good to make your show actions as public as possible and offload the admin and privileged views onto either a different controller or a different action.

## Destroy

Add `before_action :admin_required, only: :destroy`.

    def destroy
        product.destroy
        redirect_to products_url, notice: "Product deleted!"
    end

    %p= link_to product.name, product
    - if current_user.admin?
        %p= link_to "delete", product, method: :delete

## New/Create

`new`: displays a form.

`create`: will create a new `Auction` object based on the form input, and proceed to a view (`show`) of that auction.

> Tech

    protected

    def auction
        @auction ||= current_user.auctions.build(params[:auction])
    end

    helper_method:auction

> Create action

    def create
        if auction.save
            redirect_to auction_url(auction), notice: 'Auction created!'
        else
            render :new
        end
    end

## Edit/Update: Same lol.

# The RESTful Rails Action Set

## Index

Provides a representation of a plural (or collection) resource. (Super generic, may be different.) 

> What it looks like
    
    class AuctionsController < ApplicationController 
        def index
            @auctions = Auction.all 
        end
    end


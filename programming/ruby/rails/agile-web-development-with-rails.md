## Introduction

#### Why Rails
1. MVC, we start with a working application.
2. Full testing support.
3. Ruby, concise language.
4. Convention over configuration
5. Deployment
6. Obsessive over DRY

## 2: Instant Gratification

    $ rails g controller Say hello goodbye # You get a controller named Say with actions hello and goodbye
    $ rails d controller Say # must delete routes first in routes.rb

Whenever you have data, you have to do it first in the controller, then provide it in the view. Ex for `time`, you have to `It is now <%= @time %>` in the view so that when you modify the time collection you just edit it once.

## 3: The Architecture of Rails Apps

Rails model support: RDBMS are designed around mathematical set theory. While good from a conceptual POV, it makes it difficult to combine RDBMS with OOPLs.

Active Record is the ORM layer supplied with Rails.

#### Controller

- Routes external requests to internal actions.
- Manages caching.
- Manages helper modules.
- Manages sessions.

## 4: Introduction to Ruby

Modules: Hold a collection of methods, constants. They act as a namespace and they can be mixed into another thingie.

#### Idioms

- `empty!` and `empty?`: Exclamation = destructive
- `a || b`: Short-circuit eval, used for default values
- `a ||= b`. Ex: `count || 0` gives count the value of 0 if count doesn't already have a value.
- `obj = self.new`: A class method creates an instance of the class.

## 6: Creating the Application

    $ rails g scaffold Product title:string description:text image_url:string price:decimal
    $ rake db:migrate # set up the migration
    $ rake db:seed

Actions:

    <%= link_to 'Show', product %><br/>
    <%= link_to 'Edit', edit_product_path(product) %><br/>
    <%= link_to 'Destroy', product, :confirm => 'Are you sure?', :method => :delete %>
    <%= cycle('list_line_odd', 'list_line_even') %>"
    <%= truncate(strip_tags(product.description), :length => 80) %>

`:method => :delete` is actually POST underneath, but Rails just keeps track of it so request is not cached or triggered by web crawlers.

`cycle` to modify the lines per row (Rails helper method). `confirm` for Rails to arrange the browser to pop up a dialog box asking for confirmation before following the link.

## 8: Catalog Testing

    $ rails g controller store index # class StoreController in file store_controller.rb with a single action (index)

    class StoreController < ApplicationController
      def index
          @products = Product.all # abstract from models
      end
    end

    class Product < ActiveRecord::Base
      default_scope :order => 'title' # For sorting
      # validation stuff...
    end

    <%= csrf_meta_tag %> # used to prevent Cross Site Request Forgery attacks
    <%= sprintf("$%0.02f", product.price) %> or... <%= number_to_currency(product.price) %≥

    class StoreControllerTest < ActionController::TestCase
      test "should get index" do
        get :index
        assert_response :success
        assert_select '#columns #side a', :minimum => 4 assert_select '#main .entry', 3 # check for match
        assert_select 'h3', 'Programming Ruby 1.9' assert_select '.price', /\$[,\d]+\.\d\d/ # check for match
      end
    end

## 9: Cart Creation

    class ApplicationController < ActionController::Base
      protect_from_forgery

        private

      def current_cart
        Cart.find(session[:cart_id])
      rescue ActiveRecord::RecordNotFound # create new cart if Cart not found
        cart = Cart.create session[:cart_id] = cart.id
        cart
      end
    end

    class Cart < ActiveRecord::Base
      has_many :line_items, :dependent => :destroy # Relationship
    end

    class LineItem < ActiveRecord::Base
      belongs_to :product
      belongs_to :cart
    end

    # Able to reference each model from the other
    puts "This line item is for #{li.product.title}"
    puts "This cart has #{cart.line_items.count} line items"

    class Product < ActiveRecord::Base
      default_scope :order => 'title'
      has_many :line_items

        before_destroy :ensure_not_referenced_by_any_line_item

        # ensure that there are no line items referencing this product, hook before destroy
      def ensure_not_referenced_by_any_line_item
        if line_items.count.zero? return true
        else
        errors.add(:base, 'Line Items present')
        return false
      end
    end

## Migration to change the schema.

    def self.up
      Cart.all.each do |cart|
        sums = cart.line_items.group(:product_id).sum(:quantity)

        sums.each do |product_id, quantity|
          if quantity > 1
            cart.line_items.where(:product_id => product_id).delete_all
            cart.line_items.create(:product_id => product_id, :quantity => quantity)
          end
        end
      end
    end

The default `quantity` for `LineItem` is 1. So what happens is when you migrate up, you do a group operation on the current unique `product_ids`, with the quantity being summed across each product. Then, for each of these products, you remove them from the database then create a new entry where the quantity is the sum passed into the `each` operator.

The rollback is like this:

    def self.down
      LineItem.where("quantity > 1").each do |line_item|
        line_item.quantity.times do
          LineItem.create :create => line_item.cart_id,
                          :product_id => line_item.product_id, :quantity => 1
        end
      line_item.destroy
    end

So in the rollback what happens is you iterate over the quantities and for each, you create a new entry (just like the old method). Then you delete the original >1 quantity `line_item`.







1. Iteration A1: Basic Crud.
2. Iteration A2: Add design and add seed.
3. Iteration B1: Add validations.
4. Iteration B2: Unit testing of models.
5. Iteration C1: Create catalog listing.
6. Iteration C2: Add page layout.
7. Iteration C3: Use helper to format price.
8. Iteration C4: Functional test of controllers.
9. Iteration D1: Finding a cart.

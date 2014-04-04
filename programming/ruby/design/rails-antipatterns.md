
## Models

### Review

- Class: Defines characteristics of an object. What is is (attributes), what it can do (methods).
- Encapsulation: Often, a class should be recognizable to a non-programmer. But you limit what you can call on an object via its API using the public-private-protected keywords.

### Solution: Follow the Law of Demeter

Assume three AR models, `Address`, `Customer`, and `Invoice`. Instead of having `invoice.customer.addresss.street` whenever we present in the view, we can just do:

    class Customer < AR::Base
      has_one :address
      has_many_invoices

      def street
        address.street
      end

      def city
        address.city
      end
    end

    class Invoice < AR::Base
      belongs_to :customer

      def customer_name
        customer.name
      end

      def customer_street
        customer.street
      end
    end

That way we can do this in the view: `@invoice.customer_name, @invoice.customer_street` as opposed to `@invoice.customer.address.street`. So `address` API is coupled only to Customer, and `customer` API is read only by the `invoice` class.

The problem is you clutter the namespace with a ton of methods. You can use `delegates` for this.

    Invoice delegate :name, :street :to => :customer, :prefix => true

You now have access to these methods: `@invoice.customer_name`, `@invoice.customer_street`.

### Solution: Push all `find()` Calls into Finders on the Model

No shit like `User.find(:order => "last_name")` on the view. That should be on the model and ivars should be instantiated by the controller.

### Solution: Keep Finders on Their Own Model

*Bad:*

    class UsersController
      def index
        @user = User.find(params[:id])
        @memberships = @user.memberships(where:active => true).limit(5)
      end
    end

*Good:*

    class UsersController
      def index
        @recent_active_memberships = @user.find_recent_active_memberships
      end
    end

    class User
      def find_recent_active_memberships
        memberships.where(:active => true).limit(5)
      end
    end

Pros: `UsersController` is thinner. Method name reveals intent. No SQL-like things on the controller.

*Better:* We can move the `find_recent_active_memberships` again so that `Membership` is the class that actually calls it.

    class User < AR::Base
      has_many :memberships

      def find_recent_active_memberships
        memberships.find_recent_active
      end
    end

    class Membership < AR::Base
      def self.find_recent_active
        where(:active => true).limit(5).order("last_active_on DESC")
      end
    end

Negative about scope: Less readability, abusing Law of Demeter.

### AntiPattern: Fat Models

Ex: Putting a ton of finders in an `Order` model (`find_purchased`, `find_waiting_for_review`), and a lot of conversion methods (`to_xml`, `to_json`).

Solution: Single Responsibility Principle. To split the conversion methods:

    class Order <AR::Base
      def converter
        OrderConverter.new(slef)
      end
    end

    class OrderConverter
      attr_reader :order
      def initialize(order)
        @order =order
      end

      def to_xml ... end
      def to_json ... end
    end

Now we can do `@order.converter.to_pdf`. This is an example of composition. While you do break the Law of Demeter (you do the chaining thing now), you can still do the delegates:

    class Order < AR::Base
      delegate :to_xml, :to_json, :to_csv, :to_pdf, :to => :converter
      def converter
        OrderConverter.new(self)
      end
    end

#### `composed_of`

In a `BankAccount` class, we have actions such as transfer, deposit, withdraw, open, close, and the class has methods for dollars (returning the balance, comparing balances, currency conversion). We can improve this by moving the balance logic into a *composed* object that represents money (value object). We can use the `composed_of` method.

[TODO]: composed_of

#### Transaction Blocks

Creating a user: Create user, make user admin, add user to the account, save the account, send a confirmation email.

Callback Order

- `before_validation`
- `before_validation` :on => :create
- `after_validation`
- `after_validation` :on => :create
- `before_save`
- `before_create`
- `after_create`
- `after_save`

AR's built-in create and save methods allow for only a single hash of attrs and values to be passed in. This is where you can use the `accepted_nested_attributes_for :users` to update two models at a time:

    = form_for(@account) do |form|
      = form.label :name, "Account Name"
      = form.text_field :name
      - fields_for :user, User.new do |user_form|
        = user_form.label :name, "User Name"
        = user_form.text_field :name
        = user_form.label :email
        = user_form.text_field :email
      = form.submit "Create"

The fields for a user are nested within the fields for the account. When this is submitted to the server, the hash for the User fields will be in a hash of fields called `users_attributes`.

You can set default variables by doing the `before_create` callback `make_admin_user`. Then you send confirmation emails via `after_create`. The good thing about these callbacks is that they simplify controller code, you just do the `Account.new` and the callbacks will take care of things.

    def create
      @account = Account.new params[:account]
      if @account.save
        flash[:notice] = "Your account was successfully created."
        redirect_to account_url(@account)
      else
        render action: :new
      end
    end

### Full-Test Search Engines

Sphinx/Thinking Sphinx, install via Homebrew then do a gem install. Sphinx is a daemon that is controlled by `thinking_sphinx:start` and `thinking_sphinx:stop` rake task. If you need to index your data regularly, you do it like `thinking_sphinx:index` or `ts:in`.

You don't need to stop Sphinx while the indexing occurs, except indices are added, edited, or removed.

    class User < AR::Base
      define_index do
        indexes name, login, location, country
      end
    end

Index your data and run the daemon:

    rake ts:in
    rake ts:start

    class UsersController < ApplicationController
      def index
        User.search(params[:search], :page => params[:page], :match_mode => :any)
      end
    end

No need to change the view TS will work will `will_paginate`. You can also change Sphinx to index infixes and allow for star syntax 

[TODO]: Star syntax, sortng, delta indexes

[TODO]: Rails_Plugins

## Domain Modelling

[TODO]: Domain Modelling

## Views

Why Ruby in the view sucks:

- This could be domain logic instead of presentation logic. This shouldn't belong in the view.
- Presentation logic but it could be overly complex.
- View templates are in HTML. Validating HTML is harder if Ruby.




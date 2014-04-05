
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

### Solution: Learn About the View 

*Bad:*

    - @posts.each do |post|
      = render :partial => 'post', :object => :post

*Good*

    = render :partial => 'post', :collection => @posts

*Better*

    = render @posts

### Helper Tests

    context "the rss_link method" do
      setup do
        @result = rss_link(@project)
      end

      should "hae the project name in the rss link" do
        assert_match /Subscribe to these #{@project.name} alerts/, @result
      end

      should "include a link to the rss" do
        assert_match /href="#{alerts_rss_url(@project)}"/, @result
      end
    end
### Semantic Markup

- Every element that wraps specific content should have a class or id attribute applied to it that identifies that content.
- The right tags should be used for the right content.
- Styling should be done at the CSS level, never on the element directly.

Web design wants you to have a site that can be completely restyled without modifying any HTML content; only CSS changes would be allowed.

*Bad:*

    .post{id: @post.id}
    li.comment{id: comment.id}

*Good:*

    = div_for @post
    = content_tag_for :li, comment do
      = comment.body

*Better:*

    %div[@post]
    %li[@comment]
      = comment.body

## Controllers

*Horrible:*

    class ArticlesController < ApplicationController
      def create
        @article = Article.new(params[:article])
        @article.reporter_id = current_user.id

        begin
          Article.transaction do
            @version = @article.create_version!(params[:version], current_user)
          end
        rescue ActiveRecord::RecordNotSaved, ActiveRecordRecordInvalid
          render :action => :new and return false
        end

        redirect_to article_path(@article)
      end
    end

`Article.transaction do`, which starts a database transaction, is not supposedt to be in the controller.

ActiveRecord lifecycles are wrapped in transactions themselves. A standard AR lifecycle method is `save`.

For security purposes, actions where you assign the ID of the user who creates whatever should be stored in the controller rather than the form field.

To set default values in AR, use a DB default. (Constraints are handled by validations).

    (Migration)
    def self.up
      change_column_default :article_versions, :state, "Raw"
    end

For something that is updated every time you save, then just use an `after_save` callback.

    def set_version_number
      self.version = (article.current_version ? article.current_version : 0) + 1
    end

`Bad:`

    @article.reporter.id = @current_user.id

`Good:`

    @article = @current_user

### Presenters (MVP)

A presenter is a PORO that orchestrates the creation of multiple models -- it can also send emails, or trigger events that would normally be placed in a controller action.

Test First

    class SignUpTest < ActiveSupport::TestCase
      should validate_presence_of :account_subdomain
      should validate_presence_of :user_email
      should validate_presence_of :user_password

      should "be a presenter for account and user" do
        assert_contains Signup.new.presented.keys, :account
        assert_contains Signup.new.presented.keys, :user
      end

      should "assing the user to the account on save" do
        signup = Signup.new(:account_subdomain => "subdomain", 
                            :user_email => "e@mail.com", 
                            :user_password => "passw0rd")
        assert signup.save
        assert user = signup.user
        assert account = signup.account
        assert_equal account.id, user.account.id
      end
    end

Test Description:

- Ensures validations are there
- Ensures it is an Active Presenter class
- Ensures it is responsible for User and account classes
- Ensures the user and account are associated with each other on save

Presenter class

    class Signup < ActivePresenter::Base
      before_save :assign_user_to_account
      presents :user, :account

      private

      def assign_user_to_account
        user.account = account
      end
    end

[TODO]: Finish_this!

### Bloated Sessions

*Store References Instead of Instances:* Store `id` instead.

Ex: Multistep wizard

    class OrdersController < ApplicationController
      def new
        session[:order] = Order.new
      end

      def billing
        session[:order].attributes = params[:order]
        if !session[:order].valid?
          render :action => :new
        end
      end

      def shipping
        session[:order].attributes = params[:order]
        if !session[:order].valid?
          render :action => :billing
        end
      end

      def payment
        session[:order].attributes = params[:order]
        if !session[:order].valid?
          render :action => :shipping
        end
      end

      def create
        if session[:order].save
          flash[:success] = "Order placed successfully"
          redirect_to order_path(session[:order])
        else
          render :action => :payment
        end
      end

      def show
        @order = Order.find params[:id]
      end
    end

Solutions: Either hit the database for each step when you store the thing, or store in hidden form value.

### AntiPattern: Monolithic Controllers

Try to use REST whenever you can. If authentication is in the `UsersController`, then extract the `login` method into a `session#new` and `session#destroy` action.

    resource :sessions, :only => [:new, :create, :destroy]
    match "/login", => "user_sessions#new", :as => :login
    match "/logout", => "user_sessions#destroy", :as => :logout

### Nested Resources

Albums contain songs. Passing the parent ID is a code smell. Solve this by using nested resource, so you don't pass the ID via the URL.

You can then use a `before_filter` to grab the album parameter:

    class SongsController < ApplicationController
      before_filter :grab_album_from_album_id

      private

      def grab_album_from_album_id
        @album = Albu.find(params[:album_id])
      end
    end

### AntiPattern: Evil Twin Controllers

Instead of `format.html`, `format.json`, etc... use Rails responders.

    class SongsController < ApplicationController
      respond_to :html, :xml

      def show
        @song = songs.find(params[:id])
        respond_with(@song)
      end

      def new
        @song = songs.new
        respond_with(@song)
      end

## Services

## Using Third-Party Code

## Testing

## Scaling and Deploying

## Databases

*Never modify the `up` method in a Committed Migration.* Someone might have just changed the whole thing already. You need to run up and down the migration just to make sure that it works You need to run up and down the migration just to make sure that it works.

*Never use External Code in a Migration.* Don't do this:

    def self.up
      add_column :users, :jobs_count, :integer, :default => 0
      Users.all.each do |user|
        user.jobs_count = user.jobs.size
        user.save
      end
    end

Problem: Horrible code, since we load all the users into memory. Also, this will not run if the model is removed from the application, becomes unavailable, or changes in some way that makes the code in the migration no longer valid. Use straight SQL whenever possible in your migrations.

*Eschew Constraints in the Database.* Better to not fight the opinion of AR that database constraints are declared in the model and the DB should be a datastore.

The only exception is NULL constraints (with default database values), store the value in the database.

    add_column :users, :active, :boolean, :null => false, :default => true

## Building for Failure


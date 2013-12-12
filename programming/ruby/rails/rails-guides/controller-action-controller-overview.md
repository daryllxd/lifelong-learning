## What Does a Controller Do?

Action Controller is the C in MVC. After routing has determined which controller to use for a request, your controller is responsible for making sense of the request and producing the appropriate output.

For most conventional RESTful applications, the controller will receive the request (this is invisible to you as the developer), fetch or save data from a model and use a view to create HTML output.

A controller can thus be thought of as a middle man between models and views. It makes the model data available to the view so it can display that data to the user, and it saves or updates data from the user to the model.

## Controller Naming Convention

Pluralized: ClientsController, SiteAdminsController

Following this convention will allow you to use the default route generators (e.g. resources, etc) without needing to qualify each :path or :controller, and keeps URL and path helpers' usage consistent throughout your application..

## Methods and Actions

A controller is a Ruby class which inherits from ApplicationController and has methods just like any other class.

	class ClientsController < ApplicationController
	  def new
	  end
	end

What happens that if a user goes to `/clients/new`, Rails will create an instance of `ClientsController` and run the `new` method.

## Parameters

 Rails does not make any distinction between query string parameters and POST parameters, and both are available in the params hash in your controller:

	class ClientsController < ApplicationController
	  # This action uses query string parameters because it gets run
	  # by an HTTP GET request, but this does not make any difference
	  # to the way in which the parameters are accessed. The URL for
	  # this action would look like this in order to list activated
	  # clients: /clients?status=activated
	  def index
	    if params[:status] == "activated"
	      @clients = Client.activated
	    else
	      @clients = Client.inactivated
	    end
	  end
	 
	  # This action uses POST parameters. They are most likely coming
	  # from an HTML form which the user has submitted. The URL for
	  # this RESTful request will be "/clients", and the data will be
	  # sent as part of the request body.
	  def create
	    @client = Client.new(params[:client])
	    if @client.save
	      redirect_to @client
	    else
	      # This line overrides the default rendering behavior, which
	      # would have been to render the "create" view.
	      render "new"
	    end
	  end
	end

#### JSON parameters

	# If you get sent this
	{ "company": { "name": "acme", "address": "123 Carrot Street" } }
	# You can access it as  params[:company]

#### Routing Parameters

The params hash will always contain the :controller and :action keys, but you should use the methods controller_name and action_name instead to access these values. Any other parameters defined by the routing, such as :id will also be available.

	get '/clients/:status' => 'clients#index', foo: 'bar'
	# When a user opens the URL /clients/active, params[:status] will be set to "active".

#### Strong Parameters (Read more)

With strong parameters, Action Controller parameters are forbidden to be used in Active Model mass assignments until they have been whitelisted. This means you'll have to make a conscious choice about which attributes to allow for mass updating and thus prevent accidentally exposing that which shouldn't be exposed.

	class PeopleController < ActionController::Base
	  # This will raise an ActiveModel::ForbiddenAttributes exception
	  # because it's using mass assignment without an explicit permit
	  # step.
	  def create
	    Person.create(params[:person])
	  end
	 
	  # This will pass with flying colors as long as there's a person key
	  # in the parameters, otherwise it'll raise a
	  # ActionController::ParameterMissing exception, which will get
	  # caught by ActionController::Base and turned into that 400 Bad
	  # Request reply.
	  def update
	    person = current_account.people.find(params[:id])
	    person.update_attributes!(person_params)
	    redirect_to person
	  end
	 
	  private
	    # Using a private method to encapsulate the permissible parameters
	    # is just a good pattern since you'll be able to reuse the same
	    # permit list between create and update. Also, you can specialize
	    # this method with per-user checking of permissible attributes.
	    def person_params
	      params.require(:person).permit(:name, :age)
	    end
	end

## Session (Read more)

Your application has a session for each user in which you can store small amounts of data that will be persisted between requests. The session is only available in the controller and the view and can use one of a number of different storage mechanisms:

#### Accessing the Session

_Sessions are lazily loaded. If you don't access sessions in your action's code, they will not be loaded. Hence you will never need to disable sessions, just not accessing them will do the job._

	class ApplicationController < ActionController::Base
	 
	  private
	 
	  # Finds the User with the ID stored in the session with the key
	  # :current_user_id This is a common way to handle user login in
	  # a Rails application; logging in sets the session value and
	  # logging out removes it.
	  def current_user
	    @_current_user ||= session[:current_user_id] &&
	      User.find_by(id: session[:current_user_id])
	  end
	end

To store something, just assign it to the key like a hash:

	class LoginsController < ApplicationController
	  # "Create" a login, aka "log the user in"
	  def create
	    if user = User.authenticate(params[:username], params[:password])
	      # Save the user ID in the session so it can be used in
	      # subsequent requests
	      session[:current_user_id] = user.id
	      redirect_to root_url
	    end
	  end
	end

To remove something, assign that key to be nil:

	class LoginsController < ApplicationController
	  # "Delete" a login, aka "log the user out"
	  def destroy
	    # Remove the user id from the session
	    @_current_user = session[:current_user_id] = nil
	    redirect_to root_url
	  end
	end

To reset the entire session, use `reset_session`.

#### The Flash

The flash is a special part of the session which is cleared with each request. This means that values stored there will only be available in the next request, which is useful for passing error messages etc.

	class LoginsController < ApplicationController
	  def destroy
	    session[:current_user_id] = nil
	    flash[:notice] = "You have successfully logged out."
	    redirect_to root_url
	  end
	end

You can also assign a flash message as part of the redirection.

	redirect_to root_url, notice: "You have successfully logged out."
	redirect_to root_url, alert: "You're stuck here!"
	redirect_to root_url, flash: { referral_code: 1234 }

The convention is to display any error alerts or notices from the flash in the application's layout. (Just check out application.html.erb).

To keep requests, use the `keep` method.

	flash.keep # persist all flash values
	flash.keep(:notice) keep only this value.

If same request, use `flash.now`.

	class ClientsController < ApplicationController
	  def create
	    @client = Client.new(params[:client])
	    if @client.save
	      # ...
	    else
	      flash.now[:error] = "Could not save client"
	      render action: "new"
	    end
	  end
	end

## Cookies

	class CommentsController < ApplicationController
	  def new
	    # Auto-fill the commenter's name if it has been stored in a cookie
	    @comment = Comment.new(author: cookies[:commenter_name])
	  end
	 
	  def create
	    @comment = Comment.new(params[:comment])
	    if @comment.save
	      flash[:notice] = "Thanks for your comment!"
	      if params[:remember_name]
	        # Remember the commenter's name.
	        cookies[:commenter_name] = @comment.author
	      else
	        # Delete cookie for the commenter's name cookie, if any.
	        cookies.delete(:commenter_name)
	      end
	      redirect_to @comment.article
	    else
	      render action: "new"
	    end
	  end
	end

Rendering xml and json data

	class UsersController < ApplicationController
	  def index
	    @users = User.all
	    respond_to do |format|
	      format.html # index.html.erb
	      format.xml  { render xml: @users}
	      format.json { render json: @users}
	    end
	  end
	end

## Filters

Filters are inherited, so if you set a filter on ApplicationController, it will be run on every controller in your application.

"Before" filters halt the request cycle.

	class ApplicationController < ActionController::Base
	  before_action :require_login
	 
	  private
	 
	  def require_login
	    unless logged_in?
	      flash[:error] = "You must be logged in to access this section"
	      redirect_to new_login_url # halts request cycle
	    end
	  end
	end

To make users actually be able to log in, use the `skip_before_action`

	class LoginsController < ApplicationController
	  skip_before_action :require_login, only: [:new, :create]
	end

After Filters and Around Filters

"After" filters happen after (lol). "Around" filters happen before and after the action. Ex, transactions:

	class ChangesController < ApplicationController
	  around_action :wrap_in_transaction, only: :show
	 
	  private
	 
	  def wrap_in_transaction
	    ActiveRecord::Base.transaction do
	      begin
	        yield
	      ensure
	        raise ActiveRecord::Rollback
	      end
	    end
	  end
	end

## Request Forgery Protection

The first step to avoid this is to make sure all "destructive" actions (create, update and destroy) can only be accessed with non-GET requests.

The way this is done is to add a non-guessable token which is only known to your server to each request. This way, if a request comes in without the proper token, it will be denied access.

Rails protects itself with a created token field when you use the Rails `form_helper`.

	<form accept-charset="UTF-8" action="/users/1" method="post">
	<input type="hidden"
	       value="67250ab105eb5ad10851c00a5621854a23af5489"
	       name="authenticity_token"/>
	<!-- fields -->
	</form>

If you're writing a form manually or need to add the token for another reason, it's available through the method form_authenticity_token:

The form_authenticity_token generates a valid authentication token. That's useful in places where Rails does not add it automatically, like in custom Ajax calls.

## The Request and Response Objects - Just read the thing.

response.headers["Content-Type"] = "application/pdf"

## HTTP authentications

## Streaming and File Downloads

## Log Filtering

## Rescue

Rails' default exception handling displays a "500 Server Error" message for all exceptions. If the request was made locally, a nice traceback and some added information gets displayed so you can figure out what went wrong and deal with it.

If the request was remote Rails will just display a simple "500 Server Error" message to the user, or a "404 Not Found" if there was a routing error or a record could not be found. 

404 or 500 error messages are static, you can't use RHTML or layouts on them.

## Force HTTPS protocol















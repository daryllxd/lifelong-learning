# Working with Controllers

When someone connects to your application, what they’re basically doing is asking the application to execute a controller action.

Controllers are also very closely linked to views, more closely than they’re linked to models. 

It’s possible to write the entire model layer of an application before you create a single controller, or to have different people working on the controller and model layers who never meet or talk to each other. 

However, views and controllers are more tightly coupled to one another. They share a lot of information and the names you choose for your variables in the controller will have an effect on what you do in the view.

#### Rack

Rack is a modular interface for handling web requests, written in Ruby, with support for many different web servers. It abstracts away the handling of HTTP requests and responses into a single, simple call method that can be used by anything from a plain Ruby script all the way to Rails itself.

> HelloWorld in Rack

    class HelloWorld
        def call(env)
            [200, {"Content-Type" => "text/plain"}, ["Hello World!"]]
        end
    end

HTTP request invokes `call` and passes in a hash of ENV vars, and `call` returns a 3-element array of: status, hash of response headers, and body of the request.

Rails 2.3: Request handling was moved to Rack and the concept of middleware was introduced.

Rails 3: It was rearchitected from the ground up to fully leverage Rack filters in a modular and extensible manner. `rake middleware` to see the tasks.

#### Action Dispatch

The entry point to a request is the object at the top of `config/routes.rb`.

The route set chooses the rule it matches, and calls its Rack endpoint.

`get 'foo', to: 'foo#index'` has a dispatcher instance associated to it, whose `call` methdo ends up executing `FooController.action(:index).call`.

To fool the dispatcher into thinking that it's getting a request:

    $ rc
    >> env = {}
    >> env['REQUEST_METHOD'] = 'GET'
    >> env['PATH_INFO'] = '/demo/index'
    >> env['rack.input'] = StringIO.new #=> Fooling the env
    >> rack_body_proxy = DispatchMe::Application.call(env).last
    >> rack_body_proxy.last #=> The HTML body

#### Render unto View

The goal of a controller is to render a view template.

You don't need an action: Rails will default a controller's action to `index` and the views to `views/controller_name/index` if the class is empty.

You also don't necc. need the explicit `render demo/index`, Rails will infer it for you.

> Rendering Another Action's Template: 

    def create
        @event = Event.new(params[:event])
        if @event.save
            redirect_to dashboard_path, notice: "Event created!"
        else
            render action: 'new'
        end
    end

Assuming `new.html.haml` has been written correctly, this will automatically include the display of error information embedded in the new (but unsaved) Event object.

__The template itself doesn’t “know” that it has been rendered by the create action rather than the new action.__ It just does its job: It fills out and expands and interpolates, based on the instructions it contains and the data (in this case, @event) that the controller has passed to it.

> Rendering a Different Template Altogether

    render template: '/products/index.html.haml' # Called from anywhere

> All of these are the same thing if they are called from ProductsController:
    
    render '/products/index.html.haml'
    render 'products/index.html.haml'
    render 'products/index.html'
    render 'products/index'
    render 'index'
    render :index

The content type defaults to that of the request and if you have two templates that differ only by template language, you’re Doing It Wrong.

> Rendering a Partial

Partials can also help you to avoid clutter and encourage you to break your template code up into reusable modules.

    # renders app/views/products/_product.html.haml    
    render partial: 'product' # renders app/views/products/_product.html.haml

    # renders app/views/shared/_product.html.haml
    render partial: 'shared/product' 

    # When passing in an object, interpolate
    # Renders _app/views/products/_product.html.haml
    render partial: @product
    render @product
    render 'product'

> Rendering Text

    render text: 'Submission accepted' # Sends MIME type text/html
    render text: 'Submission accepted', content_type: 'text/plain'

> Rendering Other Types of Structured Data

As long as the parameter responds to to_json, Rails will call it for you, which means you don’t have to call it yourself with AR objects.

    render json: @record
    render json: @projects, include: :tasks

JSONP: Add callback.

    render json: @record, callback: 'updateRecordsDisplay'

> Rendering nothing

    head :unauthorized
    render nothing: true, status: 401 # Unauthorized
    
    # Sending an empty response with a status of 201, and also sets the Location header
    head :created, location: auction_path(@auction)

#### Layouts
  
    class EventController < ActionController::Base 
        layout "events", only: [:index, :new] 
        layout "global", except: [:index, :new]
    end

#### Redirecting

Redirecting means terminating the current request and asking the client to initiate a new one.

    redirect_to(target, response_status = {})

Target has different parameters:

Hash: `redirect_to action: "show", id: 5` # call `url_for` with the argument provided

AR object: Generate URL for that record: `redirect_to post`

`redirect_to articles_url`

`redirect_to articles_path`

`redirect_to :back`: Back to the page that issued the request. When using `redirect_to :back`, if there is no referrer set, a `RedirectBackError` will be raised.

> Flash messages

    redirect_to post_url(@post), alert: "Watch it, mister!"
    redirect_to post_url(@post), status: :found, notice: "Pay attention to the road"
    redirect_to post_url(@post), status: 301, flash: { updated_post_id: @post.id }
    redirect_to :atom, alert: "Something serious happened"

> Register your own flash types using `ActionController::Flash.add_flash_types`.

    class ApplicationController
        add_flash_types :error 
    end

    redirect_to post_url(@post), error: "Something went really wrong!"

#### Callbacks

Used for: authentication, caching, auditing before the intended action is performed.

    before_action :require_authentication
    before_action :security_scan, :audit, :compress

Action callbacks have access to `request`, `response`, and all the instance variables set by other callbacks in the chain or by the action (in the case of `after` callbacks).

Action callbacks follow an inheritance pattern. Global callback: Put it in the `ApplicationController`.

#### Callbacks can be:

__A class:__ External callback classes arre implemented by having a static callback method on le class.

    class OutputCompressionActionCallback 
        def self.after(controller)
            controller.response.body = compress(controller.response.body) 
        end
    end
    
    classNewspaperController<ActionController::Base 
        after_action OutputCompressionActionCallback
    end

__Inline:__ 

    before_action do
        redirect_to new_user_session_path unless authenticated? 
    end

[TODO]
- Configuring your middleware stack
- `prepend_before_action`
- `around_action`
- skipping `before_action`
- Live streaming
- `send_file`
- `set_variant`, for mobile sites

## Rails 3.1: Engine vs. Mountable App
[Link](http://stackoverflow.com/questions/6118905/rails-3-1-engine-vs-mountable-app)

#### Full Engine
- The parent application inherits the routes from the engine.
- No namespacing of models, controllers, etc.

#### Mountable Engine
- Engine's namespace is isolated by default.
- With a mountable engine, the routes are namespaced and the parent app can bundle this functionality under a single route.

My impression is that since a full engine does not isolate itself from the parent application, it is best used as a standalone application adjacent to the parent app. I believe name clashes could occur.

A mountable engine could be used in situations where you want to avoid name conflicts and bundle the engine under one specific route in the parent application. For example, I am working on building my first engine designed for customer service. The parent application could bundle it's functionality under a single route such as:

    mount Cornerstone::Engine => "/cornerstone", :as => "help" 

---
The use case for the `--full` option seems to be very limited. Personally I can't think of any good reason why you'd want to separate your code into an engine without isolating the namespace as well- It would essentially just give you two tightly coupled applications sharing identical file structures and all the conflicts and code leakage that entails.

> Engine will call `isolate_namespace`. `lib/my_mountable_engine/engine.rb`

    module MyMountableEngine
      class Engine < Rails::Engine
        isolate_namespace MyMountableEngine # --mountable option inserted this line
      end
    end

> The engine's `config/routes.rb` file will be namespaced.

    MyMountableEngine::Engine.routes.draw do
    end 

> The file structure for controllers, helpers, views, and assets will be namespaced.

    create app/controllers/my_mountable_engine/application_controller.rb
    create app/helpers/my_mountable_engine/application_helper.rb
    create app/mailers create app/models
    create app/views/layouts/my_mountable_engine/application.html.erb
    create app/assets/images/my_mountable_engine
    create app/assets/stylesheets/my_mountable_engine/application.css
    create app/assets/javascripts/my_mountable_engine/application.js
    create config/routes.rb create lib/my_mountable_engine.rb
    create lib/tasks/my_mountable_engine.rake
    create lib/my_mountable_engine/version.rb
    create lib/my_mountable_engine/engine.rb

My understanding of the difference is that engines are like plugins, and add functionality to existing applications. While mountable apps are essentially an application, and can stand alone.

The difference, I believe, is that a mountable app's are isolated from the host app, so they can't share classes - models, helper etc. *This is because a Mountable app is a Rack endpoint (i.e a Rack app in its own right).*

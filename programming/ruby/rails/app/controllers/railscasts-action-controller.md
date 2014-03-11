All controllers inherit from ApplicationController, which then inherits from ActionController::Base.

Controller related code: `actionpack/lib`.

ActionController::Base inherits from Metal which inherits from AbstractController::Base.

There are a lot of modules that are included `Controller.ancestors`.

When a request comes in it's going to hit the Middleware first before it hits the Controller.

Routing action is handled by `action_dispatch`. It does the `controller.action(action, env)`.

We can do `.source_location`.

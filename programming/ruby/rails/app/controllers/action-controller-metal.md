## `ActionController::Metal < AbstractController::Base`
[Reference](http://api.rubyonrails.org/classes/ActionController/Metal.html)

Simplest example:

``` ruby
class HelloController < ActionController::Metal
  def index
    self.response_body = "Hello World!"
  end
end

get 'hello', to: HelloController.action(:index)
```

- No rendering views, partials, asides from `response_body`, `content_type`, and `status=`.

## What actually does Rails ActionController::Metal
[Reference](https://stackoverflow.com/questions/18024337/what-actually-does-rails-actioncontrollermetal)

- Stripped down version of AC::Base. It is used for APIs because it doesn't include modules that come with a Rails controller. You can create custom controllers like this:

``` ruby
class ApiGenericController <  ActionController::Metal
   include ActionController::Rendering
   include ActionController::Renderers::All
   include ActionController::MimeResponds
   include ActionController::ImplicitRender
   include AbstractController::Callbacks
   include ActionController::HttpAuthentication::Token::ControllerMethods
```


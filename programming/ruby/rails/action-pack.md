## Action Pack – From request to response
[Reference](https://github.com/rails/rails/tree/master/actionpack)

- Handles/responds to web requests.
- Routing, defining controllers that implement actions, view and controller layer.
- Action Dispatch: Parses information about the web request and handles routing as defined by the user. Things like MIME-type, decoding parameters, HTTP caching, cookies/sessions.
- Action Controller: A base controller class that can be subclasses to implement filters and actions to handle requests.

## What is the difference between ActionPack and Rack? (Rails)
[Reference](https://stackoverflow.com/questions/42169794/what-is-the-difference-between-actionpack-and-rack-rails)

- Rack is a real piece of software--the request passes through Rack and its middleware.
- To use Rack, an app must: provide an "app": an object that responds to the call method, taking the environment hash as a parameter, and returning an Array with three elements:
  - HTTP response code, a hash of headers, and the response body, which must respond to `each`.

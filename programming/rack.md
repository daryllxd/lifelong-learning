### What's Rack?

Rack aims to provide a minimal API to develop web applicatins in Ruby, for conneting web servers supporting Ruby and Ruby web frameworks.

It includes handlers that connet Rack to all the web application servers supporting Ruby (WEBrick, Mongrel, etc.)

It includes adapters that connect Rack to different frameworks (Rails, Sinatra, etc.)

Rack allows to you easily deal with HTTP requests.

Remember: Blocks are not objects, but they can be converted into objects of class `Proc`.

#### Rackup

Under the hoood, rackup converts your `config.ru` script to an instance of `Rack::Builder`.
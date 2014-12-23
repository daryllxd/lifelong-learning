##  What is Rack in Ruby?
[link](http://www.whynot.io/ruby/what-is-rack-in-ruby/)

We need something that will give us flexibility in the web server (WEBrick, Puma, etc.) and framework (Rails, Sinatra) that we can use without sacrificing lots of time to switch around.

WEBrick and Rails both know how to communicate with Rack. This means we can now change our web server or Ruby app framework at any time without worrying about communication between our server and app, as long as what we're switching to uses the Rack interface.

## What's Rack?

Rack aims to provide a minimal API to develop web applicatins in Ruby, for conneting web servers supporting Ruby and Ruby web frameworks.

It includes handlers that connet Rack to all the web application servers supporting Ruby (WEBrick, Mongrel, etc.)

It includes adapters that connect Rack to different frameworks (Rails, Sinatra, etc.)

Rack allows to you easily deal with HTTP requests.

Remember: Blocks are not objects, but they can be converted into objects of class `Proc`.

#### Rackup

Under the hoood, rackup converts your `config.ru` script to an instance of `Rack::Builder`.

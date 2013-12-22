1: Taking the Stage
•	Sinatra is a domain-specific language for building websites, web services, and web applications in Ruby. At a high-level, a DSL is dedicated to solving a particular type of problem.
•	Sinatra is not a framework; there is no built-in ORM, configuration files.
•	Padrino brings the Sinatra core into the MVC world.
gem install thin: Sinatra will try this, then Mongrel, then WEBrick
•	Sinatra is a lightweight layer separating you from Ruby middleware called Rack.
get ‘/’ do
•	It is actually a method call.
before do
•	This is specifying what to do before handling the request.
2: Fundamentals
HTTP
•	Start line: The first line in the request.
•	Headers: Additional information about the request.
•	Message body: Binary or text. When uploading an image to a server, it is the binary bits of the image that is sent.
GET: Used to ask a server to return a representation of a resource.
POST: Used to submit data.
PUT: Used to create or update a representation of a resource on a server.
DELETE: Used to destroy a resource on the server.
PATCH: Used to update a portion of a resource, contrast to PUT which replaces it wholesale.
•	GET, PUT, and DELETE are considered idempotent
 
Many URLs, Similar Behaviors
|’/one’, ‘/two’, ‘/three’].each do |route|
	get route do
		“Triggered #{route} via GET
	end

	post route do
		“Triggered ${route} via POST”
	end
end
Routes with Parameters
get ‘/:name’ do
	“Hello, #{params[:name]}!”
end

post ‘/login’ do
	username = params[:username]
	password = params[:password]
end
Routes with Wildcards
get ‘/*’ do
	“You passed in #{params[:splat]}
end
Halting a request: Use halt
get ‘/halt’ do
	“You won’t see this”
	halt 500 //Internal server error
end
Passing a request: Use pass
get %r{/(sp|gr)eedy} do
	pass if request.path = /\/speedy\
“You got caught in the greedy route!”
end
•	If you go to the greedy or the speedy route, you still execute the code.
Redirecting a Request
get ‘/redirect’ do
	redirect ‘http://www.google.com’, 301
end
Filters
before ‘/index’ do
end
Handling Errors
•	200-299: Success
•	400-499: 
•	500-599: Server errors
not_found do
	“Whoops! You requested a route that
 
Chapter 3: A Peek Behind the Curtain
Extending: Adding Post_Get
require 'sinatra/base'
module Sinatra 
module PostGet
def post_get(route, &block) 
get(route, &block)
post(route, &block)
end 
end
# now we just need to register it via Sinatra::Base
register PostGet 
end
•	You are now able to do post and get at the same time.
Request and Response
•	The Rack protocol at its core specifies that the application object, the so-called endpoint, has to respond to the method call. The server, usually referred to as the handler, will call that method with one parameter. This parameter is a hash containing all relevant information about the request: this includes the HTTP verb used by the re- quest, the path that is requested, the headers that have been sent by the client, and so on.
WTF IS THIS SHIT
Chapter 4: Modular Applications
•	

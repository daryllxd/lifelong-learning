## [So What, Exactly, Is the Purpose of a Rails Controller?](http://techiferous.com/2013/04/so-what-exactly-is-the-purpose-of-a-rails-controller/)

The Controller Is a Translator.

To fully understand this, it helps to have a good grasp on what the model layer in a Rails app actually is. It’s not just a collection of classes that interface with the database. It’s the entire brains of your application. All of the domain concepts, logic and behavior live in the model layer.

In fact, I find it useful to sometimes refer to the model layer as “the application”. This emphasizes the fact that everything that your application does happens there. Controllers and views simply serve as an interface to “the application”.

So the controller doesn’t actually do the work; it delegates. It receives an HTTP request (in a convenient Ruby form, of course) and translates it into a command the application can understand.

For example, if a POST request comes in with some parameters, a controller will translate this into the language of the application by creating a new ActiveRecord object and calling save on it.

Often, controllers will try to do too much. But a controller should pretty much only be calling one command on the model layer. It shouldn’t be instantiating two or three different ActiveRecord objects and orchestrating them.

The controller also translates the results of your application to the language of HTTP. Often this is simply a 200 OK with HTML. Notice that it’s not the responsibility of the controller to construct the HTML, just the HTTP.

The Controller Is a Security Guard. 

The second responsibility of a controller is authorization. Based on the incoming HTTP request, it decides whether to pass the action on to the model layer or deny the request.
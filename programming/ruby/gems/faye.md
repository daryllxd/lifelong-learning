## Railscasts 260: Messaging with Faye

Gems: JQuery

We can use other frameworks (Node, Sinatra), but if we want Rails, Faye handles publishing-subscribing asynchronously. There is a Node server and a Ruby server.

We want the benefits of pub-sub only when we need them. We can use this alongside our Rails app

> Installation: Create and make a file.
    
    $ gem install faye
    $ v faye.ru

> faye.ru

    require  'faye'
    faye_server = Faye::RackAdapter.new(mount: "/faye", timeout: 45)
    run faye_server

> To launch the faye server
    
    $ rackup faye.ru -s thin -E production
    #=> Starts an open web app at port 9292

> localhost:9292/faye.js

We need to include this in the browser to make sure it update there.

    <%= javascript_include_tag.... %>

[TODO]


# Railscasts: Faye

    reuire 'faye'
    bayeux = Faye::RackAdapter.new(mount: '/faye', timeout: 25)
    bayeux.listen(9292)

    $ rackup faye.ru -E production -s thin

## The Chat Room

    <script>
      $(function() {

> Create a new client to connect to Faye. This sends the author's username and message to the `/messags/public' channel in a JSON object. Faye sends messages via channels.A user subscribes to a channel and receives all messages that are sent to it.

        var client = new Faye.Client('http://localhost:9292/faye');

        // Handle form submissions and post messages to faye
        $('#new_message_form').submit(function(){
          // Publish the message to the public channel
          client.publish('/messages/public', {
            username: '<%= session[:username] %>',
            msg: $('#message').val()
          });

          // Clear the message box
          $('#message').val('');

          // Don't actually submit the form, otherwise the page will refresh.
          return false;
        });
      });
    </script>


# RailsCasts 316: Private Pub

User's browsers are updated real time using Faye. It is hard to secure it, so I made `private_pub` to make it faster.

Multiple chat clients will not be updated at the same time to update the second browser. Solution: poll clients, have a socket connection. The problem with sockets is that Rails architecture is not designed to handle long connections like that.

In a chat, you want to publish the JavaScript response to other people:

    <% publish_to "/messages/new" do %>
      $("#chat").append("<%= j render(@message) %>");
      $("#new_message")[0].reset();
    <% end %>

Add `private_pub` to Gemfile, then `rails g private_pub:install`, then go to `application.js` and add `require private_pub`.



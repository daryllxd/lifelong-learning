Tell don't ask tells you that instead of asking "Are you a user? If so I want your name...", you want simple concise commands, such as "Whatever you are, say yourself."

> Not so good

    <% if current_user.admin? %>
        <%= current_user.admin_welcome_message %>
    <% else %>
        <%= current_user.user_welcome_message %>
    <% end %>

> Better
    
    <%= current_user.welcome_message %>

This is not good because there isn't room for asking crap, why not just ask the user, "whatever you are, just tell your message."

In OO, we're often grouping behavior and data together. So the data whether ther user is an admin lies in the current user, so why not keep the behavior there for what you do.

If you're asking a lot of questions in the view, yo uusally want to take it out.

> Not so good

    def check_for_overheating(system_monitor)
        if system_monitor.temperature > 100
            system.monitor.sound_alarms
        end
    end

> Better
    
    system_monitor.check_for_overheating

    class SystemMonitor
        def check_for_overheating
            if temperature > 100
                sound_alarms
            end
        end
    end

Instead of asking what the system monitor what to do, just do it.

The first one is some kind of feature envy, any time you see an object being referenced multiple times, you sort of mix Tell and Ask, this tells you that there is a method waiting to be extracted. If you keep asking about the system monitor, maybe it belongs in the SystemMonitor class.

> Not so good

    class Post
        def send_to_feed
            if user.is_a?(TwitterUser)
                user.send_to_feed(contents)
            end
        end
    end

So we can only send posts if the user is a TwitterUser because non-TwitterUsers don't have a feed.

> Better

    class Post
        def send_to_feed
            user.send_to_feed(contents)
        end
    end

    class TwitterUser
        def send_to_feed(contents)
            twitter_client.post_to_feed(contents)
        end
    end

    class EmailUser
        def send_to_feed(contents)
            # no-op. They don't send anything.
        end
    end

So here we have polymorphism instead of conditionals. Each of the users know how to handle how they send the feed.

If you find yourself where a class needs to respond to a lot of methods that it usually doesn't do anything with, then maybe it is a time to split it.

> Not So Good

    def street_name(user)
        if user.address
            user.address.street_name
        else
            'No street name on file'
        end
    end

So you're asking the address a question, it's asking if it is truthy or something. So we're doing the same thing we're doing with the not-so-good examples.

> Better

    def street_name(user)
        user.address.street_name
    end

    class User
        def address
            @address || NullAddress.new
        end
    end

    class NullAddress
        def street_name
            'No street name on file'
        end
    end

These examples (before and after) both violate the Law of Demeter and its better to just delegate the task to an Address class, because you don't even know if you have an address. But even if you did that internally, it would still be helpful to have the NullAddress because you keep on asking and asking.

*Null Object is an excellent way to deal with conditionals that are looking for something.* We can create a stand-in object for this. It would also be great if this thing happens everywhere.

Now it's easy to not cover the cases for this but you have to keep everything consistent, because you can't check NullObject.

So regarding the name of the class, sometimes you can think of a better name than NullUser. For example you can have Guest.

#### Good OOP is about telling objects what you want done, not querying an object and acting on its behalf.

If you find yourself making conditional branches based on a method and an object, and inside each branch you do something different with the object, then you are violating Tell Don't Ask.

## Types of Methods

#### Query Methods

Query Methods ask a question or return some kind of simple value. Is the user signed in? I think this is fine when you are trying to separate concerns such as in MVC. You are trying to put all the views together. *It's okay to not separate this because it's not doing something different to the user. It's doing something different to the view.*

If ever, you would have to create a Decorator or Presenter.

    <% if current_user.signed_in? %>
        <%= link_to 'Sign out', sign_out_path %>
    <% else %>
        <%= link_to 'Sign in', sign_in_path %>
    <% end %>

#### Command Methods

These methods don't return something, or they do return something but it is irrelevant to the action they perform.

    user.save
    ConfirmationMailer.confirmation(user).deliver

We're not asking any questions so it's okay.

#### The trouble is when we mix both together.

    if user.password.present?
        user.save!
    else
        user.errors.add :password, "can't be blank"
    end

This is a violation because you do 2 things at a time.

    if @user.save
        ConfirmationMailer.confirmation(@user).deliver
        redirect_to root_url
    else
        render 'new'
    end

We branch our behavior because of the side effect, but this is probably okay, APIs are pretty much like this. In the conditional branches, we aren't doing something different to the user.

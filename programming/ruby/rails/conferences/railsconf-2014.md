
 scope "/api/v1 do
   scope "/sweet_cat_pictures" do
   post "/" -> "cats#create"
   get "/" => "cats#index"
   get ":cat_id" => "cats#show"
   put ":cat_id" => "cats#update"

To consumer an API, use ActiveRecord

ApplicationConroller, just include whatever you want to.

So, render json, not render js.

Easier to test because of the entry point thingie.



## DHH
 We build these applications and we see "which of these are things I would like to not do again."

Good frameworks are extractions, not inventions.

"What would someone, somewhere, might want to do?" This development style sucks. We can't just "build tools." I didn't want something to be built by somebody who was asked to build tools for me. This often doesn't match the real world.

I'll just focus on making Rails as the perfect framework for making Basecamp. Even though the stuff that Basecamp does can also be done with other stuff. When I'm super fucking annoyed by something though, that's when I have to make it.

I've been working in Rails for 10 years now. The Rails code I'm looking at today is very similar to the Rails code I had when I was making it.

When thinking about your requirements, you can think of the improvements in hardware a couple of years from now.

The pinoneering spirit is what the Ruby developer community unique. There's a lot of other communities that value stability, not that it's bad, but it's a trade-off. We're willing to sacrifice for progress. 

Problem, solution, context. You can encounter the same problem from two contexts and there are two solutions for that. If you think about it, the shit you do is to just make HTML documents. But this is a representation of what the web is. You can make lots of software but make it just a delivery mechanism. 

Ee can think of web as moving in document presentation (wikipedia) or GUI-type (spotify). And I feel like I'm trying to make more document-oriented things. Rails is not much for Google Maps or GUI, but for the documetns. Just like Basecamp and GIthub, the essence is the document itself. And sometimes we need a constraint to liberate because it's hard to start from scratch. Sometimes you don't want "you can draw wahterver your want!!!".

The pitch for Silverlight was that they want to remove the constraints of HTML, but actually it was already what took off! Think Java Applets and Flash and Silverlight, what happened? Even in IOS, most of the popular apps are games.

What I wanted to do was to evolve the document. And people want speed.

- Key-based cache expiration: "The two hardest things in CS is caching and naming things."
	- Rails cache key: It has a key of knowing when the key of . As the person evolves the cache key changes, it just doesn't get exchanged.
	- Memcache/Redis: "Throw out old caches that I don't need"

We solve the problem and once we solve the problem we can build something on top of it.

- Russian Doll nested caching. Now we can nest caches on each other. You want to cache something small anyway, right? Check out

		class Comment < AR::Base
			belongs_to :post, touch: true
		end

	Now I don't have to maintain how the caches are maintained ffs. Every single item in a todo list has a cache. The box has a cache. And so on and so forth. We can make a nested leveling thing.

	In the view, this looks:

		<% cache @comment %>
			<p><%= @comment.body %></p>
		<% end %>

		<% cache @post %>
			<p><%= @post.body %></p>
			<% render @post.comments %>
		<% end %>

	Even if you changed the partial html, you bust the key there because we find, the template file to figure out the components inside.

	Check out: `cache digests` gem.

- What I do is just to put it in the basecamp as a plugin, if it's good, we go put it in Rails. 
- JavaScript decorator doe.
- In solving a problem with the time zone reporting, the fix was there is an entry in the db to the base time, and we have a "data-time" hook in JS so client takes care of it.
- Now we can do the link with a decorator. Instead of `<% if current_user.admin? %>`, we have `<% link_to "Edit", "data-visible-to" => "admin creator" %>`
-Turbolinks: Simulate a single page app. We don't throw the requests after the requests are gone. Turbolinks turn your app into a persistent process. No more asking for shit again.
- Recreating the AJAX send: We have <% page_updates do %>, <% local_page_updates do %>, <% remote_page_edits do %>. No to polling.  We are able to run 100K requests/minute on 6 Rainbow workers and 1 redis instance. Polling sounds inefficient, but it's only inefficient in terms of the cost if you really think of it.
- Why don't we be wasteful in terms of our programming cycles as long as it doesn't matter?


Omniauth facebook gem into the facebook app.
Koala gem to communicate in ruby. We can use x.facebook.get_conection or x.facebook.get_object

@facebook ||= Facebook:: to be a singleton type.

Access token thing.

Initially you can't put a wall post at first, but this is because we haven't authorized the facebook app yet.

u.facebook.get_connection("me", "permissions") to get the permission thing.

Then we get the auth for the user only. 

Facebook app id: must be a constant somewhere. When the user does not want the user to post to the wall, then don't.

You can create test accounts if you want to. we can also use the FQL facebook query language.

Error reporting: rescue Koala::Facebook::APIerror => e 



"Good software takes 10 years. get used to it."



























# Presenters and Decorators: A Code Tour by Mike Moore
[link](https://www.youtube.com/watch?v=xf7i44HJ_1o)

I believe presenters should ease pain. You shouldn't use them early, I believe in pain-driven development. You only do something new when you feel pain.

There is an overhead to going outside of what Rails or any other framework will give you, by default.

I believe that the view is a total bikeshed. A bikeshed is where people are arguing about it but it doesn't really affecting the system as a whole. The thing is, once you get familiar about Rails, you can have an opinion about the view. When you do something new, it communicates hostility towards new developers toward the team.

Let's say you have a navigation:

    published_count = current_user.posts.published.count + current_user.videos.published.count

    if published_count > 0
      %li.published
        %strong Published:
        = published_count

    draft_count = current_user.posts.unpublished.count + current_user.videos.unpublished.count

    if draft_count > 0
      %li.draft
        %strong Drafted:
        = draft_count

    if current_user.admin?
      approval_count = current_user.organization.posts.unapproved.count

      if approval_count.to_i > 0
        %li.approval
        %strong Needing Approval:
        = approval_count 

How do you not do that in your template? Well we can put these in our model.

    def published_count
      self.posts.published.count + self.videos.published.coun
    end

    def draft_count
      self.posts.unpublished.count + self.videos.unpublished.count
    end

But who really needs this? Is there any reason for your domain to have complexity in it? For example, your domain extends through several apps. Does your admin need this? Does your background jobs app need this?

We can also put this in the `lib`, such as `auther_summary.rb`.

    class AuthorSummary
      def initialize(author)
        @author = author
      end

      def published_count
        @author.posts.published.count + @author.videos.published.count
      end

      def draft_count
        @author.posts.unpublished.count + @author.videos.unpublished.count
      end

      def approval_count
        if @author.admin?
          @author.organization.posts.unapproved.count
        else
          0
        end
      end
    end

I kind of like this approach. When people talk about a presenter, this is what they talk about. This is when something else that knows about your models that could present it in such a way that your templates are expecting.

So, how can we use that? Let's go to our shared partial.

    summary = AuthorSummary.new(current_user)

    if summary.published_count > 0
      %li.published
        %strong Published:
        = published_count

    if summary.draft_count > 0
      %li.draft
        %strong Drafted:
        = draft_count

    if summary.approval_count > 0
      if approval_count.to_i > 0
        %li.approval
        %strong Needing Approval:
        = approval_count 

Now our partial creates a Summary and we query the summary for the counts, and we don't even have to know if the viewer is an admin, we just have to ask if we are supposed to show this item or not. The logic for showing the approval count was in the presenter. What we've done is we've created a contract for our templates to expect, and we've taken the behavior and we put it somewhere else. This is important because there are other people in the templates than the developers (designers/UX people).

We have `Draper` and `ActiveDecorator` as examples for this pattern. And at least we can unit test a module which is shorter anyway. So we can define a method on the model without actually putting it on the model. In the case where you have engines for the admin panel, background jobs, which don't need the front-end stuff, it can help.

## Serializers

When people talk about presenters, Serializers also come up as well. We have this:

    class PostController < ApplicationController
      before_filter :require_user

      def show
        @post = current_organization.posts.find(params[:id])

        respond_to do |format|
          format.html
          format.json { render json: @post }
        end
      end
    end

If we want to change the `to_json` hash structure, we have to do something like a private method which we can use. Or we can have templates like Rabl:

    object @post

    attributes :id, :title
    # look up author_name on the model, but use author in the JSON
    attributes :author_name => :author

    if current_user.admin?
      # only show views, popularity to admins
      attributes :view_count => :views, :popularity_index => :popularity
    end

How do we test this, though? I have to send a request, get the response, and test the response. Takes a long time.

    # lib/post_serializer.rb
    class Serializer
      def initialize(post, user)
        @post, @user = post, user
      end

      def to_json
        if @user && user.admin?
          full_detail
        else
          summary
        end
      end

      def full_detail
        summary.merge({ :views => @post.view_count, :popularity => @post.popularity_index })
      end

      def summary
        { :id => @post.id, :title => @post.title, :author => @post.author_name }
      end
    end

We can take the post and the current user (to determine if admin), we call `to_json` on this to return whatever we need depending on user level.

Using this is easy:

    respond_to do |format|
      format.html
      format.json { s = PostSerializer.new(@post, current_user)
                    render :json => s.to_json }
      end
    end

We create a new serializer and we just call the `to_json` method on it, so we can vary the data on it, and we can unit test on it. The implementation can also be seen.

We can use `ActiveModel::Serializer`.

    class PostSerializer < ActiveModel::Serializer
      attributes :id, :title

      attribute :author_name, :key => :author

      if @scoped.admin?
        attribute :view_count, :key => :views
        attribute :popularity_index, :key => :popularity
      end
    end

We also get the `user` variable and it is mapped as `@scope`. We also remove the injected code in `format.json` and restore it to the default rails one:

    format.json

## Design Patterns

**Decorator:** *"It attaches additional responsibilities to an object dynamically. Decorators provide a flexible alternative to subclassing for extending functionality."*

**Mediator:** *"Defines an object that encapsulates how a set of objects interact. Mediator promotes loose coupling by keeping objects from referring to each other explicitly, and lets you vary their interaction independently."*

Now this is the problem I want to solve: I would love to not have these concerns being laid out explicitly in my templates. I've got a bunch of objects, they need to interact together, to get some behavior my application is looking for. A mediator seems to be a good fit.

Decorators decorate models, they are usually model-specific. Presenters (Jay fields article) are more of for views.

On the Enterprise Patterns book, we have the "Presentation Model": *It may interact with several domain objects, but the presentation model is not a GUI friendly facade to a specific domain object. Instead, it is easier to consider the Presentation Model as an abstract of the view that is not dependent on a specific GUI framework. While several views can use the same Presentation Model, each view should require only one Presentation Model... in the case of composition, a presentation model may contain one or many child Presentation Model instances, but each child control will also have only one Presentation Model.*

I don't want to see something that is like this:

    if @course.available? && @course.self_enrollment && @course.open_enrollment && (!@course_enrollment || !(@course_enrollment.active?) && !session["role_course_#{@course.id}"]

I want to see something like this:

    if @view.show_join_course? ...
    if @view.show_drop_course? ...
    if @view.show_temp_access? ...

We can use presenters: First, don't do this:

    class CourseShowPresenter

      def show_join_course?
        @course.available? && @course.self_enrollment && @course.open_enrollment && (!@enrollment || !@enrollment.active?) && !show_temp_access?
      end

      def show_drop_course?
        @enrollment && @enrollment.self_enrolled && @enrollment.active? && !show_temp_access?
      end

    end

You don't need a presenter. You need an adequately modelled domain:

    class CourseShowPresenter

      def show_join_course?
        @course.can_user_join?(@user) && !show_temp_access?
      end

      def show_drop_course?
        @course.can_user_drop?(@user) && !show_temp_access?
      end
    end

We should ask the domain if the user can join or drop the course. We are using this as "if the user can actually see these things." This is a front-end thing.

## Real thing

What we did is we have three different presenters, since we have three different permission thingies:

    class HomepageUserPresenter
    class HomepagePublicPresenter
    class HomepagePermissivePresenter

What I love about this is that we get the behavior like, and we make sure that things are testable.

Again, when you open your terminal, do not start with Presenters. Use presenters only when you feel pain.

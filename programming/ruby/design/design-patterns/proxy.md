# Proxy

We have a class `Video` that needs authorization. Where do we put that logic? We can do this:

    def authorized? user
      user == "Authorized"
    end

    def play user
      if authorized?(user)
        ...
      else
        return false # or something else
      end
    end

This is horrible because you are changing a class that already works. How can we limit access to the videos?

We can create a new class, `VideoAuthenticationProxy`.

    class VideoAuthenticationProxy
      it "allows the privileged user to view" do
        video = Video.new
        proxy = VideoAuthenticationProxy.new(video)
        proxy.play
        capture { video.play.string }.must_include "My First Video"
      end
    end

> Class

    class VideoAuthenticationProxy

> This is where we inject user into the constructor, so we can make the proxy choose whether to let the user watch the video or not.

      def initialize(video, user)
        @video = video
        @user = user
      end

> This is where we insert the authentication logic, as opposed to the video itself.

      def play
        if @user == "Privileged"
          @video.play
        else
          raise ForbiddenAccessError, "Only privileged users are allowed."
      end
    end

# Ruby Best Practices: Proxy
[link](http://blog.rubybestpractices.com/posts/gregory/060-issue-26-structural-design-patterns.html)

A Proxy is any object that acts as a drop-in replacement object that does a bit of work and then delegates to some other underlying object.

    require "delegate"

    class Quiz
      def questions
        @questions                  ||= HasManyAssociation.new([])
        @questions.associated_class ||= Question

        @questions
      end
    end

    class Question
      def initialize(params)
        @params = params
      end

      attr_reader :params

      def answer
        params[:answer]
      end
    end

    class HasManyAssociation < DelegateClass(Array)
      attr_accessor :associated_class

      def initialize(array)
        super(array)
      end

      def create(params)
        self << associated_class.new(params)
      end
    end

In here we have a Quiz which has questions. Instead of initializing a `Questions` variable or something, a `HasManyAssociation` object is initialized and the logic for `create` is inside. Since there is also a `DelegateClass(Array)` it gains the array methods so we can call `questions[0]` etc. You can now reuse the `HasManyAssociation` for `Quiz` to add other `HasMany` relationships to it.

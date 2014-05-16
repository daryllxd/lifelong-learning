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


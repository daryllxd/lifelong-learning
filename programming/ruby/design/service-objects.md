# Railscasts #398

Ending:  Now we've extracted nearly all the model's behavior, it is cleaner. We can use multiple service objects in an action, or we can use the same service object in multiple actions.

Keeping the model layers focused feels good and another good thing about this extraction is that doing things such as sending emails, adding messages to a message queue, or communicating with an external API can be handled in a service object and we no longer need to have to interact directly from the model.


The problem with this `User` model is that is deals with authentication with passwords or OAuth, has searching, handles conversion to CSV, sends out invitation emails and manages password resets.

    class User < ActiveRecord::Base
      attr_accessible :email, :username, :password, :password_confirmation

      validates_presence_of :username, :email
      validates_uniqueness_of :username
      validates_confirmation_of :password

      has_secure_password

      def self.authenticate(username, password)

      def self.from_omniauth(auth)

      def self.search(query)

      def self.to_csv(options = {})

      def send_invitation(email)

      def reached_invitation_limit?

      def send_password_reset

      def generate_password_reset_token

      def password_reset_expired?
    end

We have behavior here that isn't related, so why is it all in the same model? This is usually because you push model from the controllers to the model layer. Before refactoring, we need tests first.

Controllers are difficult to test directly and they have enough responsibility handling requests and responses. We create `services/authentication.rb` where we can put the `create` action's behavior for a session.

> Controller code

    def create
      auth = Authentication.new(params, env["omniauth.auth"])
      if auth.authenticated?
        session[:user_id] = auth.user.id
        redirect_to root_url, notice: "Logged in!"
      else
        flash.now.alert = "Username or password is invalid"
        render "new"
      end
    end

> Model code

    class Authentication
      def initialize(params, omniauth = nil)
        @params = params
        @omniauth = omniauth
      end

      def user
        @user ||= @omniauth ? user_from_omniauth : user_with_password
      end

      def authenticated?
        user.present?
      end

    private

      def user_from_omniauth
        User.where(@omniauth.slice(:provider, :uid)).first_or_initialize.tap do |user|
          user.provider = @omniauth[:provider]
          user.uid = @omniauth[:uid]
          user.username = @omniauth[:info][:nickname]
          user.save!
        end
      end

      def user_with_password
        user = User.find_by_username(@params[:username])
        user && user.authenticate(@params[:password])
      end
    end

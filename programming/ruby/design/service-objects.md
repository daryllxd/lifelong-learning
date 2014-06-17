# Gourmet Service Objects
[link](http://brewhouse.io/blog/2014/04/30/gourmet-service-objects.html)

## A service object does one thing.

    class AcceptInvite
      def self.call(invite, user)
        invite.accept!(user)
        UserMailer.invite_accepted(invite).deliver
      end
    end

## Conventions:

- `app/services`. Use subdirectories for business logic-heavy domains. `app/services/invite/accept.rb` will define `Invite::Accept`. `app/services/invite/create.rb` will define `Invite::Create`.
- Do verb-noun, no `Service`: `ApproveTransaction`, `SendTestNewsletter`, `ImportUsersFromCsv`.
- Services respond to the `call` method.  `ApproveTransaction.call()` as opposed to `ApproveTransaction.approve()`.

## Benefits:

*Services show what my application does: `ApproveTransaction`, `CancelTransaction`, `BlockAccount`, `SendTransactionApprovalReminder`.*

*Clean-up models and controllers.* Controllers turn the request (params, session, cookies) into arguments, pass them down to the service and redirect or render according to the service response.

    class InviteController < ApplicationController
      def accept
        invite = Invite.find_by_token!(params[:token])

        if AcceptInvite.call(invite, current_user)
          redirect_to invite.item, notice: "Welcome"
        else
          redirect_to '/', alert: "Oops"
        end
      end
    end

Models only deal with associations, scopes, validations and persistence.

    class Invite < ActiveRecord::Base
      def accept!(user, time = Time.now)
        update_attributes!(accepted_by_user_id: user.id, accepted_at: time)
      end
    end

*DRY and Embrace change.* Keep service objects as simple and small as possible. Compose service objects with other service objects.

*Clean up and speed up your test suite.* Services are easy and fast to test since they are small ruby objects with one point of entry (the `call` method). Complex service are now composed with other services, so you can split up your tests easily.

*Call them from anywhere.* They can be called from controllers, other service objects, Resque jobs, Rake tasks, the console, test helps to setup the integration tests.

*Real world services.* I add Virtus into the mix to handle parameters.

[TODO]: THIS_PART

*Values: The Return*

1. Flavor 1: Fail loudly. Most services are not supposed to fail. They do not return anything meaningful but they raise an exceptions when something goes wrong.
2. Flavor 2: Return persisted AR model, check for errors.

    def create
      ...
      @invite = CreateInvite.call(attributes)

      if @invite.persisted?
        redirect_to @invite
      else
        render :new, alert: errors_for_humans(@invite.errors)
      end
    end

3. Flavor 3: Response object.

    class InviteController
      def accept
        result = AcceptInvitation.call(invite: Invite.find_by_token!(params[:token], user: current_user)
      end

      if result.success?
        ...
      else
        ...
      end
    end

# Reddit on Service Layer vs. Eventing
[link](http://www.reddit.com/r/rails/comments/1xfnan/skinny_rails_controllers/)

## FYIAV

- Eventing is based on magic. A butterfly flaps it's wings on the left, something else happens on the right as a result of, but not in coordination with, what happened on the left.
- If more than one process needs to happen as a result of a primary action, controlling (or understanding) the order in which they happen with events is mind-bending.
- They introduce surprise code. *Unless someone knows the way the eventing system is set up and configured, they are unlikely to even know that these other side-effects of their primary actions are happening, and thus unable to tell if they are appropriate or not.*
- *They are almost completely untestable, and often introduce randomness into unrelated unit tests as you can no longer isolate the domain of your tests.*

Service layers on the other hand are very explicit in many ways:

- They are explicit handlers for coordinating complex orchestrations.
- They can handle said orchestrations atomically.
- They are extremely simple to unit test.

In my Rails apps the models and the controllers are very thin, the lifecycle goes like this:

- Client hits URL.
- URL routes to controller/action.
- Controller/action passes necessary inputs to appropriate service.
- Service orchestrates the process and returns the result.
- Controller/action returns response.

*This isn't needed for every action you write, but I do it for any action that does more than one thing (create record + send email = Service).*

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

# Structuring Rails Applications
[link](http://karolgalanciak.com/blog/2013/10/06/structuring-rails-applications/id)

Is AR evil? When you keep adding callbacks, there are cases where you don't want them executed. So you add conditionals or bypass-like methods. After some time, the logic in callback is so complex that you waste a few hours with other developers to understand why something was executed at all.

Ex: Devise `confirmable`, if you forgot to pass a date to `:confirmed_at`, the confirmation email is sent to all registered users. This is because of the callbacks.

## Models

Factory methods, queries, scopes, general validations *which are always applicable* , domain constraints such as "you cannot assign users from other organizations to other organizations". *Putting this kind of logic inA controllers' `:before_filter` or permission classes is not enough, I want to ensure the integrity of the data and make it impossible to bypass this restriction.*

    validate :ensure_valid_organization

    def ensure_valid_organization
      if user.organization != group.organization
        raise InvalidOrganizationError, "User's organization does not match Group's organization."
      end
    end

*The basic rule when applying callbacks for me is to use them for processing some data, which should always take place.* Ex: Every time a record is saved, I want to have a parameterized form of name (such as for a slug), or when a record is saved or destroyed, I want he statistics to be updated (such as for calculating averages, minimum and maximum).

We also have the `dependent: :destroy` option, it is useful for keeping the integrity of data, but you have to be sure when using it. These are low-level callbacks (they don't concern business logic and are something that you want to have on a database level.

*If you are absoutely sure that something should really be executed as callback, feel free to use them, but please, don't send notifications, don't connect with the Facebook API or download files from Dropbox in callbacks.*

## Controllers

Everything related to parsing requests, sessions, rendering templates, redirecting and flash messages should be put in controllers. What about application logic? In most cases it should be limited to control flow. If there is just one additional line of code with a method call, no need to extract to usecase or service object.

Cells: Mini controllers. You can render a UI component!

## Helpers

In most cases I use helpers to extract things that aren't related to any particular model--rendering flash messages, titles, HTML templates. Everything else should be extracted to the presenters/decorators. Ex: Bootstrap modal activator.

    def modal_activator(text, path, options)
      link_to(text, path, options.merge(role: "button", "data-toggle" => "modal"))
    end

## Forms

If you have a form concerning more than one model, you can use the Reform gem.

    require 'reform/form/coercion'
    require 'reform/rails'

    class UserRegistrationForm < Reform::Form

      include DSL
      include Reform::Form::ActiveRecord
      include Reform::Form::Coercion

      properties [:email, :name, :country_id],  on: :user
      property :birth_date,        on: :user_profile, type: Date
      properties [:age, :photo],   on: :user_profile

      validates :email, :photo, :birth_date, :name, :age, presence: true
      validates :age, numericality: true
      validates :email, uniqueness: { case_sensitive: false }

      model :user

      def countries_collection
        Country.all.pluck(:id, :name)
      end

      def persist!(params)
        if validate(params)
          begin
            save do |data, map|
              UserRegistration.new.register!(
                User.new(map[:user]),
                UserProfile.new(map[:user_profile])
              )
            end
          rescue UserRegistration::RegistrationFailed
            false
          end
        end
      end

    end

Form objects are also a great way to extract search forms and logic related to filtering. Reform can deal with `has_many` associations and nested collections, so it is pretty powerful.

## Services

I prefer to call service objects usecases and in `/services` I put some wrappers concerning third party APIs. Ex: Google Calendar integration:

    module GoogleCalendar
      class Calendars

        attr_reader :client
        def initialize(client)
          @client = client
        end

        #some other methods

        def patch(calendar_id, calendar_data)
          client.execute(api_method: client.service.calendars.patch), body: calendar_data,
            parameters: { "calendarId" => calendar_id }, headers: {'Content-Type' => 'application/json'})
        end

      end
    end

## Usecases

This is where most of the business logic should be extracted--almost everything that would be in models, according to "skinny controllers, fat models". Benefits of usecase objects: *they are easy to understand, they are easy to test, and don't lead to unexpected actions.*

    class UserRegistration

      attr_reader :admin_notifier, :external_service_notifier
      def initialize(notifiers = {})
        @admin_notifier = notifiers.fetch(:admin_notifier) { AdminNotifier.new }
        @external_service_notifier = notifiers.fetch(:external_service_notifier) { ExternalServiceNotifier.new }
      end

      def register!(user, profile)
        profile.user = user
        ActiveRecord::Base.transaction do
          begin
            user.save!
            profile.save!
          rescue
            raise UserRegistration::RegistrationFailed
          end
        end
        notify_admin
        notify_external_service
      end

      def notify_admin
        admin_notifier.notify(user)
      end

      def notify_external_service
        external_service_notifier.new_user(user, profile)
      end


      class RegistrationFailed < Exception
      end

    end

## Policies

It is a decorator, but not Draper-like. (Draper is for presentation logic). Models are also a wrong place to write policy logic as they encapsulate important domain logic which can be quite complex. So its is a good idea to create policy objects for this.

    class InvestmentPromotionPolicy

      attr_reader :investment, :clock
      def initialize(investment, clock = DateTime)
        @investment = investment
        @clock = clock
      end

      def promoted?
        valid_promotion_date? and owner_promotable?
      end

      def owner_promotable?
        investment.owner.active_for_promotion?
      end

      def promotion_status
        case
        when promoted?
          :promoted
        when valid_promotion_date? and !owner_promotable?
          :pending_for_promotion
        else
          :not_promoted
        end
      end

      private

        def valid_promotion_date?
          (investment.promotion_starts_at..investment.promotion_ends_at).cover? clock.now
        end

    end

I pass in an investment and the clock (by default `DateTime`). I have had to implement a Clock before, so to be on the safe side, I add a possibility for a dependency injection. For methods that encapsulate promotion logic, we can use a policy object. We can inject this into a model and delegate model calls. You can use them in presenters if you don't want to keep it in the model layer.

    class Investment < ActiveRecord::Base

      delegate :promoted?, :owner_promotable?, :promotion_status to: :promotion_policy

      private

        def promotion_policy
          @promotion_policy ||= InvestmentPromotionPolicy.new(self)
        end
    end

## Value objects

In many applications you may encounter a situation where a concept deserves own abstraction and whose equality isn't based on identity but on the value, some examples would be Ruby's Date or Money concept, typical for e-commerce applications.

    class RoleRank

      include Comparable

      ROLES = %w(superadmin admin junior_admin user guest)

      attr_reader :value
      def initialize(role)
        check_role_existence(role)
        @value = value
      end

      def <=>(other_role)
        ROLES.index(other_role.value) <=> ROLES.index(value)
      end

      def to_s
        value
      end

      class InvalidRole < Exception
      end

      private

        def check_role_existence(specified_role)
          unless ROLES.include? specified_role
            raise RoleRank::InvalidRole, "Specified Role Doesn't Exist"
          end
        end

    end

## Using Services to Keep Your Rails Controllers Clean and DRY
[link](https://blog.engineyard.com/2014/keeping-your-rails-controllers-dry-with-services)

I typically create an `actions` folder for things like `create_invoice`, and folders for other service objects like decorators, policies, and support. The services folder, I use for service objects that talk to external entities, like Stripe, AWS, or geolocation services.

## Earning Our Stripes

It's probably a good idea to wrap the calls to the Stripe gem in local methods like `external_customer_service` and `external_charge_service`, in case we ever want to switch over to Braintree or something else. On object initialization, we'll use dependency injection to accept charge amounts, card tokens, and emails.

    # app/services/credit_card_service.rb

    require 'stripe'

    class CreditCardService
      def initialize(params)
        @card = params[:card]
        @amount = params[:amount]
        @email = params[:email]
      end

      def charge
        begin
          # This will return a Stripe::Charge object
          external_charge_service.create(charge_attributes)
        rescue
          false
        end
      end

      def create_customer
        begin
          # This will return a Stripe::Customer object
          external_customer_service.create(customer_attributes)
        rescue
          false
        end
      end

      private

      attr_reader :card, :amount, :email

      def external_charge_service
        Stripe::Charge
      end

      def external_customer_service
        Stripe::Customer
      end

      def charge_attributes
        {
          amount: amount,
          card: card
        }
      end

      def customer_attributes
        {
          email: email,
          card: card
        }
      end
    end

## Service objects in Rails will help you design clean and maintainable code. Here's how.
[link](https://netguru.co/blog/service-objects-in-rails-will-helps)

*A Service object implements the user's interactions with the application.* It contains business logic that coordinates other artifacts. You could say it is the core of the operation.

    app/
      services/
        create_invoice.rb
        correct_invoice.rb
        pay_invoice.rb
        register_user.rb
        register_user_with_google.rb
        change_password.rb

We can deduce that this is some sort of invoicing application. Services have the benefit of concentrating the core logic of the application in a separate object, instead of scattering it around controllers and models.

#### Implementation

- Accept input
- Perform work
- Return result

Work: If methods names are something meaningless, it's better to standardize on `call`, it's the method ruby Procs and lambdas use. The call method uses the data we passed on initialization and input data to perform service's work. This could be CRUD (single or multiple records) or delegating to other services.

#### Result

- Boolean value
- AR object - if the service's role is to create or update Rails models, it makes sense to return such an object as a result. You then check for the presence of errors on the returned instance to decide if the call was a success.
- Status object. We use small utility objects to signal success or error. This is helpful when there are multiple object created simultaneously, or if there are many ways in which the operation may fall.

    class Success
      attr_reader :data
      def initialize(data)
        @data = data
      end

      def success?
        true
      end
    end

    class Error
      attr_reader :error
      def initialize(error)
        @error = error
      end

      def success?
        false
      end
    end

    class AuthorizationError < Error
      attr_reader :requesting_user
      def initialize(requesting_user, requested_clearance)
        @requesting_user = requesting_user
        @requested_clearance = requested_clearance
        super("User #{requesting_user.id} does not have required clearance level #{requested_clearance}")
      end
    end

    AuthorizationError.new(current_user, :admin)

#### Overriding Rails Responders

    class APIResponder < ActionController::Responder

      private

      def display(resource, options = {})
        super(resource.data, options)
      end

      def has_errors?
        !resource.success?
      end

      def json_resource_errors
        { error: resource.error, message: resource.error_message, code: resource.code, details: resource.details }
      end

      def api_location
        nil
      end
    end

    class Success
      attr_reader :data
      def initialize(data)
        @data = data
      end

      def success?
        true
      end
    end

    class Error
      attr_reader :error, :code, :details
      def initialize(error = nil, code = nil, details = nil)
        @error = error
        @code = code
        @details = details
      end

      def error_message
        error.to_s
      end

      def success?
        false
      end
    end

    class ValidationError < Error
      def initialize(details)
        super(:validation_failed, 101, details)
      end

      def error_message
        "Validation failed: see details"
      end
    end

    class InvoicesController < ApplicationController
      respond_to :json

      def create
        form = InvoiceForm.new(params)
        result = CreateInvoice.new(current_user, form).call # => ValidationError.new(invoice.errors)
        respond_with result # { error: "validation_error", code: 101, message: "..." details: { ... } }
      end


      def update
        result = UpdateInvoice.new(current_user, params[:id]).call # => Success.new(invoice)
        respond_with(result) # { billing_date: ..., company_name: ... }
      end

      # ...

      def self.responder
        APIResponder
      end
    end


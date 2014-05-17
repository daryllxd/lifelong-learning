# Weekly Iteration 17: Liskov Substitution Principle

    class Signup
      def initialize(attributes)
        @attributes = attributes
      end

      def save
        account = Account.create!(@attributes[:account])
        account.users.create!(@attributes)
      end
    end

When you make subclasses, your interactions have to be the same as the superclass. Make sure you follow the contract or you will have problems. If you want to have something different for the sign up, like `InvitationSignup`, you can do this:

    class InvitationSignup < Signup
      def save(invitation)
        user = super
        invitation.accept(user)
        user
      end
    end

The problem with this is that you have to do this:

    class SignupsController
      def create
        signup = build_signup
        if params[:invitation_id]
          invitation = Invitation.find(params[:invitation_id])
          signup.save(invitation) # This is different from the original signup!!!
        else
          signup.save()
        end
      end

      def build_signup
        if has params invitation_id... # We repeat an ugly if statement here!
        else if not...
    end

The idea behind LSP is you can swap in subclasses for the parent classes. We can fix LSP by making it like this:

    class InvitationSignup < Signup
      def initialize(attriutes, invitation)
        super(attributes)
        @invitation = invitation
      end

      def save
        user = super
        @invitation.accept(user)
        user
      end
    end

The API is still slightly different, but by following LSP, we can do this:

    class SignupsController
      def create
        build_signup.save
      end

      def build_signup
        if params[:invitation_id]
          invitation = Invitation.find(params[:invitation_id])
          InvitationSignup.new(params[:signup, invitation])
        else
          Signup.new(params[:signup])
        end
      end
    end

The conditional is just stuck in one place! We have injected a dependency using instance methods, btw.

## ActiveRecord

We have:

    resources :users do
      resource :profile
    end

    class ProfilesController
      def show
        @user = User.find(params[:id])
      end
    end

`friendly_id` is an example of solving this part.

## Strategy

We have this:

    class Purchase
      def process
        payment = Payment.new
        payment.receipt = processor.process(product.price)
        payment.save!
        payment
      end
    end

Implicitly, we want the `processor` object to return a receipt. So we can do it via credit card processing or Paypal processing:

    class CreditCardProcessor
      def process
        credit_card.charge(product.price)
      end
    end

    class PaypalProcessor
      def process
        paypal.open_transaction(product.price)
      end
    end

But what happens when we want to have some kind of free stuff? We can do this:

    class FreeProcessor
      def process
      end
    end

But this will raise an error on `Purchase.process` because it is expecting a receipt to be returned. We expect to return a receipt, but we don't return anything on `FreeProcessor`. What we can do is to create a `NullReceipt`, or just have it have a receipt.

In terms of duck typing, if you say something is a duck, then it should act like a duck.


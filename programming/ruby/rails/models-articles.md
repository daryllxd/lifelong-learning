## [CodeClimate](http://blog.codeclimate.com/blog/2012/10/17/7-ways-to-decompose-fat-activerecord-models/)

Early on, SRP is easier to apply. ActiveRecord classes handle persistence, associations and not much else. But bit-by-bit, they grow. Objects that are inherently responsible for persistence become the de facto owner of all business logic as well. And a year or two later you have a User class with over 500 lines of code, and hundreds of methods in it’s public interface. Callback hell ensues.

I discourage pulling sets of methods out of a large ActiveRecord class into “concerns”, or modules that are then mixed in to only one model. I once heard someone say:

“Any application with an app/concerns directory is concerning.”

And I agree. Prefer composition to inheritance. Using mixins like this is akin to “cleaning” a messy room by dumping the clutter into six separate junk drawers and slamming them shut. Sure, it looks cleaner at the surface, but the junk drawers actually make it harder to identify and implement the decompositions and extractions necessary to clarify the domain model.

#### 1. Extract Value Objects

Value Objects are simple objects whose equality is dependent on their value rather than an identity. They are usually immutable. In Rails, Value Objects are great when you have an attribute or small group of attributes that have logic associated with them. Anything more than basic text fields and counters are candidates for Value Object extraction.

	class Rating
	  include Comparable

	  def self.from_cost(cost)
	    if cost <= 2
	      new("A")
	    elsif cost <= 4
	      new("B")
	    elsif cost <= 8
	      new("C")
	    elsif cost <= 16
	      new("D")
	    else
	      new("F")
	    end
	  end

	  def initialize(letter)
	    @letter = letter
	  end

	  def better_than?(other)
	    self > other
	  end

	  def <=>(other)
	    other.to_s <=> to_s
	  end

	  def hash
	    @letter.hash
	  end

	  def eql?(other)
	    to_s == other.to_s
	  end

	  def to_s
	    @letter.to_s
	  end
	end

Then every ConstantSnapshot exposes an instance of Rating in its public interface:

	class ConstantSnapshot < ActiveRecord::Base
	  # …

	  def rating
	    @rating ||= Rating.from_cost(cost)
	  end
	end

Advantages:

- The `#worse_than?` and `#better_than?` methods provide a more expressive way to compare ratings than Ruby's built-in operators.
- Defining `#hash` and `#eql?` makes it possible to use a `Rating` as a hash key.
- The `#to_s` method allows me to interpolate a `Rating` into a string without any extra work.
- The class definition provides a convenient place for a factory method, returning the correct `Rating` for a given "remediation cost".

#### 2. Extract Service Objects

I reach for Service Objects when an action meets one or more of these criteria:

- The action is complex (e.g. closing the books at the end of an accounting period).
- The action reaches across multiple models (e.g. an e-commerce purchase using `Order`, `CreditCard` and `Customer` objects).
- The action interacts with an external service
- Action is not a core concern of the underlying model
- Multiple ways of performing the action (Strategy pattern)

>We pull out a `User#authenticate` method out into a `UserAuthenticator`.

	class UserAuthenticator
	  def initialize(user)
	    @user = user
	  end

	  def authenticate(unencrypted_password)
	    return false unless @user

	    if BCrypt::Password.new(@user.password_digest) == unencrypted_password
	      @user
	    else
	      false
	    end
	  end
	end

>Sessions Controller

	class SessionsController < ApplicationController
	  def create
	    user = User.where(email: params[:email]).first

	    if UserAuthenticator.new(user).authenticate(params[:password])
	      self.current_user = user
	      redirect_to dashboard_path
	    else
	      flash[:alert] = "Login failed."
	      render "new"
	    end
	  end
	end

#### 3. Extract Form Objects

When multiple ActiveRecord models might be updated by a single form submission, a Form Object can encapsulate the aggregation. This is far cleaner than using accepts_nested_attributes_for, which, in my humble opinion, should be deprecated. A common example would be a signup form that results in the creation of both a Company and a User:

	class Signup
	  include Virtus

	  extend ActiveModel::Naming
	  include ActiveModel::Conversion
	  include ActiveModel::Validations

	  attr_reader :user
	  attr_reader :company

	  attribute :name, String
	  attribute :company_name, String
	  attribute :email, String

	  validates :email, presence: true
	  # … more validations …

	  # Forms are never themselves persisted
	  def persisted?
	    false
	  end

	  def save
	    if valid?
	      persist!
	      true
	    else
	      false
	    end
	  end

	private

	  def persist!
	    @company = Company.create!(name: company_name)
	    @user = @company.users.create!(name: name, email: email)
	  end
	end





























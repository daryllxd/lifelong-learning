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


[TODO]

## [Rethinking Rails Models](http://happybearsoftware.com/rethinking-rails-models.html)

In your rails web application, the primary location your model gets used is in your controllers. The prevailing wisdom is to keep your controllers quite 'skinny' and contain as little domain logic as possible.

In controllers we want high level touch-points to our domain-model code. The more declarative these touch-points are, the better. We want as little umming and aahing as possible. "Tell don't ask" and all that.

Patterns:

1. Find a domain resource and call a method on it

		class PersonController < ApplicationController
		  def discombobulate
		    @person = Person.find(params[:id])
		    @person.confuse
		  end
		end

2. Call a method on a class or module

		class BusinessController < ApplicationController
		  def aww_yeah
		    BagOMethods.business_time!(params)
		  end
		end

In practice it usually involves dealing with response headers, authentication and a host of junk that isn't related to your model.

*Models are not necessarily subclasses of ActiveRecord::Base.*

Typical Model

	class Person < ActiveRecord::Base
	  belongs_to :account
	  has_many :addresses
	  has_many :friends, through: :friendships

	  validates :first_name, presence: true
	  validates :last_name, presence: true
	  validates :date_of_birth, presence: true
	  validates :some_other_field do
	    # some custom validation code
	  end

	  attr_accessible :first_name, :last_name, :date_of_birth, :some_other_field, :upvote_count

	  scope :public   ->    { where(registration_complete: true) }
	  scope :confused ->    { where(status: 'confused') }
	  scope :enlightened -> { where('my_models.status != ?', 'confused') }
	end

Config file-ish. As a config file, it's great! DSL for relations, validations, AR stuff. But when you add the domain-logic methods, it blows up.

	def confuse
		self.status = 'confused'
	end

	def confuse!
	confuse
		save
	end

Not that cool. While you can see everything in one file, and there is less thought involved, *you can't test separate concerns in isolation* and *there is no clear structure*.

Proposed solution: Keep the scopes and shit, but the operations get moved to another file.

> app/models/complex_person_operations

	module ComplexPersonOperations
	  def complex_operation
	    if friends.some_complex_domain_condition?
	      do_something_complicated
	    else
	      do_something_else
	    end
	  end

	  def do_something_complicated
	    SomeOtherClass.new(foo: 'bar', bar: 'baz', baz: 'foo').new.delegate_complication
	  end

	  def do_something_else
	    3.times { clap_hands }
	  end

	  def clap_hands
	    %w(clap)
	  end
	end

> app/models/confused_person

	module ConfusedPerson
	  def confuse
	    self.status = 'confused'
	  end

	  def confuse!
	    confuse
	    save
	  end

	  def confused_friends
	    friends.confused
	  end
	end

#### Gains

- Person is still a config file, the include directives up at the top fit right in and we've removed clutter at the bottom.
- Our controller is unchanged, `person.confuse` still works as expected.
- We've separated different concerns into separate files, so it's easy to see how a given concern works in one place.
- *In this case, methods that rely on the underlying ActiveRecord super class are separated from methods that do arbitrary domain logic.*
- Each module is testable individually. Mocks that extend it just need to respond to any required API for the module to function.

Another important benefit we get here (that doesn't quite fit into a bullet point) is that any modules that we delegate to can in turn delegate to a different set of domain-level classes and modules that perform arbitrary logic for you. In this way, the included modules act as a gateway between your actual domain-logic and your ActiveRecord::Base subclasses.

It's a given that if you start to build up an unmanageable number of modules in your app/models directory that you break out some namespaces and start putting them in relevant subdirectories.

#### More Complex Operations

	class BusinessController < ApplicationController
	  def aww_yeah
	    BagOMethods.business_time!(params)
	  end
	end

	module BagOMethods
	  def self.business_time!(parameters)
	    a = Person.find(parameters[:a][:id])
	    b = Person.find(parameters[:b][:id])
	    a.do_some_business_with(b)
	  end
	end

Possible to separate that shit out too.






## [Put chubby models on a diet with concerns](http://37signals.com/svn/posts/3372-put-chubby-models-on-a-diet-with-concerns)

Different models in your Rails application will often share a set of cross-cutting concerns. In Basecamp, we have almost forty such concerns with names like Trashable, Searchable, Visible, Movable, Taggable.

These concerns encapsulate both data access and domain logic about a certain slice of responsibility.Q

		module Taggable
		  extend ActiveSupport::Concern

		  included do
		    has_many :taggings, as: :taggable, dependent: :destroy
		    has_many :tags, through: :taggings
		  end

		  def tag_names
		    tags.map(&:name)
		  end
		end

		# current_account.posts.visible_to(current_user)
		module Visible
		  extend ActiveSupport::Concern

		  module ClassMethods
		    def visible_to(person)
		      where \
		        "(#{table_name}.bucket_id IN (?) AND
		          #{table_name}.bucket_type = 'Project') OR
		         (#{table_name}.bucket_id IN (?) AND
		          #{table_name}.bucket_type = 'Calendar')",
		        person.projects.pluck('projects.id'),
		        calendar_scope.pluck('calendars.id')
		    end
		  end
		end

Concerns are also a helpful way of extracting a slice of model that doesn’t seem part of its essence (what is and isn’t in the essence of a model is a fuzzy line and a longer discussion) without going full-bore Single Responsibility Principle and running the risk of ballooning your object inventory.

		module Dropboxed
		  extend ActiveSupport::Concern

		  included do
		    before_create :generate_dropbox_key
		  end

		  def rekey_dropbox
		    generate_dropbox_key
		    save!
		  end

		  private
		    def generate_dropbox_key
		      self.dropbox_key = SignalId::Token.unique(24) do |key|
		        self.class.find_by_dropbox_key(key)
		      end
		    end
		end

This approach to breaking up domain logic into concerns is similar in some ways to the DCI notion of Roles. It doesn’t have the run-time mixin acrobatics nor does it have the “thy models shall be completely devoid of logic themselves” prescription, but other than that, it’ll often result in similar logic extracted using similar names.


























